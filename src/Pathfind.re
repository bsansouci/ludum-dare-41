open Common;

type tilePosT = {
  x: int,
  y: int,
  cost: float,
  parent: option(tilePosT),
};

let heuristic = (curr, goal) =>
  Reprocessing.Utils.dist(~p1=(curr.x, curr.y), ~p2=(goal.x, goal.y));

let heuristicVsPt = (x, y, goal) =>
  Reprocessing.Utils.dist(~p1=(x, y), ~p2=(goal.x, goal.y));

let neighborOffsets: list((int, int)) = {
  let cartesian = (l, l') =>
    List.concat(List.map(e => List.map(e' => (e, e'), l'), l));
  let offsetHelper = [0, (-1), 1];
  let product = cartesian(offsetHelper, offsetHelper);
  List.filter(p => p != (0, 0), product);
};

let neighbors =
    ({x, y}: tilePosT, grid: array(array(tileT)))
    : list((int, int)) => {
  let allNeighbors =
    List.map(((offx, offy)) => (x + offx, y + offy), neighborOffsets);
  let gridW = grid;
  let gridH = grid;
  let w = Array.length(grid[0]);
  let h = Array.length(grid);
  List.filter(
    ((x, y)) =>
      x > 0 && x < w && y > 0 && y < h && ! isCollidable(x, y, grid),
    allNeighbors,
  );
};

let removeMin = ((x, y) as goal: (int, int), lst) =>
  List.fold_left(
    (acc, p) => {
      let h = heuristicVsPt(x, y, p);
      switch (acc) {
      | None => Some((h, p, []))
      | Some((minh, min, rest)) when minh <= h =>
        Some((minh, min, [p, ...rest]))
      | Some((minh, min, rest)) => Some((h, p, [min, ...rest]))
      };
    },
    None,
    lst,
  );

let updateAndCheckContainment = ({x, y, cost, parent} as n, l) =>
  List.fold_left(
    ((found, rest), p) =>
      if (p.x == x && p.y == y) {
        let newCost =
          switch (parent) {
          | Some(parent) => parent.cost +. heuristic(parent, p)
          | None => 0.
          };
        (
          true,
          [p.cost < newCost ? p : {...p, cost: newCost, parent}, ...rest],
        );
      } else {
        (found, [p, ...rest]);
      },
    (false, []),
    l,
  );

let addIfNotInLists = (x, y, parent, ol, cl) => {
  let candidate = {
    x,
    y,
    parent: Some(parent),
    cost: parent.cost +. heuristicVsPt(x, y, parent),
  };
  let (containedOL, ol) = updateAndCheckContainment(candidate, ol);
  let (containedCL, cl) = updateAndCheckContainment(candidate, cl);
  if (containedOL || containedCL) {
    (ol, cl);
  } else {
    ([candidate, ...ol], cl);
  };
};

let rec getPathHelper = (ol, cl, (x, y) as goal: (int, int), grid) =>
  switch (removeMin(goal, ol)) {
  | None => None
  | Some((_, p, rest)) =>
    if (p.x == x && p.y == y) {
      Some
        (p); /*Found the goal*/
    } else {
      let (ol, cl): (list(tilePosT), list(tilePosT)) =
        List.fold_left(
          ((ol, cl), (x, y)) => addIfNotInLists(x, y, p, ol, cl),
          (rest, cl),
          neighbors(p, grid),
        );
      getPathHelper(ol, [p, ...cl], goal, grid);
    }
  };

let rec constructPathList = (goal, acc) =>
  switch (goal.parent) {
  | None => acc
  | Some(n) => constructPathList(n, [(n.x, n.y), ...acc])
  };

let printPathList = l =>
  switch (l) {
  | None => print_endline("No Path :(")
  | Some(l) =>
    List.iteri(
      (i, (x, y)) =>
        print_endline(
          string_of_int(i)
          ++ ":"
          ++ string_of_int(x)
          ++ ","
          ++ string_of_int(y),
        ),
      l,
    )
  };

let getPath = ((x, y), goal: (int, int), grid) =>
  switch (getPathHelper([{x, y, cost: 0., parent: None}], [], goal, grid)) {
  | None => None
  | Some(goal) => Some(constructPathList(goal, [(goal.x, goal.y)]))
  };
