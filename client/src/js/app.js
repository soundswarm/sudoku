'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $ = require('jquery');

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

  // listen for user to start a new game
  $(".new-game").on('click', function (event) {
    event.preventDefault();
    // hide you win message
    $('.win').hide();

    // remove the old board
    $('#board').empty();

    // start a new game
    newGame();
  });
};

// Board class

var Board = (function () {
  function Board() {
    var _this = this;

    _classCallCheck(this, Board);

    this.n = 9;
    this.legalBoard = true;
    this.boardArray = [];

    // this function could be modified to allow for
    this.populateBoard = function () {
      _this.boardArray = [[5, 3, "", "", 7, "", "", "", ""], [6, "", "", 1, 9, 5, "", "", ""], ["", 9, 8, "", "", "", "", 6, ""], [8, "", "", "", 6, "", "", "", 3], [4, "", "", 8, "", 3, "", "", 1], [7, "", "", "", 2, "", "", "", 6], ["", 6, "", "", "", "", 2, 8, ""], ["", "", "", 4, 1, 9, "", "", 5], ["", "", "", "", 8, "", "", 7, 9]];
    };
    this.populateBoard();
  }

  // functions in class prototype

  _createClass(Board, [{
    key: 'buildBoardGrid',
    value: function buildBoardGrid() {
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
    }
  }, {
    key: 'checkBoard',

    // check any board to see if the board is a winning board. Functions work for any board.
    value: function checkBoard() {
      var _this2 = this;

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
        var _loop = function (col) {
          columnArray = _this2.boardArray.map(function (row) {
            return row[col];
          });

          if (checkArray.call(_this2, columnArray) === false) {
            return {
              v: false
            };
          }
        };

        // debugger;
        for (var col = 0; col < _this2.n; col++) {
          var columnArray;

          var _ret = _loop(col);

          if (typeof _ret === 'object') return _ret.v;
        }
        return true;
      };
      var checkRows = function checkRows() {
        for (var row = 0; row < _this2.n; row++) {
          var rowArray = _this2.boardArray[row];
          if (checkArray.call(_this2, rowArray) === false) {
            return false;
          }
        }
        return true;
      };
      var checkBoxes = function checkBoxes() {
        // debugger;
        for (var rowStart = 0; rowStart < _this2.n; rowStart += 3) {
          for (var col = 0; col < _this2.n; col += 3) {
            var boxArray = [];
            for (var row = rowStart; row < rowStart + 3; row++) {
              boxArray.push(_this2.boardArray[row].slice(col, col + 3));
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
        var flattenedBoard = _this2.boardArray.reduce(function (mem, next) {
          return mem.concat(next);
        });
        flattenedBoard.forEach(function (num) {
          if (num >= 1 && num <= 9) {
            numOfNumbers++;
          }
        }, _this2);
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
    }
  }]);

  return Board;
})();

;

$(document).ready(function () {
  // initial new game
  newGame();
});
