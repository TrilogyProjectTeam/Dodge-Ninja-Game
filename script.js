// // Get the game canvas and 2D rendering context
// var canvas = document.getElementById("gameCanvas");
// var ctx = canvas.getContext("2d");

// // Set the canvas dimensions
// canvas.width = 800;
// canvas.height = 600;

// // Ninja properties
// var ninja = {
//     x: canvas.width / 2,
//     y: canvas.height - 110,
//     width: 50,
//     height: 50,
//     speed: 15
// };

// // Obstacle properties
// var obstacle = {
//     x: Math.random() * canvas.width,
//     y: -100,
//     width: 50,
//     height: 90,
//     speed: 3
// };

// // Game state
// var score = 0;
// var isGameOver = false;
// var gameStart = false;

// // Event listener for start: when user clicks, start the game
// document.addEventListener("click", function() {
//     gameStart = true;
// })

// // Event listener for player movement
// document.addEventListener("keydown", function(event) {
//     if (event.keyCode === 37) { // Left arrow key
//         ninja.x -= ninja.speed;
//     } else if (event.keyCode === 39) { // Right arrow key
//         ninja.x += ninja.speed;
//     }
// });

// // Update game objects
// function update() {
//     if (!isGameOver && gameStart) {
//         // Move obstacle
//         obstacle.y += obstacle.speed;

//         // Check collision with obstacle
//         if (
//             ninja.x < obstacle.x + obstacle.width &&
//             ninja.x + ninja.width > obstacle.x &&
//             ninja.y < obstacle.y + obstacle.height &&
//             ninja.y + ninja.height > obstacle.y
//         ) {
//             isGameOver = true;
//         }

//         // Generate new obstacle and Increase score
//         if (obstacle.y + obstacle.height >= canvas.height) {
//             score++;
//             obstacle.x = Math.random() * (canvas.width - obstacle.width);
//             obstacle.y = 0;
//         }
//     }
// }

// // Render game objects
// function render() {
//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw ninja
//     ctx.fillStyle = "#000";
//     ctx.fillRect(ninja.x, ninja.y, ninja.width, ninja.height);

//     // Draw obstacle
//     ctx.fillStyle = "#f00";
//     ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

//     // Draw score
//     ctx.fillStyle = "#000";
//     ctx.font = "24px Arial";
//     ctx.fillText("Score: " + score, 10, 30);

//     //Draw Welcome Screen
//     if (!gameStart)
//     {
//         ctx.fillStyle = "#0f0";
//         ctx.font = "28px Arial";
//         ctx.fillText("Welcome to Ninja Dodge.\n Click anywhere to Start.", 
//                         (canvas.width / 8), canvas.height / 2);
//     }

//     // Draw game over message
//     if (isGameOver) {
//         ctx.fillStyle = "#f00";
//         ctx.font = "48px Arial";
//         ctx.fillText("Game Over", canvas.width / 2 - 120, canvas.height / 2);
//     }
// }

// // Game loop
// function gameLoop() {
//     update();
//     render();

//     if (!isGameOver) {
//         requestAnimationFrame(gameLoop);
//     }
// }

// // Start the game loop
// gameLoop();

// Get the game canvas and 2D rendering context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 1920;
canvas.height = 1080;

// Create the ninja and knife image objects
var ninjaImage = new Image();
ninjaImage.src = "ninja.png";

var knifeImage = new Image();
knifeImage.src = "knife.png";

// Ninja properties
var ninja = {
    x: canvas.width / 2 - 16,
    y: canvas.height - 80,
    width: 32,
    height: 32,
    speed: 5
};

// Obstacle properties
var obstacle = {
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 32,
    height: 64,
    speed: 3
};

// Game state
var score = 0;
var isGameOver = false;
var isGameStarted = false;

// Event listener for player movement and game start
document.addEventListener("keydown", function(event) {
    if (!isGameStarted && event.keyCode === 13) { // Enter key
        startGame();
    }

    if (isGameStarted) {
        if (event.keyCode === 37) { // Left arrow key
            ninja.x -= ninja.speed;
        } else if (event.keyCode === 39) { // Right arrow key
            ninja.x += ninja.speed;
        }
    }
});

// Function to start the game
function startGame() {
    isGameStarted = true;
    isGameOver = false;
    score = 0;

    ninja.x = canvas.width / 2 - 16;
    obstacle.x = Math.random() * (canvas.width - 50);
    obstacle.y = -50;

    gameLoop();
}

// Update game objects
function update() {
    if (!isGameOver && isGameStarted) {
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

        // Increase score when obstacle is dodged
        if (obstacle.y > ninja.y + ninja.height && !isGameOver) {
            score++;
        }

        // Generate new obstacle
        if (obstacle.y > canvas.height) {
            obstacle.x = Math.random() * (canvas.width - 50);
            obstacle.y = -50;
        }
    }
}

// Render game objects
function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameStarted) {
        // Draw ninja
        ctx.drawImage(ninjaImage, ninja.x, ninja.y, ninja.width, ninja.height);

        // Draw obstacle (knife)
        ctx.drawImage(knifeImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Draw score
        ctx.fillStyle = "#000";
        ctx.font = "48px Arial";
        ctx.fillText("Score: " + score, 10, 50);

        // Draw game over message
        if (isGameOver) {
            ctx.fillStyle = "#f00";
            ctx.font = "72px Arial";
            ctx.fillText("Game Over", canvas.width / 2 - 200, canvas.height / 2);
            ctx.font = "36px Arial";
            ctx.fillText("Press Enter to Play Again", canvas.width / 2 - 300, canvas.height / 2 + 50);
        }
    } else {
        // Draw start screen message
        ctx.fillStyle = "#000";
        ctx.font = "72px Arial";
        ctx.fillText("Press Enter to Start", canvas.width / 2 - 300, canvas.height / 2);
    }
}

// Game loop
function gameLoop() {
    update();
    render();

    if (!isGameOver && isGameStarted) {
        requestAnimationFrame(gameLoop);
    }
}

// Start the game loop
render();
