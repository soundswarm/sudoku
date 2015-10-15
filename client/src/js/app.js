'use strict';

var $ = require('jquery');
$(document).ready(function () {

  var buildBoard = function buildBoard() {
    var n = 9;
    var row = '<tr class="row"></tr>';
    for (var col = 0; col < n; col++) {
      row += '<td><input class="cell" type="number" min="1" max="9"></td>';
    };
    row += '</tr>';

    for (var r = 0; r < n; r++) {
      $('.board').append(row);
    };
  };
  buildBoard();
});
