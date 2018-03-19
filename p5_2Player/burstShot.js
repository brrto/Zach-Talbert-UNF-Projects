var burstShot;
var burstCount1 = 0;
var burstCount2 = 0;

function BurstShot() {
    this.fire1 = function() {
        // Create new bullet and push into array
        var bullet = new Bullet(character1.position.x+character1.size.x+5, character1.position.y+character1.size.y/2, 1, 0, 20, 20, 15);
        bullets1.push(bullet);
        // Play shooting sound
        shoot.play();
    }
    
    this.fire2 = function() {
        // Create new bullet and push into array
        var bullet = new Bullet(character2.position.x-5, character2.position.y+character2.size.y/2, -1, 0, 20, 20, 15);
        bullets2.push(bullet);
        // Play shooting sound
        shoot.play();
    }
}

function checkBurstCount() {
    if (burstCount1==5) {
        burstShot.fire1();
    }
    else if (burstCount1==10) {
        burstShot.fire1();
        burstCount1 = 0;
    }
    
    if (burstCount2==5) {
        burstShot.fire2();
    }
    else if (burstCount2==10) {
        burstShot.fire2();
        burstCount2 = 0;
    }
    
    // Increment the count
    if (burstCount1>0)
        burstCount1++;
    if (burstCount2>0)
        burstCount2++;
}