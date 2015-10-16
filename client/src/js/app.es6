var $ = require('jquery');
$(document).ready(function() {

  var Board = function() {
    this.n =9;
    this.numOfNumbers = 0;
    this.legalBoard = true;
    this.boardArray = [];
    this.currentCell = [];

    this.populateBoard = function() {
      for(let row = 0; row < this.n; row++) {
        this.boardArray[row] = [];
        for(let col = 0; col < this.n; col++) {
          this.boardArray[row][col] = '';
        }
      }
    };
    this.populateBoard();

  };
  Board.prototype.checkBoard = function() {
    // var row = this.currentCell[0];
    // var col = this.currentCell[1];
    var checkArray = function(array) {
      
      var store = {};
      for(let i = 0; i < array.length; i++) {
        let cell = array[i];
        if( cell !== '' && (cell < 1 || cell > 9) ) {
          return false;
        } else if (cell !== '') {
          // debugger;
            if(store[cell] === undefined) {
              store[cell] = 1;
            } else {
              return false;
            };
        };
      };
      return true;
    };
    var checkColumns = function() {
      // debugger;
      for(let col = 0; col < this.n; col++) {
        var columnArray = this.boardArray.map(function(row) {
          return  row[col];
        });
        if(checkArray.call(this, columnArray) === false) {
          return false
        }
      }
      return true;
    };
    var checkRows = function() {
      for(let row = 0; row < this.n; row++) {
        var rowArray = this.boardArray[row];
        if(checkArray.call(this, rowArray) === false) {
          return false;
        }
      }
      return true;
    };
    var checkBoxes = function() {
      // debugger;
      for(let rowStart = 0; rowStart < this.n; rowStart += 3) {
        for(let col = 0; col < this.n; col+=3) {
          var boxArray = [];
          for(let row = rowStart; row < (rowStart + 3); row++) {
            boxArray.push( board.boardArray[row].slice(col,col+3) );
          }
          var boxArray = boxArray.reduce(function(mem, next) {
            return mem.concat(next)
          });
          
          if(checkArray(boxArray) === false) {
            return false;
          }
        }
        return true;
      }
      console.log('box', boxArray);
    };
    if(checkColumns.call(this) && checkRows.call(this) && checkBoxes.call(this)) {
      this.legalBoard = true;
    } else {
      this.legalBoard =false;
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
  }
  var board = new Board();

  var buildBoardGrid  = function() {
     const n = 9;
    
    for(let r = 0; r < n; r++) {
      var row = '<tr class="row"></tr>';
      
      for(let c = 0; c < n; c++) {
        row += '<td><input data-row='+r+' data-col='+c+ ' class="cell" type="number" min="1" max="9"></td>';
      }; 
      row += '</tr>';
      $('.board').append(row);
    }; 
  };

  buildBoardGrid();

  $('.cell').on('input',function(event) {
    // debugger;
    event.preventDefault();
    var inputNum = $(this).val();
    var row = parseInt( $(this).data().row) ;
    var col = parseInt( $(this).data().col );
    board.currentCell = [row, col];
    board.boardArray[row][col] = inputNum;
    board.checkBoard();
    console.log(board.legalBoard);
  })
   
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