open Reprocessing;

open Common;

let mapString = {|
00000000000000000000000000000
00000000000000000000000000000
00000000000000000000000000000
00000000000000000000000000000
0000qxxxxxxxxxxe0000000000000
0000a0000000000d0000000000000
0000a000000000030000000000000
0000a333333333030000000000000
0000z333333333030000000000000
000003834444430xxxxxxxxxxxxxx
00000344444443000000000099999
00000344hhh443000000000099999
00000344hhh443000111110055500
00000344hhh443000111110055500
00000344444443000111110055500
00000344444443000000000055500
0000qx3334333xxxxxx0xxxxe0000
0000a0000000000000000006d0000
0000a0000000000000000000d0000
0000a0000000000000000000d0000
0000a0000000000000000007d0000
0000zxxxxxxxxxxxxxxxxxxxc0000
00000000000000000000000000000
00000000000000000000000000000
00000000000000000000000000000
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
            | 'h' => Hay
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
  | Some(Axe) =>
    drawAssetf(
      state.playerPos.x,
      state.playerPos.y -. holdOffset,
      "axe_pick_up.png",
      state,
      env,
    )
  | Some(Wood) => print_endline("Can't draw wood")
  | Some(Flower) =>
    drawAssetf(
      state.playerPos.x,
      state.playerPos.y -. holdOffset,
      "bouquet_of_flowers.png",
      state,
      env,
    )
  | _ => print_endline("You piece of shit ben")
  };
};

let setup = (assets, env) => {
  Env.size(~width=600, ~height=600, env);
  let grid = createGrid(mapString);
  {
    grid,
    plants: Array.make_matrix(4, 6, 0),
    playerPos: {
      x: tileSizef *. 15.8,
      y: tileSizef *. 10.,
    },
    playerFacing: DownD,
    spritesheet:
      Draw.loadImage(
        ~isPixel=true,
        ~filename=basedirname ++ "spritesheet/assets.png",
        env,
      ),
    assets,
    sounds: loadSounds(env),
    gameobjects: GameObject.init(grid),
    currentItem: None,
    journal: Journal.init(env),
    dollarAnimation: (-1.),
    time: 0.,
    night: false,
    mainFont:
      Draw.loadFont(
        ~filename=basedirname ++ "Times New Roman_2x.fnt",
        ~isPixel=false,
        env,
      ),
    monsterWasLockedIn: false,
    mousePressed: false,
    mousePressedHack: false,
    day6PlayerWentInBarn: false,
    day6CameraAnimation: 0.,
    shortDestroyedBarnAsset:
      Draw.loadImage(
        ~isPixel=true,
        ~filename=basedirname ++ "short_destroyed_barn.png",
        env,
      ),
    sleepingMonsterAsset:
      Draw.loadImage(
        ~isPixel=true,
        ~filename=basedirname ++ "sleeping_monster.png",
        env,
      ),
    hasPressedTheActionKeyOnce: false,
    playerDead: false,
  };
};

let draw = (state, env) => {
  Draw.background(Utils.color(~r=199, ~g=217, ~b=229, ~a=255), env);
  let dt = Env.deltaTime(env);
  let state = {...state, time: state.time +. dt};
  let playerSpeedDt = playerSpeed *. dt;
  /*TODO: remove this */
  let state = {
    ...state,
    night: debug && Env.keyPressed(N, env) ? ! state.night : state.night,
  };
  if (Random.float(1.0) < 0.005) {
    let soundNum = Random.int(5) + 1;
    if (state.night) {
      playSound("night" ++ string_of_int(soundNum), state, env);
    } else if (Random.float(1.0) < 0.5) {
      playSound("day" ++ string_of_int(soundNum), state, env);
    };
  };
  let offset = {x: 0., y: 0.};
  let offset =
    if (state.journal.dayTransition == NoTransition
        || state.journal.dayTransition == FadeIn) {
      let offset =
        Env.key(Left, env) || Env.key(A, env) ?
          handleCollision(
            state,
            offset,
            {...offset, x: -. playerSpeedDt},
            state.playerPos,
            state.grid,
          ) :
          offset;
      let offset =
        Env.key(Right, env) || Env.key(D, env) ?
          handleCollision(
            state,
            offset,
            {...offset, x: playerSpeedDt},
            state.playerPos,
            state.grid,
          ) :
          offset;
      let offset =
        Env.key(Up, env) || Env.key(W, env) ?
          handleCollision(
            state,
            offset,
            {...offset, y: -. playerSpeedDt},
            state.playerPos,
            state.grid,
          ) :
          offset;
      Env.key(Down, env) || Env.key(S, env) ?
        handleCollision(
          state,
          offset,
          {...offset, y: playerSpeedDt},
          state.playerPos,
          state.grid,
        ) :
        offset;
    } else {
      offset;
    };
  let state =
    if (! state.hasPressedTheActionKeyOnce
        && (Env.key(X, env) || Env.key(Space, env))
        && state.journal.dayTransition === NoTransition) {
      {...state, hasPressedTheActionKeyOnce: true};
    } else {
      state;
    };
  let state =
    if (! Env.mousePressed(env)) {
      {...state, mousePressed: false, mousePressedHack: false};
    } else if (! state.mousePressedHack && Env.mousePressed(env)) {
      {...state, mousePressed: true, mousePressedHack: true};
    } else if (state.mousePressed && state.mousePressedHack) {
      {...state, mousePressed: false};
    } else {
      state;
    };
  let mag = Utils.magf((offset.x, offset.y));
  /*print_endline("posx, posy:" ++ string_of_float(state.playerPos.x) ++ " " ++ string_of_float(state.playerPos.y));*/
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
  let playerInBarn = checkIfInBarn(state.playerPos);
  let state =
    if (state.journal.dayIndex === 5 && ! state.day6PlayerWentInBarn) {
      {...state, day6PlayerWentInBarn: playerInBarn};
    } else {
      state;
    };
  let state =
    if (state.day6PlayerWentInBarn && ! playerInBarn) {
      switch (
        List.find(
          g =>
            switch (g) {
            | {state: Boss(_)} => true
            | _ => false
            },
          state.gameobjects,
        )
      ) {
      | exception Not_found =>
        let bPos = {x: tileSizef *. 20., y: tileSizef *. 18.};
        let gameobjects = [
          {
            pos: bPos,
            action: NoAction,
            state:
              Boss({
                movePair: (bPos, bPos),
                movingTime: 0.,
                hunger: 6,
                eatingTime: 0.,
                killed: [],
                eating: false,
              }),
          },
          ...state.gameobjects,
        ];
        {...state, gameobjects, day6CameraAnimation: 5.};
      | _ => state
      };
    } else {
      state;
    };
  let state =
    if (state.day6CameraAnimation > 0.) {
      {...state, day6CameraAnimation: state.day6CameraAnimation -. dt};
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
  /* Kill off the animals that have been eaten by the monster. */
  let (state, maybeBoss) =
    if (state.journal.dayIndex === 7) {
      switch (
        List.find(
          g =>
            switch (g) {
            | {state: Boss(_)} => true
            | _ => false
            },
          state.gameobjects,
        )
      ) {
      | exception Not_found => failwith(" Tghis should reall ynot happen")
      | {state: Boss(boss)} as bossGo =>
        let gameobjects =
          List.map(
            go =>
              switch (List.exists(k => k === go, boss.killed), go) {
              | (_, {state: Boss(_)}) => {
                  ...go,
                  state:
                    Boss({
                      ...boss,
                      hunger: boss.hunger - List.length(boss.killed),
                      killed: [],
                    }),
                }
              | (false, _) => go
              | (true, _) =>
                switch (go) {
                | {state: Cow(cowState)} => {
                    ...go,
                    state: Cow({...cowState, health: (-1)}),
                  }
                | {state: Chicken(cowState)} => {
                    ...go,
                    state: Chicken({...cowState, health: (-1)}),
                  }
                | {state: Chick(cowState)} => {
                    ...go,
                    state: Chick({...cowState, health: (-1)}),
                  }
                | _ => go
                }
              },
            state.gameobjects,
          );
        /* This is another piece of code to remove the animals from the gameobjects if we want to */
        /*let (gameobjects, _) = List.fold_left(((newGameobjects, killed), go) => {
            switch (List.exists(k => k === go, killed)) {
            | false => ([go, ...newGameobjects], killed)
            | true => (newGameobjects, List.filter(k => k !== go, killed))
            }
          }, ([], boss.killed), state.gameobjects);*/
        ({...state, gameobjects}, Some(bossGo));
      | _ => failwith("Well we certainly didn't think this could happen")
      };
    } else {
      (state, None);
    };
  let finishedAllTasks = Journal.checkTasks(state, env);
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
    GameObject.applyAction(
      state,
      playerInBarn,
      finishedAllTasks,
      focusedObject,
      env,
    );
  let state = Journal.updateDay(state, env);
  Draw.pushMatrix(env);
  Draw.scale(~x=2., ~y=2., env);
  if (state.day6CameraAnimation > 0.) {
    let startX = -. state.playerPos.x +. screenSize /. 4. -. tileSizef /. 2.;
    let startY = -. state.playerPos.y +. screenSize /. 4. -. tileSizef /. 2.;
    let boss =
      List.find(
        g =>
          switch (g) {
          | {state: Boss(_)} => true
          | _ => false
          },
        state.gameobjects,
      );
    let endX = -. boss.pos.x +. screenSize /. 4. -. tileSizef /. 2.;
    let endY = -. boss.pos.y +. screenSize /. 4. -. tileSizef /. 2.;
    Draw.translate(
      ~x=
        Utils.remapf(
          ~value=max(state.day6CameraAnimation, 2.0),
          ~low1=5.0,
          ~high1=2.0,
          ~low2=startX,
          ~high2=endX,
        ),
      ~y=
        Utils.remapf(
          ~value=max(state.day6CameraAnimation, 2.0),
          ~low1=5.0,
          ~high1=2.0,
          ~low2=startY,
          ~high2=endY,
        ),
      env,
    );
  } else {
    Draw.translate(
      ~x=-. state.playerPos.x +. screenSize /. 4. -. tileSizef /. 2.,
      ~y=-. state.playerPos.y +. screenSize /. 4. -. tileSizef /. 2.,
      env,
    );
  };
  Draw.pushStyle(env);
  if (state.night) {
    Draw.tint(Utils.color(~r=100, ~g=100, ~b=200, ~a=255), env);
  };
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
            | _ => drawAsset(px, py, "keep_the_dogs_out.png", state, env)
            };
          | Water
          | SeedBin
          | Floor
          | Blocked
          | Truck
          | Hay
          | FoodTrough
          | WaterTrough =>
            drawAsset(x * tileSize, y * tileSize, "grass.png", state, env)
          },
        row,
      ),
    state.grid,
  );
  let playerBehindBarn =
    playerInBarn ?
      false :
      Utils.intersectRectRect(
        ~rect1Pos=(state.playerPos.x, state.playerPos.y),
        ~rect1W=tileSizef,
        ~rect1H=tileSizef,
        ~rect2Pos=(4. *. tileSizef, 4. *. tileSizef),
        ~rect2W=320.,
        ~rect2H=32. *. 4.,
      );
  /** Draw large game objects */
  (
    if (playerBehindBarn) {
      /* @Hack */
      if (state.journal.dayIndex >= 6) {
        Draw.image(
          state.shortDestroyedBarnAsset,
          ~pos=(5 * tileSize, 7 * tileSize),
          ~width=284,
          ~height=331,
          env,
        );
      } else {
        drawAsset(
          5 * tileSize,
          4 * tileSize,
          "short_barn_inside.png",
          state,
          env,
        );
      };
    } else if (state.journal.dayIndex >= 6) {
      drawAsset(5 * tileSize, 4 * tileSize, "destroyed_barn.png", state, env);
    } else {
      drawAsset(5 * tileSize, 4 * tileSize, "barn_inside.png", state, env);
    }
  );
  drawAsset(24 * tileSize, 12 * tileSize, "pond.png", state, env);
  drawAsset(24 * tileSize, 10 * tileSize, "truck.png", state, env);
  drawAssetf(
    14.6 *. tileSizef,
    5.2 *. tileSizef,
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
      (a: gameobjectT, b: gameobjectT) => int_of_float(a.pos.y -. b.pos.y),
      state.gameobjects,
    );
  let firstGameObject = List.hd(sortedGameObjects);
  if (firstGameObject.pos.y >= state.playerPos.y +. tileSizef /. 2.) {
    renderPlayer(state, env);
  };
  GameObject.renderObject(
    firstGameObject,
    playerInBarn,
    playerBehindBarn,
    focusedObject,
    state,
    env,
  );
  /* @Hack We assume sortedGameObjects always contains at least one element here so we have prev and cur */
  let lastGameObject =
    List.fold_left(
      (prevGameOjbect: gameobjectT, curGameObject: gameobjectT) => {
        let collisionPadding = 8.;
        let barnBottom = 256. +. tileSizef *. 9.;
        if (! playerInBarn
            && prevGameOjbect.pos.y < barnBottom
            -. collisionPadding
            -. tileSizef
            /. 2.
            && curGameObject.pos.y >= barnBottom
            -. collisionPadding
            -. tileSizef
            /. 2.) {
          if (state.journal.dayIndex >= 6 && playerBehindBarn) {
            Draw.image(
              state.shortDestroyedBarnAsset,
              ~pos=(5 * tileSize, 7 * tileSize),
              ~width=284,
              ~height=331,
              env,
            );
          } else {
            let assetName =
              if (playerBehindBarn) {"short_barn_inside.png"} else {
                "barn_outside.png"
              };
            drawAsset(5 * tileSize, 4 * tileSize, assetName, state, env);
          };
        };
        /*Draw.fill(Utils.color(255, 0, 0, 255), env);*/
        /*Draw.rect(~pos=(5 * tileSize, int_of_float(barnBottom-. collisionPadding)), ~width=tileSize, ~height=256, env);*/
        if (prevGameOjbect.pos.y < state.playerPos.y
            +. tileSizef
            /. 2.
            && curGameObject.pos.y >= state.playerPos.y
            +. tileSizef
            /. 2.) {
          renderPlayer(state, env);
        };
        GameObject.renderObject(
          curGameObject,
          playerInBarn,
          playerBehindBarn,
          focusedObject,
          state,
          env,
        );
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
      drawAssetf(
        25. *. tileSizef,
        Utils.remapf(
          ~value=state.dollarAnimation,
          ~low1=0.,
          ~high1=totalTimeSec,
          ~low2=10. *. tileSizef,
          ~high2=7. *. tileSizef,
        ),
        "dolla_dolla_bills.png",
        state,
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
  /*Draw.fill(Utils.color(255, 0, 0, 255), env);
    Draw.rect(~pos=(8 * tileSize, 12 * tileSize), ~width=tileSize, ~height=tileSize, env);
    Draw.fill(Utils.color(0, 255, 0, 255), env);
    Draw.rectf(~pos=(floor(state.playerPos.x /. tileSizef) *. tileSizef, floor(state.playerPos.y /. tileSizef) *. tileSizef +. tileSizef), ~width=tileSizef, ~height=tileSizef, env);
    Draw.fill(Utils.color(0, 0, 255, 255), env);
    Draw.rectf(~pos=(state.playerPos.x, state.playerPos.y), ~width=tileSizef, ~height=tileSizef, env);*/
  Draw.popStyle(env);
  Draw.popMatrix(env);
  if (state.night) {
    drawAssetFullscreen("baby_its_dark_outside.png", state, env);
  };
  switch (maybeBoss) {
  | Some({pos: {x, y}, state: Boss({movePair, eatingTime})}) =>
    let ({x: x1, y: y1}, {x: x2, y: y2}) = movePair;
    let facing =
      if (x1 > x2) {
        LeftD;
      } else if (x1 < x2) {
        RightD;
      } else if (y1 < y2) {
        DownD;
      } else {
        UpD;
      };
    if (facing === DownD && eatingTime === 0.) {
      Draw.pushMatrix(env);
      Draw.scale(~x=2., ~y=2., env);
      Draw.translate(
        ~x=-. state.playerPos.x +. screenSize /. 4. -. tileSizef /. 2.,
        ~y=-. state.playerPos.y +. screenSize /. 4. -. tileSizef /. 2.,
        env,
      );
      drawAssetf(x, y -. tileSizef -. 10., "eyes.png", state, env);
      Draw.popMatrix(env);
    };
  | _ => ()
  };
  GameObject.renderAction(
    state,
    playerInBarn,
    finishedAllTasks,
    focusedObject,
    env,
  );
  let state = Journal.renderTransition(state, env);
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

loadAssetsAsync(basedirname ++ "spritesheet/sheet.json");
