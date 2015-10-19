Sudoku
=====
deployed at soundswarm.github.io/sudoku

## How to run to app in a dev environment

```
$ npm install
$ grunt build
$ grunt watch
```

##technologies used
* es6
* sass - used for ability to do CSS mixins
* jquery - used for DOM interaction
* browserify - aggregates dependencies
* grunt - build system that compiles es6 to es5; aggregates js files and css files then minifies them

##feature roadmap
* add more boards
* load an opaque gif when the game is won
* allow multiplayer via web rtc