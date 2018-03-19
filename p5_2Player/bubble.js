// Array of bubbles
var bubbles = [];

// Bubble object
function Bubble() {
    this.bubbleColor = 0;
    this.diameter= 30;
    this.radius = this.diameter/2;
    this.x = floor(random(width/2-110, width/2+110));
    this.y = floor(random(0+this.radius, height-this.radius));
    this.direction = [1,-1];
    this.Xdirection = 0;
    this.Ydirection = random(this.direction);
    this.Xspeed = random(1,4) * this.Xdirection;
    this.Yspeed = random(1,4) * this.Ydirection;
    this.toDelete = false;
    
    // Displays the bubble
    this.display = function() {
        stroke(150, 100, 100);
        strokeWeight(2);
        fill(this.bubbleColor);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
    
    // Deletes the bubble
    this.pops = function () {
        this.toDelete = true;
    }
    
    // Updates the bubble's postions
    this.updatePosition = function() {
        // Check if ball is within the frame
        if (this.y-this.radius < 0 || this.y+this.radius > height)
            this.Yspeed *= -1;
        // Update Y location
        this.y += this.Yspeed;
    }
    
    // Checks if the mouse is clicked within the bubble and changes its color
    this. clicked = function() {
        var distance = dist(this.x, this.y, mouseX, mouseY);
        if (distance<=this.radius) {
            this.bubbleColor = color(150, 100, 100);
        }
    }
}
