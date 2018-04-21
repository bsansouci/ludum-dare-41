open Reprocessing;

type plantT = int;

type tileT =
  | Plant
  | Grass
  | Fence
  | Blocked;

let mapString = {|
222222222222222
200000001111002
200000001111002
200000001111002
200000000000002
200222222000002
200000000000002
200000000000002
200000000000002
200000000000002
222222222222222
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
            | '1' => Plant
            | '2' => Fence
            | _ => Blocked
            }
          ),
        s
      ),
    strs
  );
  m
};

type vec2 = {
  x: float,
  y: float
};

module StringMap = Map.Make(String);

type assetT = {
  size: vec2,
  pos: vec2
};

type stateT = {
  grid: array(array(tileT)),
  plants: array(array(plantT)),
  playerPos: vec2,
  spritesheet: imageT,
  assets: StringMap.t(assetT)
};

let screenSize = 600.;

let playerSpeed = 300.;

let tileSize = 64;

let tileSizef = float_of_int(tileSize);

let checkCollision = (prevOffset, offset, state) => {
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
        let tx = dx + int_of_float((offset.x +. state.playerPos.x) /. tileSizef);
        let ty = dy + int_of_float((offset.y +. state.playerPos.y) /. tileSizef);
        if (tx >= Array.length(state.grid) || tx < 0 || ty > Array.length(state.grid[0]) || ty < 0) {
          true
        } else {
          switch state.grid[tx][ty] {
          | Blocked
          | Fence =>
            Utils.intersectRectRect(
              ~rect1Pos=(state.playerPos.x, state.playerPos.y),
              ~rect1W=tileSizef,
              ~rect1H=tileSizef,
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
  /*offset*/
  /*print_endline("collided" ++ string_of_bool(collided));*/
  if (collided) {prevOffset} else {offset}
};

let setup = (assets, env) => {
  Env.size(~width=600, ~height=600, env);
  {
    grid: createGrid(mapString),
    plants: Array.make_matrix(4, 6, 0),
    playerPos: {x: 65., y: 65.},
    spritesheet: Draw.loadImage(~isPixel=true, ~filename="spritesheet/assets.png", env),
    assets
  }
};

let draw = (state, env) => {
  Draw.background(Utils.color(~r=199, ~g=217, ~b=229, ~a=255), env);
  let dt = Env.deltaTime(env);
  let playerSpeedDt = playerSpeed *. dt;
  let offset = {x: 0., y: 0.};
  /* @Todo support both WSAD and arrow keys */
  let offset =
    checkCollision(offset, Env.key(Left, env) ? {...offset, x: -. playerSpeedDt} : offset, state);
  let offset =
    checkCollision(offset, Env.key(Right, env) ? {...offset, x: playerSpeedDt} : offset, state);
  let offset =
    checkCollision(offset, Env.key(Up, env) ? {...offset, y: -. playerSpeedDt} : offset, state);
  let offset =
    checkCollision(offset, Env.key(Down, env) ? {...offset, y: playerSpeedDt} : offset, state);
  let mag = Utils.magf((offset.x, offset.y));
  /*let state = {
      ...state,
      playerPos: {x: state.playerPos.x +. offset.x, y: state.playerPos.y +. offset.y}
    };*/
  let state =
    if (mag > 0.) {
      let dx = offset.x /. mag *. playerSpeedDt;
      let dy = offset.y /. mag *. playerSpeedDt;
      {...state, playerPos: {x: state.playerPos.x +. dx, y: state.playerPos.y +. dy}}
    } else {
      state
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
          | Plant =>
            Draw.fill(Utils.color(~r=180, ~g=180, ~b=100, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env);
            let corn = StringMap.find("stage_five_le_ble_d_inde.png", state.assets);
            Draw.subImage(
              state.spritesheet,
              ~pos=(x * tileSize, y * tileSize),
              ~width=tileSize,
              ~height=tileSize,
              ~texPos=(int_of_float(corn.pos.x), int_of_float(corn.pos.y)),
              ~texWidth=int_of_float(corn.size.x),
              ~texHeight=int_of_float(corn.size.y),
              env
            )
          | Grass =>
            Draw.fill(Utils.color(~r=20, ~g=180, ~b=50, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env)
          | Fence =>
            Draw.fill(Utils.color(~r=10, ~g=10, ~b=10, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env)
          | Blocked =>
            Draw.fill(Utils.color(~r=255, ~g=10, ~b=10, ~a=255), env);
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env)
          },
        row
      ),
    state.grid
  );
  {
    let playerAss = StringMap.find("farmer_hands_down_the_best.png", state.assets);
    Draw.subImage(
      state.spritesheet,
      ~pos=(int_of_float(state.playerPos.x), int_of_float(state.playerPos.y)),
      ~width=tileSize,
      ~height=tileSize,
      ~texPos=(int_of_float(playerAss.pos.x), int_of_float(playerAss.pos.y)),
      ~texWidth=int_of_float(playerAss.size.x),
      ~texHeight=int_of_float(playerAss.size.y),
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
