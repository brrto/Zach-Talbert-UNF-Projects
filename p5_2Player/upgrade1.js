// Character upgrade bar
var upgrade1;
var speedCap1 = 3;
var speedCount1 = 0;

// Upgrade object
function Upgrade1() {
    this.size = createVector(15, 102);
    this.position = createVector(15, height-this.size.y-15);
    this.upgradeColor = 0;
    this.isAvailable = false;
    this.drain = 0;
    this.flash = false;
    this.flashCount = 0;
    this.upgrade = 0;
    
    // Displays the health bar
    this.display = function() {
        noFill();
        strokeWeight(1);
        stroke(150, 100, 100);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        fill(this.upgradeColor);
        noStroke();
        rect(this.position.x+1, this.position.y+this.size.y-1, this.size.x-1, -this.upgrade);
        
        if(this.flash) {
            strokeWeight(5);
            stroke(255);
            noFill();
            rect(this.position.x-5, this.position.y-5, this.size.x+10, this.size.y+10);
        }
    }
    
    // Increment upgrade bar %
    this.increment = function() {
        if (this.upgrade<100 && character1.gunType==="burstShot")
            this.upgrade += 4;
//        if (this.upgrade<100 && character1.gunType==="shotgun")
//            this.upgrade += 4;
//        if (this.upgrade<100 && character1.gunType==="sniper")
//            this.upgrade += 4;
//        if (this.upgrade<100 && character1.gunType==="laser")
//            this.upgrade += 10;
    }
    
    // Updates the character's health %
    this.update = function() {
        // Checks if upgrade is available
        if (this.upgrade>=100) {
            this.upgrade = 100;
            this.isAvailable = true;
        }
        
        if (this.isAvailable) {
            if (this.drain==0)
                this.flash = true;
            else if (this.drain<400) {
                // Flips flash value
                if (this.flash && this.flashCount!=0 && this.flashCount%25==0)
                    this.flash = false;
                else if (!this.flash && this.flashCount!=0 && this.flashCount%25==0)
                    this.flash = true;
                this.flashCount++;
            }
            else if (this.drain<501) {
                // Flips flash value
                if (this.flash && this.flashCount!=0 && this.flashCount%10==0)
                    this.flash = false;
                else if (!this.flash && this.flashCount!=0 && this.flashCount%10==0)
                    this.flash = true;
                this.flashCount++;
            }
        } else
            this.flash = false;
        
        if (this.drain>0) {
            this.drain++;
            this.upgrade -= 0.2;
            if (this.drain==501) {
                this.drain = 0;
                this.flashCount = 0;
                this.flash = false;
                this.isAvailable = false;
                character1.gunType = "burstShot";
            }
        }
    }
}