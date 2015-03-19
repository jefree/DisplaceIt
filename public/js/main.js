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
    var password = document.getElementById("password");

    var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameContainer');

    game.state.add('menu', DisplaceIt.Menu)
    game.state.add('game', DisplaceIt.Game);
    game.state.add('instructions', DisplaceIt.Instructions);

    function validate() {

      var name = username.value;
      var pass = password.value;

      if (!name || !pass) {
        onErrorValidate();
        return;
      }

      ajax.post('/api/users/login', {username: name, password: pass}, onSuccessValidate, onErrorValidate)
    }

    function register() {
      var name = username.value;
      var pass = password.value;

      if (!name || !pass) {
        onErrorValidate();
        return;
      }

      ajax.post('/api/users/', {username: name, password: pass}, onSuccessRegister, onErrorRegister)
    }

    function onSuccessValidate(data) {
      
      data = JSON.parse(data);
      showGame(data.level);
    }

    function onErrorValidate(err, status) {
      console.log(status);
      showError("Usuario y/o Contraseña invalidos :(");
    }

    function onSuccessRegister(){
      showGame(1);
    }

    function onErrorRegister(){
      showError("Este usuario ya existe :( ");
    }

    function showGame(level) {
      info.style.display = "none";
      gameContainer.style.display = "block";

      game.state.start('menu', true, false, username.value, password.value, level);
    }

    function showError(msg) {
      error.innerHTML = msg;
      error.style.display = "block";

      setTimeout(function(){
        error.style.display = "none";
      }, 1000);
    }

    return {
      validate: validate,
      register: register
    }

  })();
}