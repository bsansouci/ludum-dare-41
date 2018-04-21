let debug = true;

type plantT = int;

type tileT =
  | Dirt
  | Grass
  | Fence
  | Floor
  | Blocked;

type vec2 = {
  x: float,
  y: float
};

type carryableT =
  | Seed
  | Water
  | Milk
  | Eggs
  | Corn
  | Wood;

type actionsT =
  | PickUp(carryableT)
  | Cleanup
  | MilkCow
  | WaterCorn
  | PlantSeed
  | Harvest
  | Sell(carryableT)
  | DoNothing;

type gameobjectT = {
  pos: vec2,
  action: actionsT
};

let posMake = (x, y) => {x: float_of_int(x), y: float_of_int(y)};

module StringMap = Map.Make(String);

type assetT = {
  size: vec2,
  pos: vec2
};

type journalEntryT = string;

type stateT = {
  grid: array(array(tileT)),
  plants: array(array(plantT)),
  playerPos: vec2,
  spritesheet: Reprocessing.imageT,
  assets: StringMap.t(assetT),
  currentItem: option(carryableT),
  gameobjects: list(gameobjectT),
  facingDir: vec2,
  dayIndex: int,
  journal: array(journalEntryT)
};

let screenSize = 600.;

let playerSpeed = 300.;

let tileSize = 64;

let tileSizef = float_of_int(tileSize);

let drawAsset = (x, y, name, state, env) => {
    let asset = StringMap.find(name, state.assets);
    Reprocessing.Draw.subImage(
      state.spritesheet,
      ~pos=(x, y),
      ~width=tileSize,
      ~height=tileSize,
      ~texPos=(int_of_float(asset.pos.x), int_of_float(asset.pos.y)),
      ~texWidth=int_of_float(asset.size.x),
      ~texHeight=int_of_float(asset.size.y),
      env
    )
  };

let drawAssetf = (x, y, name, state, env) => {
    let asset = StringMap.find(name, state.assets);
    Reprocessing.Draw.subImage(
      state.spritesheet,
      ~pos=(int_of_float(x), int_of_float(y)),
      ~width=tileSize,
      ~height=tileSize,
      ~texPos=(int_of_float(asset.pos.x), int_of_float(asset.pos.y)),
      ~texWidth=int_of_float(asset.size.x),
      ~texHeight=int_of_float(asset.size.y),
      env
    )
  };
