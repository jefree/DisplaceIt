var DisplaceIt = DisplaceIt || {};

DisplaceIt.Game.Character = function(game, x, y, key, frame, logic) {
  Phaser.Sprite.call(this, game, x, y, key, frame)

  this.logic = logic;
  
  this.game.physics.arcade.enable(this);

  this.inputEnabled = true;

  this.game.add.existing(this);

  this.events.onInputOver.add(function(){ 

    if (!this.game.input.activePointer.isDown && this.logic.allowMove){
      this.over = true;
    }
  }, this);

  this.events.onInputOut.add(function(){

    if (this.over && this.game.input.activePointer.isDown) {

      var x = this.game.input.activePointer.x;
      var y = this.game.input.activePointer.y;

      if (x > this.x + this.width) {
        this.body.velocity.x = DisplaceIt.Game.Character.SPEED;
        this.logic.allowMove = false;
      }

      else if (x < this.x) {
        this.body.velocity.x = -DisplaceIt.Game.Character.SPEED;
        this.logic.allowMove = false;
      }

      else if (y > this.y + this.height) {
        this.body.velocity.y = DisplaceIt.Game.Character.SPEED;
        this.logic.allowMove = false;
      }

      else if (y < this.y) {
        this.body.velocity.y = -DisplaceIt.Game.Character.SPEED;
        this.logic.allowMove = false;
      }
    }

    this.over = false;

  }, this);
}

DisplaceIt.Game.Character.prototype = Object.create(Phaser.Sprite.prototype);
DisplaceIt.Game.Character.prototype.constructor = DisplaceIt.Game.Character;

DisplaceIt.Game.Character.prototype.update = function() {

  if (this.body.velocity.x >= 0 && this.x > this.game.width) {
    this.logic.resetWorld();
  }

  else  if (this.body.velocity.x <= 0 && this.x + this.width < 0) {
    this.logic.resetWorld();
  } 

  else if (this.body.velocity.y >= 0 && this.y > this.game.height) {
    this.logic.resetWorld();
  }

  else if (this.body.velocity.y <= 0 && this.y + this.height < 0) {
    this.logic.resetWorld();
  }
}

DisplaceIt.Game.Character.SPEED = 150;
