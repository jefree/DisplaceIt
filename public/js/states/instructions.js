var DisplaceIt = DisplaceIt || {};

DisplaceIt.Instructions = function(game) {

}

DisplaceIt.Instructions.prototype.preload = function() {
  this.game.load.image('arrow_back', 'img/arrow_back.png');
}

DisplaceIt.Instructions.prototype.create = function() {

  var text = this.game.add.text(0, 0, DisplaceIt.Instructions.TEXT, {fill: "black", font: "28pt Unibody8Pro-Regular", align: "center"});
  text.wordWrap = true;
  text.wordWrapWidth = 450;
  text.anchor.set(.5, 0);
  text.x = this.game.world.centerX;
  text.y = 15;

  var backBtn = this.game.add.image(0, 0, 'arrow_back');
  backBtn.anchor.set(0, 1);
  backBtn.y = this.game.width;

  backBtn.inputEnabled = true;
  backBtn.events.onInputDown.add(function(){
    this.game.state.start('menu');
  }, this);
}

DisplaceIt.Instructions.prototype.update = function() {

}

DisplaceIt.Instructions.TEXT = "Haz que el personaje llegue a el punto objetivo, impulsalo vertical u horizontalmente con la ayuda del mouse."