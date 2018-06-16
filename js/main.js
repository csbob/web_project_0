var globalAvatarImage = new Image();
var globalEnemyImage = new Image();
var enemyYPositions = [];
var enemyXPositions = [];
var enemyWidth = [];
var enemyHeight = [];
// var enemyYPositions = [0, -50, -75, -120, -250];
// var enemyXPositions = [250, 130, 300, 50, 190];
var playerX = 0;
var playerY = 0;
var avatarImage;
var enemyImage;

var playerWidth = 35;
var playerHeight = 35;

// var enemyWidth = 15;
// var enemyHeight = 15;

var enemyEaten = 0;
var randomColissionTrack = 0;

globalAvatarImage.src = "img/bubble.png";
globalEnemyImage.src = "img/enemy.png";

function setUpGame() {
	var canvas = document.getElementById('canvas');
	var section = document.getElementById('section');
    
    // var canvasWidth = canvas.width;
	// canvas.width = section.width/2;
	// var canvasHeight = canvas.height;

	avatarImage = new Image();
	enemyImage = new Image();

	var element = document.querySelector('initial_text');
	// element.style.display = "none";
	
	enemyImage.src = "img/enemy.png"
	avatarImage.src = "img/bubble.png"

	canvas.getContext("2d").drawImage(avatarImage, Math.random()*100, Math.random()*100, playerWidth, playerHeight);


	canvas.addEventListener("mousemove", handleMouseMovement)
	setInterval(handleTick, 25);
}

function handleMouseMovement (mouseEvent) {
	playerX = mouseEvent.offsetX;
	playerY = mouseEvent.offsetY;
}

function gameOver() {
	gameOver = function(){}; // kill it as soon as it was called (func can be called only once)
	alert ("YOU DIED");
	document.location.reload();
}

function gameOverSound() {
	gameOverSound = function(){}; // kill it as soon as it was called (func can be called only once)
	var audioDefeat = new Audio('sound/defeat.wav');
	audioDefeat.play();
}

function handleTick() {

    var canvas = document.getElementById('canvas');
	var currentEnemyNumber = 0;
	var numberOfEnemies = enemyXPositions.length 

	var audioEnemyHit = new Audio('sound/enemy_hit.wav');

	var audioColissionSound = new Audio(); // random sound collision sound
	var collisionPlaylist = [
	    'sound/colission_1.wav',
	    'sound/colission_2.wav',
	    'sound/colission_3.wav',
	    'sound/colission_4.wav'];
	var randomColissionSound = Math.floor((Math.random() * 3) + 1);
	audioColissionSound.src = collisionPlaylist[randomColissionSound];

	var randomEnemyPos = Math.random() * (4 - (-4)) + (-4);


    if (Math.random() < 1/45)
    {
		// enemy Position Randomizer 
        enemyYPositions.push(0);
        enemyXPositions.push(Math.random() * (canvas.width-15));
    	// enemy Size Randomizer
		enemyWidth.push(Math.random() * (90 - 15) + (15));
		enemyHeight = enemyWidth;

        console.log("Enemy Created");
    }

	while (currentEnemyNumber < numberOfEnemies) { 
		enemyYPositions[currentEnemyNumber] = enemyYPositions[currentEnemyNumber] + 1 ; // Changing enemy Y position 
		currentEnemyNumber = currentEnemyNumber + 1;
	}

	// var canvasWidth = canvas.width;
	canvas.width = 800;     //this erases the contents of the canvas

	canvas.getContext("2d").drawImage(avatarImage, playerX, playerY, playerWidth, playerHeight)
	canvas.getContext("2d").fillStyle = "#a0ade1";
	canvas.getContext("2d").fillText("You ate "+ enemyEaten + " innocent liveforms, heartless bastard.", 25, 25);

	currentEnemyNumber = 0;
	while (currentEnemyNumber < numberOfEnemies) {
		canvas.getContext("2d").drawImage(enemyImage, enemyXPositions[currentEnemyNumber], enemyYPositions[currentEnemyNumber], enemyWidth[currentEnemyNumber], enemyHeight[currentEnemyNumber]);
		currentEnemyNumber = currentEnemyNumber + 1;
	}

	currentEnemyNumber = 0;
	while (currentEnemyNumber < numberOfEnemies) {

	   if (((playerX < enemyXPositions[currentEnemyNumber] && enemyXPositions[currentEnemyNumber] < playerX + playerWidth) 
	   	|| (enemyXPositions[currentEnemyNumber] < playerX && playerX < enemyXPositions[currentEnemyNumber] + enemyWidth[currentEnemyNumber])) 
	   	&& ( (playerY < enemyYPositions[currentEnemyNumber] && enemyYPositions[currentEnemyNumber] < playerY + playerWidth) 
	   	|| (enemyYPositions[currentEnemyNumber] < playerY && playerY < enemyYPositions[currentEnemyNumber] + enemyWidth[currentEnemyNumber])) 
	   		&& playerWidth >= enemyWidth[currentEnemyNumber] ) 
	   {
		playerWidth = playerWidth + 2;
		playerHeight = playerHeight + 2;
		delete enemyXPositions[currentEnemyNumber];
		delete enemyYPositions[currentEnemyNumber];
		enemyEaten = enemyEaten + 1;
		audioColissionSound.play();
	   }

	   else if (((playerX < enemyXPositions[currentEnemyNumber] && enemyXPositions[currentEnemyNumber] < playerX + playerWidth) 
	   	|| (enemyXPositions[currentEnemyNumber] < playerX && playerX < enemyXPositions[currentEnemyNumber] + enemyWidth[currentEnemyNumber])) 
	   	&& ( (playerY < enemyYPositions[currentEnemyNumber] && enemyYPositions[currentEnemyNumber] < playerY + playerWidth) 
	   	|| (enemyYPositions[currentEnemyNumber] < playerY && playerY < enemyYPositions[currentEnemyNumber] + enemyWidth[currentEnemyNumber])) 
	   		&& playerWidth < enemyWidth[currentEnemyNumber] ) 
	   {
		playerWidth = playerWidth - 5;
		playerHeight = playerHeight - 5;
		delete enemyXPositions[currentEnemyNumber];
		delete enemyYPositions[currentEnemyNumber];
		audioEnemyHit.play();
	   }

	   else if ( playerWidth <= 15)
	   {
	   	gameOverSound();
	   	setTimeout('gameOver();', 50);
		

	   }


	   currentEnemyNumber = currentEnemyNumber + 1;
	}
}



