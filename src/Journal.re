open Reprocessing;

open Common;

let fadeTimeSec = 1.5;

let init = env => {
  dayIndex: 0,
  dayTransition: NoTransition,
  animationTime: 0.,
  pageNumber: 0,
};

let getForwardButton = ({mainFont, journal: {dayIndex, pageNumber}}, env) => {
  let currentEntry = Story.entries[dayIndex];
  let (body, x) =
    if (pageNumber === Array.length(currentEntry) - 1) {
      ("continue", 445);
    } else {
      (
        string_of_int(pageNumber + 1)
        ++ " / "
        ++ string_of_int(Array.length(currentEntry)),
        468,
      );
    };
  let w1 = Draw.textWidth(~body, ~font=mainFont, env);
  let (x1, y1, w1, h1) = (x, 550, w1 + 24, 40);
  (body, x1, y1, w1, h1);
};

let getBackButton = ({mainFont}, env) => {
  let body = " < ";
  let w1 = Draw.textWidth(~body, ~font=mainFont, env);
  let (x1, y1, w1, h1) = (60, 550, w1 + 24, 40);
  (body, x1, y1, w1, h1);
};

let updateDay = (state, env) => {
  let state =
    switch (state) {
    | {journal: {dayTransition: NoTransition}} =>
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
      }
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
            x: Utils.randomf(~min=11., ~max=24.) *. tileSizef,
            y: Utils.randomf(~min=18., ~max=20.) *. tileSizef,
          },
          action: PickUp(Egg),
          state: NoState,
        },
        {
          pos: {
            x: Utils.randomf(~min=11., ~max=24.) *. tileSizef,
            y: Utils.randomf(~min=18., ~max=20.) *. tileSizef,
          },
          action: Cleanup,
          state: NoState,
        },
        ...gameobjects,
      ];
      let shouldAddBoss = dayIndex + 1 === 1;
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
      let shouldAddFlowers = dayIndex + 1 === 4;
      let gameobjects =
        if (shouldAddFlowers) {
          [
            {
              pos: {
                x: tileSizef *. 17.,
                y: tileSizef *. 15.,
              },
              action: PickUp(Flower),
              state: NoState,
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
    | {journal: {dayTransition: JournalIn, dayIndex, pageNumber}} =>
      let (mx, my) = Env.mouse(env);
      let didClickOnForward =
        state.mousePressed
        && {
          let (_, x1, y1, w1, h1) = getForwardButton(state, env);
          mx > x1 && mx < x1 + w1 && my > y1 && my < y1 + h1;
        };
      let didClickOnBack =
        state.mousePressed
        && {
          let (_, x1, y1, w1, h1) = getBackButton(state, env);
          mx > x1 && mx < x1 + w1 && my > y1 && my < y1 + h1;
        };
      if ((Env.keyPressed(Right, env) || didClickOnForward)
          && pageNumber < Array.length(Story.entries[dayIndex])
          - 1) {
        {
          ...state,
          journal: {
            ...state.journal,
            pageNumber: pageNumber + 1,
          },
        };
      } else if ((Env.keyPressed(Left, env) || didClickOnBack)
                 && pageNumber > 0) {
        {
          ...state,
          journal: {
            ...state.journal,
            pageNumber: pageNumber - 1,
          },
        };
      } else if ((Env.keyPressed(Right, env) || didClickOnForward)
                 && pageNumber === Array.length(Story.entries[dayIndex]) - 1) {
        {
          ...state,
          journal: {
            ...state.journal,
            dayTransition: JournalOut,
          },
        };
      } else {
        state;
      };
    | _ => state
    };
  state;
};

let renderJournal = ({journal: {dayIndex, pageNumber}} as state, env) => {
  drawAssetFullscreen("journal_page.png", state, env);
  Draw.pushStyle(env);
  Draw.tint(Utils.color(0, 0, 0, 255), env);
  Draw.text(
    ~body="Day " ++ string_of_int(dayIndex + 1),
    ~font=state.mainFont,
    ~pos=(55, 60),
    env,
  );
  let currentEntry = Story.entries[dayIndex];
  {
    let (body, x1, y1, w1, h1) = getForwardButton(state, env);
    let (mx, my) = Env.mouse(env);
    if (mx > x1 && mx < x1 + w1 && my > y1 && my < y1 + h1) {
      Draw.fill(Utils.color(170, 138, 107, 255), env);
      Draw.rect(~pos=(x1, y1), ~width=w1, ~height=h1, env);
    };
    Draw.text(~body, ~font=state.mainFont, ~pos=(x1 + 12, y1 + 30), env);
  };
  {
    let (body, x1, y1, w1, h1) = getBackButton(state, env);
    let (mx, my) = Env.mouse(env);
    if (mx > x1 && mx < x1 + w1 && my > y1 && my < y1 + h1) {
      Draw.fill(Utils.color(170, 138, 107, 255), env);
      Draw.rect(~pos=(x1, y1), ~width=w1, ~height=h1, env);
    };
    Draw.text(~body, ~font=state.mainFont, ~pos=(x1 + 12, y1 + 30), env);
  };
  /*{
      let w = Draw.textWith(~body="Day " ++ string_of_int(dayIndex + 1),
        ~font=state.mainFont, env);
      let (x2, y2, w2, h2) = (480, 580, w, 50);
      Draw.rect()
      Draw.text(
        ~body,
        ~font=state.mainFont,
        ~pos=(x2, y2),
        env,
      );
    };*/
  ignore @@
  Array.fold_left(
    (y, line) => {
      Draw.text(~body=line, ~font=state.mainFont, ~pos=(55, y), env);
      y + 32;
    },
    110,
    currentEntry[pageNumber],
  );
  Draw.popStyle(env);
};

let renderTransition = (state, env) =>
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
        animationTime: animationTime +. Env.deltaTime(env),
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
        animationTime: animationTime +. Env.deltaTime(env),
      },
    };
  | {journal: {dayTransition: CheckJournal, animationTime}} =>
    renderJournal(state, env);
    if (animationTime > 0.
        && (Env.keyPressed(Space, env) || Env.keyPressed(X, env))) {
      {
        ...state,
        journal: {
          ...state.journal,
          dayTransition: NoTransition,
        },
      };
    } else {
      {
        ...state,
        journal: {
          ...state.journal,
          animationTime: 1.,
        },
      };
    };
  | {journal: {dayTransition: JournalOut as dayTransition, animationTime}}
  | {journal: {dayTransition: JournalIn as dayTransition, animationTime}} =>
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
                  ~value=animationTime,
                  ~low1=0.,
                  ~high1=fadeTimeSec,
                  ~low2=minAlpha,
                  ~high2=maxAlpha,
                ),
              ~low=0.,
              ~high=255.,
            ),
          ),
      ),
      env,
    );
    renderJournal(state, env);
    Draw.popStyle(env);
    if (animationTime > fadeTimeSec && dayTransition == FadeOut) {
      {
        ...state,
        journal: {
          ...state.journal,
          dayTransition: NoTransition,
          animationTime: 0.,
        },
      };
    } else if (dayTransition == JournalIn
               && (Env.keyPressed(Space, env) || Env.keyPressed(X, env))) {
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
          animationTime: animationTime +. Env.deltaTime(env),
        },
      };
    };
  | _ => state
  };

let checkTasks = (state, _env) =>
  if (state.journal.dayIndex === 0) {
    let (acc, count) =
      List.fold_left(
        ((acc, count), o: gameobjectT) =>
          /* Check for everything that needs to be done for the next day to happen. */
          switch (acc, o) {
          /*     "Water corn",
                 "Plant seeds",
                 "Sell eggs",
                 "Sell milk"*/
          | (true, {action: PickUp(Egg)})
          | (true, {state: WaterTank(Empty)})
          | (true, {action: PickUp(Milk), state: Cow(_)}) => (false, count)
          | (true, {state: Corn(_), action: NoAction}) => (true, count + 1)
          | (false, _) => (false, count)
          | _ => (true, count)
          },
        (true, 0),
        state.gameobjects,
      );
    if (acc && count >= 2) {
      true;
    } else {
      acc;
    };
  } else if (state.journal.dayIndex === 1) {
    /*"Water animals",
      "Harvest corn", ----> because you're told to throw it out
      "Feed animals",
      "Clean poop"
      */
    List.for_all(
      (o: gameobjectT) =>
        switch (o) {
        | {state: WaterTank(Empty)}
        | {state: FoodTank(Empty)}
        | {action: PickUp(Corn)}
        | {action: Cleanup} => false
        | _ => true
        },
      state.gameobjects,
    );
  } else if (state.journal.dayIndex === 2) {
    !
      List.exists(
        o =>
          switch (o) {
          | {state: BarnDoor(Broken)} => true
          | _ => false
          },
        state.gameobjects,
      );
      /*    "Tasks",
            "",
            "Fix the barn",
            "Make sure you can open and close the barn door"
            */
  } else if (state.journal.dayIndex === 3) {
    !
      List.exists(
        o =>
          switch (o) {
          | {action: CleanupBlood} => false
          | _ => true
          },
        state.gameobjects,
      );
      /*"Tasks",
        "",
        "There was some noise in the barn last night.",
        "Investigate the barn",
        "Clean up any mess that's in the barn"*/
  } else if (state.journal.dayIndex === 4) {
    /*    "Tasks",
          "",
          "Find Maria's grave",
          "Mourn"
          */
    List.exists(
      o =>
        switch (o) {
        | {state: Tombstone(true)} => true
        | _ => false
        },
      state.gameobjects,
    );
  } else if (state.journal.dayIndex === 5) {
    /*
         "Tasks",
     "",
     "There was some noise in the barn.",
     "Investigate the barn",
     "Clean up any mess that's in the barn"

     second task becomes

     "Lock monster in barn"

          */
    state.
      monsterWasLockedIn;
  } else {
    false;
  };
