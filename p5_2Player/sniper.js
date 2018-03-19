var sniper;

function Sniper() {
    this.fire1 = function() {
        // Create new bullet and push into array
        var bullet = new Bullet(character1.position.x+character1.size.x, character1.position.y+character1.size.y/2, 1, 0, 40, 20, 50);
        bullets1.push(bullet);
        shotgunFX.play();
    }
    
    this.fire2 = function() {
        // Create new bullet and push into array
        var bullet = new Bullet(character2.position.x, character2.position.y+character2.size.y/2, -1, 0, 40, 20, 50);
        bullets2.push(bullet);
        shotgunFX.play();
    }
}