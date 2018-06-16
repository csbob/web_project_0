


var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 0.001;
var dy = -0.001;

var minEnemyX = 0;
var maxEnemyX = canvas.width; 
var minEnemyY = 0;
var maxEnemyY = canvas.height;

// var randEnemyX = Math.floor(Math.random() * (maxEnemyX - minEnemyX + 1)) + minEnemyX;
// var randEnemyY = Math.floor(Math.random() * (maxEnemyY - minEnemyY + 1)) + minEnemyY;

var randEnemyX = 2;
var randEnemyY = -2;


var minCoordChangeTime = 100;
var maxCoordChangeTime = 300;
var timeRandomChange = Math.floor(Math.random() * (maxCoordChangeTime - minCoordChangeTime + 1)) + minCoordChangeTime;


var maxRandomEnemyMoveY = canvas.width;
var minRandomEnemyMoveX = 0;
var maxRandomEnemyMoveY = canvas.height;
var minRandomEnemyMoveY = 0;

var randomEnemyMoveX = Math.floor(Math.random() * (maxRandomEnemyMoveY - minRandomEnemyMoveX + 1)) + minRandomEnemyMoveX;
var randomEnemyMoveY = Math.floor(Math.random() * (maxRandomEnemyMoveY - minRandomEnemyMoveY + 1)) + minRandomEnemyMoveY;

var enemyCount = 5;
var enemyRadius = 10;

var ballRadius = 20;



function drawBall() {
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
    ctx.arc(randEnemyX, randEnemyY, enemyRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

 //    if(randEnemyX + randomEnemyMoveX > canvas.width-enemyRadius || randEnemyX + randomEnemyMoveX < enemyRadius) {
 //        randomEnemyMoveX = -randomEnemyMoveX;
 //    }
 //    if(randEnemyY + randomEnemyMoveY > canvas.height-enemyRadius || randEnemyY + randomEnemyMoveY < enemyRadius) {
 //        randomEnemyMoveY = -randomEnemyMoveY;
 //    }
    
 //    randEnemyX += randomEnemyMoveX;
	// randEnemyY += randomEnemyMoveY;
}



// ______________________________________________


function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = canvas.height - 50;
    var w = canvas.width - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(){
    var newq = makeNewPosition();
    $('.enemy').animate({ top: newq[0], left: newq[1] }, function(){
      animateDiv();        
    });
    
};





// __________________________________________






function drawFoes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnemy();
    animateDiv();

}

function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
}




setInterval(drawPlayer, 10);
setInterval(drawFoes, timeRandomChange);



// draw();
