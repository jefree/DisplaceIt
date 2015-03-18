window.onload = function() {

  window.App = (function() {

    if (typeof(Storage) === "undefined") {
      alert("Browser doesn't support localStorage");
      return;
    }

    var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameContainer');

    game.state.add('menu', DisplaceIt.Menu)
    game.state.add('game', DisplaceIt.Game);

    game.state.start('menu');

  })();

}