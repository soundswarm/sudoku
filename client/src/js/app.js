'use strict';

var $ = require('jquery');
$(document).ready(function () {

  var Board = function Board() {
    this.n = 9;
    this.legalBoard = true;
    this.boardArray = [];
    this.currentCell = []; //maybe delete this

    this.populateBoard = function () {
      this.boardArray = [[5, 3, '', '', 7, '', '', '', ''], [6, '', '', 1, 9, 5, '', '', ''], ['', 9, 8, '', '', '', '', 6, ''], [8, '', '', '', 6, '', '', '', 3], [4, '', '', 8, '', 3, '', '', 1], [7, '', '', '', 2, '', '', '', 6], ['', 6, '', '', '', '', 2, 8, ''], ['', '', '', 4, 1, 9, '', '', 5], ['', '', '', '', 8, '', '', 7, 9]];
      // for(let row = 0; row < this.n; row++) {
      //   this.boardArray[row] = [];
      //   for(let col = 0; col < this.n; col++) {
      //     this.boardArray[row][col] = '';
      //   }
      // }
    };
    this.populateBoard();
  };
  Board.prototype.buildBoardGrid = function () {
    var n = 9;

    for (var r = 0; r < n; r++) {
      var row = '<tr class="row"></tr>';

      for (var c = 0; c < n; c++) {
        row += '<td><input value = ' + this.boardArray[r][c] + ' data-row=' + r + ' data-col=' + c + ' class="cell" type="number" min="1" max="9"></td>';
      };
      row += '</tr>';
      $('.board').append(row);
    };
  };
  Board.prototype.checkBoard = function () {
    // var row = this.currentCell[0];
    // var col = this.currentCell[1];
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

        if (typeof _ret === 'object') return _ret.v;
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
      var flattenedBoard = board.boardArray.reduce(function (mem, next) {
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
        console.log('game won');
      }
    } else {
      this.legalBoard = false;
    }

    // for each cell
    //   if ! 1<= cell <= 9
    //     legalBoard = false;

    //   if obj[cell]
    //     obj[cell] ++
    //   else obj[cell] = 1

    // for cell in obj
    //   if obj[cell] != 1
    //     legalBoard = false
  };
  var board = new Board();

  board.buildBoardGrid();

  $('.cell').on('input', function (event) {
    // debugger;
    event.preventDefault();
    var inputNum = $(this).val();
    var row = parseInt($(this).data().row);
    var col = parseInt($(this).data().col);
    board.currentCell = [row, col];
    board.boardArray[row][col] = inputNum;
    board.checkBoard();
    console.log(board.legalBoard);
  });

  // on input
  //   check input
  //     if 3 criteria are true
  //       let input
  // add 1 to pieces on baord
  //     else
  //        set legal board to false
  // add 1 to pieces on board

  // function isWinner
  //   if legalBoard = true && pieces on board = 81
  //     display you won!
});
