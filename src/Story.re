type line = string;

type task =
  | Bool(line)
  | Count(line, int)
  | LockMonsterIn;

type entryT = {
  tasks: array(task),
  pages: array(array(line)),
};

type t = array(entryT);

let entries = [|
  {
    tasks: [|
      Bool("Sell eggs"),
      Bool("Sell milk"),
      Bool("Fill water trough"),
      Count("Water tall corn", 2),
      Count("Plant seed and water it", 1),
    |],
    pages: [|
      [|
        "Oh, but I am tired! I spent all day laying",
        "traps today for the fox that had torn up",
        "chickens a month ago. I don't want to rinse",
        "off another puddle of chicken blood again.",
        "But my, just think of all that has changed",
        "since then...",
        "",
        "Maria and I had a lovely walk today. She is",
        "becoming so strong! It does renew my faith. I",
        "fretted the worst would happen again. Maria,",
        "after a while, was in gay spirits, owing, I think,",
        "to the cow who came nosing towards us. I",
        "feared they would be frightened to see a new",
        "body on the farm, but Maria did not scare",
      |],
      [|
        "them. The walk did her well though.",
        "Her attitude on the farm reminds me of... ",
        "best not to trouble my dreams with it. I would",
        "rather go to sleep with light pen and light heart.",
        "I really believe she has turned the corner, and",
        "that we are over her troubles.",
      |],
    |],
  }, /* Day 1 */
  {
    tasks: [|
      Bool("Give water to animals"),
      Bool("Feed animals"),
      Bool("Wash away manure"),
    |],
    pages: [|[||]|],
  }, /* Day 2 */
  {tasks: [|Bool("Fix the barn door")|], pages: [|[||]|]}, /* Day 3 */
  {
    tasks: [|Bool("Investigate barn"), Bool("Wash away any mess")|],
    pages: [|[||]|],
  }, /* Day 4 */
  {tasks: [|Bool("Find Maria's grave"), Bool("Mourn")|], pages: [|[||]|]}, /* Day 5 */
  {tasks: [|LockMonsterIn|], pages: [|[||]|]}, /* Day 6 */
  {
    tasks: [|
      Count("Water corn", 3),
      Count("Plant seed and water it", 1),
      Bool("Sell eggs"),
      Bool("Sell milk"),
      Bool("Fill water trough"),
      Bool("Feed animals"),
      Bool("Wash away manure"),
    |],
    pages: [|[||]|],
  }, /* Day 7 */
  {tasks: [| Bool("Feed Maria") |], pages: [|[||]|]} /* Day 8 */
|];
