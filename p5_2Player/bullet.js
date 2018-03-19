var bullets1 = [];
var bullets2 = [];
var bulletWait1 = 50;
var bulletWait2 = 50;

function Bullet(posX, posY, dirX, dirY, sizeX, sizeY, speed) {
    this.dirX = dirX;
    this.dirY = dirY;
    this.speed = speed;
    this.radius = 20;
    this.size = createVector(sizeX, sizeY);
    this.position = createVector(posX, posY);
    this.velocity = createVector(this.speed*this.dirX, this.dirY);
    this.obstacleColor = 255;
    this.trail = [];
    this.toDelete = false;
    
    // Displays the obstacle
    this.display = function() {
        fill(this.obstacleColor);
        stroke(0);
        ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    
    // Updates the bullet's postions
    this.updatePosition = function() {
        this.position.add(this.velocity);
    }
    
    this.onCanvas = function() {
        // Checks if the bullet is on the canvas
        if (this.position.x>width || this.position.x<0 || this.position.y>height || this.position.y<0) {
            return false;
        } else 
            return true;
    }
    
    // Checks for bullet/bubble collision
    this.hitsBubble = function(bubble) {
        var d = dist(this.position.x, this.position.y, bubble.x, bubble.y);       
        return (d < (this.size.x/2 + bubble.diameter/2));
    } 
    
    // Checks if the bullet hits the enemy
    this.hitsEnemy = function(enemy) {
        // Temporary variables to set edges for testing
        var testX = this.position.x;
        var testY = this.position.y;

        // Which edge is closest?
        if (this.position.x < enemy.position.x) {
            testX = enemy.position.x;
        }
        else if (this.position.x > enemy.position.x+enemy.size.x) {
            testX = enemy.position.x+enemy.size.x;
        }
        if (this.position.y < this.position.y) {
            testY = this.position.y;
        }
        else if (this.position.y > enemy.position.y+enemy.size.y) {
            testY = enemy.position.y+enemy.size.y;
        }

        // Get distance from closest edges
        var distance = dist(this.position.x, this.position.y, testX, testY)

        // Checks if the distance is less than the radius
        return (distance <= this.radius);
    }
}