open Reprocessing;

open Common;

let fadeTimeSec = 1.5;

let init = env => {
  dayIndex: 1,
  journalEntries: Story.journalEntries,
  dayTransition: NoTransition,
  animationTime: 0.,
  pageNumber: 0,
};

let updateDay = (state, env) => {
  let state =
    switch (state) {
    | {gameobjects, journal: {dayTransition: NoTransition}} =>
      if (debug && Env.keyPressed(P, env)) {
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
            x: Utils.randomf(~min=11., ~max=27.) *. tileSizef,
            y: Utils.randomf(~min=18., ~max=20.) *. tileSizef,
          },
          action: PickUp(Egg),
          state: NoState,
        },
        {
          pos: {
            x: Utils.randomf(~min=11., ~max=27.) *. tileSizef,
            y: Utils.randomf(~min=18., ~max=20.) *. tileSizef,
          },
          action: Cleanup,
          state: NoState,
        },
        ...gameobjects,
      ];
      let shouldAddBoss = dayIndex + 1 === 2;
      let gameobjects =
        if (shouldAddBoss) {
          let bPos = {x: tileSizef *. 17., y: tileSizef *. 15.};
          [
            {
              pos: bPos,
              action: NoAction,
              state:
                Boss({
                  movePair: (bPos, bPos),
                  movingTime: 0.,
                  hunger: 4,
                  eatingTime: 0.,
                  killed: [],
                  eating: false,
                }),
            },
            ...gameobjects,
          ];
        } else {
          gameobjects;
        };
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
          y: tileSizef *. 10.,
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
  {
    ...state,
    journal: {
      ...state.journal,
      journalEntries: Story.journalEntries,
    },
  };
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
              ~amt=
                Utils.remapf(
                  animationTime,
                  0.,
                  fadeTimeSec,
                  minAlpha,
                  maxAlpha,
                ),
              ~low=0.,
              ~high=255.,
            ),
          ),
      ),
      env,
    );
    drawAssetFullscreen("journal_page.png", state, env);
    /*Draw.pushStyle(env);*/
    Draw.tint(Utils.color(0, 0, 0, 255), env);
    Draw.text(
      ~body="Day " ++ string_of_int(dayIndex),
      ~font=state.mainFont,
      ~pos=(55, 60),
      env,
    );
    let currentEntry = state.journal.journalEntries[dayIndex - 1];
    ignore @@
    Array.fold_left(
      (y, line) => {
        Draw.text(~body=line, ~font=state.mainFont, ~pos=(55, y), env);
        y + 32;
      },
      110,
      currentEntry[state.journal.pageNumber],
    );
    Draw.popStyle(env);
    if (animationTime > fadeTimeSec && dayTransition == FadeOut ) {
      {
        ...state,
        journal: {
          ...state.journal,
          dayTransition: NoTransition,
          animationTime: 0.,
        },
      };
    } else if (Env.keyPressed(Space, env)) {
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

let checkTasks = (state, _env) =>
  if (state.journal.dayIndex === 1) {
    false
    /*List.for_all(
      (o: gameobjectT) =>
        /* Check for everything that needs to be done for the next day to happen. */
        switch (o) {
        /*     "Water corn",
               "Plant seeds",
               "Sell eggs",
               "Sell milk"*/
        | {action: PickUp(Egg)}
        | {action: PickUp(Corn)}
        | {state: WaterTank(HalfFull)}
        | {state: WaterTank(Empty)}
        | {action: PickUp(Milk), state: Cow(_)}
        | {action: WaterCorn} => false
        | _ => true
        },
      state.gameobjects,
    );*/
  } else {
    false;
  };
