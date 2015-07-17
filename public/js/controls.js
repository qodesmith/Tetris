Controls = {
  pauseGame: function() {
    if(App.gamePaused) {
      App.gamePaused = false;

      // Unhide the board.
      $('#hideBoard').toggleClass('hidden');

      // Start the waterfall again.
      this.waterfall();

      // Re-initialize the arrow keys.
      this.arrows();
    } else {
      App.gamePaused = true;

      // Stop the waterfall.
      clearTimeout(goDown);

      // Hide the board.
      $('#hideBoard').toggleClass('hidden');

      // Stop the arrow-key functionality.
      $(document).off('keydown');
    }
  },
  waterfall: function() {
    // 750 is the starting speed.
    // Speed increases by 37.5ms for each level.
    var speed = 787.5 - (37.5 * App.level);

    goDown = setInterval(function() {
      Controls.leftRightDown('down');
    }, speed);
  },
  nextPiece: function() {
    // Clear the preview board.
    for(var i = 1; i <= 5; i++) {
      for(var j = 1; j<= 5; j++) {
        var previewBox = $('.previewRow' + i + '.previewColumn' + j);
        var boxColor = previewBox.attr('data-color');

        previewBox
          .removeClass('boardPiece')
          .removeAttr('data-color')
          .removeClass(boxColor);
      }
    }

    // Coordinates and colors for the preview peices.
    var color;
    var array = [];
    var center = 3;
    if(App.nextPiece === 'box') {
      color = 'blue';
      array.push({column: 3, row: 2}, {column: 4, row: 2}, {column: 3, row: 3}, {column: 4, row: 3});
    } else if(App.nextPiece === 'line') {
      color = 'yellow';
      array.push({column: 1, row: 3}, {column: 2, row: 3}, {column: 3, row: 3}, {column: 4, row: 3});
    } else if(App.nextPiece === 't') {
      color = 'purple';
      array.push({column: 2, row: 3}, {column: 3, row: 3}, {column: 4, row: 3}, {column: 3, row: 4});
    } else if(App.nextPiece === 'l') {
      color = 'red';
      array.push({column: 2, row: 4}, {column: 2, row: 3}, {column: 3, row: 3}, {column: 4, row: 3});
    } else if(App.nextPiece === 'revL') {
      color = 'orange';
      array.push({column: 2, row: 3}, {column: 3, row: 3}, {column: 4, row: 3}, {column: 4, row: 4});
    } else if(App.nextPiece === 'zig') {
      color = 'green';
      array.push({column: 4, row: 3}, {column: 3, row: 3}, {column: 3, row: 4}, {column: 2, row: 4});
    } else if(App.nextPiece === 'zag') {
      color = 'brown';
      array.push({column: 2, row: 3}, {column: 3, row: 3}, {column: 3, row: 4}, {column: 4, row: 4});
    }

    // Render the piece on the preview board.
    for(i in array) {
      $('.previewRow' + array[i]['row'] + '.previewColumn' + array[i]['column'])
        .addClass('boardPiece')
        .addClass(color)
        .attr('data-color', color);
    }
  },
  arrows: function() {
    var _this = this;
    $(document).keydown(function(e) {
      if(e.which === 38) { _this.rotate(App.cpArray) };
      if(e.which === 37) { _this.leftRightDown('left') }; 
      if(e.which === 39) { _this.leftRightDown('right') };
      if(e.which === 40) { _this.leftRightDown('down') };
    });
  },
  rotate: function(array) {
    // Ignore pieces with circular symmetry.
    if(App.currentPiece === 'box') { return };
    if(App.currentPiece === 'x') { return };

    // Disable if the game is over.
    if(App.gameOver) { return };

    // Create a DEEP copy of array (it contains objects).
    // If our rotated piece would move off the board,
    // we will use this copy to repopulate array (App.cpArray).
    var arrayCopy = [];
    for(var j = 0; j < array.length; j++) {
      var obj = {};

      for(k in array[j]) {
        obj[k] = array[j][k]
      }

      arrayCopy.push(obj);
    }

    // Will process pieces that are horizonally
    // or vertically in line with centerBox.
    function inLine(diff1, diff2) {
      var point;
      var num;

      // Find which pattern matches diff1, diff2.
      if(diff1 === 0) {
        num = diff2;
        diff2 > 0 ? point = 3 : point = 1;
      } else  {
        num = diff1;
        diff1 > 0 ? point = 2 : point = 0;
      }

      // Adjust point to reflect the next pattern.
      point === 3 ? point = 0 : point++;

      var pattern = [
                      [-Math.abs(num), 0],
                      [0, -Math.abs(num)],
                      [Math.abs(num), 0],
                      [0, Math.abs(num)]
                    ];

      var column = App.centerBox.column + pattern[point][0];
      var row = App.centerBox.row + pattern[point][1]
      var newObject = {
        column: column,
        row: row,
      };

      // If our rotated box would land off the board, return false.
      if(column > App.columns || column < 1) { return false };
      if(row > App.rows || row < 1) { return false };

      // If our rotated box would land on another piece, return false.
      if($('.row' + row + '.column' + column).attr('data-occupied') === 'true') {
        return false;
      }
      
      return newObject;
    }

    // Will process pieces that are NOT horizonally
    // or vertically in line with centerBox.
    function diagonal(diff1, diff2) {
      var point, x, y;

      // Find which pattern matches diff1, diff2.
      if(diff1 > 0) {
        if(diff2 > 0) {
          point = 2;
          x = diff1;
          y = diff2;
        } else {
          point = 1;
          x = diff2;
          y = diff1;
        }
      } else {
        if(diff2 > 0) {
          point = 3;
          x = diff2;
          y = diff1;
        } else {
          point = 0;
          x = diff1;
          y = diff2;
        }
      }

      // Adjust point to reflect the next pattern.
      point === 3 ? point = 0 : point++;

      var pattern = [
                      [-Math.abs(x), -Math.abs(y)],   //  5, 6
                      [Math.abs(y), -Math.abs(x)],  // -6, 5
                      [Math.abs(x), Math.abs(y)], // -5,-6
                      [-Math.abs(y), Math.abs(x)]   //  6,-5
                    ];

      var column = App.centerBox.column + pattern[point][0];
      var row = App.centerBox.row + pattern[point][1]
      var newObject = {
        column: column,
        row: row,
      };

      // If our rotated box would land off the board, return false.
      if(column > App.columns || column < 1) { return false };
      if(row > App.rows || row < 1) { return false };

      // If our rotated box would land on another piece, return false.
      if($('.row' + row + '.column' + column).attr('data-occupied') === 'true') {
        return false;
      }

      return newObject;
    }

    var useNew = true;
    var counter = 1;
    for(var i = 0; i < array.length; i++) {

      // STEP 1: clear up the current piece.
      if(counter === 1) {
        this.processPosition(i, array, true);

        if(i === array.length -1) {
          counter++;
          i = 0;
        }
      }

      // STEP 2: process the rotation.
      if(counter === 2) {

        // Avoid comparing the centerBox with itself.
        if(App.centerBox.column === array[i].column && App.centerBox.row === array[i].row) {
          continue;
        }

        var diff1 = App.centerBox.column - array[i].column;
        var diff2 = App.centerBox.row - array[i].row;

        // If any differences = 0, then use inLine(),
        // otherwise we use diagonal().
        if(diff1 === 0 || diff2 === 0) {
          array[i] = inLine(diff1, diff2);
          if(array[i] === false) { useNew = false };
        } else {
          array[i] = diagonal(diff1, diff2);
          if(array[i] === false) { useNew = false };
        }

        if(i === array.length - 1) {
          counter++;
          i = 0;
        }
      }

      // STEP 4: draw the rotated piece.
      if(counter === 3) {
        if(!useNew) {
          App.cpArray = arrayCopy;
        }
        this.processPosition(i, App.cpArray);
      }
    }
  },
  leftRightDown: function(direction) {
    // Disable if the game is over.
    if(App.gameOver) { return };

    var array = App.cpArray;

    // Check if we have an active current piece.
    if(!array.length || !this.canWeGoLateral(direction)) { return };
    
    if(direction === 'left') {
      App.centerBox.column -= 1;
      var dir = -1;
      var xy = 'column';
    } else if(direction === 'right') {
      App.centerBox.column += 1;
      var dir = 1;
      var xy = 'column';
    } else if(direction === 'down') {
      if(!this.canWeGoLower()) {
        this.checkForLine(); // Check for lines.
        Pieces[App.nextPiece](); // Generate the piece in the queue.
        App.nextPiece = Pieces.randomPiece(); // Store a piece in the queue.
        this.nextPiece(); // Display the queued peice on the preview board.
        return;
      }
      App.centerBox.row += 1
      var dir = 1;
      var xy = 'row';
    }

    var counter = 1;
    for(var i = 0; i < array.length; i++) {
      var last = array.length - 1;

      // Process the old-position boxes.
      if(counter === 1) {
        this.processPosition(i, array, true);

        if(i === last) {
          counter++;
          i = 0;
        }
      }

      // Configure the new position.
      if(counter === 2) {
        array[i][xy] += dir;

        if(i === last) {
          counter++;
          i = 0;
        }
      }

      // Process the new-position boxes.
      if(counter === 3) {
        this.processPosition(i, array);
      }
    }
  },
  processPosition: function(i, array, old) {
    if(old) {
      $('.row' + array[i]['row'] + '.column' + array[i]['column'])
        .toggleClass(App.color)
        .toggleClass('boardPiece')
        .removeAttr('data-color')
        .removeAttr('data-current-piece');
    } else {
      $('.row' + array[i]['row'] + '.column' + array[i]['column'])
        .toggleClass(App.color)
        .toggleClass('boardPiece')
        .attr('data-color', App.color)
        .attr('data-current-piece', true);
    }
  },
  canWeGoLateral: function(direction) {
    if(!App.cpArray.length) { return };

    if(direction === 'left') {
      var dir = -1;
    } else if(direction === 'right') {
      var dir = 1
    }

    var array = App.cpArray;
    var sideClear = true;

    for(var i = 0; i < array.length; i++) {

      // Check if other pieces are in the way.
      var side = array[i]['column'] + dir;
      var occupied = eval($('.row' + array[i]['row'] + '.column' + side).attr('data-occupied'));
      if(occupied) { sideClear = false };

      // Check if we've hit a wall.
      if(side < 1 || side > App.columns) { sideClear = false };
    }

    return sideClear;
  },
  canWeGoLower: function() {
    var array = App.cpArray;
    var emptyBelow = true;

    // Check if we have pieces below us or if we're at the bottom.
    for(var i = 0; i < array.length; i++) {
      var below = array[i]['row'] + 1;
      var occupied = eval($('.row' + below + '.column' + array[i]['column']).attr('data-occupied'));

      if(occupied || below > App.rows) { emptyBelow = false };
    }

    // Cement the piece in place.
    if(!emptyBelow) {
      for(var j = 0; j < array.length; j++) {
        $('.row' + array[j]['row'] + '.column' + array[j]['column'])
          .attr('data-occupied', true)
          .removeAttr('data-current-piece');
      }

      // Reset our attributes associated with a current piece.
      array.length = 0;
      App.currentPiece = ''
      App.color = '';
      this.centerBox();
    }

    return emptyBelow;
  },
  checkForLine: function() {
    var linesFound = 0;
    var lineCheck = 0;

    // For each row.
    for(var i = 1; i <= App.rows; i++) {

      // Check each box (column) in the row and track it with lineCheck.
      for(var j = 1; j <= App.columns; j++) {
        if($('.row' + i + '.column' + j).attr('data-occupied') === 'true') {
          lineCheck++;
        }
      }

      // If we have a complete line...
      if(lineCheck === App.columns) {
        linesFound++;

        // Clear that line...
        for(var k = 1; k <= App.columns; k++) {
          var color = $('.row' + i + '.column' + k).attr('data-color');

          $('.row' + i + '.column' + k)
            .attr('data-occupied', false)
            .removeClass(color)
            .removeClass('boardPiece');
        }

        // Move all pieces above cleared line down one box.
        for(var l = i - 1; l > 1; l--) {
          for(var m = 1; m <= App.columns; m++) {
            if($('.row' + l + '.column' + m).attr('data-occupied') === 'true'){
              var color = $('.row' + l + '.column' + m).attr('data-color');
              
              // Reset the old box.
              $('.row' + l + '.column' + m)
                .attr('data-occupied', false)
                .removeAttr('data-color')
                .removeClass(color)
                .removeClass('boardPiece');

              // Add attributes to the new box.
              $('.row' + (l + 1) + '.column' + m)
                .attr('data-occupied', true)
                .attr('data-color', color)
                .addClass(color)
                .addClass('boardPiece');
            }
          }
        }

        // Increase the line count.
        Info.totalLines();

        // Reset lineCheck
        lineCheck = 0;

      } else {

        // Reset lineCheck.
        lineCheck = 0;
      }
    }

    // Keep score.
    Info.score(linesFound);
  },
  gameOver: function() {
    App.gameOver = true;
    App.currentPiece = '';

    // Stop the waterfall function.
    clearTimeout(goDown);

    // Slowly clear the board.
    var rows = App.rows;
    var clearBoard = setInterval(function() {
      for(var i = 1; i <= App.columns; i++) {
        var color = $('.row' + rows + '.column' + i).attr('data-color');
        $('.row' + rows + '.column' + i)
          .removeAttr('data-color')
          .removeClass(color)
          .removeClass('boardPiece')
          .addClass('gameOver')

        if(i === App.columns) { rows-- };
        if(rows === 0) {
          clearTimeout(clearBoard);
          App.lines = 0;

          // Change the message below the board.
          $('#boardMessage').html('Press SPACE bar to play again.');
        }
      }
    }, 50);

    this.startOver();
  },
  startOver: function() {
    // Remove the space bar listener.
    $(document).off('keypress');

    // Remove the arrow keys listener.
    $(document).off('keydown');

    // Space bar starts a new game.
    $(document).keypress(function(e) {
      if(e.which === 32) {
        // Remove the space bar listener.
        $(document).off('keypress');

        // Delete the views.
        App.startView.remove();
        App.mainView.remove();
        
        // Reset gameOver status.
        App.gameOver = false;
        
        // Re-create the container div.
        $('<div id="container">').appendTo('body');

        // Start from the beginning.
        App.startView = new App.Views.StartView();
      }
    });
  },
  modal: function() {
    $('#modal').show()
  },
  centerBox: function() {
    if(App.columns % 2 === 0) {
      App.centerBox = {column: (App.columns / 2) + 1, row: 1};
    } else {
      App.centerBox = {column: Math.ceil(App.columns / 2), row: 1};
    }
  }
};