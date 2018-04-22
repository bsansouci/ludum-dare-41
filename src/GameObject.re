open Reprocessing;

open Common;

let init = (grid) => {
  let (_, gameobjects) =
    Array.fold_left(
      ((x, gameobjects), col) => {
        let (_, gameobjects) =
          Array.fold_left(
            ((y, gameobjects), tile) =>
              switch (tile) {
                | Dirt => (
                  y + 1,
                  [
                    x != 13 ?
                      {
                        pos: posMake(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2),
                        action: WaterCorn,
                        state: Corn({stage: 1, isWatered: false})
                      } :
                      {
                        pos: posMake(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2),
                        action: PickUp(Corn),
                        state: NoState
                      },
                    ...gameobjects
                  ]
                )
                | Water =>
                  (y + 1, [{
                    pos: posMake(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2),
                    action: PickUp(Water),
                    state: NoState
                  }, ...gameobjects])
                | _ => (y + 1, gameobjects)
              },
            (0, gameobjects),
            col
          );
        (x + 1, gameobjects)
      },
      (0, []),
      grid
    );
  let gameobjects = [
    {pos: {x: 4. *. tileSizef, y: 12. *. tileSizef}, action: MilkCow, state: Cow(HasMilk)},
    {pos: {x: 8. *. tileSizef, y: 13. *. tileSizef}, action: NoAction, state: Chicken},
    ...gameobjects
  ];
  gameobjects
};

let updateDaily = (state) => state;

let maybeHighlight = (state, g, focusedObject, env) =>
  switch focusedObject {
  | Some(fgo) when fgo === g =>
    switch (state.currentItem, fgo.action) {
    | (Some(Water), WaterCorn)
    | (None, PickUp(Corn))
    | (None, PickUp(Egg))
    | (None, PickUp(Seed))
    | (None, PickUp(Water))
    | (None, Cleanup) => Draw.tint(Utils.color(~r=0, ~g=0, ~b=0, ~a=255), env)
    | _ => ()
    }
  | _ => ()
  };

let update = (state, env) =>
  {...state, gameobjects: List.map(
      (g: gameobjectT) => g, state.gameobjects)};

let render = (state, focusedObject, env) =>
  List.iter(
    (g: gameobjectT) =>
      switch g {
      | {pos: {x, y}, action: PickUp(Corn)} =>
        /* Don't highlight when there's no action */
        Draw.pushStyle(env);
        maybeHighlight(state, g, focusedObject, env);
        drawAssetf(
          x -. tileSizef /. 2.,
          y -. tileSizef /. 2.,
          "stage_five_le_ble_d_inde.png",
          state,
          env
        );
        Draw.popStyle(env);
      | {pos: {x, y}, action: MilkCow, state: Cow(NoMilk)}
      | {pos: {x, y}, action: MilkCow, state: Cow(HasMilk)} =>
        drawAssetf(
          x -. tileSizef /. 2.,
          y -. tileSizef /. 2.,
          "pile_of_bacon.png",
          state,
          env
        );
      | {pos: {x, y}, action: NoAction, state: Chicken} =>
        drawAssetf(
          x -. tileSizef /. 2.,
          y -. tileSizef /. 2.,
          "bet_he_would_make_some_nice_fried_chicken.png",
          state,
          env
        );
      | {pos: {x, y}, action, state: Corn({stage, isWatered})} =>
        Draw.pushStyle(env);
        maybeHighlight(state, g, focusedObject, env);
        if (isWatered) {
          Draw.fill(Utils.color(~r=190, ~g=190, ~b=60, ~a=255), env);
          Draw.rectf(
            ~pos=(x -. tileSizef /. 2., y -. tileSizef /. 2.),
            ~width=tileSizef,
            ~height=tileSizef,
            env
          )
        };
        let assetName =
          if (stage === 0) {
            "stage_zero_corn_fetus.png"
          } else if (stage === 1) {
            "stage_one_corn_toddler.png"
          } else if (stage === 2) {
            "stage_two_korn.png"
          } else if (stage === 3) {
            "stage_three_middle_aged_corn.png"
          } else if (stage === 4) {
            "stage_four_almost_corn.png"
          } else if (stage === 5) {
            "stage_five_le_ble_d_inde.png"
          } else {
            failwith("There is no other stage you fuck.")
          };
        drawAssetf(x -. tileSizef /. 2., y -. tileSizef /. 2., assetName, state, env);
        Draw.popStyle(env);
      | {pos: {x, y}, action: PickUp(Water)} =>
        Draw.pushStyle(env);
        maybeHighlight(state, g, focusedObject, env);
        Draw.fill(Utils.color(~r=0, ~g=10, ~b=250, ~a=255), env);
        Draw.rectf(
          ~pos=(x -. tileSizef /. 2., y -. tileSizef /. 2.),
          ~width=tileSizef,
          ~height=tileSizef,
          env
        );
        Draw.popStyle(env);
      | _ => ()
      },
    state.gameobjects
  );

let renderAction = (state, focusedObject, env) => {
  let body = switch (state.currentItem, focusedObject) {
  | (None, Some({action: PickUp(Corn)})) => "Pickup corn"
  | (None, Some({action: PickUp(Water)})) => "Pickup water"
  | (None, Some({action: PickUp(Egg)})) => "Pickup egg"
  | (None, Some({action: PickUp(Milk)})) => "Milk cow"
  | (Some(_), Some({action: PickUp(Water)})) => "Drop into water"
  | (Some(Water), Some({action: WaterCorn})) => "Water corn"
  | _ => ""
  };
  if (body != "") {
    Draw.fill(
      Utils.color(
        ~r=255,
        ~g=255,
        ~b=255,
        ~a=255
      ),
      env
    );
    let padding = 16;
    let width = Draw.textWidth(~body, env);
    Draw.rect(~pos=(0, 0), ~width=width + padding * 2, ~height=70, env);
    Draw.text(~body, ~pos=(padding, 20), env)
  };
};

let checkPickUp = (state, focusedObject, env) =>
    if (Env.keyPressed(X, env) || Env.keyPressed(Space, env)) {
  switch (state.currentItem, focusedObject) {
  | (None, Some({action: PickUp(Corn)} as go)) =>
      (
        {
          ...state,
          currentItem: Some(Corn),
          gameobjects: List.filter((g) => g !== go, state.gameobjects)
        },
        None
      )
  | (None, Some({action: PickUp(Water)} as go)) =>
      (
        {
          ...state,
          currentItem: Some(Water),
        },
        None
      )
  | (None, Some({action: PickUp(Seed)} as go)) =>
      (
        {
          ...state,
          currentItem: Some(Seed),
        },
        None
      )
  | (Some(water), Some({action: PickUp(Water)})) =>
      ({
        ...state,
        currentItem: None
      }, focusedObject)
  | (Some(Water), Some({action: WaterCorn, state: Corn({stage})} as go)) =>
      (
        {
          ...state,
          currentItem: None,
          gameobjects:
            List.map(
              (g) =>
                if (g !== go) {
                  g
                } else {
                  {...g, action: NoAction, state: Corn({stage, isWatered: true})}
                },
              state.gameobjects
            )
        },
        None
      )
  | _ => (state, focusedObject)
}
} else {
  (state, focusedObject)
};
