open Reprocessing;

open Common;

let mapString = {|
3333333333333333333333
3333333333333333333333
3333333333333333333333
3444444430000000000333
3444444430001111100333
3444444430001111100333
3444444430001111100333
3444444430000000000333
3444444430000000000333
3334443332222200222200
2000000000000000000200
2000000000000000000200
2000000000000000000200
2000000000000000000200
2222222222222222222200
0000000000000000000000
0000000000000000000000
|};

let createGrid = (s) => {
  let s = String.trim(s);
  let strs = Utils.split(s, ~sep='\n');
  let width = String.length(List.nth(strs, 0));
  let height = List.length(strs);
  let m = Array.make_matrix(width, height, Grass);
  List.iteri(
    (y, s) =>
      String.iteri(
        (x, c) =>
          m[x][y] = (
            switch c {
            | '0' => Grass
            | '1' => Dirt
            | '2' => Fence
            | '3' => Blocked
            | '4' => Floor
            | _ => Blocked
            }
          ),
        s
      ),
    strs
  );
  m
};

let handleCollision = (prevOffset, offset, state) => {
  let l = [
    (0, 0),
    (1, 1),
    ((-1), (-1)),
    ((-1), 1),
    ((-1), 0),
    (0, (-1)),
    (1, (-1)),
    (1, 0),
    (0, 1)
  ];
  let collided =
    List.exists(
      ((dx, dy)) => {
        let padding = 8.;
        let tx = dx + int_of_float((offset.x +. state.playerPos.x) /. tileSizef);
        let ty = dy + int_of_float((offset.y +. state.playerPos.y) /. tileSizef);
        if (tx >= Array.length(state.grid) || tx < 0 || ty > Array.length(state.grid[0]) || ty < 0) {
          true
        } else {
          switch state.grid[tx][ty] {
          | Blocked
          | Fence =>
            Utils.intersectRectRect(
              ~rect1Pos=(
                state.playerPos.x +. offset.x +. padding,
                state.playerPos.y +. offset.y +. padding
              ),
              ~rect1W=tileSizef -. padding -. padding,
              ~rect1H=tileSizef -. padding -. padding,
              ~rect2Pos=(float_of_int(tx * tileSize), float_of_int(ty * tileSize)),
              ~rect2W=tileSizef,
              ~rect2H=tileSizef
            )
          | _ => false
          }
        }
      },
      l
    );
  if (collided) {prevOffset} else {offset}
};

let setup = (assets, env) => {
  Env.size(~width=600, ~height=600, env);
  let grid = createGrid(mapString);
  {
    grid,
    plants: Array.make_matrix(4, 6, 0),
    playerPos: {x: 64. *. 10. +. 1., y: 64. *. 5. +. 1.},
    playerFacing: RightD,
    spritesheet: Draw.loadImage(~isPixel=true, ~filename="spritesheet/assets.png", env),
    assets,
    gameobjects: GameObject.init(grid),
    currentItem: None,
    dayIndex: 1,
    journal: [||]
  }
};

let draw = (state, env) => {
  Draw.background(Utils.color(~r=199, ~g=217, ~b=229, ~a=255), env);
  let dt = Env.deltaTime(env);
  let playerSpeedDt = playerSpeed *. dt;
  let offset = {x: 0., y: 0.};
  let offset =
    Env.key(Left, env) || Env.key(A, env) ?
      handleCollision(offset, {...offset, x: -. playerSpeedDt}, state) : offset;
  let offset =
    Env.key(Right, env) || Env.key(D, env) ?
      handleCollision(offset, {...offset, x: playerSpeedDt}, state) : offset;
  let offset =
    Env.key(Up, env) || Env.key(W, env) ?
      handleCollision(offset, {...offset, y: -. playerSpeedDt}, state) : offset;
  let offset =
    Env.key(Down, env) || Env.key(S, env) ?
      handleCollision(offset, {...offset, y: playerSpeedDt}, state) : offset;
  let mag = Utils.magf((offset.x, offset.y));
  let state =
    if (mag > 0.) {
      let dx = offset.x /. mag *. playerSpeedDt;
      let dy = offset.y /. mag *. playerSpeedDt;
      {...state, playerPos: {x: state.playerPos.x +. dx, y: state.playerPos.y +. dy}}
    } else {
      state
    };
  let facing = state.playerFacing;
  let facing = Env.key(Left, env) || Env.key(A, env) ? LeftD : facing;
  let facing = Env.key(Right, env) || Env.key(D, env) ? RightD : facing;
  let facing = Env.key(Up, env) || Env.key(W, env) ? UpD : facing;
  let facing = Env.key(Down, env) || Env.key(S, env) ? DownD : facing;
  let state = {...state, playerFacing: facing};
  let facingOffset = facingToOffset(facing);

  let focusedObject =
    List.fold_left(
      (foundobject, gameobject: gameobjectT) => {
        let d =
          Utils.distf(
            ~p1=(gameobject.pos.x, gameobject.pos.y),
            ~p2=(
              state.playerPos.x +. facingOffset.x *. tileSizef +. tileSizef /. 2.,
              state.playerPos.y +. facingOffset.y *. tileSizef +. tileSizef /. 2.
            )
          );
        switch foundobject {
        | None when d < tileSizef /. 2. => Some((d, gameobject))
        | Some((d2, _)) when d2 < d => foundobject
        | Some((d2, _)) => Some((d, gameobject))
        | None => None
        }
      },
      None,
      state.gameobjects
    );
  let focusedObject =
    switch focusedObject {
    | None => None
    | Some((_, fgo)) => Some(fgo)
    };
  let (state, focusedObject) =
    switch focusedObject {
    | Some({action: PickUp(Corn)} as go) =>
      if (Env.keyPressed(X, env)) {
        (
          {
            ...state,
            currentItem: Some(Corn),
            gameobjects: List.filter((g) => g !== go, state.gameobjects)
          },
          None
        )
      } else {
        (state, focusedObject)
      }
    | _ => (state, focusedObject)
    };
  switch focusedObject {
  | Some({action: PickUp(Corn)}) => Draw.text(~body="Pick corn", ~pos=(20, 20), env)
  | _ => ()
  };
  Draw.pushMatrix(env);
  Draw.translate(
    -. state.playerPos.x +. screenSize /. 2.,
    -. state.playerPos.y +. screenSize /. 2.,
    env
  );
  Array.iteri(
    (x, row) =>
      Array.iteri(
        (y, tile) =>
          switch tile {
          | Dirt =>
            Draw.fill(Utils.color(~r=180, ~g=180, ~b=100, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env)
          | Grass =>
            Draw.fill(Utils.color(~r=20, ~g=180, ~b=50, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env)
          | Floor =>
            Draw.fill(Utils.color(~r=200, ~g=180, ~b=200, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env)
          | Fence =>
            Draw.fill(Utils.color(~r=20, ~g=180, ~b=50, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env);
            drawAsset(x * tileSize, y * tileSize, "keep_the_dogs_out.png", state, env)
          | Blocked =>
            Draw.fill(Utils.color(~r=255, ~g=10, ~b=10, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env)
          },
        row
      ),
    state.grid
  );
  /* @Todo sort player and gameobjects */
  GameObject.render(state, focusedObject, env);
  {
    let imgName =
      switch (
        state.playerFacing,
        anyKey([Up, Down, Right, Left, W, A, S, D], env),
        state.currentItem == None
      ) {
      | (RightD, _, _) => "old_macdonald_right_face.png"
      | (UpD, _, _) => "old_macdonald_back_face.png"
      | (DownD, _, _) => "old_macdonald_front_face.png"
      | (LeftD, _, _) => "old_macdonald_left_face.png"
      };
    drawAssetf(state.playerPos.x, state.playerPos.y, imgName, state, env)
  };
  if (debug) {
    /* List.iter( */
    /*   (g: gameobjectT) => { */
    /*     Draw.fill(Utils.color(~r=10, ~g=10, ~b=10, ~a=255), env); */
    /*     Draw.rectf(~pos=(g.pos.x, g.pos.y), ~width=5., ~height=5., env) */
    /*   }, */
    /*   state.gameobjects */
    /* ); */
    Draw.fill(Utils.color(~r=10, ~g=10, ~b=10, ~a=255), env);
    Draw.rectf(
      ~pos=(
        state.playerPos.x +. facingOffset.x *. tileSizef +. tileSizef /. 2.,
        state.playerPos.y +. facingOffset.y *. tileSizef +. tileSizef /. 2.
      ),
      ~width=5.,
      ~height=5.,
      env
    )
  };
  Draw.popMatrix(env);
  state
};

let loadAssetsAsync = (filename) =>
  Reasongl.Gl.File.readFile(
    filename,
    (jsonString) => {
      open Json.Infix;
      let json = Json.parse(jsonString);
      let things = Json.get("frames", json) |?> Json.array |! "error";
      let assets =
        List.fold_left(
          (assets, thing) => {
            let frame = Json.get("frame", thing) |! "error";
            let x = Json.get("x", frame) |?> Json.number |! "error";
            let y = Json.get("y", frame) |?> Json.number |! "error";
            let w = Json.get("w", frame) |?> Json.number |! "error";
            let h = Json.get("h", frame) |?> Json.number |! "error";
            StringMap.add(
              Json.get("filename", thing) |?> Json.string |! "error",
              {pos: {x, y}, size: {x: w, y: h}},
              assets
            )
          },
          StringMap.empty,
          things
        );
      run(~setup=setup(assets), ~draw, ())
    }
  );

loadAssetsAsync("spritesheet/sheet.json");
