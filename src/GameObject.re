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
                    {
                      pos: posMake(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2),
                      action: WaterCorn,
                      state: Corn({stage: 1, isWatered: false})
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
  let gameobjects = [{
      pos: {x: 10. *. tileSizef, y: 6. *. tileSizef},
      action: PickUp(Water),
      state: NoState
    }, ...gameobjects];
  gameobjects
};

let updateDaily = (state) => state;

let render = (state, focusedObject, env) => {
  List.iter(
    (g: gameobjectT) =>
      switch g {
      | {pos: {x, y}, action: PickUp(Corn)} =>
        /* Don't highlight when there's no action */
        switch focusedObject {
        | Some(fgo) when fgo === g => Draw.tint(Utils.color(~r=10, ~g=255, ~b=0, ~a=255), env)
        | _ => ()
        };
        drawAssetf(
          x -. tileSizef /. 2.,
          y -. tileSizef /. 2.,
          "stage_five_le_ble_d_inde.png",
          state,
          env
        );
        Draw.tint(Constants.white, env)
      | {pos: {x, y}, action: WaterCorn} =>
        switch focusedObject {
        | Some(fgo) when fgo === g => Draw.tint(Utils.color(~r=10, ~g=255, ~b=0, ~a=255), env)
        | _ => ()
        };
        drawAssetf(
          x -. tileSizef /. 2.,
          y -. tileSizef /. 2.,
          "stage_zero_corn_fetus.png",
          state,
          env
        );
        Draw.tint(Constants.white, env)
      | _ => ()
      },
    state.gameobjects
  );
  switch (state.currentItem, focusedObject) {
  | (None, Some({action: PickUp(Corn)})) => Draw.text(~body="Pick corn", ~pos=(20, 20), env)
  | (None, Some({action: PickUp(Water)})) => Draw.text(~body="Pick water", ~pos=(20, 20), env)
  | (Some(Water), Some({action: WaterCorn})) => Draw.text(~body="Water corn", ~pos=(20, 20), env)
  | _ => ()
  }
};
