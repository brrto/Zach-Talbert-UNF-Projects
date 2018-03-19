// Array of obstacles
var obstacles;
var obstacle;

function Obstacle() {
    this.size = createVector(50, 50);
    this.position = createVector(width, height);
    this.velocity = createVector(0, 0);
    this.obstacleColor = 255;
    
    // Displays the obstacle
    this.display = function() {
        fill(this.obstacleColor);
        stroke(this.obstacleColor);
        rect(this.position.x, this.position.y-this.size.y, this.size.x, this.size.y);
    }
}