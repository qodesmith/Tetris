App = {
  Views: {},
  currentPiece: ''
};

window.onload = function() {
	console.log('Loaded, bro.');
  App.startView = new App.Views.StartView();
};