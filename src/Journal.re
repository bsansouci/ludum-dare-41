open Reprocessing;

open Common;

let fadeTimeSec = 1.5;

let init = env => {
  dayIndex: 1,
  journalEntries: [|
    [|
      "I was happy today. I woke up to",
      "the early cry of the rooster.",
      "I had lots to do. I cleaned up",
      "the cow's manure, planted some",
      "more seeds, watered the ",
      "beautiful growing corn and gave",
      "water to my domestic",
      "companions."
    |],
  |],
  dayTransition: NoTransition,
  animationTime: 0.,
};

let updateDay = (state, env) =>
  switch (state) {
  | {gameobjects, journal: {dayTransition: NoTransition}} =>
    let allDone =
      if (debug && Env.keyPressed(P, env)) {
        true;
      } else {
        List.for_all(
          (o: gameobjectT) =>
            /* Check for everything that needs to be done for the next day to happen. */
            switch (o) {
            | {action: PickUp(Egg)}
            | {action: PickUp(Corn)}
            | {state: WaterTank(HalfFull)}
            | {state: WaterTank(Empty)}
            | {action: PickUp(Milk), state: Cow(_)}
            | {action: WaterCorn} => false
            | _ => true
            },
          gameobjects,
        );
      };
    if (allDone) {
      {
        ...state,
        journal: {
          ...state.journal,
          dayTransition: FadeOut,
          animationTime: 0.,
        },
      };
    } else {
      state;
    };
  | {journal: {dayTransition: JournalOut, animationTime}}
      when animationTime > fadeTimeSec => {
      ...state,
      journal: {
        ...state.journal,
        dayTransition: FadeIn,
        animationTime: 0.,
      },
    }
  | {journal: {dayTransition: FadeOut, animationTime, dayIndex}}
      when animationTime > fadeTimeSec =>
    /* Generate new day here */
    let gameobjects =
      List.map(
        (go: gameobjectT) => {
          let state =
            switch (go.state) {
            | Corn(5) => Corn(5)
            | Corn((-1)) => Corn(-1)
            | Corn(stage) => Corn(stage + 1)
            | WaterTank(_) => WaterTank(Empty)
            | FoodTank(s) => FoodTank(s == Full ? HalfFull : Empty)
            | _ => go.state
            };
          let action =
            switch (state) {
            | Corn(5) => PickUp(Corn)
            | Corn((-1)) => PlantSeed
            | WaterTank(_) => WaterAnimals
            | FoodTank(_) => FeedAnimals
            | Cow(_) => PickUp(Milk)
            | Corn(n) when n >= 0 && n < 5 => WaterCorn
            | _ => go.action
            };
          {...go, state, action};
        },
        state.gameobjects,
      );
    let gameobjects = [
      {
        pos: {
          x: Utils.randomf(~min=6., ~max=22.) *. tileSizef,
          y: Utils.randomf(~min=13., ~max=15.) *. tileSizef,
        },
        action: PickUp(Egg),
        state: NoState,
      },
      {
        pos: {
          x: Utils.randomf(~min=6., ~max=22.) *. tileSizef,
          y: Utils.randomf(~min=13., ~max=15.) *. tileSizef,
        },
        action: Cleanup,
        state: NoState,
      },
      ...gameobjects,
    ];
    {
      ...state,
      journal: {
        ...state.journal,
        dayTransition: JournalIn,
        animationTime: 0.,
        dayIndex: dayIndex + 1,
      },
      playerPos: {
        x: tileSizef *. 17.8,
        y: tileSizef *. 5.,
      },
      playerFacing: DownD,
      currentItem: None,
      gameobjects,
    };
  | {journal: {dayTransition: FadeIn, animationTime}}
      when animationTime > fadeTimeSec => {
      ...state,
      journal: {
        ...state.journal,
        dayTransition: NoTransition,
        animationTime: 0.,
      },
    }
  | _ => state
  };

let renderTransition = (state, deltaTime, env) =>
  switch (state) {
  | {journal: {dayTransition: FadeOut, animationTime}} =>
    Draw.fill(
      Utils.color(
        ~r=0,
        ~g=0,
        ~b=0,
        ~a=
          int_of_float(
            Utils.remapf(
              ~value=animationTime,
              ~low1=0.,
              ~high1=fadeTimeSec,
              ~low2=0.,
              ~high2=255.,
            ),
          ),
      ),
      env,
    );
    Draw.rect(
      ~pos=(0, 0),
      ~width=Env.width(env),
      ~height=Env.height(env),
      env,
    );
    {
      ...state,
      journal: {
        ...state.journal,
        animationTime: animationTime +. deltaTime,
      },
    };
  | {journal: {dayTransition: FadeIn, animationTime}} =>
    Draw.fill(
      Utils.color(
        ~r=0,
        ~g=0,
        ~b=0,
        ~a=
          int_of_float(
            Utils.remapf(
              ~value=animationTime,
              ~low1=0.,
              ~high1=fadeTimeSec,
              ~low2=255.,
              ~high2=0.,
            ),
          ),
      ),
      env,
    );
    Draw.rect(
      ~pos=(0, 0),
      ~width=Env.width(env),
      ~height=Env.height(env),
      env,
    );
    {
      ...state,
      journal: {
        ...state.journal,
        animationTime: animationTime +. deltaTime,
      },
    };
  | {
      journal: {
        dayTransition: JournalOut as dayTransition,
        dayIndex,
        animationTime,
      },
    }
  | {
      journal: {
        dayTransition: JournalIn as dayTransition,
        dayIndex,
        animationTime,
      },
    } =>
    Draw.fill(Utils.color(~r=0, ~g=0, ~b=0, ~a=255), env);
    Draw.rect(
      ~pos=(0, 0),
      ~width=Env.width(env),
      ~height=Env.height(env),
      env,
    );
    Draw.pushStyle(env);
    let (minAlpha, maxAlpha) =
      if (dayTransition === JournalIn) {
        (0., 255.);
      } else {
        (255., 0.);
      };
    Draw.tint(
      Utils.color(
        ~r=255,
        ~g=255,
        ~b=255,
        ~a=
          int_of_float(
            Utils.constrain(
              ~amt=Utils.remapf(animationTime, 0., fadeTimeSec, minAlpha, maxAlpha),
              ~low=0.,
              ~high=255.)
          ),
      ),
      env,
    );
    switch (StringMap.find("journal_page.png", state.assets)) {
    | exception Not_found =>
      print_endline(
        "Journal asset not found"
      )
    | asset =>
      Reprocessing.Draw.subImagef(
        state.spritesheet,
        ~pos=(10., 10.),
        ~width=asset.size.x *. 2.,
        ~height=asset.size.y *. 2.,
        ~texPos=(int_of_float(asset.pos.x), int_of_float(asset.pos.y)),
        ~texWidth=int_of_float(asset.size.x),
        ~texHeight=int_of_float(asset.size.y),
        env,
      )
    };
    Draw.text(~body="Day " ++ string_of_int(dayIndex), ~pos=(55, 40), env);
    ignore @@
    Array.fold_left(
      (y, line) => {
        Draw.text(~body=line, ~pos=(55, y), env);
        y + 32;
      },
      100,
      state.journal.journalEntries[0],
    );
    Draw.popStyle(env);
    if (Env.keyPressed(Space, env)) {
      {
        ...state,
        journal: {
          ...state.journal,
          dayTransition: JournalOut,
          animationTime: 0.,
        },
      };
    } else {
      {
        ...state,
        journal: {
          ...state.journal,
          animationTime: animationTime +. deltaTime,
        },
      };
    };
  | _ => state
  };
