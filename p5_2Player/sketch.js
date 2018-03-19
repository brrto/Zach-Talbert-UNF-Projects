var someSound;
var gameOverSound;
var winGame;
var shoot;
var shotgunFX;
var laserFX;
var playerHit;
var gameOver = "";
var EOG = false;

function preload() {
    someSound = loadSound("bubblePop.mp3");
//    enemyDeath = loadSound("gameOver.mp3");
    enemyDeath = loadSound("Death_01.wav");
    gameOverSound = loadSound("GameOver.wav");
    winGame = loadSound("winGame.mp3");
    shoot = loadSound("shoot.wav");
    shotgunFX = loadSound("shotgun.wav");
    laserFX = loadSound("laser.wav");
    playerHit = loadSound("playerHit.wav")
    enemyHit = loadSound("enemyHit.wav");
}

function setup() {
//    docWidth = document.body.clientWidth;
//    docHeight = document.body.clientHeight;
//    createCanvas(docWidth, 400);
    createCanvas(1200, 700);
    
    
    // Create characters
    character1 = new Character1();
    character2 = new Character2();
    
    
    // Create gun types
    burstShot = new BurstShot();
    shotgun = new Shotgun();
    sniper = new Sniper();
    laser1 = new Laser1();
    laser2 = new Laser2();
    
    
    // Create bubbles
    var numBubbles = 10;
//    var numBubbles = random(3,6);
    for (var i=0; i<numBubbles; i++) {
        // Make a bubble for each array index
        bubbles[i] = new Bubble();
    }
    
    
    // Create upgrade bars
    upgrade1 = new Upgrade1();
    upgrade2 = new Upgrade2();
}

var bgColor = 50;
var hit = false;
var sketchCount = 0;
var timer = 1;
var bubbleTimer = 30*timer;
var bubbleCountdown = bubbleTimer;
function draw() {
    sketchCount++;
    background(bgColor);
    noStroke();
    fill(bgColor-5);
    rect(width/2-120, 0, 240, height);
    noStroke();
    fill(bgColor-10);
    rect(width/2-110, 0, 220, height);
    noStroke();
    fill(bgColor-15);
    rect(width/2-100, 0, 200, height);
    noStroke();
    fill(bgColor-20);
    rect(width/2-90, 0, 180, height);
    noStroke();
    fill(bgColor-25);
    rect(width/2-80, 0, 160, height);
    noStroke();
    fill(bgColor-30);
    rect(width/2-70, 0, 140, height);
    
    
    // Displays and updates bubbles
    for (var i=0; i<bubbles.length; i++) {
        if (bubbles[i].toDelete) {
            bubbles.splice(i, 1);
        } else {
            bubbles[i].display();
            bubbles[i].updatePosition();
        }
    }
    // Adds a new bubble every (x) times sketch is called
    if (bubbleCountdown==0) {
        bubbles.push(new Bubble());
        bubbleCountdown = bubbleTimer;
    } else {bubbleCountdown--;}
    if (sketchCount%100 == 0) {
        timer -= 0.8;
    }
    
    
    // Checks if players shoot and adds to the time before they can shoot again
    playerShoots();
    bulletWait1--;
    bulletWait2--;
    // Displays and updates player 1's bullets
    for (var i=0; i<bullets1.length; i++) {
        if (bullets1[i].onCanvas() && !bullets1[i].toDelete) {
            bullets1[i].updatePosition();
            bullets1[i].display();
            if (character2 != null)
                character2.updateHealth(bullets1[i]);
            for (var j = 0; j < bubbles.length; j++) {
                if (bullets1[i].hitsBubble(bubbles[j])) {
                    if (character1.gunType!="sniper") {
                        bullets1[i].toDelete = true;
                        bubbles[j].pops();
                        someSound.play(null, null, 3, null, null);
                    }
                    upgrade1.increment();
                }
            }
        }
    }
    // Displays and updates player 2's bullets
    for (var i=0; i<bullets2.length; i++) {
        if (bullets2[i].onCanvas() && !bullets2[i].toDelete) {
            bullets2[i].updatePosition();
            bullets2[i].display();
            if (character1 != null)
                character1.updateHealth(bullets2[i]);
            for (var j = 0; j < bubbles.length; j++) {
                if (bullets2[i].hitsBubble(bubbles[j])) {
                    if (character2.gunType!="sniper") {
                        bullets2[i].toDelete = true;
                        bubbles[j].pops();
                        someSound.play(null, null, 3, null, null);
                    }
                    upgrade2.increment();
                }
            }
        }
    }
    // Displays and updates player 1's laser
    if (laser1.shoot && character2!=null) {
        laser1.update();
        laser1.display();
        if (laser1.hits(character2))
            character2.health -= 0.2;
        // Checks if health is 0 and player should die
        if (character2.health<=0) {
            character2.health = 0;
            if (character2 != null) {
                character2.die();
                gameOver = "Player 2 Wins!";
                gameOverSound.play(null, null, 3, null, null);
            }
        }
    }
    // Displays and updates player 2's laser
    if (laser2.shoot && character1!=null) {
        laser2.update();
        laser2.display();
        if (laser2.hits(character1))
            character1.health -= 0.2;
        // Checks if health is 0 and player should die
        if (character1.health<=0) {
            character1.health = 0;
            if (character1 != null) {
                character1.die();
                gameOver = "Player 2 Wins!";
                gameOverSound.play(null, null, 3, null, null);
            }
        }
    }
    
    
    // Displays and updates character
    if (character1 != null) {
        character1.checkMovement();
        character1.checkEdges();
        character1.display();
        character1.checkIfDead();
    }
    // Displays and updates character
    if (character2 != null) {
        character2.checkMovement();
        character2.checkEdges();
        character2.display();
        character2.checkIfDead();
    }
    
    
    playerUpgrades();
    // Player 1's upgrade bar
    upgrade1.update();
    upgrade1.display();
    // Player 2's upgrade bar
    upgrade2.update();
    upgrade2.display();
    
    
    // Check certain weapon types
    checkBurstCount();
    
    
    // Speed cap notification
    var s = "Speed Upgrade Maxed";
    if (speedCap1==0) {
        speedCount1++;
        if (speedCount1>0) {
            textSize(16);
            fill(255);
            text(s, 40, 50);
        }
        if (speedCount1==300)
            speedCap1--;
    }
    if (speedCap2==0) {
        speedCount2++;
        if (speedCount2>0) {
            textSize(16);
            fill(255);
            text(s, width-200, 50);
        }
        if (speedCount2==300)
            speedCap2--;
    }
    
    
    // Game Over text
    textSize(100);
    strokeWeight(4);
    stroke(255);
    if (character1 == null)
        fill(110, 180, 255);
    if (character2 == null)
        fill(255, 80, 0);
    text(gameOver, width/2-350, height/2);
}
///////////////////////////////////////////////////////////////////////////////
function playerShoots() {
    // Player 1 shoots
    if (keyIsDown(32) && bulletWait1<0) {
        if (character1.gunType==="burstShot") {
            burstShot.fire1();
            burstCount1++;
        }
        else if (character1.gunType==="shotgun") {
            var spreadX = 5;
            var spreadY = 2.4;
            for (var i=0; i<7; i++) {
                shotgun.fire1(spreadX, spreadY);
                spreadY *= -1;
                if (i==1 || i==3 || i==5) {
                    spreadX += 5;
                    spreadY -= 0.8;
                }
                if (i==0)
                    shotgunFX.play();
            }
        }
        else if (character1.gunType==="sniper") {
            sniper.fire1();
        }
        else if (character1.gunType==="laser")
            laser1.fire();
        bulletWait1 = 50;
    }
    // Player 2 shoots
    if (keyIsDown(96) && bulletWait2<0) {
        if (character2.gunType==="burstShot") {
            burstShot.fire2();
            burstCount2++;
        }
        else if (character2.gunType==="shotgun") {
            var spreadX = 5;
            var spreadY = 2.4;
            for (var i=0; i<7; i++) {
                shotgun.fire2(spreadX, spreadY);
                spreadY *= -1;
                if (i==1 || i==3 || i==5) {
                    spreadX += 5;
                    spreadY -= 0.8;
                }
                if (i==0)
                    shotgunFX.play();
            }
        }
        else if (character2.gunType==="sniper") {
            sniper.fire2();
        }
        else if (character2.gunType==="laser")
            laser2.fire();
        bulletWait2 = 50;
    }
}
///////////////////////////////////////////////////////////////////////////////
function playerUpgrades() {
    var gunTypes = ["shotgun", "sniper", "laser"]
    // Lets player 2 choose an upgrade if available
    if (keyCode=='70' && upgrade1.isAvailable && upgrade1.drain==0) {
        var gun = random(gunTypes);
        while (gun==character1.gunType)
            gun = random(gunTypes);
        character1.gunType = gun;
        upgrade1.flashCount++;
        upgrade1.drain++;
    }
    if (keyCode=='71' && upgrade1.isAvailable) {
        if (speedCap1>0) {
            character1.speed += 3;
            upgrade1.isAvailable = false;
            upgrade1.upgrade = 0;
            speedCap1--;
        } else {}
    }
    if (keyCode=='72' && upgrade1.isAvailable) {
        if (character1.health <= 28) {
            character1.health += 12;
            upgrade1.isAvailable = false;
            upgrade1.upgrade = 0;
        }
        else if (character1.health == 32) {
            character1.health += 8;
            upgrade1.isAvailable = false;
            upgrade1.upgrade = 0;
        }
        else if (character1.health == 36) {
            character1.health += 4;
            upgrade1.isAvailable = false;
            upgrade1.upgrade = 0;
        }
    }
    
    // Lets player 2 choose an upgrade if available
    if (keyCode=='49' && upgrade2.isAvailable && upgrade2.drain==0) {
        var gun = random(gunTypes);
        while (gun==character2.gunType)
            gun = random(gunTypes);
        character2.gunType = gun;
        upgrade2.flashCount++;
        upgrade2.drain++;
    }
    if (keyCode=='50' && upgrade2.isAvailable) {
        if (speedCap2>0) {
            character2.speed += 3;
            upgrade2.isAvailable = false;
            upgrade2.upgrade = 0;
            speedCap2--;
        }
    }
    if (keyCode=='51' && upgrade2.isAvailable) {
        if (character2.health <= 28) {
            character2.health += 12;
            upgrade2.isAvailable = false;
            upgrade2.upgrade = 0;
        }
        else if (character2.health == 32) {
            character2.health += 8;
            upgrade2.isAvailable = false;
            upgrade2.upgrade = 0;
        }
        else if (character2.health == 36) {
            character2.health += 4;
            upgrade2.isAvailable = false;
            upgrade2.upgrade = 0;
        }
    }
}



