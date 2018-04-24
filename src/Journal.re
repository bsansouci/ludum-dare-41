open Reprocessing;

open Common;

let fadeTimeSec = 1.5;

let init = _env => {
  dayIndex: 0,
  dayTransition: JournalIn,
  animationTime: 0.,
  pageNumber: 0,
};

let getForwardButton = ({mainFont, journal: {dayIndex, pageNumber}}, env) => {
  let currentEntry = Story.entries[dayIndex];
  let (body, x) =
    if (pageNumber === Array.length(currentEntry.pages)) {
      ("continue", 445);
    } else {
      (
        string_of_int(pageNumber + 1)
        ++ " / "
        ++ string_of_int(Array.length(currentEntry.pages) + 1),
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
      let dayIndex = dayIndex + 1;
      let gameobjects =
        List.map(
          (go: gameobjectT) => {
            let state =
              switch (go.state, go.action) {
              | (Corn(5), _) => Corn(5)
              | (Corn((-1)), _) => Corn(-1)
              | (Corn(stage), NoAction) => Corn(stage + 1)
              | (WaterTank(_), _) => WaterTank(Empty)
              | (FoodTank(s), _) => FoodTank(s == Full ? HalfFull : Empty)
              | (Chicken({willDie: true} as chickenState), _)
                  when dayIndex === 3 =>
                Chicken({...chickenState, health: 0})
              | (Chicken({willDie: true} as chickenState), _)
                  when dayIndex === 7 =>
                Chicken({...chickenState, health: (-1)})
              | (BarnDoor(_), _) when dayIndex >= 6 => BarnDoor(Broken)
              | _ => go.state
              };
            let pos =
              switch (go.state) {
              | Chicken({willDie: true}) when dayIndex === 3 => {
                  x: 9. *. tileSizef,
                  y: 15. *. tileSizef,
                }
              | BarnDoor(Closed) when dayIndex >= 6 => {
                  x: go.pos.x +. tileSizef -. 3.,
                  y: go.pos.y,
                }
              | _ => go.pos
              };
            let action =
              switch (state) {
              | Corn(5) => PickUp(Corn)
              | Corn((-1)) => PlantSeed
              | WaterTank(_) => WaterAnimals
              | FoodTank(_) => FeedAnimals
              | Cow(_) => PickUp(Milk)
              | Corn(n) when n >= 0 && n < 5 => WaterCorn
              | BarnDoor(Broken) when dayIndex === 2 => DoBarnDoor
              | BarnDoor(Broken) when dayIndex >= 6 => NoAction
              | AxeStanding when dayIndex === 7 => PickUp(Axe)
              | _ => go.action
              };
            {...go, pos, state, action};
          },
          state.gameobjects,
        );
      let shouldAddAnotherEgg = dayIndex === 1 || dayIndex === 2;
      let gameobjects =
        if (shouldAddAnotherEgg) {
          [
            {
              pos: {
                x: (dayIndex === 1 ? 15. : 17.) *. tileSizef,
                y: 19. *. tileSizef,
              },
              action: PickUp(Egg),
              state: NoState,
            },
            ...gameobjects,
          ];
        } else {
          gameobjects;
        };
      let shouldAddManure = dayIndex === 1 || dayIndex === 6;
      let gameobjects =
        if (shouldAddManure) {
          [
            {
              pos: {
                x: 14. *. tileSizef,
                y: 19. *. tileSizef,
              },
              action: Cleanup,
              state: NoState,
            },
            ...gameobjects,
          ];
        } else {
          gameobjects;
        };
      let shouldAddCleanupBlood = dayIndex === 3;
      let gameobjects =
        if (shouldAddCleanupBlood) {
          [
            {
              pos: {
                x: 11. *. tileSizef,
                y: 11. *. tileSizef,
              },
              action: CleanupBlood,
              state: NoState,
            },
            {
              pos: {
                x: 7. *. tileSizef,
                y: 12. *. tileSizef,
              },
              action: CleanupBlood,
              state: NoState,
            },
            {
              pos: {
                x: 8. *. tileSizef,
                y: 15. *. tileSizef,
              },
              action: CleanupBlood,
              state: NoState,
            },
            ...gameobjects,
          ];
        } else {
          gameobjects;
        };
      let shouldAddFlowers = dayIndex === 4;
      let gameobjects =
        if (shouldAddFlowers) {
          [
            {
              pos: {
                x: tileSizef *. 17.,
                y: tileSizef *. 11.,
              },
              action: PickUp(Flower),
              state: NoState,
            },
            ...gameobjects,
          ];
        } else {
          gameobjects;
        };
      let shouldRemoveBoss = dayIndex === 6;
      let gameobjects =
        if (shouldRemoveBoss) {
          List.filter(
            g =>
              switch (g) {
              | {state: Boss(_)} => false
              | _ => true
              },
            gameobjects,
          );
        } else {
          gameobjects;
        };
      let checkIfAtLeastOneCorn = dayIndex === 6;
      let gameobjects =
        if (checkIfAtLeastOneCorn) {
          let (gameobjects, _) =
            List.fold_left(
              ((gameobjects, isDone), g) =>
                switch (isDone, g) {
                | (false, {state: Corn(_)}) => (
                    [
                      {...g, state: Corn(5), action: PickUp(Corn)},
                      ...gameobjects,
                    ],
                    true,
                  )
                | _ => ([g, ...gameobjects], isDone)
                },
              ([], false),
              gameobjects,
            );
          gameobjects;
        } else {
          gameobjects;
        };
      let shouldAddBoss = dayIndex === 7;
      let gameobjects =
        if (shouldAddBoss) {
          /* Directly on the tombstone, so you don't see the monster but if you don't hurry he'll
             catch you. */
          let bPos = {x: tileSizef *. 9., y: tileSizef *. 5.};
          [
            {
              pos: bPos,
              action: NoAction,
              state:
                Boss({
                  movePair: (bPos, bPos),
                  movingTime: 0.,
                  hunger: 6,
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
        playerDead: false,
        night: dayIndex === 5 || dayIndex === 7 ? true : false,
        journal: {
          dayTransition: JournalIn,
          animationTime: 0.,
          dayIndex,
          pageNumber: 0,
        },
        playerPos: {
          x: tileSizef *. 15.8,
          y: tileSizef *. 10.,
        },
        playerFacing: DownD,
        currentItem: None,
        gameobjects,
        day6PlayerWentInBarn: false,
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
    | {journal: {dayTransition: CheckJournal, dayIndex, pageNumber}}
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
      if ((
            Env.keyPressed(Right, env)
            || didClickOnForward
            || Env.keyPressed(Space, env)
            || Env.keyPressed(X, env)
          )
          && pageNumber < Array.length(Story.entries[dayIndex].pages)) {
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
      } else if ((
                   Env.keyPressed(Right, env)
                   || didClickOnForward
                   || Env.keyPressed(Space, env)
                   || Env.keyPressed(X, env)
                 )
                 && pageNumber === Array.length(Story.entries[dayIndex].pages)) {
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

/*.Ok the stats are all numbers because arrays have to be heterogeneous. We'll figure it out. */
let day1Stats = state =>
  List.fold_left(
    (acc, o: gameobjectT) =>
      switch (acc) {
      | [|pickUpEggs, pickUpMilk, emptyWaterTank, cornNoAction, plantSeed|] =>
        /* Check for everything that needs to be done for the next day to happen. */
        switch (o) {
        /*     "Water corn",
               "Plant seeds",
               "Sell eggs",
               "Sell milk"*/
        | {action: PickUp(Egg)} => [|
            1,
            pickUpMilk,
            emptyWaterTank,
            cornNoAction,
            plantSeed,
          |]
        | {state: WaterTank(Empty)} => [|
            pickUpEggs,
            pickUpMilk,
            1,
            cornNoAction,
            plantSeed,
          |]
        | {action: PickUp(Milk), state: Cow(_)} => [|
            pickUpEggs,
            1,
            emptyWaterTank,
            cornNoAction,
            plantSeed,
          |]
        | {state: Corn(4), action: NoAction} => [|
            pickUpEggs,
            pickUpMilk,
            emptyWaterTank,
            cornNoAction + 1,
            plantSeed,
          |]
        | {state: Corn(0), action: NoAction} => [|
            pickUpEggs,
            pickUpMilk,
            emptyWaterTank,
            cornNoAction,
            plantSeed + 1,
          |]
        | _ => acc
        }
      | _ => failwith("beeeeen 2")
      },
    [|0, 0, 0, 0, 0|],
    state.gameobjects,
  );

let day2Stats = state =>
  List.fold_left(
    (acc, o: gameobjectT) =>
      switch (acc) {
      | [|emptyWaterTank, emptyFoodTank, cleanup|] =>
        switch (o) {
        | {state: WaterTank(Empty)} => [|1, emptyFoodTank, cleanup|]
        | {state: FoodTank(Empty)} => [|emptyWaterTank, 1, cleanup|]
        | {action: Cleanup} => [|emptyWaterTank, emptyFoodTank, 1|]
        | _ => acc
        }
      | _ => failwith("beeeeen 3")
      },
    [|0, 0, 0|],
    state.gameobjects,
  );

let day3Stats = state =>
  List.fold_left(
    (acc, o: gameobjectT) =>
      switch (o) {
      | {state: BarnDoor(Broken)} => [|1|]
      | _ => acc
      },
    [|0|],
    state.gameobjects,
  );

/* returns twice the same thing because the story contains two tasks which are basically gonna be
   the same */
let day4Stats = state =>
  List.fold_left(
    (acc, o: gameobjectT) =>
      switch (o) {
      | {action: CleanupBlood} => [|1, 1|]
      | _ => acc
      },
    [|0, 0|],
    state.gameobjects,
  );

let day5Stats = state =>
  List.fold_left(
    (acc, o: gameobjectT) =>
      switch (acc) {
      | [|_, flowerTombstone|] =>
        switch (o) {
        | {state: Tombstone(false)} => [|1, 1|]
        | {action: InspectTombstone} => [|1, flowerTombstone|]
        | _ => acc
        }
      | _ => failwith("beeeeen 4")
      },
    [|0, 0|],
    state.gameobjects,
  );

let day6Stats = state => {
  /* Check if monster is in barn and barn door is closed */
  let (isMonsterInBarn, isBarnDoorClosed) =
    List.fold_left(
      ((isMonsterInBarn, isBarnDoorClosed), g) =>
        switch (g) {
        | {pos, state: Boss(_)} => (checkIfInBarn(pos), isBarnDoorClosed)
        | {state: BarnDoor(Closed)} => (isMonsterInBarn, true)
        | _ => (isMonsterInBarn, isBarnDoorClosed)
        },
      (false, false),
      state.gameobjects,
    );
  [|isMonsterInBarn && isBarnDoorClosed ? 1 : 0|];
};

let day7Stats = state =>
  /*Count("Water corn", 3),
    Count("Plant seeds", 1),
    Bool("Sell eggs"),
    Bool("Sell milk"),
    Bool("Fill water trough"),
    Bool("Feed animals"),
    Bool("Wash away manure"),*/
  List.fold_left(
    (acc, o: gameobjectT) =>
      switch (acc) {
      | [|
          wateredCorn,
          plantSeed,
          pickUpEggs,
          pickUpMilk,
          emptyWaterTank,
          emptyFoodTank,
          cleanup,
        |] =>
        /* Check for everything that needs to be done for the next day to happen. */
        switch (o) {
        /*     "Water corn",
               "Plant seeds",
               "Sell eggs",
               "Sell milk"*/
        | {action: PickUp(Egg)} => [|
            wateredCorn,
            plantSeed,
            1,
            pickUpMilk,
            emptyWaterTank,
            emptyFoodTank,
            cleanup,
          |]
        | {state: WaterTank(Empty)} => [|
            wateredCorn,
            plantSeed,
            pickUpEggs,
            pickUpMilk,
            1,
            emptyFoodTank,
            cleanup,
          |]
        | {state: FoodTank(Empty)} => [|
            wateredCorn,
            plantSeed,
            pickUpEggs,
            pickUpMilk,
            emptyWaterTank,
            1,
            cleanup,
          |]
        | {action: Cleanup} => [|
            wateredCorn,
            plantSeed,
            pickUpEggs,
            pickUpMilk,
            emptyWaterTank,
            emptyFoodTank,
            1,
          |]
        | {action: PickUp(Milk), state: Cow(_)} => [|
            wateredCorn,
            plantSeed,
            pickUpEggs,
            1,
            emptyWaterTank,
            emptyFoodTank,
            cleanup,
          |]
        | {state: Corn(0), action: NoAction} => [|
            wateredCorn,
            plantSeed + 1,
            pickUpEggs,
            pickUpMilk,
            emptyWaterTank,
            emptyFoodTank,
            cleanup,
          |]
        /* All the other corns */
        | {state: Corn(_), action: NoAction} => [|
            wateredCorn + 1,
            plantSeed,
            pickUpEggs,
            pickUpMilk,
            emptyWaterTank,
            emptyFoodTank,
            cleanup,
          |]
        | _ => acc
        }
      | _ => failwith("beeeeen 1")
      },
    [|0, 0, 0, 0, 0, 0, 0|],
    state.gameobjects,
  );

let day8Stats = state =>
  List.fold_left(
    (acc, o: gameobjectT) =>
      switch (o) {
      | {state: Boss({hunger})} when hunger > 0 => [|1|]
      | _ => acc
      },
    [|0|],
    state.gameobjects,
  );

let lineHeight = 32;

let renderJournal = ({journal: {dayIndex, pageNumber}} as state, env) => {
  drawAssetFullscreen("journal_page.png", state, env);
  Draw.pushStyle(env);
  Draw.tint(Utils.color(~r=0, ~g=0, ~b=0, ~a=255), env);
  if (dayIndex === 0 && pageNumber === 0) {
    ();
  } else {
    let date = dayIndex + 14;
    let th =
      if (date === 21) {
        "st";
      } else if (date === 22) {
        "nd";
      } else {
        "th";
      };
    let title = "July " ++ string_of_int(date) ++ th;
    Draw.text(~body=title, ~font=state.mainFont, ~pos=(55, 60), env);
    let w = Draw.textWidth(~body=title, ~font=state.mainFont, env);
    Draw.fill(Utils.color(0, 0, 0, 255), env);
    Draw.rect(~pos=(55, 60), ~width=w, ~height=2, env);
  };
  let currentEntry = Story.entries[dayIndex];
  {
    let (body, x1, y1, w1, h1) = getForwardButton(state, env);
    let (mx, my) = Env.mouse(env);
    if (mx > x1 && mx < x1 + w1 && my > y1 && my < y1 + h1) {
      Draw.fill(Utils.color(~r=170, ~g=138, ~b=107, ~a=255), env);
      Draw.rect(~pos=(x1, y1), ~width=w1, ~height=h1, env);
    };
    Draw.text(~body, ~font=state.mainFont, ~pos=(x1 + 12, y1 + 30), env);
  };
  {
    let (body, x1, y1, w1, h1) = getBackButton(state, env);
    let (mx, my) = Env.mouse(env);
    if (mx > x1 && mx < x1 + w1 && my > y1 && my < y1 + h1) {
      Draw.fill(Utils.color(~r=170, ~g=138, ~b=107, ~a=255), env);
      Draw.rect(~pos=(x1, y1), ~width=w1, ~height=h1, env);
    };
    Draw.text(~body, ~font=state.mainFont, ~pos=(x1 + 12, y1 + 30), env);
  };
  if (pageNumber === Array.length(currentEntry.pages)) {
    Draw.text(
      ~body="Todo list:",
      ~font=state.mainFont,
      ~pos=(55, 60 + lineHeight * 2),
      env,
    );
    let stats =
      if (dayIndex === 0) {
        day1Stats(state);
      } else if (dayIndex === 1) {
        day2Stats(state);
      } else if (dayIndex === 2) {
        day3Stats(state);
      } else if (dayIndex === 3) {
        day4Stats(state);
      } else if (dayIndex === 4) {
        day5Stats(state);
      } else if (dayIndex === 5) {
        day6Stats(state);
      } else if (dayIndex === 6) {
        day7Stats(state);
      } else if (dayIndex === 7) {
        day8Stats(state);
      } else {
        [||];
      };
    ignore @@
    Array.fold_left(
      (i, task) => {
        let y = 110 + i * lineHeight + 2 * lineHeight;
        let (checkbox, line) =
          switch (task) {
          | Story.Bool(line) =>
            let stat = stats[i];
            let checkbox =
              if (stat === 0) {
                "[X]";
              } else {
                "[ ]";
              };
            (checkbox, line);
          | Story.Count(line, c) =>
            let stat = stats[i];
            let checkbox =
              if (stat >= c) {
                "[X]";
              } else {
                string_of_int(stat) ++ " / " ++ string_of_int(c);
              };
            (checkbox, line);
          | LockMonsterIn =>
            let stat = stats[i];
            if (state.day6PlayerWentInBarn) {
              (stat === 1 ? "[X]" : "[ ]", "Lock monster in barn");
            } else {
              (stat === 1 ? "[X]" : "[ ]", "Investigate noise from the barn");
            };
          };
        Draw.text(~body=checkbox, ~font=state.mainFont, ~pos=(55, y), env);
        Draw.text(~body=line, ~font=state.mainFont, ~pos=(120, y), env);
        i + 1;
      },
      0,
      currentEntry.tasks,
    );
  } else {
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
        y + lineHeight;
      },
      110,
      currentEntry.pages[pageNumber],
    );
  };
  Draw.popStyle(env);
};

let renderTransition = (state, env) =>
  switch (state) {
  | {journal: {dayTransition: FadeOut, animationTime}} =>
    Draw.fill(
      Utils.color(
        ~r=state.playerDead ? 255 : 0,
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
        /*} else if (dayTransition == JournalIn
                   && (Env.keyPressed(Space, env) || Env.keyPressed(X, env))) {
          {
            ...state,
            journal: {
              ...state.journal,
              dayTransition: JournalOut,
              animationTime: 0.,
            },
          };*/
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
    switch (day1Stats(state)) {
    | [|pickUpEggs, pickUpMilk, emptyWaterTank, cornNoAction, plantSeed|] =>
      pickUpEggs === 0
      && pickUpMilk === 0
      && emptyWaterTank === 0
      && cornNoAction >= 2
      && plantSeed >= 1
    | _ => failwith("beeeen")
    };
  } else if (state.journal.dayIndex === 1) {
    switch (day2Stats(state)) {
    | [|emptyWaterTank, emptyFoodTank, cleanup|] =>
      emptyWaterTank === 0 && emptyFoodTank === 0 && cleanup === 0
    | _ => failwith("bennn")
    /*"Water animals",
      "Harvest corn", ----> because you're told to throw it out
      "Feed animals",
      "Clean poop"
      */
    /*List.for_all(
        (o: gameobjectT) =>
          switch (o) {
          | {state: WaterTank(Empty)}
          | {state: FoodTank(Empty)}
          | {action: PickUp(Corn)}
          | {action: Cleanup} => false
          | _ => true
          },
        state.gameobjects,
      );*/
    };
  } else if (state.journal.dayIndex === 2) {
    switch (day3Stats(state)) {
    | [|brokenBarnDoor|] => brokenBarnDoor === 0
    | _ => failwith("Bennnnasd")
    /*!
      List.exists(
        o =>
          switch (o) {
          | {state: BarnDoor(Broken)} => true
          | _ => false
          },
        state.gameobjects,
      );*/
    /*    "Tasks",
          "",
          "Fix the barn",
          "Make sure you can open and close the barn door"
          */
    };
  } else if (state.journal.dayIndex === 3) {
    switch (day4Stats(state)) {
    | [|_, cleanupBlood|] => cleanupBlood === 0
    | _ => failwith("NOoooo")
    /*"Tasks",
      "",
      "There was some noise in the barn last night.",
      "Investigate the barn",
      "Clean up any mess that's in the barn"*/
    };
  } else if (state.journal.dayIndex === 4) {
    /*    "Tasks",
          "",
          "Find Maria's grave",
          "Mourn"
          */
    switch (day5Stats(state)) {
    | [|inspectTombstone, flowerTombstone|] =>
      inspectTombstone === 0 && flowerTombstone === 0
    | _ => failwith("Bennknkjj")
    };
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
    switch (day6Stats(state)) {
    | [|areYouDoneOrNot|] => areYouDoneOrNot === 1
    | _ => failwith("lkjasdkj")
    };
  } else if (state.journal.dayIndex === 6) {
    switch (day7Stats(state)) {
    /*Count("Water corn", 3),
      Count("Plant seeds", 1),
      Bool("Sell eggs"),
      Bool("Sell milk"),
      Bool("Fill water trough"),
      Bool("Feed animals"),
      Bool("Wash away manure"),*/
    | [|
        wateredCorn,
        plantSeed,
        pickUpEggs,
        pickUpMilk,
        emptyWaterTank,
        emptyFoodTank,
        cleanup,
      |] =>
      wateredCorn >= 3
      && plantSeed >= 1
      && pickUpEggs === 0
      && pickUpMilk === 0
      && emptyWaterTank === 0
      && emptyFoodTank === 0
      && cleanup === 0
    | _ => failwith("fuck we're runn ing out of time")
    };
  } else if (state.journal.dayIndex === 7) {
    switch (day8Stats(state)) {
    | [|bossWithHunger|] => bossWithHunger === 0
    | _ => failwith("gosh darn ben")
    };
  } else {
    false;
  };
