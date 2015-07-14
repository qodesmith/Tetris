Info = {
  totalLines: function() {
    App.lines++;
    $('#totalLines').html(App.lines);

    // Check level.
    this.level()
  },
  score: function(linesFound) {
    // NES scoring:
    // 1 line  - 40pts
    // 2 lines - 100pts
    // 3 lines - 300pts
    // 4 lines (Tetris) - 1200pts
    if(linesFound === 0) {
      return;
    } else if(linesFound === 1) {
      App.score += 40;
    } else if(linesFound === 2) {
      App.score += 100;
    } else if(linesFound === 3) {
      App.score += 300;
    } else if(linesFound === 4) {
      App.score += 1200;
    }

    $('#score').html(App.score);
  },
  level: function(startLevel) {
    if(App.lines % 5 === 0) {
      // Increase the level.
      App.level++;
      $('#level').html(App.level);

      // Reset the waterfall speed.
      clearTimeout(goDown);
      Controls.waterfall();
    }
  }
};