let debug = true;

type plantT = int;

type tileT =
  | Plant
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
  | WaterPlant
  | PlantSeed
  | Harvest
  | Sell(carryableT);

type gameobjectT = {
  pos: vec2,
  action: actionsT
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
  spritesheet: Reprocessing.imageT,
  assets: StringMap.t(assetT),
  currentItem: option(carryableT),
  gameobjects: list(gameobjectT),
  facingDir: vec2
};

let screenSize = 600.;

let playerSpeed = 300.;

let tileSize = 64;

let tileSizef = float_of_int(tileSize);
