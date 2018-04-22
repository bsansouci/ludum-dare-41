open Reprocessing;

open Common;

let mapString = {|
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
0000033333333xxxxxxxxxxxxxxx
0000038344444300000000009999
0000034444444300000000009999
0000034444444300011111005550
0000034444444300011111005550
0000034444444300011111005550
0000034444444300000000005550
0000qx3344433xxxxxx0xxxxe000
0000a0000000000000000006d000
0000a0000000000000000000d000
0000a0000000000000000000d000
0000a0000000000000000007d000
0000zxxxxxxxxxxxxxxxxxxxc000
0000000000000000000000000000
0000000000000000000000000000
0000000000000000000000000000
|};

let createGrid = s => {
  let s = String.trim(s);
  let strs = Utils.split(s, ~sep='\n');
  let width = String.length(List.nth(strs, 0));
  let height = List.length(strs);
  let m = Array.make_matrix(width, height, Blocked);
  List.iteri(
    (y, s) =>
      String.iteri(
        (x, c) =>
          m[x][y] = (
            switch (c) {
            | '0' => Grass(Utils.random(~min=0, ~max=10))
            | '1' => Dirt
            | 'q' as c
            | 'a' as c
            | 'z' as c
            | 'x' as c
            | 'c' as c
            | 'e' as c
            | 'd' as c => Fence(c)
            | '3' => Blocked
            | '4' => Floor
            | '5' => Water
            | '6' => WaterTrough
            | '7' => FoodTrough
            | '8' => SeedBin
            | '9' => Truck
            | _ => Blocked
            }
          ),
        s,
      ),
    strs,
  );
  m;
};

let renderPlayer = (state, env) => {
  let imgName =
    switch (
      state.playerFacing,
      anyKey([Up, Down, Right, Left, W, A, S, D], env) ?
        int_of_float(state.time /. 0.2) mod 4 : 0,
      state.currentItem == None,
    ) {
    | (RightD, 0, true)
    | (RightD, 2, true) => "old_macdonald_right_face.png"
    | (RightD, 1, true) => "old_macdonald_right_face_walk_one.png"
    | (RightD, 3, true) => "old_macdonald_right_face_walk_two.png"
    | (UpD, 0, true)
    | (UpD, 2, true) => "old_macdonald_back_face.png"
    | (UpD, 1, true) => "old_macdonald_back_face_walk_one.png"
    | (UpD, 3, true) => "old_macdonald_back_face_walk_two.png"
    | (DownD, 0, true)
    | (DownD, 2, true) => "old_macdonald_front_face.png"
    | (DownD, 1, true) => "old_macdonald_front_face_walk_one.png"
    | (DownD, 3, true) => "old_macdonald_front_face_walk_two.png"
    | (LeftD, 0, true)
    | (LeftD, 2, true) => "old_macdonald_left_face.png"
    | (LeftD, 1, true) => "old_macdonald_left_face_walk_one.png"
    | (LeftD, 3, true) => "old_macdonald_left_face_walk_two.png"
    | (RightD, 0, false)
    | (RightD, 2, false) => "old_macdonald_right_face_hands_up.png"
    | (RightD, 1, false) => "old_macdonald_right_face_hands_up_walk_one.png"
    | (RightD, 3, false) => "old_macdonald_right_face_hands_up_walk_two.png"
    | (UpD, 0, false)
    | (UpD, 2, false) => "old_macdonald_back_face_hands_up.png"
    | (UpD, 1, false) => "old_macdonald_back_face_hands_walk_one.png"
    | (UpD, 3, false) => "old_macdonald_back_face_hands_up_walk_two.png"
    | (DownD, 0, false)
    | (DownD, 2, false) => "old_macdonald_front_face_hands_up.png"
    | (DownD, 1, false) => "old_macdonald_front_face_hands_up_walk_one.png"
    | (DownD, 3, false) => "old_macdonald_front_face_hands_up_walk_two.png"
    | (LeftD, 0, false)
    | (LeftD, 2, false) => "old_macdonald_left_face_hands_up.png"
    | (LeftD, 1, false) => "old_macdonald_left_face_hands_up_walk_one.png"
    | (LeftD, 3, false) => "old_macdonald_left_face_hands_up_walk_two.png"
    | _ => failwith("Impossible walk state")
    };
  drawAssetf(state.playerPos.x, state.playerPos.y, imgName, state, env);
  let holdOffset = tileSizef -. 4.;
  switch (state.currentItem) {
  | None => ()
  | Some(Corn) =>
    drawAssetf(
      state.playerPos.x,
      state.playerPos.y -. holdOffset,
      "pick_up_corn.png",
      state,
      env,
    )
  | Some(Water) =>
    drawAssetf(
      state.playerPos.x,
      state.playerPos.y -. holdOffset,
      "water_bucket.png",
      state,
      env,
    )
  | Some(Seed) =>
    drawAssetf(
      state.playerPos.x,
      state.playerPos.y -. holdOffset,
      "seed.png",
      state,
      env,
    )
  | Some(Egg) =>
    drawAssetf(
      state.playerPos.x,
      state.playerPos.y -. holdOffset,
      "egg.png",
      state,
      env,
    )
  | Some(Milk) =>
    drawAssetf(
      state.playerPos.x,
      state.playerPos.y -. holdOffset,
      "bucket_with_milk.png",
      state,
      env,
    )
  | Some(Wood) => print_endline("Can't draw wood")
  };
};

let setup = (assets, env) => {
  Env.size(~width=600, ~height=600, env);
  let grid = createGrid(mapString);
  {
    grid,
    plants: Array.make_matrix(4, 6, 0),
    playerPos: {
      x: tileSizef *. 17.8,
      y: tileSizef *. 5.,
    },
    playerFacing: DownD,
    spritesheet:
      Draw.loadImage(~isPixel=true, ~filename="spritesheet/assets.png", env),
    assets,
    gameobjects: GameObject.init(grid),
    currentItem: None,
    journal: Journal.init(env),
    dollarAnimation: (-1.),
    time: 0.,
  };
};

let draw = (state, env) => {
  Draw.background(Utils.color(~r=199, ~g=217, ~b=229, ~a=255), env);
  let dt = Env.deltaTime(env);
  let state = {...state, time: state.time +. dt};
  let playerSpeedDt = playerSpeed *. dt;
  let offset = {x: 0., y: 0.};
  let offset =
    Env.key(Left, env) || Env.key(A, env) ?
      handleCollision(
        offset,
        {...offset, x: -. playerSpeedDt},
        state.playerPos,
        state.grid,
      ) :
      offset;
  let offset =
    Env.key(Right, env) || Env.key(D, env) ?
      handleCollision(
        offset,
        {...offset, x: playerSpeedDt},
        state.playerPos,
        state.grid,
      ) :
      offset;
  let offset =
    Env.key(Up, env) || Env.key(W, env) ?
      handleCollision(
        offset,
        {...offset, y: -. playerSpeedDt},
        state.playerPos,
        state.grid,
      ) :
      offset;
  let offset =
    Env.key(Down, env) || Env.key(S, env) ?
      handleCollision(
        offset,
        {...offset, y: playerSpeedDt},
        state.playerPos,
        state.grid,
      ) :
      offset;
  let mag = Utils.magf((offset.x, offset.y));
  let state =
    if (mag > 0.) {
      let dx = offset.x /. mag *. playerSpeedDt;
      let dy = offset.y /. mag *. playerSpeedDt;
      {
        ...state,
        playerPos: {
          x: state.playerPos.x +. dx,
          y: state.playerPos.y +. dy,
        },
      };
    } else {
      state;
    };
  let facing = state.playerFacing;
  let facing = Env.key(Left, env) || Env.key(A, env) ? LeftD : facing;
  let facing = Env.key(Right, env) || Env.key(D, env) ? RightD : facing;
  let facing = Env.key(Up, env) || Env.key(W, env) ? UpD : facing;
  let facing = Env.key(Down, env) || Env.key(S, env) ? DownD : facing;
  let state = {...state, playerFacing: facing};
  let facingOffset = facingToOffset(facing);
  let state = GameObject.update(state, env);
  let focusedObject =
    List.fold_left(
      (foundobject, gameobject: gameobjectT) => {
        let d =
          Utils.distf(
            ~p1=(gameobject.pos.x, gameobject.pos.y),
            ~p2=(
              state.playerPos.x
              +. facingOffset.x
              *. tileSizef
              +. tileSizef
              /. 2.,
              state.playerPos.y
              +. facingOffset.y
              *. tileSizef
              +. tileSizef
              /. 2.,
            ),
          );
        switch (foundobject) {
        | None when d < tileSizef => Some((d, gameobject))
        | Some((d2, _)) when d2 < d => foundobject
        | Some(_) => Some((d, gameobject))
        | None => None
        };
      },
      None,
      state.gameobjects,
    );
  let focusedObject =
    switch (focusedObject) {
    | None => None
    | Some((_, fgo)) => Some(fgo)
    };
  let (state, focusedObject) =
    GameObject.checkPickUp(state, focusedObject, env);
  let state = Journal.updateDay(state, env);
  Draw.pushMatrix(env);
  Draw.scale(~x=2., ~y=2., env);
  Draw.translate(
    ~x=-. state.playerPos.x +. screenSize /. 4.,
    ~y=-. state.playerPos.y +. screenSize /. 4.,
    env,
  );
  /* Nighttime tint */
  /* Draw.tint(Utils.color(~r=100, ~g=100, ~b=200, ~a=255), env); */
  Array.iteri(
    (x, row) =>
      Array.iteri(
        (y, tile) =>
          switch (tile) {
          | Dirt =>
            drawAsset(x * tileSize, y * tileSize, "grass.png", state, env);
            drawAsset(
              x * tileSize,
              y * tileSize,
              "drier_dirt.png",
              state,
              env,
            );
          | Grass(0) =>
            drawAsset(
              x * tileSize,
              y * tileSize,
              "different_flower_grass.png",
              state,
              env,
            )
          | Grass(1) =>
            drawAsset(
              x * tileSize,
              y * tileSize,
              "flower_grass.png",
              state,
              env,
            )
          | Grass(2)
          | Grass(3) =>
            drawAsset(
              x * tileSize,
              y * tileSize,
              "more_grass.png",
              state,
              env,
            )
          | Grass(_) =>
            drawAsset(x * tileSize, y * tileSize, "grass.png", state, env)
          | Fence(c) =>
            drawAsset(x * tileSize, y * tileSize, "grass.png", state, env);
            let px = x * tileSize;
            let py = y * tileSize;
            switch (c) {
            | 'x' => drawAsset(px, py, "keep_the_dogs_out.png", state, env)
            | 'c' => drawAsset(px, py, "corner_fence.png", state, env)
            | 'a'
            | 'd' => drawAsset(px, py, "vertical_fence.png", state, env)
            | 'e' =>
              drawAsset(px, py, "fence_top_right_corner.png", state, env)
            | 'q' =>
              drawAsset(px, py, "fence_top_left_corner.png", state, env)
            | 'z' => drawAsset(px, py, "fence_bottom_left.png", state, env)
            /* | 'z' => */
            /* Draw.pushMatrix(env); */
            /* Draw.scale(~x=(-1.), ~y=(1.), env); */
            /* Draw.translate(~x=float_of_int(px) -. tileSizef, ~y=float_of_int(py), env); */
            /* drawAsset(0, 0, "corner_fence.png", state, env); */
            /* Draw.popMatrix(env); */
            | _ => drawAsset(px, py, "keep_the_dogs_out.png", state, env)
            };
          | Water
          | SeedBin
          | Floor
          | Blocked
          | FoodTrough
          | WaterTrough =>
            drawAsset(x * tileSize, y * tileSize, "grass.png", state, env)
          | Truck =>
            drawAsset(x * tileSize, y * tileSize, "truck.png", state, env)
          },
        row,
      ),
    state.grid,
  );
  let playerInBarn =
    Utils.intersectRectRect(
      ~rect1Pos=(
        state.playerPos.x +. tileSizef /. 2.,
        state.playerPos.y +. tileSizef /. 2.,
      ),
      ~rect1W=tileSizef /. 2.,
      ~rect1H=tileSizef /. 2.,
      ~rect2Pos=(5. *. tileSizef, 3. *. tileSizef),
      ~rect2W=288.,
      ~rect2H=288.,
    );
  /** Draw large game objects */
  drawAsset(5 * tileSize, 3 * tileSize, "barn_inside.png", state, env);
  drawAsset(24 * tileSize, 7 * tileSize, "pond.png", state, env);
  drawAssetf(
    16.6 *. tileSizef,
    (0.2) *. tileSizef,
    "im_coming_home.png",
    state,
    env,
  );
  /* Render `isWatered` first because they're part of the terrain. */
  List.iter(
    g => GameObject.renderBefore(g, focusedObject, state, env),
    state.gameobjects,
  );
  /* Sort gameobjects by y, then place the player and barn while iterating over objects */
  let sortedGameObjects =
    List.sort(
      (a: gameobjectT, b: gameobjectT) =>
        int_of_float(a.pos.y -. b.pos.y +. tileSizef),
      state.gameobjects,
    );
  let firstGameObject = List.hd(sortedGameObjects);
  if (firstGameObject.pos.y >= state.playerPos.y +. tileSizef /. 2.) {
    renderPlayer(state, env);
  };
  GameObject.renderObject(firstGameObject, focusedObject, state, env);
  /* @Hack We assume sortedGameObjects always contains at least one element here so we have prev and cur */
  let lastGameObject =
    List.fold_left(
      (prevGameOjbect: gameobjectT, curGameObject: gameobjectT) => {
        if (! playerInBarn
            && prevGameOjbect.pos.y
            +. tileSizef
            /. 2. < 288.
            +. tileSizef
            *. 3.
            && curGameObject.pos.y
            +. tileSizef
            /. 2. >= 288.
            +. tileSizef
            *. 3.) {
          drawAsset(
            5 * tileSize,
            3 * tileSize,
            "barn_outside.png",
            state,
            env,
          );
        };
        if (prevGameOjbect.pos.y < state.playerPos.y
            +. tileSizef
            /. 2.
            && curGameObject.pos.y >= state.playerPos.y
            +. tileSizef
            /. 2.) {
          renderPlayer(state, env);
        };
        GameObject.renderObject(curGameObject, focusedObject, state, env);
        curGameObject;
      },
      firstGameObject,
      List.tl(sortedGameObjects),
    );
  if (lastGameObject.pos.y < state.playerPos.y +. tileSizef /. 2.) {
    renderPlayer(state, env);
  };
  /* @Todo we need to update this each time we update the map */
  let state =
    if (state.dollarAnimation >= 0.) {
      let totalTimeSec = 1.5;
      Draw.pushStyle(env);
      Draw.tint(
        Utils.color(
          ~r=255,
          ~g=255,
          ~b=255,
          ~a=
            int_of_float(
              Utils.remapf(
                ~value=state.dollarAnimation,
                ~low1=0.,
                ~high1=totalTimeSec,
                ~low2=255.,
                ~high2=0.,
              ),
            ),
        ),
        env,
      );
      Draw.text(
        ~body="$",
        ~pos=(
          25 * tileSize,
          int_of_float(
            Utils.remapf(
              ~value=state.dollarAnimation,
              ~low1=0.,
              ~high1=totalTimeSec,
              ~low2=3.5 *. tileSizef,
              ~high2=1. *. tileSizef,
            ),
          ),
        ),
        env,
      );
      Draw.popStyle(env);
      if (state.dollarAnimation > totalTimeSec) {
        {...state, dollarAnimation: (-1.)};
      } else {
        {...state, dollarAnimation: state.dollarAnimation +. dt};
      };
    } else {
      state;
    };
  Draw.popMatrix(env);
  GameObject.renderAction(state, focusedObject, env);
  let state = Journal.renderTransition(state, dt, env);
  state;
};

let loadAssetsAsync = filename =>
  Reasongl.Gl.File.readFile(
    ~filename,
    ~cb=jsonString => {
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
            let name = Json.get("filename", thing) |?> Json.string |! "error";
            let newAsset = {
              pos: {
                x,
                y,
              },
              size: {
                x: w,
                y: h,
              },
            };
            StringMap.add(name, newAsset, assets);
          },
          StringMap.empty,
          things,
        );
      run(~setup=setup(assets), ~draw, ());
    },
  );

loadAssetsAsync("spritesheet/sheet.json");
