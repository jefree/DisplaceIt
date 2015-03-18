var DisplaceIt = DisplaceIt || {};

DisplaceIt.Menu = function(game){

}

DisplaceIt.Menu.prototype.init = function(what) {

}

DisplaceIt.Menu.prototype.preload = function() {

  this.game.load.image('play_btn', '/img/play_btn.png');
}

DisplaceIt.Menu.prototype.create = function() {

  var playBtn = this.game.add.image(0, 0, 'play_btn');
  playBtn.inputEnabled = true;

  playBtn.events.onInputDown.add(function(){
   
    var level = localStorage.getItem('dIt-level');

    if (!level) {
      localStorage.setItem('dIt-level', 1);
      level = 1;
    }

    this.game.state.start('game', true, false, level);    
    
  }, this);

}

DisplaceIt.Menu.prototype.update = function() {

}