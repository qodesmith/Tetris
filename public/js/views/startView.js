App.Views.StartView = Backbone.View.extend({
  initialize: function() {
    var _this = this;
    $(document).keypress(function(e) {
      if(e.which === 32) {
        $(document).off('keypress');
        _this.boardSize();
        App.mainView = new App.Views.MainView();
      }
    });

    $('body').on('click', '#clickHere', function() {
      $('#customize').css('visibility', 'visible');
      $('#message').empty();
    });

    this.template = Handlebars.compile($('#start-template').html());
    this.render();
  },
  el: '#container',
  render: function() {
    this.$el.html(this.template);
  },
  boardSize: function() {
    var columns = parseInt($('#customColumns').val());
    var rows = parseInt($('#customRows').val());

    // Set the columns and rows.
    App.columns = columns >= 5 ? columns : 10;
    App.rows = rows >= 10 ? rows : 20;

    // Set the starting level.
    var level = parseInt($('#startLevel').val());
    level ? App.level = level : App.level = 1;

    Controls.centerBox();
  }
});