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
  /**
  * @description  Checks if the object collides with a an nother game object
  * @remark       collision logic addaptet from
  *               https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
  * @return returns the element that the object colides with
  */
  checkCollisions() {
    for (let elemet of allCollisionsObjects ) {
      /* The collision logic validation is adaptet from  the version of Antonella Dean's
   		 * collision check: Copyright (c) 2018 Antonella Bernobich Dean;
  		 * https://github.com/aberdean/google-scholarship-fend-projects/tree/master/classic-arcade-game-clone */
       if (elemet != this && (Math.abs(player.x - elemet.x) <= 60) && (Math.abs(player.y - elemet.y) <= 15)) {
          return elemet;
       }
    }
    return null;
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
* @description  Represents a gem object in the game, it holds the
*               positioning, the image, the main drawing functions.
* @constructor
* @param {int} startX - Startposition for the x (width) line
* @param {int} startY - Startposition for the y (hight) line
* @param {int} color - color of the gem (1 blue, 2 green, 3 orange);
*/
class Gem extends MovableObject {
  constructor(startX = 0, startY = 0, color = blue) {
    super(startX,startY)
    switch (color) {
      case 1:
        this.sprite = 'images/Gem Blue.png';
        break;
      case 2:
          this.sprite = 'images/Gem Green.png';
        break;
      default:
        this.sprite = 'images/Gem Orange.png';
    }
  }

  /**
  * @description  could update the movment of an gem
  * @param {int} dt - a time delta between ticks
  *                   speed for all computers.
  */
  update(dt) {

  }
  /**
  * @description  staic method to generate a new gem
  * @param {int} dt - a time delta between ticks
  *                   speed for all computers.
  */
  static getNewGem(){
    const x = Math.floor((Math.random() * 4) + 1) * 100;
    const y = Math.floor((Math.random() * 4) + 1) * 78;
    let returnGem = new Gem(x,y,Math.floor((Math.random() * 2) + 1))
    return returnGem;
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
    let cObject = super.checkCollisions();
    if (cObject != null) {
        if (cObject instanceof Gem) {
            gems = null;
            allCollisionsObjects.delete(cObject);
            gems = Gem.getNewGem();
            allCollisionsObjects.add(gems);
        }else{
          this.resetPlayer();
        }
    }
  }


  /**
  * @description  Sets the gaming figure back to start
  */
  resetPlayer(){
    this.x = this.startX;
    this.y = this.startY;
  }

  /**
  * @description  displays the win screen
  */
  win(){
    this.x = this.startX;
    this.resetPlayer();
    alert('win win');
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
          else {
            this.win();
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
    console.log(`${player.x} ${player.y}`);
  }
}

// Now instantiate your objects.
// enemy objects in an array called allEnemies
let allEnemies = [new Enemy(-20,60,100,200),
                  new Enemy(-20,143,75,150),
                  new Enemy(-20,227,75,125)];
// player object in a variable called player
let player = new Player(200,405,100,84,'images/char-boy.png');
let gems = null;

let allCollisionsObjects = new Set(allEnemies);
allCollisionsObjects.add(player);
gems = Gem.getNewGem();
allCollisionsObjects.add(gems);


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
