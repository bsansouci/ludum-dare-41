open Reprocessing;

open Common;

let init = grid => {
  let (_, gameobjects) =
    Array.fold_left(
      ((x, gameobjects), col) => {
        let (_, gameobjects) =
          Array.fold_left(
            ((y, gameobjects), tile) => (
              y + 1,
              switch (tile) {
              | Dirt => [
                  x != 13 ?
                    {
                      pos:
                        posMake(
                          x * tileSize + tileSize / 2,
                          y * tileSize + tileSize / 2,
                        ),
                      action: PlantSeed,
                      state: Corn(-1),
                    } :
                    {
                      pos:
                        posMake(
                          x * tileSize + tileSize / 2,
                          y * tileSize + tileSize / 2,
                        ),
                      action: PickUp(Corn),
                      state: NoState,
                    },
                  ...gameobjects,
                ]
              | Water => [
                  {
                    pos:
                      posMake(
                        x * tileSize + tileSize / 2,
                        y * tileSize + tileSize / 2,
                      ),
                    action: PickUp(Water),
                    state: NoState,
                  },
                  ...gameobjects,
                ]
              | WaterTrough => [
                  {
                    pos:
                      posMake(
                        x * tileSize + tileSize / 2,
                        y * tileSize + tileSize / 2,
                      ),
                    action: WaterAnimals,
                    state: WaterTank(Empty),
                  },
                  ...gameobjects,
                ]
              | FoodTrough => [
                  {
                    pos:
                      posMake(
                        x * tileSize + tileSize / 2,
                        y * tileSize + tileSize / 2,
                      ),
                    action: FeedAnimals,
                    state: FoodTank(Empty),
                  },
                  ...gameobjects,
                ]
              | SeedBin => [
                  {
                    pos:
                      posMake(
                        x * tileSize + tileSize / 2,
                        y * tileSize + tileSize / 2,
                      ),
                    action: PickUp(Seed),
                    state: IsASeedBin,
                  },
                  ...gameobjects,
                ]
              | Truck => [
                  {
                    pos:
                      posMake(
                        x * tileSize + tileSize / 2,
                        y * tileSize + tileSize / 2,
                      ),
                    action: Sell,
                    state: NoState,
                  },
                  ...gameobjects,
                ]
              | _ => gameobjects
              },
            ),
            (0, gameobjects),
            col,
          );
        (x + 1, gameobjects);
      },
      (0, []),
      grid,
    );
  let gameobjects = [
    {
      pos: {
        x: 4. *. tileSizef,
        y: 12. *. tileSizef,
      },
      action: PickUp(Milk),
      state: Cow(0., 0.),
    },
    {
      pos: {
        x: 8. *. tileSizef,
        y: 11. *. tileSizef,
      },
      action: NoAction,
      state: Chicken(0., 0.),
    },
    ...gameobjects,
  ];
  gameobjects;
};

let updateDaily = state => state;

let maybeHighlight = (state, g, focusedObject, env) =>
  switch (focusedObject) {
  | Some(fgo) when fgo === g =>
    switch (state.currentItem, fgo.action) {
    | (Some(Water), WaterCorn)
    | (None, PickUp(Corn))
    | (None, PickUp(Egg))
    | (None, PickUp(Seed))
    | (None, PickUp(Water))
    | (None, PickUp(Milk))
    | (None, Cleanup) =>
      Draw.tint(Utils.color(~r=0, ~g=0, ~b=0, ~a=255), env)
    | _ => ()
    }
  | _ => ()
  };

let moveAnimal = (mx, my, speed, pos, grid, env) => {
  let mx =
    Utils.constrain(
      ~amt=mx +. Random.float(2.) -. 1.,
      ~low=(-5.) *. speed,
      ~high=5. *. speed,
    );
  let my =
    Utils.constrain(
      ~amt=my +. Random.float(2.) -. 1.,
      ~low=(-5.) *. speed,
      ~high=5. *. speed,
    );
  let dt = Reprocessing.Env.deltaTime(env);
  let offset =
    handleCollision({x: 0., y: 0.}, {x: dt *. mx, y: dt *. my}, pos, grid);
  ({x: pos.x +. offset.x, y: pos.y +. offset.y}, mx, my);
};

let update = (state, env) => {
  ...state,
  gameobjects:
    List.map(
      (g: gameobjectT) =>
        switch (g) {
        | {pos, state: Cow(mx, my)} =>
          let (pos, mx, my) = moveAnimal(mx, my, 1., pos, state.grid, env);
          {...g, pos, state: Cow(mx, my)};
        | {pos, state: Chicken(mx, my)} =>
          let (pos, mx, my) = moveAnimal(mx, my, 2., pos, state.grid, env);
          {...g, pos, state: Chicken(mx, my)};
        | _ => g
        },
      state.gameobjects,
    ),
};

let renderBefore = (g, focusedObject, state, env) => {
  Draw.pushStyle(env);
  switch (g) {
  | {pos: {x, y}, action: PickUp(Corn)} =>
    /* Don't highlight when there's no action */
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "dry_mud.png",
      state,
      env,
    )
  | {pos: {x, y}, action, state: Corn(0 as stage)}
  | {pos: {x, y}, action, state: Corn(1 as stage)} =>
    maybeHighlight(state, g, focusedObject, env);
    if (action == NoAction) {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "dry_mud.png",
        state,
        env,
      );
    };
    if (stage === 0) {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "stage_zero_corn_fetus.png",
        state,
        env,
      );
    } else if (stage === 1) {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "stage_one_corn_toddler.png",
        state,
        env,
      );
    };
  | {pos: {x, y}, action: Cleanup} =>
    maybeHighlight(state, g, focusedObject, env);
    Draw.fill(Utils.color(~r=100, ~g=100, ~b=10, ~a=255), env);
    Draw.rectf(
      ~pos=(x -. tileSizef /. 2., y -. tileSizef /. 2.),
      ~width=tileSizef,
      ~height=tileSizef,
      env,
    );
  | _ => ()
  };
  Draw.popStyle(env);
};

let renderObject = (g, focusedObject, state, env) => {
  Draw.pushStyle(env);
  switch (g) {
  | {pos: {x, y}, action: PickUp(Corn)} =>
    maybeHighlight(state, g, focusedObject, env);
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "stage_five_le_ble_d_inde.png",
      state,
      env,
    );
  | {pos: {x, y}, action: PickUp(Seed)} =>
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "seed_bucket.png",
      state,
      env,
    )
  | {pos: {x, y}, action: NoAction, state: Cow(_, _)}
  | {pos: {x, y}, action: PickUp(Milk), state: Cow(_, _)} =>
    maybeHighlight(state, g, focusedObject, env);
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "pile_of_bacon.png",
      state,
      env,
    );
  | {pos: {x, y}, action: NoAction, state: Chicken(_, _)} =>
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "bet_he_would_make_some_nice_fried_chicken.png",
      state,
      env,
    )
  | {pos: {x, y}, state: WaterTank(s)} =>
    let assetName =
      switch (s) {
      | Empty => "trough_empty_water.png"
      | HalfFull => "trough_water_half_full.png"
      | Full => "trough_water_full.png"
      };
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      assetName,
      state,
      env,
    );
  | {pos: {x, y}, state: FoodTank(s)} =>
    let assetName =
      switch (s) {
      | Empty => "trough_empty.png"
      | HalfFull => "trough_food_half_full.png"
      | Full => "trough_food_full.png"
      };
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      assetName,
      state,
      env,
    );
  | {pos: {x, y}, action, state: Corn(2 as stage)}
  | {pos: {x, y}, action, state: Corn(3 as stage)}
  | {pos: {x, y}, action, state: Corn(4 as stage)} =>
    maybeHighlight(state, g, focusedObject, env);
    if (action == NoAction) {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "dry_mud.png",
        state,
        env,
      );
    };
    let assetName =
      switch (stage) {
      | 2 => "stage_two_korn.png"
      | 3 => "stage_three_middle_aged_corn.png"
      | 4 => "stage_four_almost_corn.png"
      | 5 => "stage_five_le_ble_d_inde.png"
      | _ => failwith("There is no other stage.")
      };
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      assetName,
      state,
      env,
    );
  | {action: PickUp(Water)} => maybeHighlight(state, g, focusedObject, env)
  | {pos: {x, y}, action: PickUp(Egg)} =>
    maybeHighlight(state, g, focusedObject, env);
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "egg.png",
      state,
      env,
    );
  /*TODO Draw highlighted pond*/
  | _ => ()
  };
  Draw.popStyle(env);
};

let renderAction = (state, focusedObject, env) => {
  let body =
    switch (state.currentItem, focusedObject) {
    | (None, Some({action: PickUp(Corn)})) => "Pickup corn"
    | (None, Some({action: PickUp(Water)})) => "Pickup water"
    | (None, Some({action: PickUp(Egg)})) => "Pickup egg"
    | (None, Some({action: PickUp(Milk)})) => "Milk cow"
    | (None, Some({action: PickUp(Seed)})) => "Pickup seed"
    | (Some(Water), Some({action: PickUp(Water)})) => "Put back water"
    | (Some(_), Some({action: PickUp(Water)})) => "Drop into water"
    | (Some(Seed), Some({action: PickUp(Seed)})) => "Put back seed"
    | (Some(Seed), Some({action: PlantSeed})) => "Plant seed"
    | (Some(Water), Some({action: WaterCorn})) => "Water corn"
    | (Some(Water), Some({action: WaterAnimals})) => "Water animals"
    | (Some(Corn), Some({action: FeedAnimals})) => "Feed animals"
    | (Some(Egg), Some({action: Sell})) => "Sell egg"
    | (Some(Milk), Some({action: Sell})) => "Sell milk"
    | (Some(Water), Some({action: Cleanup})) => "Cleanup mess"
    | _ => ""
    };
  if (body != "") {
    Draw.fill(Utils.color(~r=255, ~g=255, ~b=255, ~a=255), env);
    let padding = 16;
    let width = Draw.textWidth(~body, env);
    Draw.rect(~pos=(0, 0), ~width=width + padding * 2, ~height=70, env);
    Draw.text(~body, ~pos=(padding, 20), env);
  };
};

let checkPickUp = (state, focusedObject, env) =>
  if (Env.keyPressed(X, env) || Env.keyPressed(Space, env)) {
    switch (state.currentItem, focusedObject) {
    | (None, Some({action: PickUp(Corn)} as go)) => (
        {
          ...state,
          currentItem: Some(Corn),
          gameobjects:
            List.map(
              g => g === go ? {...g, action: PlantSeed, state: Corn(-1)} : g,
              state.gameobjects,
            ),
        },
        None,
      )
    | (None, Some({action: PickUp(Water)})) => (
        {...state, currentItem: Some(Water)},
        None,
      )
    | (None, Some({action: PickUp(Seed)})) => (
        {...state, currentItem: Some(Seed)},
        None,
      )
    | (Some(_), Some({action: PickUp(Water)})) => (
        {...state, currentItem: None},
        focusedObject,
      )
    | (None, Some({action: PickUp(Milk)} as cow)) => (
        {
          ...state,
          currentItem: Some(Milk),
          gameobjects:
            List.map(
              go => go === cow ? {...cow, action: NoAction} : go,
              state.gameobjects,
            ),
        },
        Some({...cow, action: NoAction}),
      )
    | (None, Some({action: PickUp(Egg)} as egg)) => (
        {
          ...state,
          currentItem: Some(Egg),
          gameobjects: List.filter(go => go !== egg, state.gameobjects),
        },
        None,
      )
    | (
        Some(Water),
        Some({action: WaterAnimals, state: WaterTank(Empty as s)} as go),
      )
    | (
        Some(Water),
        Some({action: WaterAnimals, state: WaterTank(HalfFull as s)} as go),
      ) => (
        {
          ...state,
          currentItem: None,
          gameobjects:
            List.map(
              g =>
                if (g !== go) {
                  g;
                } else {
                  {
                    ...g,
                    action: s == Empty ? WaterAnimals : NoAction,
                    state: WaterTank(s == Empty ? HalfFull : Full),
                  };
                },
              state.gameobjects,
            ),
        },
        None,
      )
    | (
        Some(Corn),
        Some({action: FeedAnimals, state: FoodTank(Empty as s)} as go),
      )
    | (
        Some(Corn),
        Some({action: FeedAnimals, state: FoodTank(HalfFull as s)} as go),
      ) => (
        {
          ...state,
          currentItem: None,
          gameobjects:
            List.map(
              g =>
                if (g !== go) {
                  g;
                } else {
                  {
                    ...g,
                    action: s == Empty ? FeedAnimals : NoAction,
                    state: FoodTank(s == Empty ? HalfFull : Full),
                  };
                },
              state.gameobjects,
            ),
        },
        None,
      )
    | (Some(Seed), Some({action: PlantSeed, state: Corn(_)} as go)) => (
        {
          ...state,
          currentItem: None,
          gameobjects:
            List.map(
              g =>
                if (g !== go) {
                  g;
                } else {
                  {...g, action: WaterCorn, state: Corn(0)};
                },
              state.gameobjects,
            ),
        },
        None,
      )
    | (Some(Egg), Some({action: Sell}))
    | (Some(Milk), Some({action: Sell})) => (
        {...state, currentItem: None, dollarAnimation: 0.},
        None,
      )
    | (Some(Water), Some({action: Cleanup} as go)) => (
        {
          ...state,
          currentItem: None,
          gameobjects: List.filter(g => g !== go, state.gameobjects),
        },
        None,
      )
    | (Some(Water), Some({action: WaterCorn, state: Corn(stage)} as go)) => (
        {
          ...state,
          currentItem: None,
          gameobjects:
            List.map(
              g =>
                if (g !== go) {
                  g;
                } else {
                  {...g, action: NoAction, state: Corn(stage)};
                },
              state.gameobjects,
            ),
        },
        None,
      )
    | _ => (state, focusedObject)
    };
  } else {
    (state, focusedObject);
  };
