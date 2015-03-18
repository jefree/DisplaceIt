var DisplaceIt = DisplaceIt || {};

DisplaceIt.Menu = function(game){

}

DisplaceIt.Menu.prototype.init = function(what) {

}

DisplaceIt.Menu.prototype.preload = function() {

  this.game.load.image('title', '/img/title.png');
  this.game.load.image('play_btn', '/img/play_btn.png');
  this.game.load.image('instructions_btn', '/img/instructions_btn.png');
}

DisplaceIt.Menu.prototype.create = function() {

  this.game.stage.backgroundColor = "black"//"#99d9ea"

  var title = this.game.add.image(0, 0, 'title');
  title.anchor.set(.5, 0);
  title.x = this.game.world.centerX;

  var playBtn = this.game.add.image(0, 0, 'play_btn');
  playBtn.anchor.set(.5, .5);
  playBtn.x = this.game.world.centerX;
  playBtn.y = this.game.world.centerY - playBtn.height / 2 - 10 +50;
  
  var instructionsBtn = this.game.add.image(0, 0, 'instructions_btn');
  instructionsBtn.anchor.set(.5, .5);
  instructionsBtn.x = this.game.world.centerX;
  instructionsBtn.y = this.game.world.centerY + instructionsBtn.height/2 + 10 +50;

  playBtn.inputEnabled = true;
  instructionsBtn.inputEnabled = true;

  playBtn.events.onInputDown.add(function(){
   
    var level = localStorage.getItem('dIt-level');

    if (!level) {
      localStorage.setItem('dIt-level', 1);
      level = 1;
    }

    this.game.state.start('game', true, false, level);    
    
  }, this);

  instructionsBtn.events.onInputDown.add(function(){
    this.game.state.start('instructions');
  }, this);

}

DisplaceIt.Menu.prototype.update = function() {

}