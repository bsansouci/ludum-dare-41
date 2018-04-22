open Reprocessing;

open Common;

let mapString = {|
33333333333333333333330
33333333333333333333330
38344444300000000003330
34444444300011111005550
34444444300011111005550
34444444300011111005550
34444444300000000005550
34444444300000000005550
33344433322222002222000
20000000000000000062000
20000000000000000002000
20000000000000000002000
20000000000000000072000
22222222222222222222000
00000000000000000000000
00000000000000000000000
00000000000000000000000
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
            | '2' => Fence
            | '3' => Blocked
            | '4' => Floor
            | '5' => Water
            | '6' => WaterTrough
            | '7' => FoodTrough
            | '8' => SeedBin
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
      anyKey([Up, Down, Right, Left, W, A, S, D], env),
      state.currentItem == None,
    ) {
    | (RightD, _, true) => "old_macdonald_right_face.png"
    | (UpD, _, true) => "old_macdonald_back_face.png"
    | (DownD, _, true) => "old_macdonald_front_face.png"
    | (LeftD, _, true) => "old_macdonald_left_face.png"
    | (RightD, _, false) => "old_macdonald_right_face_hands_up.png"
    | (UpD, _, false) => "old_macdonald_back_face_hands_up.png"
    | (DownD, _, false) => "everybody_put_your_hands_up.png"
    | (LeftD, _, false) => "old_macdonald_left_face_hands_up.png"
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
      "corn_seed.png",
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
  | Some(Milk) => print_endline("Can't draw milk")
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
      x: tileSizef *. 10. +. 1.,
      y: tileSizef *. 5. +. 1.,
    },
    playerFacing: RightD,
    spritesheet:
      Draw.loadImage(~isPixel=true, ~filename="spritesheet/assets.png", env),
    assets,
    gameobjects: GameObject.init(grid),
    currentItem: None,
    journal: Journal.init(env),
  };
};

let draw = (state, env) => {
  Draw.background(Utils.color(~r=199, ~g=217, ~b=229, ~a=255), env);
  let dt = Env.deltaTime(env);
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
          | Water =>
            Draw.fill(Utils.color(~r=50, ~g=50, ~b=255, ~a=255), env);
            Draw.rect(
              ~pos=(x * tileSize, y * tileSize),
              ~width=tileSize,
              ~height=tileSize,
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
          | Fence =>
            drawAsset(x * tileSize, y * tileSize, "grass.png", state, env);
            drawAsset(
              x * tileSize,
              y * tileSize,
              "keep_the_dogs_out.png",
              state,
              env,
            );
          | SeedBin
          | Floor
          | Blocked
          | FoodTrough
          | WaterTrough =>
            drawAsset(x * tileSize, y * tileSize, "grass.png", state, env)
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
      ~rect1W=tileSizef /. 4.,
      ~rect1H=tileSizef /. 4.,
      ~rect2Pos=(0., 0.),
      ~rect2W=288.,
      ~rect2H=288.,
    );
  /** Draw large game objects */
  drawAsset(0 * tileSize, 0 * tileSize, "barn_inside.png", state, env);
  /* Render `isWatered` first because they're part of the terrain. */
  let gameObjectsWithoutWateredCorn =
    List.filter(
      g =>
        switch (g) {
        | {pos: {x, y}, state: Corn({isWatered: true})} =>
          Draw.fill(Utils.color(~r=190, ~g=190, ~b=60, ~a=255), env);
          Draw.rectf(
            ~pos=(x -. tileSizef /. 2., y -. tileSizef /. 2.),
            ~width=tileSizef,
            ~height=tileSizef,
            env,
          );
          false;
        | _ => true
        },
      state.gameobjects,
    );
  /* @Todo sort player and gameobjects */
  let sortedGameObjects =
    List.sort(
      (a: gameobjectT, b: gameobjectT) =>
        int_of_float(a.pos.y -. b.pos.y +. tileSizef),
      gameObjectsWithoutWateredCorn,
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
        GameObject.renderObject(curGameObject, focusedObject, state, env);
        if (prevGameOjbect.pos.y < state.playerPos.y
            +. tileSizef
            /. 2.
            && curGameObject.pos.y >= state.playerPos.y
            +. tileSizef
            /. 2.) {
          renderPlayer(state, env);
        } else if (! playerInBarn
                   && prevGameOjbect.pos.y < 288.
                   && curGameObject.pos.y >= 288.) {
          drawAsset(
            0 * tileSize,
            0 * tileSize,
            "barn_outside.png",
            state,
            env,
          );
        };
        curGameObject;
      },
      firstGameObject,
      List.tl(sortedGameObjects),
    );
  if (lastGameObject.pos.y < state.playerPos.y +. tileSizef /. 2.) {
    renderPlayer(state, env);
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
            StringMap.add(name, {
                                  pos: {
                                    x,
                                    y,
                                  },
                                  size: {
                                    x: w,
                                    y: h,
                                  },
                                }, assets);
          },
          StringMap.empty,
          things,
        );
      run(~setup=setup(assets), ~draw, ());
    },
  );

loadAssetsAsync("spritesheet/sheet.json");

loadAssetsAsync("spritesheet/sheet.json");
