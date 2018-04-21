open Reprocessing;

open Common;

let fadeTimeSec = 1.5;

let init = (env) => {
  dayIndex: 1,
  journalEntries: [|
    [|
      "I was happy today. I woke up to the",
      "early morning crow of the Rooster today.",
      "I had lots to do. I cleaned up the cow's",
      "manure, used it to fertilize the soil, ",
      "planted seeds in the last patches of ",
      "dirt available, watered the beautiful ",
      "growing corn and gave water to my ",
      "domestic companions."
    |]
  |],
  dayTransition: NoTransition,
  animationTime: 0.,
  backgroundImage: Draw.loadImage(~filename="assets/journal_background.png", ~isPixel=false, env)
};

let updateDay = (state, env) =>
  switch state {
  | {gameobjects, journal: {dayTransition: NoTransition}} =>
    let allDone =
      if (debug && Env.keyPressed(P, env)) {
        true
      } else {
        List.for_all(
          (o: gameobjectT) =>
            /* Check for everything that needs to be done for the next day to happen. */
            switch o {
            | {action: PickUp(Egg)}
            | {action: PickUp(Corn)}
            | {state: WaterTank(HalfFull)}
            | {state: WaterTank(Empty)}
            | {state: Cow(HasMilk)}
            | {state: Corn({isWatered: false})} => false
            | _ => true
            },
          gameobjects
        )
      };
    if (allDone) {
      {...state, journal: {...state.journal, dayTransition: FadeOut, animationTime: 0.}}
    } else {
      state
    }
  | {journal: {dayTransition: FadeOut, animationTime, dayIndex}} when animationTime > fadeTimeSec =>
    /* @Todo Generate new day here */
    let gameobjects =
      List.map(
        (go: gameobjectT) => {
          let state =
            switch go.state {
            | Corn({stage: 5}) => Corn({isWatered: true, stage: 5})
            | Corn({stage}) => Corn({isWatered: false, stage: stage + 1})
            | _ => go.state
            };
          let action =
            switch go.state {
            | Corn({stage: 5}) => PickUp(Corn)
            | _ => go.action
            };
          {...go, state, action}
        },
        state.gameobjects
      );
    {
      ...state,
      journal: {
        ...state.journal,
        dayTransition: Journal,
        animationTime: 0.,
        dayIndex: dayIndex + 1
      },
      gameobjects
    }
  | {journal: {dayTransition: FadeIn, animationTime}} when animationTime > fadeTimeSec => {
      ...state,
      journal: {...state.journal, dayTransition: NoTransition, animationTime: 0.}
    }
  | _ => state
  };

let renderTransition = (state, deltaTime, env) =>
  switch state {
  | {journal: {dayTransition: FadeOut, animationTime}} =>
    Draw.fill(
      Utils.color(
        ~r=0,
        ~g=0,
        ~b=0,
        ~a=int_of_float(Utils.remapf(animationTime, 0., fadeTimeSec, 0., 255.))
      ),
      env
    );
    Draw.rect(~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);
    {...state, journal: {...state.journal, animationTime: animationTime +. deltaTime}}
  | {journal: {dayTransition: FadeIn, animationTime, dayIndex, backgroundImage}} =>
    Draw.pushStyle(env);
    Draw.tint(
      Utils.color(
        ~r=255,
        ~g=255,
        ~b=255,
        ~a=int_of_float(Utils.remapf(animationTime, 0., fadeTimeSec, 255., 0.))
      ),
      env
    );
    Draw.image(backgroundImage, ~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);
    Draw.text(~body="Day " ++ string_of_int(dayIndex), ~pos=(16, 40), env);
    ignore @@
    Array.fold_left(
      (y, line) => {
        Draw.text(~body=line, ~pos=(16, y), env);
        y + 32
      },
      100,
      state.journal.journalEntries[0]
    );
    Draw.popStyle(env);
    /*Draw.fill(
        Utils.color(
          ~r=0,
          ~g=0,
          ~b=0,
          ~a=int_of_float(Utils.remapf(animationTime, 0., fadeTimeSec, 255., 0.))
        ),
        env
      );
      Draw.rect(~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);*/
    {...state, journal: {...state.journal, animationTime: animationTime +. deltaTime}}
  | {journal: {dayTransition: Journal, dayIndex, backgroundImage}} =>
    Draw.image(backgroundImage, ~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);
    Draw.text(~body="Day " ++ string_of_int(dayIndex), ~pos=(16, 40), env);
    ignore @@
    Array.fold_left(
      (y, line) => {
        Draw.text(~body=line, ~pos=(16, y), env);
        y + 32
      },
      100,
      state.journal.journalEntries[0]
    );
    if (Env.keyPressed(Space, env)) {
      {...state, journal: {...state.journal, dayTransition: FadeIn, animationTime: 0.}}
    } else {
      state
    }
  /*{...state, journal: {...state.journal}}*/
  | _ => state
  };
