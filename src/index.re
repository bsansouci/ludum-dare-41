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

type stateT = {
  grid: array(array(tileT)),
  plants: array(array(plantT)),
  playerPos: vec2
};

let setup = (env) => {
  Env.size(~width=600, ~height=600, env);
  {grid: createGrid(mapString), plants: Array.make_matrix(4, 6, 0), playerPos: {x: 65., y: 65.}}
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
  if (collided) {prevOffset} else {offset}
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
  /*let mag = Utils.magf((offset.x, offset.y));*/
  let state = {
    ...state,
    playerPos: {x: state.playerPos.x +. offset.x, y: state.playerPos.y +. offset.y}
  };
  /*let state =
    if (mag > 0.) {
      let dx = offset.x /. mag *. playerSpeedDt;
      let dy = offset.y /. mag *. playerSpeedDt;
      print_endline(string_of_float(dy));
      {...state, playerPos: {x: state.playerPos.x +. offset.x, y: state.playerPos.y +. offset.y}}
    } else {
      state
    };*/
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
            Draw.rect(~pos=(x * tileSize, y * tileSize), ~width=tileSize, ~height=tileSize, env)
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
  Draw.fill(Utils.color(~r=41, ~g=0, ~b=244, ~a=255), env);
  Draw.rectf(
    ~pos=(state.playerPos.x, state.playerPos.y),
    ~width=tileSizef,
    ~height=tileSizef,
    env
  );
  Draw.popMatrix(env);
  state
};

run(~setup, ~draw, ());
