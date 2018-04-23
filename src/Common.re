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
  | Wood
  | Knife;

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
  | DoBarnDoor
  | GoToBed
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

type barnDoorT =
  | Broken
  | Opened
  | Closed;

type bossStateT = {
  hunger: int,
  eatingTime: float,
  killed: list(gameobjectT),
  eating: bool,
}
and gameobjectStateT =
  | Corn(int)
  | Cow(cowStateT)
  | WaterTank(tankStateT)
  | FoodTank(tankStateT)
  | Chicken(chickenStateT)
  | Boss(bossStateT)
  | Chick(chickenStateT)
  | IsASeedBin
  | NoState
  | BarnDoor(barnDoorT)
  | Tombstone
and gameobjectT = {
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
  journalEntries: array(array(array(journalEntryT))),
  dayTransition: dayTransitionT,
  animationTime: float,
  pageNumber: int,
};

type stateT = {
  grid: array(array(tileT)),
  plants: array(array(plantT)),
  playerPos: vec2,
  playerFacing: directionT,
  spritesheet: Reprocessing.imageT,
  assets: StringMap.t(assetT),
  sounds: StringMap.t((Reprocessing.soundT, float)),
  currentItem: option(carryableT),
  gameobjects: list(gameobjectT),
  journal: journalT,
  dollarAnimation: float,
  time: float,
  night: bool,
  mainFont: Reprocessing.fontT,
};

let screenSize = 600.;

let playerSpeed = 150.;

let tileSize = 32;

let tileSizef = float_of_int(tileSize);

let drawAssetFullscreen = (name, state, env) =>
  switch (StringMap.find(name, state.assets)) {
  | exception Not_found =>
    print_endline(
      "Asset " ++ name ++ " not found. Get your shit together man.",
    )
  | asset =>
    Reprocessing.Draw.subImage(
      state.spritesheet,
      ~pos=(0, 0),
      ~width=Reprocessing.Env.width(env),
      ~height=Reprocessing.Env.height(env),
      ~texPos=(int_of_float(asset.pos.x), int_of_float(asset.pos.y)),
      ~texWidth=int_of_float(asset.size.x),
      ~texHeight=int_of_float(asset.size.y),
      env,
    )
  };

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

let soundNames = [
  ("day1", 1.0),
  ("day2", 1.0),
  ("day3", 1.0),
  ("day4", 1.0),
  ("day5", 1.0),
  ("night1", 1.0),
  ("night2", 1.0),
  ("night3", 1.0),
  ("night4", 1.0),
];

let playSound = (name, state, env) =>
  switch (StringMap.find(name, state.sounds)) {
  | (s, volume) => Reprocessing.Env.playSound(s, ~loop=false, ~volume, env)
  | exception Not_found => print_endline("Couldn't find sound " ++ name)
  };

let loadSounds = env => {
  let loadSoundHelper = (soundMap, (soundName: string, volume)) =>
    StringMap.add(
      soundName,
      (
        Reprocessing.Env.loadSound(
          Printf.sprintf("sounds/%s.wav", soundName),
          env,
        ),
        volume,
      ),
      soundMap,
    );
  List.fold_left(loadSoundHelper, StringMap.empty, soundNames);
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

let handleCollision = (state, prevOffset, offset, pos, grid) => {
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
  let padding = 8.;
  let collided =
    List.exists(
      ((dx, dy)) => {
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
  /*.Check if anything collides with the barn door */
  let collided =
    if (! collided) {
      /* barn door pos = {
           x: tileSizef *. 10.,
           y: tileSizef *. 16.,
         } */
      let collided =
        Reprocessing.Utils.intersectRectRect(
          ~rect1Pos=(pos.x +. offset.x, pos.y +. offset.y),
          ~rect1W=tileSizef,
          ~rect1H=tileSizef,
          ~rect2Pos=(256., 512.),
          ~rect2W=tileSizef *. 3.,
          ~rect2H=tileSizef -. 8. /* Small offset because otherwise you can kinda get stuck inside the barn door.. .*/
        );
      if (collided) {
        List.exists(
          g =>
            switch (g) {
            | {state: BarnDoor(Closed)} => true
            | _ => false
            },
          state.gameobjects,
        );
      } else {
        false;
      };
    } else {
      true;
    };
  if (collided) {prevOffset} else {offset};
};
