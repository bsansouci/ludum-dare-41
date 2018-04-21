open Reprocessing;

open Common;

let render = (state, focusedObject, env) =>
  List.iter(
    (g: gameobjectT) =>
      switch g {
      | {pos: {x, y}, action: PickUp(Corn)} =>
        switch focusedObject {
        | Some(fgo) when fgo === g => Draw.tint(Utils.color(~r=10, ~g=255, ~b=0, ~a=255), env)
        | None => ()
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
      | _ => ()
      },
    state.gameobjects
  );
