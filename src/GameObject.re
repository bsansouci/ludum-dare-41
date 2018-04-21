open Reprocessing;

open Common;

let init = (grid) => {
  let (_, gameobjects) =
    Array.fold_left(
      ((x, gameobjects), col) => {
        let (_, gameobjects) =
          Array.fold_left(
            ((y, gameobjects), tile) =>
              if (tile == Dirt) {
                (
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
              } else {
                (y + 1, gameobjects)
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
    {pos: {x: 10. *. tileSizef, y: 6. *. tileSizef}, action: PickUp(Water), state: NoState},
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
    | (None, PickUp(Seed))
    | (None, PickUp(Water))
    | (None, Cleanup) => Draw.tint(Utils.color(~r=0, ~g=0, ~b=0, ~a=255), env)
    | _ => ()
    }
  | _ => ()
  };

let render = (state, focusedObject, env) =>
  List.iter(
    (g: gameobjectT) =>
      switch g {
      | {pos: {x, y}, action: PickUp(Corn)} =>
        /* Don't highlight when there's no action */
        maybeHighlight(state, g, focusedObject, env);
        drawAssetf(
          x -. tileSizef /. 2.,
          y -. tileSizef /. 2.,
          "stage_five_le_ble_d_inde.png",
          state,
          env
        );
        Draw.tint(Constants.white, env)
      | {pos: {x, y}, action, state: Corn({stage, isWatered})} =>
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
          } else if (stage === 4) {
            "stage_five_le_ble_d_inde.png"
          } else {
            failwith("There is no other stage you fuck.")
          };
        drawAssetf(x -. tileSizef /. 2., y -. tileSizef /. 2., assetName, state, env);
        Draw.tint(Constants.white, env)
      | {pos: {x, y}, action: PickUp(Water)} =>
        maybeHighlight(state, g, focusedObject, env);
        Draw.fill(Utils.color(~r=0, ~g=10, ~b=250, ~a=255), env);
        Draw.rectf(
          ~pos=(x -. tileSizef /. 2., y -. tileSizef /. 2.),
          ~width=tileSizef,
          ~height=tileSizef,
          env
        )
      | _ => ()
      },
    state.gameobjects
  );

let renderAction = (state, focusedObject, env) =>
  switch (state.currentItem, focusedObject) {
  | (None, Some({action: PickUp(Corn)})) => Draw.text(~body="Pick corn", ~pos=(20, 20), env)
  | (None, Some({action: PickUp(Water)})) => Draw.text(~body="Pick water", ~pos=(20, 20), env)
  | (Some(Water), Some({action: WaterCorn})) => Draw.text(~body="Water corn", ~pos=(20, 20), env)
  | _ => ()
  };

let checkPickUp = (state, focusedObject, env) =>
  switch (state.currentItem, focusedObject) {
  | (None, Some({action: PickUp(pickable)} as go)) =>
    if (Env.keyPressed(X, env)) {
      (
        {
          ...state,
          currentItem: Some(pickable),
          gameobjects: List.filter((g) => g !== go, state.gameobjects)
        },
        None
      )
    } else {
      (state, focusedObject)
    }
  | (Some(Water), Some({action: WaterCorn, state: Corn({stage})} as go)) =>
    if (Env.keyPressed(X, env)) {
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
    } else {
      (state, focusedObject)
    }
  | _ => (state, focusedObject)
  };
