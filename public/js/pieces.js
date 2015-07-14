Pieces = {
  randomPiece: function() {
    var shapes = ['box', 'line', 't', 'l', 'revL', 'zig', 'zag'];
    var random = Math.floor(Math.random() * shapes.length);
    return shapes[random];
  },
  isNewPieceClear: function(array) {
    // Check if a new piece will spawn over an occupied box.
    // If so, execute the gameOver function.
    for(var i = 0; i < array.length; i++) {
      var box = $('.row' + array[i]['row'] + '.column' + array[i]['column'])

      if(box.attr('data-occupied') === 'true') {
        App.gameOver = true;
        Controls.gameOver();
        break;
      }
    }
  },
  // Original 7 Tetris pieces.
  box: function() {
    // Prevent pieces from being created while
    // a current piece is in progress.
    if(App.currentPiece) { return };

    App.currentPiece = 'box';
    App.color = 'blue';

    // Starting coordinates to the current piece.
    App.cpArray = [
                    {row: 1, column: App.centerBox.column},
                    {row: 1, column: App.centerBox.column - 1},
                    {row: 2, column: App.centerBox.column},
                    {row: 2, column: App.centerBox.column - 1}
                  ];

    // Check if our new piece will end the game.
    this.isNewPieceClear(App.cpArray);

    // Color our pieces and keep track of its
    // location & color with data attributes.
    for(var i = 0; i < 4; i++) {
      var box;
      i === 0 ? box = $('.row1.column' + App.centerBox.column) : false;
      i === 1 ? box = $('.row1.column' + (App.centerBox.column - 1)) : false;
      i === 2 ? box = $('.row2.column' + App.centerBox.column) : false;
      i === 3 ? box = $('.row2.column' + (App.centerBox.column - 1)) : false;

      box
        .addClass('blue')
        .addClass('boardPiece')
        .attr('data-color', 'blue')
        .attr('data-current-piece', true);
    }
  },
  line: function() {
    if(App.currentPiece) { return };

    App.currentPiece = 'line';
    App.color = 'yellow';
    App.cpArray = [
                    {row: 1, column: App.centerBox.column - 2},
                    {row: 1, column: App.centerBox.column - 1},
                    {row: 1, column: App.centerBox.column},
                    {row: 1, column: App.centerBox.column + 1}
                  ];

    this.isNewPieceClear(App.cpArray);

    var start = App.centerBox.column - 2;
    for(var i = 0; i < 4; i++) {
      $('.row1.column' + (start + i))
        .addClass('yellow')
        .addClass('boardPiece')
        .attr('data-color', 'yellow')
        .attr('data-current-piece', true);
    }
  },
  t: function() {
    if(App.currentPiece) { return };

    App.currentPiece = 't';
    App.color = 'purple';
    App.cpArray = [
                    {row: 1, column: App.centerBox.column - 1},
                    {row: 1, column: App.centerBox.column},
                    {row: 1, column: App.centerBox.column + 1},
                    {row: 2, column: App.centerBox.column}
                  ];

    this.isNewPieceClear(App.cpArray);

    for(var i = 0; i < 4; i++) {
      var box;
      i === 0 ? box = $('.row1.column' + (App.centerBox.column - 1)) : false;
      i === 1 ? box = $('.row1.column' + App.centerBox.column) : false;
      i === 2 ? box = $('.row1.column' + (App.centerBox.column + 1)) : false;
      i === 3 ? box = $('.row2.column' + App.centerBox.column) : false;

      box
        .addClass('purple')
        .addClass('boardPiece')
        .attr('data-color', 'purple')
        .attr('data-current-piece', true);
    }
  },
  l: function() {
    if(App.currentPiece) { return };

    App.currentPiece = 'l';
    App.color = 'red';

    App.cpArray = [
                    {row: 1, column: App.centerBox.column},
                    {row: 1, column: App.centerBox.column + 1},
                    {row: 1, column: App.centerBox.column - 1},
                    {row: 2, column: App.centerBox.column - 1}
                  ];

    this.isNewPieceClear(App.cpArray);

    for(var i = 0; i < 4; i++) {
      var box;
      i === 0 ? box = $('.row1.column' + App.centerBox.column) : false;
      i === 1 ? box = $('.row1.column' + (App.centerBox.column + 1)) : false;
      i === 2 ? box = $('.row1.column' + (App.centerBox.column - 1)) : false;
      i === 3 ? box = $('.row2.column' + (App.centerBox.column - 1)) : false;
      
      box
        .addClass('red')
        .addClass('boardPiece')
        .attr('data-color', 'red')
        .attr('data-current-piece', true);
    }
  },
  revL: function() {
    if(App.currentPiece) { return };

    App.currentPiece = 'revL';
    App.color = 'orange';
    App.cpArray = [
                    {row: 1, column: App.centerBox.column},
                    {row: 1, column: App.centerBox.column + 1},
                    {row: 1, column: App.centerBox.column - 1},
                    {row: 2, column: App.centerBox.column + 1}
                  ];

    this.isNewPieceClear(App.cpArray);

    for(var i = 0; i < 4; i++) {
      var box;
      i === 0 ? box = $('.row1.column' + App.centerBox.column) : false;
      i === 1 ? box = $('.row1.column' + (App.centerBox.column + 1)) : false;
      i === 2 ? box = $('.row1.column' + (App.centerBox.column - 1)) : false;
      i === 3 ? box = $('.row2.column' + (App.centerBox.column + 1)) : false;
      
      box
        .addClass('orange')
        .addClass('boardPiece')
        .attr('data-color', 'orange')
        .attr('data-current-piece', true);
    }
  },
  zig: function() {
    if(App.currentPiece) { return };

    App.currentPiece = 'zig';
    App.color = 'green';
    App.cpArray = [
                    {row: 1, column: App.centerBox.column},
                    {row: 1, column: App.centerBox.column + 1},
                    {row: 2, column: App.centerBox.column},
                    {row: 2, column: App.centerBox.column - 1}
                  ];

    this.isNewPieceClear(App.cpArray);

    for(var i = 0; i < 4; i++) {
      var box;
      i === 0 ? box = $('.row1.column' + App.centerBox.column) : false;
      i === 1 ? box = $('.row1.column' + (App.centerBox.column + 1)) : false;
      i === 2 ? box = $('.row2.column' + App.centerBox.column) : false;
      i === 3 ? box = $('.row2.column' + (App.centerBox.column - 1)) : false;
      
      box
        .addClass('green')
        .addClass('boardPiece')
        .attr('data-color', 'green')
        .attr('data-current-piece', true);
    }
  },
  zag: function() {
    if(App.currentPiece) { return };

    App.currentPiece = 'zag';
    App.color = 'brown';
    App.cpArray = [
                    {row: 1, column: App.centerBox.column},
                    {row: 1, column: App.centerBox.column - 1},
                    {row: 2, column: App.centerBox.column},
                    {row: 2, column: App.centerBox.column + 1}
                  ];

    this.isNewPieceClear(App.cpArray);

    for(var i = 0; i < 4; i++) {
      var box;
      i === 0 ? box = $('.row1.column' + App.centerBox.column) : false;
      i === 1 ? box = $('.row1.column' + (App.centerBox.column - 1)) : false;
      i === 2 ? box = $('.row2.column' + App.centerBox.column) : false;
      i === 3 ? box = $('.row2.column' + (App.centerBox.column + 1)) : false;
      
      box
        .addClass('brown')
        .addClass('boardPiece')
        .attr('data-color', 'brown')
        .attr('data-current-piece', true);
    }
  },
  // Custom pieces
  x: function() {
    if(App.currentPiece) { return };

    App.currentPiece = 'x';
    App.color = 'pink';
    App.cpArray = [
                    {row: 1, column: App.centerBox.column - 1},
                    {row: 1, column: App.centerBox.column + 1},
                    {row: 2, column: App.centerBox.column},
                    {row: 3, column: App.centerBox.column - 1},
                    {row: 3, column: App.centerBox.column + 1}
                  ];

    this.isNewPieceClear(App.cpArray);

    for(var i = 0; i < 5; i++) {
      var box;
      i === 0 ? box = $('.row1.column' + (App.centerBox.column - 1)) : false;
      i === 1 ? box = $('.row1.column' + (App.centerBox.column + 1)) : false;
      i === 2 ? box = $('.row2.column' + App.centerBox.column) : false;
      i === 3 ? box = $('.row3.column' + (App.centerBox.column - 1)) : false;
      i === 4 ? box = $('.row3.column' + (App.centerBox.column + 1)) : false;

      box
        .addClass('pink')
        .addClass('boardPiece')
        .attr('data-color', 'pink')
        .attr('data-current-piece', true);
    }

    App.centerBox.row += 1;
  }
};