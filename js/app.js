// Enemies our player must avoid
let Enemy = function(initX = 0,initY = 0, maxSpeed = 50, minSpeed = 50) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.startX = initX;
    this.startY = initY;
    this.x = initX;
    this.y = initY;
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.speed = Math.floor((Math.random() * this.maxSpeed) +  this.minSpeed);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) {
      this.speed = Math.floor((Math.random() * this.maxSpeed) + this.minSpeed);
      this.x = this.startX - this.speed;
    }
    this.x = this.x + (this.speed*dt);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (initX = 200,initY = 405,initSpeedX = 100,initSpeedY = 84) {
  this.sprite = 'images/char-boy.png';
  this.x = initX;
  this.y = initY;
  this.startX = initX;
  this.startY = initY;
  this.speedX = initSpeedX;
  this.speedY = initSpeedY;
  Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  Player.prototype.update = function() {
      return 0;
  };
  Player.prototype.handleInput = function(key) {
    switch (key) {
      case 'left':
          this.x = this.x - this.speedX;
        break;
      case 'up':
          this.y = this.y - this.speedY;
        break;
      case 'right':
          this.x = this.x + this.speedX;
        break;
      case 'down':
          this.y = this.y + this.speedY;
        break;
    }
    console.log(this.x,this.y);
  };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(-20,60,200,100),
                  new Enemy(-20,143,150,75),
                  new Enemy(-20,227,125,75)];
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
