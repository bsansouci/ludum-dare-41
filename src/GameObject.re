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
                  x != 21 ?
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
                      state: Corn(5),
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
  let addChick = gos => [
    {
      pos: {
        x: Utils.randomf(~min=11., ~max=27.) *. tileSizef,
        y: Utils.randomf(~min=18., ~max=20.) *. tileSizef,
      },
      action: NoAction,
      state: Chick({
               momentum: {
                 x: 0.,
                 y: 0.,
               },
               health: 1,
             }),
    },
    ...gos,
  ];
  let gameobjects =
    addChick(
      addChick(
        addChick(
          addChick(
            addChick(
              addChick([
                {
                  pos: {
                    x: tileSizef *. 17.8,
                    y: tileSizef *. 10.,
                  },
                  action: GoToBed,
                  state: NoState,
                },
                {
                  pos: {
                    x: 9. *. tileSizef,
                    y: 6. *. tileSizef,
                  },
                  action: NoAction,
                  state: Tombstone,
                },
                {
                  pos: {
                    x: tileSizef *. 10.,
                    y: tileSizef *. 17.,
                  }, /* off by one so the door's drawn on top of the barn */
                  action: DoBarnDoor,
                  state: BarnDoor(Broken),
                },
                {
                  pos: {
                    x: 6. *. tileSizef,
                    y: 13. *. tileSizef,
                  },
                  action: PickUp(Knife),
                  state: NoState,
                },
                {
                  pos: {
                    x: 6. *. tileSizef,
                    y: 17. *. tileSizef,
                  },
                  action: PickUp(Milk),
                  state: Cow({
                           momentum: {
                             x: 0.,
                             y: 0.,
                           },
                           health: 4,
                         }),
                },
                {
                  pos: {
                    x: 8. *. tileSizef,
                    y: 16. *. tileSizef,
                  },
                  action: NoAction,
                  state: Chicken({
                           momentum: {
                             x: 0.,
                             y: 0.,
                           },
                           health: 1,
                         }),
                },
                ...gameobjects,
              ]),
            ),
          ),
        ),
      ),
    );
  gameobjects;
};

let updateDaily = state => state;

let maybeHighlight = (state, g, focusedObject, env) =>
  switch (focusedObject) {
  | Some(fgo) when fgo === g =>
    switch (state.currentItem, fgo.action) {
    | (None, PickUp(Corn))
    | (Some(Water), WaterCorn)
    | (Some(Water), WaterAnimals)
    | (Some(Corn), FeedAnimals)
    | (Some(Seed), PlantSeed) =>
      Draw.fill(Utils.color(~r=150, ~g=150, ~b=40, ~a=100), env);
      /*Draw.strokeWeight(6, env);*/
      /*Draw.stroke(Utils.color(150, 150, 40, 255), env);*/
      Draw.rectf(
        ~pos=(g.pos.x -. tileSizef /. 2., g.pos.y -. tileSizef /. 2.),
        ~width=tileSizef,
        ~height=tileSizef,
        env,
      );
    /*Draw.tint(Utils.color(~r=0, ~g=0, ~b=0, ~a=255), env)*/
    | _ => ()
    }
  | _ => ()
  };

let moveAnimal = (state, mx, my, speed, pos, grid, env) => {
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
    handleCollision(
      state,
      {x: 0., y: 0.},
      {x: dt *. mx, y: dt *. my},
      pos,
      grid,
    );
  ({x: pos.x +. offset.x, y: pos.y +. offset.y}, mx, my);
};

let update = (state, env) => {
  ...state,
  gameobjects:
    List.map(
      (g: gameobjectT) =>
        switch (g) {
        | {pos, state: Cow({momentum: {x, y}, health} as cow)}
            when health > 0 =>
          let (pos, x, y) =
            moveAnimal(state, x, y, 1., pos, state.grid, env);
          {...g, pos, state: Cow({
                               ...cow,
                               momentum: {
                                 x,
                                 y,
                               },
                             })};
        | {pos, state: Chicken({momentum: {x, y}, health} as chicken)}
            when health > 0 =>
          let (pos, x, y) =
            moveAnimal(state, x, y, 2., pos, state.grid, env);
          {...g, pos, state: Chicken({
                               ...chicken,
                               momentum: {
                                 x,
                                 y,
                               },
                             })};
        | {pos, state: Chick({momentum: {x, y}, health} as chick)}
            when health > 0 =>
          let (pos, x, y) =
            moveAnimal(state, x, y, 4., pos, state.grid, env);
          {...g, pos, state: Chick({
                               ...chick,
                               momentum: {
                                 x,
                                 y,
                               },
                             })};
        | {
            pos: {x: bx, y: by} as pos,
            state: Boss({hunger, eatingTime, eating} as bossState),
          } =>
          if (eatingTime <= 0.) {
            let allNextTargets =
              List.filter(
                g =>
                  switch (g) {
                  | {state: Chicken({health: 0})}
                  | {state: Cow({health: 0})}
                  | {state: Chick({health: 0})} => true
                  | _ => false
                  },
                state.gameobjects,
              );
            let allNextTargets =
              List.sort(
                (
                  {pos: {x: x1, y: y1}}: gameobjectT,
                  {pos: {x: x2, y: y2}}: gameobjectT,
                ) => {
                  let dx1 = x1 -. bx;
                  let dy1 = y1 -. by;
                  let dx2 = x2 -. bx;
                  let dy2 = y2 -. by;
                  int_of_float(dx1 +. dy1 -. dx2 -. dy2);
                },
                allNextTargets,
              );
            let (nextTarget, isPlayer) =
              switch (allNextTargets) {
              | [] => (
                  {
                    x: state.playerPos.x +. tileSizef /. 2.,
                    y: state.playerPos.y +. tileSizef /. 2.,
                  },
                  true,
                )
              | [first, ..._] => (first.pos, false)
              };
            let dx = nextTarget.x -. bx;
            let dy = nextTarget.y -. by;
            let mag = Utils.magf((dx, dy));
            let isTargetCloseEnough = mag < 32.;
            if (isTargetCloseEnough) {
              print_endline("CLOSE");
            };
            if (isPlayer && isTargetCloseEnough) {
              print_endline("You should be dead by now");
            };
            let moveBoss = ({x: bx, y: by} as pos, nextTarget, grid) => {
              let bossSpeed = 100.;
              let bossSpeedDt = Env.deltaTime(env) *. bossSpeed;
              let dx = nextTarget.x -. bx;
              let dy = nextTarget.y -. by;
              let mag = Utils.magf((dx, dy));
              if (mag > 0.) {
                let dx = dx /. mag *. bossSpeedDt;
                let dy = dy /. mag *. bossSpeedDt;
                let offset =
                  handleCollision(
                    state,
                    {x: 0., y: 0.},
                    {x: dx, y: dy},
                    pos,
                    grid,
                  );
                {x: bx +. offset.x, y: by +. offset.y};
              } else {
                pos;
              };
            };
            {
              ...g,
              pos: moveBoss(pos, nextTarget, state.grid),
              state:
                Boss({
                  ...bossState,
                  killed:
                    isTargetCloseEnough && ! isPlayer && eating ?
                      [List.hd(allNextTargets), ...bossState.killed] :
                      bossState.killed,
                  eating: isTargetCloseEnough && ! eating,
                  eatingTime: isTargetCloseEnough && ! eating ? 3. : 0.,
                }),
            };
          } else {
            {
              ...g,
              state:
                Boss({
                  ...bossState,
                  eatingTime: eatingTime -. Env.deltaTime(env),
                }),
            };
          }
        /*{
            ...g,
            pos:
          }*/
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
    );
    maybeHighlight(state, g, focusedObject, env);
  | {state: Corn((-1))} => maybeHighlight(state, g, focusedObject, env)
  | {pos: {x, y}, action, state: Corn(0 as stage)}
  | {pos: {x, y}, action, state: Corn(1 as stage)}
  | {pos: {x, y}, action, state: Corn(2 as stage)}
  | {pos: {x, y}, action, state: Corn(3 as stage)}
  | {pos: {x, y}, action, state: Corn(4 as stage)}
  | {pos: {x, y}, action, state: Corn(5 as stage)} =>
    if (action == NoAction) {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "dry_mud.png",
        state,
        env,
      );
    };
    maybeHighlight(state, g, focusedObject, env);
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
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "poo.png",
      state,
      env,
    )
  | {pos: {x, y}, action: NoAction, state: Chick({health})} =>
    if (health === (-1)) {
      Draw.fill(Utils.color(255, 0, 0, 255), env);
      Draw.rectf(~pos=(x, y), ~width=tileSizef, ~height=tileSizef, env);
    } else if (health === 0) {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "dead_chick.png",
        state,
        env,
      );
    } else {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "chick.png",
        state,
        env,
      );
    }
  | _ => ()
  };
  Draw.popStyle(env);
};

let renderObject = (g, playerInBarn, focusedObject, state, env) =>
  switch (g) {
  | {pos: {x, y}, state: Tombstone} when playerInBarn =>
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "tombstone.png",
      state,
      env,
    )
  | {pos: {x, y}, action: DoBarnDoor} when ! playerInBarn =>
    /*Draw.fill(Utils.color(255, 0, 0, 255), env);
      Draw.rectf(~pos=(x,
        y), ~width=tileSizef, ~height=tileSizef, env);*/
    drawAssetf(
      x -. tileSizef /. 2. +. 3.,
      y -. 2. *. tileSizef -. tileSizef /. 2.,
      "barn_door.png",
      state,
      env,
    )
  /*Draw.fill(Utils.color(255, 0, 255, 255), env);
    Draw.rectf(~pos=(x, y), ~width=tileSizef, ~height=tileSizef, env);*/
  | {pos: {x, y}, action: PickUp(Seed)} =>
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "seed_bucket.png",
      state,
      env,
    )
  | {pos: {x, y}, action: NoAction, state: Cow({health})}
  | {pos: {x, y}, action: PickUp(Milk), state: Cow({health})} =>
    if (health === (-1)) {
      Draw.fill(Utils.color(255, 0, 0, 255), env);
      Draw.rectf(~pos=(x, y), ~width=tileSizef, ~height=tileSizef, env);
    } else if (health === 0) {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "dead_cown.png",
        state,
        env,
      );
    } else {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "pile_of_bacon.png",
        state,
        env,
      );
    }
  | {pos: {x, y}, action: NoAction, state: Chicken({health})} =>
    if (health === (-1)) {
      Draw.fill(Utils.color(255, 0, 0, 255), env);
      Draw.rectf(~pos=(x, y), ~width=tileSizef, ~height=tileSizef, env);
    } else if (health === 0) {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "dead_chicken.png",
        state,
        env,
      );
    } else {
      drawAssetf(
        x -. tileSizef /. 2.,
        y -. tileSizef /. 2.,
        "bet_he_would_make_some_nice_fried_chicken.png",
        state,
        env,
      );
    }
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
    maybeHighlight(state, g, focusedObject, env);
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
    maybeHighlight(state, g, focusedObject, env);
  | {pos: {x, y}, state: Corn(2 as stage)}
  | {pos: {x, y}, state: Corn(3 as stage)}
  | {pos: {x, y}, state: Corn(4 as stage)}
  | {pos: {x, y}, state: Corn(5 as stage)} =>
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
  /*| {action: PickUp(Water)} => maybeHighlight(state, g, focusedObject, env)*/
  | {pos: {x, y}, action: PickUp(Egg)} =>
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "egg.png",
      state,
      env,
    )
  | {pos: {x, y}, state: Boss(_)} =>
    Draw.pushStyle(env);
    Draw.tint(Utils.color(0, 0, 0, 255), env);
    drawAssetf(
      x -. tileSizef /. 2.,
      y -. tileSizef /. 2.,
      "egg.png",
      state,
      env,
    );
    Draw.popStyle(env);
  | {pos: {x, y}, action: PickUp(Knife)} =>
    Draw.fill(Utils.color(0, 0, 0, 255), env);
    Draw.rectf(~pos=(x, y), ~width=tileSizef, ~height=tileSizef, env);
  /*TODO Draw highlighted pond*/
  | _ => ()
  };

let renderAction = (state, playerInBarn, finishedAllTasks, focusedObject, env) => {
  let body =
    switch (state.currentItem, focusedObject) {
    | (None, Some({action: PickUp(Corn)})) => "Pickup corn"
    | (None, Some({action: PickUp(Water)})) => "Pickup water"
    | (None, Some({action: PickUp(Egg)})) => "Pickup egg"
    | (None, Some({action: PickUp(Milk), state: Cow({health})}))
        when health > 0 => "Milk cow"
    | (None, Some({action: PickUp(Seed)})) => "Pickup seed"
    | (None, Some({action: PickUp(Knife)})) => "Pickup ... the knife?"
    | (None, Some({action: DoBarnDoor, state: BarnDoor(Broken)}))
        when ! playerInBarn => "Repair barn door"
    | (None, Some({action: DoBarnDoor, state: BarnDoor(Opened)}))
        when ! playerInBarn => "Close barn door"
    | (None, Some({action: DoBarnDoor, state: BarnDoor(Closed)}))
        when ! playerInBarn => "Open barn door"
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
    | (_, Some({action: GoToBed})) when finishedAllTasks => "Go to bed"
    | _ => ""
    };
  if (body != "") {
    Draw.pushStyle(env);
    Draw.fill(Utils.color(~r=255, ~g=255, ~b=255, ~a=255), env);
    let padding = 16;
    let width = Draw.textWidth(~body, ~font=state.mainFont, env);
    Draw.rect(~pos=(0, 0), ~width=width + padding * 2, ~height=70, env);
    Draw.tint(Utils.color(0, 0, 0, 255), env);
    Draw.text(~body, ~font=state.mainFont, ~pos=(padding, 45), env);
    Draw.popStyle(env);
  };
};

let applyAction = (state, playerInBarn, finishedAllTasks, focusedObject, env) =>
  if (state.journal.dayTransition == NoTransition
      && (Env.keyPressed(X, env) || Env.keyPressed(Space, env))) {
    switch (state.currentItem, focusedObject) {
    | (_, Some({action: GoToBed})) when finishedAllTasks => (
        {
          ...state,
          journal: {
            ...state.journal,
            dayTransition: FadeOut,
            animationTime: 0.,
          },
        },
        focusedObject,
      )
    | (
        None,
        Some({action: DoBarnDoor, pos, state: BarnDoor(barnState)} as go),
      )
        when ! playerInBarn =>
      let (nextBarnState, pos) =
        switch (barnState) {
        | Broken => (Opened, pos)
        | Opened => (Closed, {x: pos.x -. tileSizef, y: pos.y})
        | Closed => (Opened, {x: pos.x +. tileSizef, y: pos.y})
        };
      (
        {
          ...state,
          gameobjects:
            List.map(
              g =>
                g === go ? {...g, state: BarnDoor(nextBarnState), pos} : g,
              state.gameobjects,
            ),
        },
        None,
      );
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
    | (None, Some({action: PickUp(Milk), state: Cow({health})} as cow))
        when health > 0 => (
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
    | (None, Some({action: PickUp(Knife)} as knife)) => (
        {
          ...state,
          currentItem: Some(Knife),
          gameobjects: List.filter(go => go !== knife, state.gameobjects),
        },
        None,
      )
    | (Some(Knife), Some({state: Chick(s)} as go)) => (
        {
          ...state,
          gameobjects:
            List.map(
              g => g === go ? {...g, state: Chick({...s, health: 0})} : g,
              state.gameobjects,
            ),
        },
        focusedObject,
      )
    | (Some(Knife), Some({state: Chicken(s)} as go)) => (
        {
          ...state,
          gameobjects:
            List.map(
              g => g === go ? {...g, state: Chicken({...s, health: 0})} : g,
              state.gameobjects,
            ),
        },
        focusedObject,
      )
    | (Some(Knife), Some({state: Cow(s)} as go)) => (
        {
          ...state,
          gameobjects:
            List.map(
              g => g === go ? {...g, state: Cow({...s, health: 0})} : g,
              state.gameobjects,
            ),
        },
        focusedObject,
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
    | (Some(Seed), Some({action: PickUp(Seed)})) => (
        {...state, currentItem: None},
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
    | _ => (state, focusedObject)
    };
  } else {
    (state, focusedObject);
  };
