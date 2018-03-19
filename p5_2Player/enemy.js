// Enemy
var enemy;

// Enemy object
function Enemy() {
    this.size = createVector(50, 50);
    this.position = createVector(80, 80);
    this.velocity = createVector(5, 0);
    this.enemyColor = color(0, 150, 150);
    this.healthSize = createVector(40, 5);
    this.healthPosition = createVector(this.position.x+4, this.position.y-10);
    this.healthColor = color(150, 0, 0);
    this.health = 40;
    this.toDelete = false;
    
    // Displays the enemy & health bar
    this.display = function() {
        // Display enemy
        stroke(0);
        fill(this.enemyColor);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        
        // Display enemy's health
        stroke(0);
        strokeWeight(1);
        fill(bgColor);
        rect(this.healthPosition.x, this.healthPosition.y, this.healthSize.x, this.healthSize.y);
        noStroke();
        fill(this.healthColor);
        rect(this.healthPosition.x+1, this.healthPosition.y+1, this.health, this.healthSize.y-2);
    }
    
    // Updates the enemy
    this.update = function() {
        if (this.position.x > width-80-this.size.x || this.position.x < 80) {
            this.velocity.x*=-1;
        }
        this.position.add(this.velocity);
        this.healthPosition.add(this.velocity);
    }
    
    // Makes the enemy flash when hit
    this.flash = function() {
        if (this.enemyColor==130)
            this.enemyColor = 255;
        else if (this.enemyColor==255)
            this.enemyColor = color(0, 150, 150);
    }

    // Deletes the enemy
    this.die = function() {
        this.toDelete = true;
        gameOver = "Player wins";
        if (!EOG) {
            winGame.play(null, null, 3, null,2);
            EOG = true;            
        }
    }
    
    // Checks if the enemy is dead
    this.checkIfDead = function() {
        if (enemy != null && enemy.toDelete) {
            enemy = null;
            enemyDeath.play();
        }
    }
}