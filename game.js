var canvas = document.getElementById("breakoutCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
//position of ball moving
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//paddle settings
var paddleHeight = 10;
var paddleWidth = 95;
var paddleXAxis = (canvas.width-paddleWidth)/2;

//movment initial settings
var rightPressed = false;
var leftPressed = false;

//number of Rows and Columns
var brickRowCount = 6;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

//building brick field in 2d array
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#7B241C";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleXAxis, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#7B241C";
  ctx.fill();
  ctx.closePath();
}

//loops through all bricks and draws them to the screen
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#7B241C";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


function drawScore() {
  ctx.font = "16px Courier New";
  ctx.fillStyle = "#7B241C";
  ctx.fillText("Bricks Destroyed: "+score, 8, 20);
}


document.getElementById("myBtn").addEventListener("click", function(){


//clear the canvas and drawing
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

//so the ball doesn't leave the stage
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleXAxis && x < paddleXAxis + paddleWidth) {
      dy = -dy;
    }
    else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }

//paddle doesn't move off the screen and can move left and right

  if(rightPressed && paddleXAxis < canvas.width-paddleWidth) {
    paddleXAxis += 7;
  }
  else if(leftPressed && paddleXAxis > 0) {
    paddleXAxis -= 7;
  }

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10);




});
