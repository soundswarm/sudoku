var $ = require('jquery');
$(document).ready(function() {
 // Board class
  var Board = function() {
    this.n = 9;
    this.legalBoard = true;
    this.boardArray = [];

    this.populateBoard = function() {
      this.boardArray = [
        [5,3,"","",7,"","","",""],
        [6,"","",1,9,5,"","",""],
        ["",9,8,"","","","",6,""],
        [8,"","","",6,"","","",3],
        [4,"","",8,"",3,"","",1],
        [7,"","","",2,"","","",6],
        ["",6,"","","","",2,8,""],
        ["","","",4,1,9,"","",5],
        ["","","","",8,"","",7,9]
      ];
    };
    this.populateBoard();
  };
  Board.prototype.buildBoardGrid  = function() {
     const n = 9;
    
    for(let r = 0; r < n; r++) {
      var row = '<tr class="row">';
      
      for(let c = 0; c < n; c++) {
        var value = this.boardArray[r][c]>0? this.boardArray[r][c] : "p"
        row += '<td><input value = ' + value + ' data-row='+r+' data-col='+c+ ' class="cell" type="number" min="1" max="9"></td>';
      }; 
      row += '</tr>';
      $('#board').append(row);
    }; 
  };
  Board.prototype.checkBoard = function() {
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
          return false;
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
            boxArray.push( this.boardArray[row].slice(col,col+3) );
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
    var countNumbers = function() {
      var numOfNumbers = 0;
      var flattenedBoard = this.boardArray.reduce(function(mem,next) {
        return mem.concat(next);
      });
      flattenedBoard.forEach(function(num) {
        if(num >=1 && num <=9) {
          numOfNumbers++;
        }
      }, this);
      return numOfNumbers;
    };
    if(checkColumns.call(this) && checkRows.call(this) && checkBoxes.call(this) ){
      this.legalBoard = true;
      console.log(countNumbers.call(this));
      if(countNumbers.call(this) === (this.n * this.n)) {
        console.log('you win');
        $('.win').show();
      }
    } else {
      this.legalBoard =false;
    }
  };


  // executes a new game
  var newGame = function() {
    $('.win').hide();
    var board = new Board();
    board.buildBoardGrid();

    // listen for user
    $('.cell').on('input',function(event) {
      // debugger;
      event.preventDefault();
      var inputNum = $(this).val();
      var row = parseInt( $(this).data().row) ;
      var col = parseInt( $(this).data().col );
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
  $(".new-game").on('click', function() {

    // hide you win message
    $('.win').hide();

    // remove the old board
    $('#board').empty();

    // start a new game
    newGame();
  });

});