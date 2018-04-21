open Reprocessing;

open Common;

let fadeTimeMs = 1500.;

let init = () => {
  dayIndex: 1,
  journalEntries: [|
    "I was happy today. I woke up to the early morning crow of the Rooster today. I had lots to do. I cleaned up the cow's manure, used it to fertilize the soil, planted seeds in the last patches of dirt available, watered the beautiful growing corn and gave water to my domestic companions."
  |],
  dayTransition: NoTransition,
  animationTime: 0.
};

let updateDay = (state) =>
  switch state {
  | {gameobjects, journal: {dayTransition: NoTransition}} =>
    let allDone = List.for_all((o: gameobjectT) => o.action == NoAction, gameobjects);
    if (allDone) {
      {...state, journal: {...state.journal, dayTransition: FadeOut, animationTime: 0.}}
    } else {
      state
    }
  | {journal: {dayTransition: FadeOut, animationTime}} when animationTime > fadeTimeMs =>
    /* @Todo Generate new day here */
    {...state, journal: {...state.journal, dayTransition: FadeIn, animationTime: 0.}}
  | _ => state
  };

let render = (state, env) =>
  switch state {
  | {journal: {dayTransition: FadeOut, animationTime}} =>
    Draw.fill(
      Utils.color(~r=0, ~g=0, ~b=0, ~a=int_of_float(Utils.lerpf(0., fadeTimeMs, animationTime))),
      env
    );
    Draw.rect(~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);
    state
  | {journal: {dayTransition: FadeIn, animationTime}} =>
    Draw.fill(
      Utils.color(~r=0, ~g=0, ~b=0, ~a=int_of_float(Utils.lerpf(fadeTimeMs, 0., animationTime))),
      env
    );
    Draw.rect(~pos=(0, 0), ~width=Env.width(env), ~height=Env.height(env), env);
    state
  | _ => state
  };
