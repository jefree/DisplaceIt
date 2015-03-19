window.onload = function() {

  window.App = (function() {

    if (typeof(Storage) === "undefined") {
      alert("Browser doesn't support localStorage");
      return;
    }

    var info = document.getElementById("info");
    var gameContainer = document.getElementById("gameContainer");

    var username = document.getElementById("username");
    var error = document.getElementById("error");

    var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameContainer');

    game.state.add('menu', DisplaceIt.Menu)
    game.state.add('game', DisplaceIt.Game);
    game.state.add('instructions', DisplaceIt.Instructions);

    if (localStorage.getItem('dIt-username')) {
      gameContainer.style.display = "block";
      info.style.display = "none";
      game.state.start('menu');
    }
    else {
      info.style.display = "block";
    }

    function validateUsername() {

      var text = username.value;
      ajax.post('/api/users', {username: text}, onSuccessValidate, onErrorValidate)
    }

    function onSuccessValidate() {
      info.style.display = "none";
      gameContainer.style.display = "block";

      localStorage.setItem('dIt-username', username.value);

      game.state.start('menu');
    }

    function onErrorValidate() {
      error.style.display = "block";

      setTimeout(function(){
        error.style.display = "none";
      }, 1000);
    }

    return {
      validateUsername: validateUsername
    }

  })();
}