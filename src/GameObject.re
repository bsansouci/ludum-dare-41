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
                  [{pos: posMake(x * tileSize + tileSize / 2, y *  tileSize + tileSize / 2), action: WaterCorn}, ...gameobjects]
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
  gameobjects
};

let render = (state, focusedObject, env) =>
  List.iter(
    (g: gameobjectT) =>
      switch g {
      | {pos: {x, y}, action: PickUp(Corn)} =>
        switch focusedObject {
        | Some(fgo) when fgo === g => Draw.tint(Utils.color(~r=10, ~g=255, ~b=0, ~a=255), env)
        | _ => ()
        };
        let corn = StringMap.find("stage_five_le_ble_d_inde.png", state.assets);
        Draw.subImage(
          state.spritesheet,
          ~pos=(int_of_float(x -. tileSizef /. 2.), int_of_float(y -. tileSizef /. 2.)),
          ~width=tileSize,
          ~height=tileSize,
          ~texPos=(int_of_float(corn.pos.x), int_of_float(corn.pos.y)),
          ~texWidth=int_of_float(corn.size.x),
          ~texHeight=int_of_float(corn.size.y),
          env
        );
        Draw.tint(Constants.white, env)
      | {pos: {x, y}, action: WaterCorn} =>
        switch focusedObject {
        | Some(fgo) when fgo === g => Draw.tint(Utils.color(~r=10, ~g=255, ~b=0, ~a=255), env)
        | _ => ()
        };
        let corn = StringMap.find("stage_zero_corn_fetus.png", state.assets);
        Draw.subImage(
          state.spritesheet,
          ~pos=(int_of_float(x -. tileSizef /. 2.), int_of_float(y -. tileSizef /. 2.)),
          ~width=tileSize,
          ~height=tileSize,
          ~texPos=(int_of_float(corn.pos.x), int_of_float(corn.pos.y)),
          ~texWidth=int_of_float(corn.size.x),
          ~texHeight=int_of_float(corn.size.y),
          env
        );
        Draw.tint(Constants.white, env)
      | _ => ()
      },
    state.gameobjects
  );
