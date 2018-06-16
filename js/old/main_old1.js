
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var x = canvas.width/2;
var y = canvas.height - 30;

var minEnemyX = 0;
var maxEnemyX = canvas.width; 
var minEnemyY = 0;
var maxEnemyY = canvas.height;

var coordEnemyX = Math.floor(Math.random() * (maxEnemyX - minEnemyX + 1)) + minEnemyX;
var coordEnemyY = Math.floor(Math.random() * (maxEnemyY - minEnemyY + 1)) + minEnemyY;

var coordEnemyStartChangeX = 0;
var coordEnemyStartChangeY = 0;

// var coordEnemyX = 400;
// var coordEnemyY = 300;

// var timeRandomChange;

var minCoordChangeTime = 800;
var maxCoordChangeTime = 7000;

// var timeRandomChange = Math.floor(Math.random() * (maxCoordChangeTime - minCoordChangeTime + 1)) + minCoordChangeTime;

// var randomEnemyMoveX = Math.floor(Math.random() * (maxRandomEnemyMoveY - minRandomEnemyMoveX + 1)) + minRandomEnemyMoveX;
// var randomEnemyMoveY = Math.floor(Math.random() * (maxRandomEnemyMoveY - minRandomEnemyMoveY + 1)) + minRandomEnemyMoveY;

var maxRandomEnemyMoveX = 25;
var minRandomEnemyMoveX = -25;
var maxRandomEnemyMoveY = 25;
var minRandomEnemyMoveY = -25;

var enemyCount = 5;
var enemyRadius = 10;

var ballRadius = 20;



function drawPlayer() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

document.addEventListener("mousemove", mouseMoveHandler, false)

function mouseMoveHandler (e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
	x = relativeX - ballRadius/2;
	}
	var relativeY = e.clientY - canvas.offsetTop;
	if(relativeY > 0 && relativeY < canvas.height) {
	y = relativeY - ballRadius/2;
	}
}

function drawEnemy()
{
    ctx.beginPath();
    ctx.arc(coordEnemyX, coordEnemyY, enemyRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // coordEnemyX += coordEnemyStartChangeX;
    // coordEnemyY += coordEnemyStartChangeY;
}

function randomEnemyDirectionChangeTime () 
{	
	var timeRandomChange = Math.floor(Math.random() * (maxCoordChangeTime - minCoordChangeTime + 1)) + minCoordChangeTime;

	ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("timeRandomChange: "+ timeRandomChange, 8, 60);

	return timeRandomChange;
};

function randomEnemyDirectionChange () 
{
	var randomEnemyMoveX = Math.floor(Math.random() * (maxRandomEnemyMoveY - minRandomEnemyMoveX + 1)) + minRandomEnemyMoveX;
	var randomEnemyMoveY = Math.floor(Math.random() * (maxRandomEnemyMoveY - minRandomEnemyMoveY + 1)) + minRandomEnemyMoveY;

    if(coordEnemyX + randomEnemyMoveX > canvas.width-enemyRadius || coordEnemyX + randomEnemyMoveX < enemyRadius) {
        randomEnemyMoveX = -randomEnemyMoveX;
    }
    if(coordEnemyY + randomEnemyMoveY > canvas.height-enemyRadius || coordEnemyY + randomEnemyMoveY < enemyRadius) {
        randomEnemyMoveY = -randomEnemyMoveY;
    }
    
    coordEnemyX += randomEnemyMoveX;
	coordEnemyY += randomEnemyMoveY;

	ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("randomEnemyMoveY: "+ randomEnemyMoveX, 8, 40);
    ctx.fillText("randomEnemyMoveY: "+ randomEnemyMoveY, 8, 20);
}



function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemy();
    // randomEnemyDirectionChangeTime();
}

// setInterval(drawScene, 10);
// setInterval(randomEnemyDirectionChange, randomEnemyDirectionChangeTime);

/////////////////////////////////////////////////////////////////////////////////
function init(){
  window.requestAnimationFrame(draw);
}

var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

function clear() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw() {
	var ctx = document.getElementById('canvas').getContext('2d');
  clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}

ball.draw();