let debug = true;

type plantT = int;

type tileT =
  | Dirt
  | Grass(int)
  | Fence(char)
  | Floor
  | Water
  | Blocked
  | SeedBin
  | WaterTrough
  | FoodTrough
  | Truck;

type directionT =
  | UpD
  | DownD
  | RightD
  | LeftD;

type vec2 = {
  x: float,
  y: float,
};

type carryableT =
  | Seed
  | Water
  | Milk
  | Egg
  | Corn
  | Wood;

type actionT =
  | PickUp(carryableT)
  | Cleanup
  | WaterCorn
  | WaterAnimals
  | FeedAnimals
  | PlantSeed
  | PutBackWater
  | PutBackSeed
  | Sell
  | NoAction;

type tankStateT =
  | HalfFull
  | Full
  | Empty;

type cowStateT = {
  momentum: vec2,
  health: int,
};

type chickenStateT = {
  momentum: vec2,
  health: int,
};

type bossStateT = {hunger: int};

type gameobjectStateT =
  | Corn(int)
  | Cow(cowStateT)
  | WaterTank(tankStateT)
  | FoodTank(tankStateT)
  | Chicken(chickenStateT)
  | Boss(bossStateT)
  | Chick(chickenStateT)
  | IsASeedBin
  | NoState;

type gameobjectT =  {
  pos: vec2,
  action: actionT,
  state: gameobjectStateT,
};

let posMake = (x, y) => {x: float_of_int(x), y: float_of_int(y)};

module StringMap = Map.Make(String);

type assetT = {
  size: vec2,
  pos: vec2,
};

type journalEntryT = string;

type dayTransitionT =
  | NoTransition
  | JournalIn
  | JournalOut
  | FadeOut
  | FadeIn;

type journalT = {
  dayIndex: int,
  journalEntries: array(array(journalEntryT)),
  dayTransition: dayTransitionT,
  animationTime: float,
  backgroundImage: Reprocessing.imageT,
};

type stateT = {
  grid: array(array(tileT)),
  plants: array(array(plantT)),
  playerPos: vec2,
  playerFacing: directionT,
  spritesheet: Reprocessing.imageT,
  assets: StringMap.t(assetT),
  currentItem: option(carryableT),
  gameobjects: list(gameobjectT),
  journal: journalT,
  dollarAnimation: float,
  time: float,
};

let screenSize = 600.;

let playerSpeed = 150.;

let tileSize = 32;

let tileSizef = float_of_int(tileSize);

let drawAsset = (x, y, name, state, env) =>
  switch (StringMap.find(name, state.assets)) {
  | exception Not_found =>
    print_endline(
      "Asset " ++ name ++ " not found. Get your shit together man.",
    )
  | asset =>
    Reprocessing.Draw.subImage(
      state.spritesheet,
      ~pos=(x, y),
      ~width=int_of_float(asset.size.x),
      ~height=int_of_float(asset.size.y),
      ~texPos=(int_of_float(asset.pos.x), int_of_float(asset.pos.y)),
      ~texWidth=int_of_float(asset.size.x),
      ~texHeight=int_of_float(asset.size.y),
      env,
    )
  };

let drawAssetf = (x, y, name, state, env) =>
  switch (StringMap.find(name, state.assets)) {
  | exception Not_found =>
    print_endline(
      "Asset " ++ name ++ " not found. Get your shit together man.",
    )
  | asset =>
    Reprocessing.Draw.subImagef(
      state.spritesheet,
      ~pos=(x, y),
      ~width=asset.size.x,
      ~height=asset.size.y,
      ~texPos=(int_of_float(asset.pos.x), int_of_float(asset.pos.y)),
      ~texWidth=int_of_float(asset.size.x),
      ~texHeight=int_of_float(asset.size.y),
      env,
    )
  };

let anyKey = (keys, env) =>
  List.exists(k => Reprocessing.Env.key(k, env), keys);

let facingToOffset = dir =>
  switch (dir) {
  | UpD => {x: 0., y: (-0.5)}
  | DownD => {x: 0., y: 0.5}
  | RightD => {x: 0.5, y: 0.}
  | LeftD => {x: (-0.5), y: 0.}
  };

let handleCollision = (prevOffset, offset, pos, grid) => {
  let l = [
    (0, 0),
    (1, 1),
    ((-1), (-1)),
    ((-1), 1),
    ((-1), 0),
    (0, (-1)),
    (1, (-1)),
    (1, 0),
    (0, 1),
  ];
  let collided =
    List.exists(
      ((dx, dy)) => {
        let padding = 8.;
        let tx = dx + int_of_float((offset.x +. pos.x) /. tileSizef);
        let ty = dy + int_of_float((offset.y +. pos.y) /. tileSizef);
        if (tx >= Array.length(grid)
            || tx < 0
            || ty > Array.length(grid[0])
            || ty < 0) {
          true;
        } else {
          switch (grid[tx][ty]) {
          | Blocked
          | Water
          | Fence(_)
          | SeedBin
          | WaterTrough
          | Truck
          | FoodTrough =>
            Reprocessing.Utils.intersectRectRect(
              ~rect1Pos=(
                pos.x +. offset.x +. padding,
                pos.y +. offset.y +. padding,
              ),
              ~rect1W=tileSizef -. padding -. padding,
              ~rect1H=tileSizef -. padding -. padding,
              ~rect2Pos=(
                float_of_int(tx * tileSize),
                float_of_int(ty * tileSize),
              ),
              ~rect2W=tileSizef,
              ~rect2H=tileSizef,
            )
          | _ => false
          };
        };
      },
      l,
    );
  if (collided) {prevOffset} else {offset};
};
