'use strict';

var $ = require('jquery');
$(document).ready(function () {

  var Board = function Board() {
    this.n = 9;
    this.numOfNumbers = 0;
    this.legalBoard = true;
    this.boardArray = [];
    this.currentCell = [];

    this.populateBoard = function () {
      for (var row = 0; row < this.n; row++) {
        this.boardArray[row] = [];
        for (var col = 0; col < this.n; col++) {
          this.boardArray[row][col] = '';
        }
      }
    };
    this.populateBoard();
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
            boxArray.push(board.boardArray[row].slice(col, col + 3));
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
    if (checkColumns.call(this) && checkRows.call(this) && checkBoxes.call(this)) {
      this.legalBoard = true;
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

  var buildBoardGrid = function buildBoardGrid() {
    var n = 9;

    for (var r = 0; r < n; r++) {
      var row = '<tr class="row"></tr>';

      for (var c = 0; c < n; c++) {
        row += '<td><input data-row=' + r + ' data-col=' + c + ' class="cell" type="number" min="1" max="9"></td>';
      };
      row += '</tr>';
      $('.board').append(row);
    };
  };

  buildBoardGrid();

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
