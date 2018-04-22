let debug = true;

type plantT = int;

type tileT =
  | Dirt
  | Grass(int)
  | Fence
  | Floor
  | Water
  | Blocked;

type directionT =
  | UpD
  | DownD
  | RightD
  | LeftD;

type vec2 = {
  x: float,
  y: float
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
  | MilkCow
  | WaterCorn
  | PlantSeed
  | Harvest
  | PutBackWater
  | PutBackSeed
  | Sell(carryableT)
  | NoAction;

type cornStateT = {
  stage: int,
  isWatered: bool
};

type cowStateT =
  | HasMilk
  | NoMilk;

type waterTankStateT =
  | HalfFull
  | Full
  | Empty;

type gameobjectStateT =
  | Corn(cornStateT)
  | Cow(cowStateT)
  | WaterTank(waterTankStateT)
  | Chicken
  | NoState;

type gameobjectT = {
  pos: vec2,
  action: actionT,
  state: gameobjectStateT
};

let posMake = (x, y) => {x: float_of_int(x), y: float_of_int(y)};

module StringMap = Map.Make(String);

type assetT = {
  size: vec2,
  pos: vec2
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
  backgroundImage: Reprocessing.imageT
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
  journal: journalT
};

let screenSize = 600.;

let playerSpeed = 150.;

let tileSize = 32;

let tileSizef = float_of_int(tileSize);

let drawAsset = (x, y, name, state, env) =>
  switch (StringMap.find(name, state.assets)) {
  | exception Not_found =>
    print_endline("Asset " ++ name ++ " not found. Get your shit together man.")
  | asset =>
    Reprocessing.Draw.subImage(
      state.spritesheet,
      ~pos=(x, y),
      ~width=int_of_float(asset.size.x) + 1,
      ~height=int_of_float(asset.size.y) + 1,
      ~texPos=(int_of_float(asset.pos.x), int_of_float(asset.pos.y)),
      ~texWidth=int_of_float(asset.size.x),
      ~texHeight=int_of_float(asset.size.y),
      env
    )
  };

let drawAssetf = (x, y, name, state, env) =>
  switch (StringMap.find(name, state.assets)) {
  | exception Not_found =>
    print_endline("Asset " ++ name ++ " not found. Get your shit together man.")
  | asset =>
    Reprocessing.Draw.subImagef(
      state.spritesheet,
      ~pos=(x, y),
      ~width=asset.size.x,
      ~height=asset.size.y,
      ~texPos=(int_of_float(asset.pos.x), int_of_float(asset.pos.y)),
      ~texWidth=int_of_float(asset.size.x),
      ~texHeight=int_of_float(asset.size.y),
      env
    )
  };

let anyKey = (keys, env) => List.exists((k) => Reprocessing.Env.key(k, env), keys);

let facingToOffset = (dir) =>
  switch dir {
  | UpD => {x: 0., y: (-1.)}
  | DownD => {x: 0., y: 1.}
  | RightD => {x: 1., y: 0.}
  | LeftD => {x: (-1.), y: 0.}
  };
