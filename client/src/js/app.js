"use strict";

var $ = require('jquery');
$(document).ready(function () {
  // Board class
  var Board = function Board() {
    this.n = 9;
    this.legalBoard = true;
    this.boardArray = [];

    this.populateBoard = function () {
      this.boardArray = [[5, 3, "", "", 7, "", "", "", ""], [6, "", "", 1, 9, 5, "", "", ""], ["", 9, 8, "", "", "", "", 6, ""], [8, "", "", "", 6, "", "", "", 3], [4, "", "", 8, "", 3, "", "", 1], [7, "", "", "", 2, "", "", "", 6], ["", 6, "", "", "", "", 2, 8, ""], ["", "", "", 4, 1, 9, "", "", 5], ["", "", "", "", 8, "", "", 7, 9]];
    };
    this.populateBoard();
  };
  Board.prototype.buildBoardGrid = function () {
    var n = 9;

    for (var r = 0; r < n; r++) {
      var row = '<tr class="row">';

      for (var c = 0; c < n; c++) {
        var value = this.boardArray[r][c] > 0 ? this.boardArray[r][c] : "p";
        row += '<td><input value = ' + value + ' data-row=' + r + ' data-col=' + c + ' class="cell" type="number" min="1" max="9"></td>';
      };
      row += '</tr>';
      $('#board').append(row);
    };
  };
  Board.prototype.checkBoard = function () {
    var checkArray = function checkArray(array) {
      var store = {};
      for (var i = 0; i < array.length; i++) {
        var cell = array[i];
        if (cell !== '' && (cell < 1 || cell > 9)) {
          return false;
        } else if (cell !== '') {
          // debugger;
          if (store[cell] === undefined) {
            store[cell] = 1;
          } else {
            return false;
          };
        };
      };
      return true;
    };
    var checkColumns = function checkColumns() {
      var _this = this;

      var _loop = function (col) {
        columnArray = _this.boardArray.map(function (row) {
          return row[col];
        });

        if (checkArray.call(_this, columnArray) === false) {
          return {
            v: false
          };
        }
      };

      // debugger;
      for (var col = 0; col < this.n; col++) {
        var columnArray;

        var _ret = _loop(col);

        if (typeof _ret === "object") return _ret.v;
      }
      return true;
    };
    var checkRows = function checkRows() {
      for (var row = 0; row < this.n; row++) {
        var rowArray = this.boardArray[row];
        if (checkArray.call(this, rowArray) === false) {
          return false;
        }
      }
      return true;
    };
    var checkBoxes = function checkBoxes() {
      // debugger;
      for (var rowStart = 0; rowStart < this.n; rowStart += 3) {
        for (var col = 0; col < this.n; col += 3) {
          var boxArray = [];
          for (var row = rowStart; row < rowStart + 3; row++) {
            boxArray.push(this.boardArray[row].slice(col, col + 3));
          }
          var boxArray = boxArray.reduce(function (mem, next) {
            return mem.concat(next);
          });

          if (checkArray(boxArray) === false) {
            return false;
          }
        }
        return true;
      }
      console.log('box', boxArray);
    };
    var countNumbers = function countNumbers() {
      var numOfNumbers = 0;
      var flattenedBoard = this.boardArray.reduce(function (mem, next) {
        return mem.concat(next);
      });
      flattenedBoard.forEach(function (num) {
        if (num >= 1 && num <= 9) {
          numOfNumbers++;
        }
      }, this);
      return numOfNumbers;
    };
    if (checkColumns.call(this) && checkRows.call(this) && checkBoxes.call(this)) {
      this.legalBoard = true;
      console.log(countNumbers.call(this));
      if (countNumbers.call(this) === this.n * this.n) {
        console.log('you win');
        $('.win').show();
      }
    } else {
      this.legalBoard = false;
    }
  };

  // executes a new game
  var newGame = function newGame() {
    $('.win').hide();
    var board = new Board();
    board.buildBoardGrid();

    // listen for user
    $('.cell').on('input', function (event) {
      // debugger;
      event.preventDefault();
      var inputNum = $(this).val();
      var row = parseInt($(this).data().row);
      var col = parseInt($(this).data().col);
      board.boardArray[row][col] = inputNum;

      // check if player has won
      board.checkBoard();
      console.log(board.legalBoard);
    });
  };

  // initial new game
  $('.win').hide();
  newGame();

  // listen for user to start a new game
  $(".new-game").on('click', function () {

    // hide you win message
    $('.win').hide();

    // remove the old board
    $('#board').empty();

    // start a new game
    newGame();
  });
});
