// Get the game canvas and 2D rendering context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Ninja properties
var ninja = {
    x: canvas.width / 2,
    y: canvas.height - 110,
    width: 50,
    height: 50,
    speed: 15
};

// Obstacle properties
var obstacle = {
    x: Math.random() * canvas.width,
    y: -100,
    width: 50,
    height: 90,
    speed: 3
};

// Game state
var score = 0;
var isGameOver = false;
var gameStart = false;

// Event listener for start: when user clicks, start the game
document.addEventListener("click", function() {
    gameStart = true;
})

// Event listener for player movement
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37) { // Left arrow key
        ninja.x -= ninja.speed;
    } else if (event.keyCode === 39) { // Right arrow key
        ninja.x += ninja.speed;
    }
});

// Update game objects
function update() {
    if (!isGameOver && gameStart) {
        // Move obstacle
        obstacle.y += obstacle.speed;

        // Check collision with obstacle
        if (
            ninja.x < obstacle.x + obstacle.width &&
            ninja.x + ninja.width > obstacle.x &&
            ninja.y < obstacle.y + obstacle.height &&
            ninja.y + ninja.height > obstacle.y
        ) {
            isGameOver = true;
        }

        // Generate new obstacle and Increase score
        if (obstacle.y + obstacle.height >= canvas.height) {
            score++;
            obstacle.x = Math.random() * (canvas.width - obstacle.width);
            obstacle.y = 0;
        }
    }
}

// Render game objects
function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ninja
    ctx.fillStyle = "#000";
    ctx.fillRect(ninja.x, ninja.y, ninja.width, ninja.height);

    // Draw obstacle
    ctx.fillStyle = "#f00";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Draw score
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    //Draw Welcome Screen
    if (!gameStart)
    {
        ctx.fillStyle = "#0f0";
        ctx.font = "28px Arial";
        ctx.fillText("Welcome to Ninja Dodge.\n Click anywhere to Start.", 
                        (canvas.width / 8), canvas.height / 2);
    }

    // Draw game over message
    if (isGameOver) {
        ctx.fillStyle = "#f00";
        ctx.font = "48px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 120, canvas.height / 2);
    }
}

// Game loop
function gameLoop() {
    update();
    render();

    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Start the game loop
gameLoop();
