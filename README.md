My Dear Farm
---
This is a game made for [Ludum Dare 41](https://ldjam.com/events/ludum-dare/41/my-dear-farm). The theme was "Combine 2 Incompatible Genres". 

Play now!
---

- WASD or Arrow Keys to move. X or Space to interact
- Go to bed when you’re done your tasks.
- Farming Simulator + Horror Game

https://bsansouci.github.io/ludum-dare-41/

You can also download the [native Mac app](https://github.com/bsansouci/ludum-dare-41/releases/download/1.2/MyDearFarm.zip) (slightly better performance).

More Info
---
This game was build using [Reprocessing](https://github.com/schmavery/reprocessing), a 2D graphics library we wrote in ReasonML/OCaml, with an api inspired by Processing.

See [here](https://github.com/schmavery/reprocessing#projects-using-reprocessing) for more examples of games and demos built in Reprocessing.

### Install
_warning_: this doesn't work with npm5. Use npm4 or use yarn. To downgrade to npm4 you can `npm install -g npm@latest-4`
```
yarn
```

### Build
```
yarn run build
```

### Start
```
yarn start
```

To build to JS run `npm run build:web` and then run a static server, like `python -m SimpleHTTPServer` and go to `localhost:8000`. If you're using safari you can simply open the `index.html` and tick `Develop > Disable Cross-Origin Restrictions`.

To build to native run `npm run build:native` and run `npm run start:native`

The build system used is [bsb-native](https://github.com/bsansouci/bsb-native).
