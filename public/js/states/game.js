var DisplaceIt = DisplaceIt || {};

DisplaceIt.Game = function(game){
}

DisplaceIt.Game.prototype.init = function(levelNumber) {
  this.initialLevel = levelNumber;
}

DisplaceIt.Game.prototype.preload = function(){

  this.game.load.image('spaceship', '/img/spaceship.png');
  this.game.load.image('wormhole', '/img/wormhole.png');
  this.game.load.image('station', '/img/station.png');

}

DisplaceIt.Game.prototype.create = function(){
  //this.game.add.image(0, 0, 'background');

  this.winSprite = this.game.add.image(0, 0, 'wormhole');
  this.winSprite.anchor.set(.5, .5);

  this.allowMove = true;

  this.chars = [];
  this.chars[0] = new DisplaceIt.Game.Character(this.game, 0, 0, "spaceship", 0, this);

  this.chars[1] = new DisplaceIt.Game.Character(this.game, 0, 0, "station", 0, this);
  this.chars[2] = new DisplaceIt.Game.Character(this.game, 0, 0, "station", 0, this);
  this.chars[3] = new DisplaceIt.Game.Character(this.game, 0, 0, "station", 0, this);

  this.loadLevel(this.initialLevel);
}

DisplaceIt.Game.prototype.update = function() {

  this.winSprite.rotation += Math.PI / 45;

  if (!this.loaded)
    return;

  this.game.physics.arcade.overlap(this.chars, this.chars, function(obj1, obj2) {

    if (obj1 == obj2)
      return;

    if (this.win == true)
      return;

    obj1.body.velocity.set(0, 0);
    obj2.body.velocity.set(0, 0);

    this.reposition(obj1);
    this.reposition(obj2);

    this.checkVictory();
    this.allowMove = true;

  }, null, this);
}


DisplaceIt.Game.prototype.reposition = function(obj) {
  obj.x = Math.round(obj.x / 100) * 100;
  obj.y = Math.round(obj.y / 100) * 100;
}

DisplaceIt.Game.prototype.checkVictory = function() {
  var x = Math.round(this.chars[0].x / 100);
  var y = Math.round(this.chars[0].y / 100);

  if (x == this.winPos.x && y == this.winPos.y) {
    var level = Number(localStorage.getItem('dIt-level'));
    level += 1;
    localStorage.setItem('dIt-level', level);

    this.win = true;

    this.loadLevel(level)
  }
}

DisplaceIt.Game.prototype.setWorld = function(world) {
  this.currentWorld = world;
}

DisplaceIt.Game.prototype.createWorld = function() {

  for (var i=0; i<4; i++) {
    this.chars[i].position.set(this.currentWorld.chars[i].x*100, this.currentWorld.chars[i].y*100);
  }

  this.winPos = this.currentWorld.winPos;
  this.winSprite.position.set(this.winPos.x*100 + this.winSprite.width*.5, this.winPos.y*100 + this.winSprite.height*.5);
}

DisplaceIt.Game.prototype.resetWorld = function() {
  this.allowMove = true;
  this.win = false;
  this.createWorld(this.currentWorld);

  for ( i in this.chars) {
    this.chars[i].body.velocity.set(0, 0);
  }
} 

DisplaceIt.Game.prototype.loadLevel = function(number) {
      
  this.game.load.json('level-'+number, '/api/levels/'+number);

  this.game.load.onLoadComplete.addOnce(function(){
    var level = this.game.cache.getJSON('level-'+number);
    
    this.setWorld(level);
    this.resetWorld();

    this.loaded = true;

  }, this);

  this.game.load.start();
}

DisplaceIt.Game.prototype.render = function(){
  
}