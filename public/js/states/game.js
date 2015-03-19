var DisplaceIt = DisplaceIt || {};

DisplaceIt.Game = function(game){
}

DisplaceIt.Game.prototype.init = function(username, password, level) {
  this.username = username;
  this.password = password;
  this.level = level;

  console.log('game', username, password, level);
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

  this.time = 0;
  this.allowMove = true;

  this.chars = [];
  this.chars[0] = new DisplaceIt.Game.Character(this.game, 0, 0, "spaceship", 0, this);

  this.chars[1] = new DisplaceIt.Game.Character(this.game, 0, 0, "station", 0, this);
  this.chars[2] = new DisplaceIt.Game.Character(this.game, 0, 0, "station", 0, this);
  this.chars[3] = new DisplaceIt.Game.Character(this.game, 0, 0, "station", 0, this);

  this.timeText = this.game.add.text(0, 0, '00:00', {fill: "red", font: "20pt Unibody8Pro-Regular", align: "left"});
  this.timeText.anchor.set(0, 1);
  this.timeText.y = this.game.height;

  this.levelText = this.game.add.text(0, 0, this.level, {fill: "red", font: "20pt Unibody8Pro-Regular", align: "left"});
  this.levelText.anchor.set(1, 1);
  this.levelText.x = this.game.width;
  this.levelText.y = this.game.height;

  this.game.time.events.loop(1000, function(){
    this.time += 1;
    this.timeText.text = this.getMinutesText();

  }, this);

  this.loadLevel(this.level);
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

    this.level += 1;
    this.win = true;

    ajax.put('/api/users/level/', { username: this.username, password: this.password, level: this.level });
    this.loadLevel(this.level)
  }
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
    this.chars[i].visible = true;
    this.chars[i].body.velocity.set(0, 0);
  }
} 

DisplaceIt.Game.prototype.loadLevel = function(number) {

  this.chars.forEach(function(sprite) {
    sprite.visible = false;
  });
      
  this.game.load.json('level-'+number, '/api/levels/'+number);

  this.game.load.onLoadComplete.addOnce(function(){
    var level = this.game.cache.getJSON('level-'+number);
    
    this.currentWorld = level;
    this.levelText.text = number;
    this.resetWorld();

    this.loaded = true;

  }, this);

  this.game.load.start();
}

DisplaceIt.Game.prototype.getMinutesText = function() {

  var minutes = Math.floor(this.time / 60);
  var seconds = this.time - minutes * 60;

  if (minutes < 10) {
    minutes = '0'+minutes;
  }
  else {
    minutes = ''+minutes;
  }

  if (seconds < 10) {
    seconds = '0'+seconds;
  }
  else {
    seconds = ''+seconds;
  }

  return minutes + ':' + seconds;
}

DisplaceIt.Game.prototype.render = function(){
  
}