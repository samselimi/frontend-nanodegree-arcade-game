var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    this.collisionBox = 70;
    this.minX = 40;
    this.maxX = 300;
};

Enemy.prototype.update = function(dt) {
    if (this.x < 500) {
      this.x = this.x + 140 * dt;
    }
    else {
      var ranNum = Math.floor(Math.random() * (this.maxX - this.minX)) + this.minX;
      var negLaneStartX = Math.abs(ranNum) * -1;
      this.x = negLaneStartX;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';

    this.lives = 3;
    this.score = 0;

    this.moveX = 101;
    this.moveY = 85;

    this.startx = 202;
    this.starty = 400;

    this.x = this.startx;
    this.y = this.starty;

};

Player.prototype.update = function() {

  allEnemies.forEach(function(enemy) {
    if (enemy.y == player.y) {
      if (enemy.x <= (player.x + enemy.collisionBox) && enemy.x >= (player.x - enemy.collisionBox) ) {
        player.x = player.startx;
        player.y = player.starty;
        player.lives--;
      }
    }
  });
};

Player.prototype.render = function() {
    
  //Display Score
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.fillStyle = '#ADFF2F';
  ctx.font = 'italic bold 85px arial';
  ctx.textBaseline = 'bottom';
  ctx.fillText(player.score, 422, 140);
    
  //Display Lives
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.fillStyle = '#FF0000';
  ctx.font = 'italic bold 85px arial';
  ctx.fillText(player.lives, 27, 140);
    
  //Alert if you Win
  if (player.score === 3) {
  alert("You Win!");
  location.reload();
  }

};

Player.prototype.handleInput = function(keys) {
  
  //Alert if you Lose
  if (player.lives === 0) {
  alert("Game Over");
  location.reload();
  }

    function validMoveX(move) {
      var newX = move;
      if (newX < 50) {
        return 0;
      }
      else if (newX > 500) {
        return 0;
      }
      else {
        return newX;
      }
    }

    function validMoveY(move) {
      var newY = move;
      if (newY < 50) {
        player.score++;
        return 400;
      }
      else if (newY > 450) {
        return 400;
      }
      else {
        return newY;
      }
    }

    if (keys == "left") {
      this.x = validMoveX(this.x - this.moveX);
    }
    else if (keys == "right") {
      this.x = validMoveX(this.x + this.moveX);
    }
    else if (keys == "up") {
      this.y = validMoveY(this.y - this.moveY);
    }
    else if (keys == "down") {
      this.y = validMoveY(this.y + this.moveY);
    }
    else {
      console.log("No Move or Incorrect Key");
    }
    //alert("Valid check X " + this.x + ", Y " + this.y);
    console.log("Valid check X " + this.x + ", Y " + this.y);
};


var bug01 = new Enemy(-10, 60);
var bug02 = new Enemy(-10, 145);
var bug03 = new Enemy(-20, 230);
var bug04 = new Enemy(-300, 60);
var bug05 = new Enemy(-260, 145);
var allEnemies = [bug01, bug02, bug03, bug04, bug05];
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});