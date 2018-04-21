open Reprocessing;

open Common;

let fadeTimeSec = 1.5;

let init = () => {
  dayIndex: 1,
  journalEntries: [|
    "I was happy today. I woke up to the early morning crow of the Rooster today. I had lots to do. I cleaned up the cow's manure, used it to fertilize the soil, planted seeds in the last patches of dirt available, watered the beautiful growing corn and gave water to my domestic companions."
  |],
  dayTransition: NoTransition,
  animationTime: 0.
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
    {
      ...state,
      journal: {...state.journal, dayTransition: Journal, animationTime: 0., dayIndex: dayIndex + 1}
    }
    /*{
      ...state,
      journal: {...state.journal, dayTransition: FadeIn, animationTime: 0., dayIndex: dayIndex + 1}
    }*/
  | _ => state
  };

let renderTransition = (state, deltaTime, env) =>
  switch state {
  | {journal: {dayTransition: FadeOut, animationTime}} =>
    Draw.fill(
      Utils.color(~r=0, ~g=0, ~b=0, ~a=int_of_float(Utils.remapf(animationTime, 0., fadeTimeSec, 0., 255.))),
      env
    );
    Draw.rect(~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);
    {...state, journal: {...state.journal, animationTime: animationTime +. deltaTime}}
  | {journal: {dayTransition: FadeIn, animationTime}} =>
    Draw.fill(
      Utils.color(~r=0, ~g=0, ~b=0, ~a=int_of_float(Utils.remapf(animationTime, 0., fadeTimeSec, 255., 0.))),
      env
    );
    Draw.rect(~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);
    {...state, journal: {...state.journal, animationTime: animationTime +. deltaTime}}
  | {journal: {dayTransition: Journal}} =>
    Draw.fill(
      Utils.color(~r=180, ~g=180, ~b=80, ~a=255),
      env
    );
    Draw.rect(~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);
    Draw.text(~body=state.journal.journalEntries[0], ~pos=(100, 100), env);
    if (Env.keyPressed(Space, env)) {
      {...state, journal: {...state.journal, dayTransition: FadeIn, animationTime: 0.}}
    } else {
      state
    }
    /*{...state, journal: {...state.journal}}*/
  | _ => state
  };
