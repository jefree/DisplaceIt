window.onload = function() {

  window.App = (function() {
    var LEVEL_KEY = 'dIt-level';

    var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameContainer');
    var level = 1;

    if (typeof(Storage) !== "undefined") {
      level = localStorage.getItem(LEVEL_KEY) || 1;
    }

    var gameState = new DisplaceIt.Game(level);

    game.state.add('game', gameState);
    game.state.start('game');

  })();

}