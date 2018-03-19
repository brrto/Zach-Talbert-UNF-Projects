var laser1;
var laser2;
var laserTimer1 = 50;
var laserTimer2 = 50;


function Laser1() {
    this.shoot = false;
    this.size = createVector(1200, character1.size.y);
    this.position = createVector(character1.position.x+character1.size.x+5, character1.position.y-20);
    
    this.fire = function() {
        this.shoot = true;
        // Play shooting sound
        laserFX.play();
    }
    
    this.update = function() {
        var laserShrink;
        if (laserTimer1>45)
            laserShrink = 0;
        else if (laserTimer1>40)
            laserShrink = 5;
        else if (laserTimer1>35)
            laserShrink = 10;
        else if (laserTimer1>30)
            laserShrink = 15;
        else if (laserTimer1>25)
            laserShrink = 20;
        else if (laserTimer1>20)
            laserShrink = 25;
        else if (laserTimer1>15)
            laserShrink = 30;
        else if (laserTimer1>10)
            laserShrink = 35;
        else if (laserTimer1>5)
            laserShrink = 40;
        else if (laserTimer1>0)
            laserShrink = 45;
        else if (laserTimer1==0)
            laserShrink = 50;
        
        noStroke();
        fill(random(0,100));
        this.size = createVector(1200, 50-laserShrink*2);
        this.position = createVector(character1.position.x+character1.size.x+5, character1.position.y+laserShrink);
        
        laserTimer1--;
        if (laserTimer1==0) {
            laserTimer1 = 50;
            this.shoot = false;
        }
        
    }
    
    this.display = function() {
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    
    this.hits = function(character) {
        return !(character.position.y > this.position.y+this.size.y || character.position.y+character.size.y < this.position.y);
    }
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

function Laser2() {
    this.shoot = false;
    this.size = createVector(-1200, character2.size.y);
    this.position = createVector(character2.position.x-5, character2.position.y);
    
    this.fire = function() {
        this.shoot = true;
        // Play shooting sound
        laserFX.play();
    }
    
    this.update = function() {
        var laserShrink;
        if (laserTimer2>45)
            laserShrink = 0;
        else if (laserTimer2>40)
            laserShrink = 5;
        else if (laserTimer2>35)
            laserShrink = 10;
        else if (laserTimer2>30)
            laserShrink = 15;
        else if (laserTimer2>25)
            laserShrink = 20;
        else if (laserTimer2>20)
            laserShrink = 25;
        else if (laserTimer2>15)
            laserShrink = 30;
        else if (laserTimer2>10)
            laserShrink = 35;
        else if (laserTimer2>5)
            laserShrink = 40;
        else if (laserTimer2>0)
            laserShrink = 45;
        else if (laserTimer2==0)
            laserShrink = 50;
        
        noStroke();
        fill(random(0,100));
        this.size = createVector(-1200, 50-laserShrink*2);
        this.position = createVector(character2.position.x-5, character2.position.y+laserShrink);
        
        laserTimer2--;
        if (laserTimer2==0) {
            laserTimer2 = 50;
            this.shoot = false;
        }
    }
    
    this.display = function() {
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    
    this.hits = function(character) {
        return !(character.position.y > this.position.y+this.size.y || character.position.y+character.size.y < this.position.y);
    }
}