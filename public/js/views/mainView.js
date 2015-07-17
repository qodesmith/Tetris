App.Views.MainView = Backbone.View.extend({
  initialize: function() {
    this.template = Handlebars.compile($('#main-template').html());
    this.render();
    this.renderBoard(App.columns, App.rows);
    this.renderLines();

    Controls.arrows(); // Start listening to the arrow keys for controlling the board.
    Pieces[Pieces.randomPiece()](); // Start the game with a random piece.
    App.nextPiece = Pieces.randomPiece(); // Store the next piece in the queue.
    Controls.nextPiece(); // Display the queued piece.
    Controls.waterfall(); // Start moving the pieces down automatically.
    $('#level').html(App.level); // Display the level.

    // Enable game pausing.
    App.gamePaused = false;
    $(document).keypress(function(e) {
      if(e.which === 32) {
        Controls.pauseGame();
      }
    });
  },
  el: '#container',
  render: function() {
    this.$el.html(this.template);

    // Set the flexbox layout to row (vertical).
    $('#container').css('flex-direction','row');
  },
  renderBoard: function(columns, rows) {
    var boardWidth = columns * 30;
    var boardHeight = rows * 30;

    $('#board')
      .width(boardWidth)
      .height(boardHeight);

    $('#nextPiece')
      .width(150)
      .height(150);

    // Create the tetris board on the fly.
    for(var i = 1; i <= rows; i++) {
      for(var j = 1; j <= columns; j++) {
        var box = $('<div class="box row' + i + ' column' + j + '" data-occupied="false">');
        box.appendTo($('#board'));
      }
    }

    // Create the preview board on the fly.
    for(var k = 1; k <= 5; k++) {
      for(var l = 1; l <= 5; l++) {
        var nextPiece = $('<div class="box previewRow' + k + ' previewColumn' + l + '">');
        nextPiece.appendTo($('#nextPiece'));
      }
    }
  },
  renderLines: function() {
    App.lines = 0;
    App.linesScored = [];
    App.score = 0;
    $('#totalLines').html(App.lines);
  }
});