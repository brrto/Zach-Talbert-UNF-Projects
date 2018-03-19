// Character
var character2;

// Character object
function Character2() {
    this.size = createVector(50, 50);
    this.position = createVector(width-100, height/2);
    this.speed = 6;
    this.characterColor = 130;
    this.healthSize = createVector(41, 5);
    this.healthPosition = createVector(this.position.x+4, this.position.y-10);
    this.healthColor = color(150, 0, 0);
    this.health = 40;
    this.flashCounter = 0;
    this.gunType = "burstShot";
    this.toDelete = false;
    
    // Displays the character
    this.display = function() {
        fill(this.characterColor, 200);
        stroke(this.characterColor);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        
        // Display character's health
        stroke(0);
        strokeWeight(1);
        fill(bgColor);
        rect(this.healthPosition.x, this.healthPosition.y, this.healthSize.x, this.healthSize.y);
        noStroke();
        fill(this.healthColor);
        rect(this.healthPosition.x+1, this.healthPosition.y+1, this.health, this.healthSize.y-1);
    }
    
    // Checks if the character is hit by a bullet
    this.hits = function (bullet) {
        // Temporary variables to set edges for testing
        var testX = bullet.position.x;
        var testY = bullet.position.y;

        // Which edge is closest?
        if (bullet.position.x < this.position.x) {
            testX = this.position.x;
        }
        else if (bullet.position.x > this.position.x+this.size.x) {
            testX = this.position.x+this.size.x;
        }
        if (bullet.position.y < this.position.y) {
            testY = this.position.y;
        }
        else if (bullet.position.y > this.position.y+this.size.y) {
            testY = this.position.y+this.size.y;
        }

        // Get distance from closest edges
        var distance = dist(bullet.position.x, bullet.position.y, testX, testY)

        // Checks if the distance is less than the radius
        return (distance <= bullet.radius);
    }
    
    // Controls character movement
    this.checkMovement = function() {
        if (keyIsDown(38)) { // Move up
            var up = createVector(0, -this.speed);
            this.position.add(up);
            this.healthPosition.add(up);
        }
        else if (keyIsDown(40)) { // Move down
            var down = createVector(0, this.speed);
            this.position.add(down);
            this.healthPosition.add(down);
        }
        else if (keyIsDown(37)) { // Move left
            var left = createVector(-this.speed, 0);
            this.position.add(left);
            this.healthPosition.add(left);
        }
        else if (keyIsDown(39)) { // Move right
            var right = createVector(this.speed, 0);
            this.position.add(right);
            this.healthPosition.add(right);
        }
    }
    
    // Updates the character's health %
    this.updateHealth = function(bullet) {
        if (this.flashCounter>0) {
            this.characterColor = 255;
            this.flashCounter++;
        } else if (this.flashCounter==20) {
            this.characterColor = 130;
            this.flashCounter = 0;
        }
        
        if (character2.hits(bullet) && !bullet.toDelete) {
            if (character1.gunType==="shotgun")
                this.health -= 3;
            if (character1.gunType==="burstShot")
                this.health -= 2;
            if (character1.gunType==="sniper")
                this.health -= 8;
            if (character1.gunType==="laser")
                this.health -= 2;
            playerHit.play();
            bullet.toDelete = true;
        }
        
        // Checks if health is 0 and player should die
        if (this.health<=0) {
            this.health = 0;
            if (character2 != null) {
                character2.die();
                gameOver = "Player 1 Wins!";
                gameOverSound.play(null, null, 3, null, null);
            }
        }
    }
    
    // Checks the edges of the character and adjusts their position
    this.checkEdges = function() {
        // Checks if the character is touching the floor or ceiling
        if (this.position.y < 0) {
            this.position.y = 0;
            this.healthPosition.y = this.position.y-10;
        }
        if (this.position.y > height-50) {
            this.position.y = height-50;
            this.healthPosition.y = this.position.y-10;
        }
        
        // Checks if the character has hit the sides of the canvas or past their area
        if (this.position.x < width/2+120) {
            this.position.x = width/2+120;
            this.healthPosition.x = this.position.x+4;
        }
        if (this.position.x > width-50) {
            this.position.x = width-50;
            this.healthPosition.x = this.position.x+4;
        }
    }
    
    // Deletes the character
    this.die = function() {
        this.toDelete = true;
    }
    
    // Checks if the character is dead
    this.checkIfDead = function() {
        if (character2 != null && character2.toDelete) {
            character2 = null;
        }
    }
}