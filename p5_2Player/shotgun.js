var shotgun;

function Shotgun() {
    this.fire1 = function(spreadX, spreadY) {
        // Create new bullet and push into array
        var bullet = new Bullet(character1.position.x+character1.size.x+spreadX, character1.position.y+character1.size.y/2, 1, spreadY, 20, 20, 20);
        bullets1.push(bullet);
    }
    
    this.fire2 = function(spreadX, spreadY) {
        // Create new bullet and push into array
        var bullet = new Bullet(character2.position.x-spreadX, character2.position.y+character2.size.y/2, -1, spreadY, 20, 20, 20);
        bullets2.push(bullet);
    }
}