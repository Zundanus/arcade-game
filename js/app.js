/**
 * @description Represents a movable object in the game, it contains the
 *              positioning, the image and the main drawing functions
 * @constructor
 * @param {int} startX - Startposition for the x (width) line
 * @param {int} startY - Startposition for the y (hight) line
 * @param {string} spirit - picture that will be drawn for the object
 *                          default is "images/enemy-bug.png"
 */
class GameObject {
  constructor(startX = 0, startY = 0, sprite = '') {
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
    for (let elemet of allCollisionsObjects) {
      /* The collision logic validation is adaptet from  the version of Antonella Dean's
       * collision check: Copyright (c) 2018 Antonella Bernobich Dean;
       * https://github.com/aberdean/google-scholarship-fend-projects/tree/master/classic-arcade-game-clone */
      if (elemet != this && (Math.abs(player.x - elemet.x) <= 60) && (Math.abs(player.y - elemet.y) <= 17)) {
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
class Enemy extends GameObject {
  constructor(startX = 0, startY = 0, minSpeed = 50, maxSpeed = 50, sprite = 'images/enemy-bug.png') {
    super(startX, startY, sprite);
    this.maxSpeed = maxSpeed;
    this.minSpeed = minSpeed;
    this.speed = Math.floor((Math.random() * this.maxSpeed) + this.minSpeed);
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
    this.x = this.x + (this.speed * dt);
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
class Gem extends GameObject {
  constructor(startX = 0, startY = 0, color = 1) {
    super(startX, startY);
    this.points = 10;
    this.isKey = false;
    switch (color) {
      case 1:
      case 2:
      case 3:
        this.sprite = 'images/Gem Blue.png';
        this.points = 25;
        break;
      case 4:
      case 5:
        this.sprite = 'images/Gem Green.png';
        this.points = 40;
        break;
      case 6:
        this.sprite = 'images/Key.png';
        this.isKey = true;
        this.points = 60;
        break;
      default:
        this.sprite = 'images/Gem Orange.png';
        this.points = 10;
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
  static getNewGem() {
    const x = Math.floor((Math.random() * 3) + 1) * 100;
    const y = Math.floor((Math.random() * 3) + 1) * 76;
    let returnGem = new Gem(x, y, Math.floor((Math.random() * 12) + 1));
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
class Player extends GameObject {
  constructor(startX = 0, startY = 0, movementX = 100, movementY = 84, sprite = 'images/char-boy.png') {
    super(startX, startY, sprite);
    this.speedX = movementX;
    this.speedY = movementY;
    this.points = 0;
    this.live = 3;
    this.dead = false;
    this.won = false;
    this.hasKey = false;
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
        if (cObject.isKey) {
          this.hasKey = true;
        }
        this.points += cObject.points;
        allCollisionsObjects.delete(cObject);
        allCollisionsObjects.add(Gem.getNewGem());
      } else {
        this.live -= 1;
        live.innerHTML = this.live;
        console.log(this.live);
        if (this.live <= 0) {
          this.dead = true;
          this.live = 3;
        } else {
          this.resetPlayer();
        }
      }
    }
    score.innerHTML = this.points;
    live.innerHTML = this.live;
  }


  /**
   * @description  Sets the gaming figure back to start
   */
  resetPlayer() {
    this.x = this.startX;
    this.y = this.startY;
  }

  /**
   * @description  displays the win screen
   */
  win() {
    this.won = true;
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
        } else if (this.hasKey) {
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
  }
}


// Now instantiate your objects.
const score = document.querySelector('#scores');
const live = document.querySelector('#liveCounter');
let allCollisionsObjects = new Set([new Enemy(-20, 60, 100, 200),
  new Enemy(-20, 143, 75, 150),
  new Enemy(-20, 227, 75, 125)
]);
let displayOnlyObjects = new Set([new GameObject(0, -18, 'images/Rock.png'),
  new GameObject(100, -18, 'images/Rock.png'),
  new GameObject(200, -18, 'images/Rock.png'),
  new GameObject(300, -18, 'images/Rock.png'),
  new GameObject(400, -18, 'images/Rock.png')
]);
// player object in a variable called player
let player = new Player(200, 405, 100, 84, 'images/char-boy.png');
allCollisionsObjects.add(player);
allCollisionsObjects.add(Gem.getNewGem());


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

/**
 * @description  eventliserener for the button in the messagebox resets the game
 */
document.querySelector('.button').addEventListener('click', function(e) {
  gameBord.classList.remove('hide');
  gameInfo.classList.remove('hide');
  gameMessageBox.classList.add('hide');
  allCollisionsObjects = new Set([new Enemy(-20, 60, 100, 200),
    new Enemy(-20, 143, 75, 150),
    new Enemy(-20, 227, 75, 125)
  ]);
  // player object in a variable called player
  player = new Player(200, 405, 100, 84, 'images/char-boy.png');
  allCollisionsObjects.add(player);
  allCollisionsObjects.add(Gem.getNewGem());
});
