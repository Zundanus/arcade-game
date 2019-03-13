/**
* @description Represents a movable object in the game, it contains the
*              positioning, the image and the main drawing functions
* @constructor
* @param {int} startX - Startposition for the x (width) line
* @param {int} startY - Startposition for the y (hight) line
* @param {string} spirit - picture that will be drawn for the object
*                          default is "images/enemy-bug.png"
*/
class MovableObject {
  constructor(startX = 0,startY = 0, sprite = 'images/enemy-bug.png') {
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
    this.sprite = sprite;
  }
  /**
  * @description Draw the enemy on the screen, required method for game
  */
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**
* @description  Represents an enemy object in the game, it holds the
*               positioning, the image, the main drawing functions and also
*               the function for the movement of the object.
* @remark       the movment speed will be generatet randomly, in the number
*               range that is defined with maxSpeed and minSpeed
* @constructor
* @param {int} startX - Startposition for the x (width) line
* @param {int} startY - Startposition for the y (hight) line
* @param {int} minSpeed - the min Pixel value that the element will move
* @param {int} maxSpeed - the max Pixel value that the element will move
*/
class Enemy extends MovableObject {
  constructor(startX = 0, startY = 0, minSpeed = 50, maxSpeed = 50) {
    super(startX,startY)
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.speed = Math.floor((Math.random() * this.maxSpeed) +  this.minSpeed);
  }

  /**
  * @description  Update the enemy's position, required method for game
  * @param {int} dt - a time delta between ticks
  *                   speed for all computers.
  */
  update(dt) {
      if (this.x > 500) {
        this.speed = Math.floor((Math.random() * this.maxSpeed) + this.minSpeed);
        this.x = this.startX - this.speed;
      }
      this.x = this.x + (this.speed*dt);
  }
}


/**
* @description  Represents a player object in the game, it holds the
*               positioning, the image, the main drawing functions and also
*               the function for the movement of the player with the key events.
* @remark       the movment speed will be generatet randomly, in the number
*               range that is defined with maxSpeed and minSpeed
* @constructor
* @param {int} startX - Startposition for the x (width) line
* @param {int} startY - Startposition for the y (hight) line
* @param {int} minSpeed - the min Pixel value that the element will move
* @param {int} maxSpeed - the max Pixel value that the element will move
*/
class Player extends MovableObject {
  constructor(startX = 0, startY = 0, movementX = 100, movementY = 84,sprite = 'images/char-boy.png') {
    super(startX,startY)
    this.speedX = movementX;
    this.speedY = movementY;
    this.sprite = sprite;
  }

  /**
  * @description  Update the enemy's position, required method for game
  * @param {int} dt - a time delta between ticks
  *                   speed for all computers.
  */
  update(dt) {
      // TODO: not implement jet
  }

  /**
  * @description  handles the movement of the player figuer
  * @param {string} key - the key that the player pressd for the movement
  */
  handleInput(key) {
    switch (key) {
      case 'left':
          if (this.x - this.speedX >= 0) {
            this.x = this.x - this.speedX;
          }
        break;
      case 'up':
          if (this.y - this.speedY >= 0) {
            this.y = this.y - this.speedY;
          }
        break;
      case 'right':
          if (this.x + this.speedX <= 400) {
            this.x = this.x + this.speedX;
          }
        break;
      case 'down':
        if (this.y + this.speedY <= 405) {
          this.y = this.y + this.speedY;
        }
        break;
    }
  }
}

// Now instantiate your objects.
// enemy objects in an array called allEnemies
let allEnemies = [new Enemy(-20,60,100,200),
                  new Enemy(-20,143,75,150),
                  new Enemy(-20,227,75,125)];
// player object in a variable called player
let player = new Player(200,405,100,84,'images/char-boy.png');


/**
* @description  This listens for key presses and sends the keys to your
*               Player.handleInput() method. You don't need to modify this.
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
