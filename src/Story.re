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
        "You arrive at long last to your late uncle's farm.",
        "",
        "Waiting for you at the gate is the mayor.",
        "He frowns and hands you a burned journal.",
        "After the house fire that claimed your uncle's",
        "life, this was all that's left. He tells you that",
        "part of the journal was burned, but perhaps",
        "you may find solace in the rest of it.",
        "",
        "Most of the beginning of the book was",
        "burned, but you flip towards the end and read",
        "one of the entries.",
      |],
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
  {
    tasks: [|LockMonsterIn|],
    pages: [|
      [|
        "I found her. I was a fool yesterday to think",
        "that she had run away for good. I was so",
        "foolish I went to my old daughter's grave, but I",
        "no longer need her, I have Maria. I went right",
        "back to the spot I had found Maria originally,",
        "that day so long ago, on the night my first",
        "daughter died. She was so small back then",
        "and sweet. I named her after my daughter,",
        "and thusly I still had my Maria.",
        "",
        "Now she is strong. Quite strong. She almost did",
        "not recognize me but I coaxed her to come",
      |],
      [|
        "back to the farm with me. Ah my darling. My",
        "beautiful Maria. When she got back to the",
        "farm she jumped into the barn and into the",
        "hay stacks. Just like my old daughter use to do.",
        "Romping around. And well, there was a chicken",
        "in the hay stack as well. And I thought that",
        "Maria was just playing with the hen. But the",
        "hay stack was red. It became red. And well I",
        "could not watch. I shut and locked the barn",
        "door. Maria would not mind. I just don't want",
        "to disturb her play. ",
        "I'll need to get more chickens",
      |],
    |],
  }, /* Day 6 */
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
    pages: [|
      [|
        "She truly does love me.",
        "As soon as I peak into the barn she looks at",
        "me so lovingly and jumps up to try to play with",
        "me. My beautiful Maria. She is so strong now,",
        "at times it seems that she is almost able to",
        "break down the door. All to get to me.",
        "All to play with me... ",
        "",
        "I have such frightful dreams these nights. I",
        "see my daughter. My old daughter. My human",
        "daughter, she tells me I am in danger. She tells",
        "me I need to kill Maria. But I could not even get",
      |],
      [|
        "close to her with my ax she is so strong these",
        "days. I often dream of that one night, on top",
        "of the barn. I see her craning her neck over.",
        "Licking the blood off my hands hungrily.",
        "I push my hands towards her. She opens her",
        "mouth and I see her teeth close around me.",
        "I shudder even recalling it.",
        "",
        "But what am I to do? You see this new daughter,",
        "this new Maria she loves me more than all the",
        "other animals in the farm. She won't even play",
        "with the chickens any more she wants to play",
      |],
      [|
        "with me so much. But won't she grow weak if",
        "she does not play with the chickens. If she",
        "does not eat the chickens. If she just wants",
        "me instead...",
        "",
        "I have some experimentation to do.",
      |],
    |],
  }, /* Day 7 */
  {
    tasks: [|Bool("Get the axe and feed Maria")|],
    pages: [|
      [|
        "I made a discovery today. My dear Maria just",
        "needs a little help to play with the chickens.",
        "I just have to take the axe and... well paint the",
        "chickens a bit red before throwing them into",
        "the barn. And I'll let you in on a bit of a secret,",
        "after I fed her six of them, she just fell asleep.",
        "I even went into the barn and laid a blanket on",
        "her. So beautiful, when she sleeps. ",
        "",
        "Wait there was a crash outside. The barn door",
        "is broken down. I hear a banging downstairs.",
        "She wants to play with me...",
      |],
      [|
        "There is a pounding on my door. She wants in.",
        "My daughter wants in.",
        "No. This monster wants in!",
        "I have nothing here to defend myself and the",
        "pounding is growing louder. She is not my",
        "daughter, it is a monster. Whoever is reading",
        "this must slay it. The axe is in the barn. You",
        "must slay it as it sleeps. The door is nearly bust.",
        "When it enters I shall throw the latern at it.",
        "That will keep it licking its wounds while you,",
        "my heir, prepare to slay it.",
        "My dear Maria, I will see you soon. ",
      |],
    |],
  } /* Day 8 */
|];
