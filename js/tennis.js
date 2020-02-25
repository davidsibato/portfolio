var canvas;
var canvansContext;
var ballX = 50;
var ballSpeedX = 10
var ballY = 50;
var ballSpeedY = 10;

var player1Score = 0;
var player2Score =0;
const Winning_Score = 5;

var showingWinScreen = false;


var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS =10;


	function calculateMousePos(evt){
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return{ 
				x: mouseX,
				y: mouseY
				};

}
	function handleMouseClick(evt){
		if(showingWinScreen){
				player1Score =0;
				player2Score =0;
				showingWinScreen = false;
		}
	}

	window.onload = function(){
		
		canvas = document.getElementById('gameCanvas');
		canvansContext= canvas.getContext('2d');
		
		var framesPerSecond = 30;
		setInterval(function(){
				moveEverything();
				drawEverything();
				},1000/framesPerSecond);
		
		canvas.addEventListener('mousedown',handleMouseClick);
		
		canvas.addEventListener('mousemove',
				function(evt) 
				{ var mousePos = calculateMousePos(evt);
				paddle1Y= mousePos.y-(PADDLE_HEIGHT/2); // position of mouse - PADDLE_HEIGHT/2 to position mouse in middle of paddle
			});
		
		drawEverything();
		drawEverything();
		drawEverything();
		}
		
	function callboth ()  //to call other function
		{
			moveEverything;		
			drawEverything;
		}
		
	function ballReset(){
		if(player1Score >= Winning_Score ||
			player2Score >= Winning_Score){
				
				showingWinScreen = true
			}
	
			ballSpeedX = -ballSpeedX
			ballX = canvas.width/2;
			ballY = canvas.height/2;
		}
		
	function computerMovement(){
			var paddle2YCenter = paddle2Y +(PADDLE_HEIGHT/2);
			if (paddle2YCenter < ballY-35){
					paddle2Y += 6;}
					else if (paddle2YCenter > ballY +35){
						paddle2Y -=6}
	}
	
	function moveEverything()
		{
			if(showingWinScreen) {
					return;
			}
			computerMovement();
			ballX += ballSpeedX; // movement of the ball added by 5
			ballY +=ballSpeedY;
			
			//if(ballX > canvas.width) {
					//ballSpeedX = -ballSpeedX 
					//ballReset(); // reseting the ball
			//}
			if(ballX > canvas.width) {
					//ballSpeedX = -ballSpeedX 
					if (ballY>paddle2Y &&
						ballY < paddle2Y+PADDLE_HEIGHT) {
							ballSpeedX = - ballSpeedX;
							
					var deltaY = ballY -(paddle2Y+PADDLE_HEIGHT/2);
						ballSpeedY = deltaY *0.35;
							} else {
				player1Score++;// add score before ball reset
				ballReset(); // reseting the ball
				
				}
			}
			if(ballX < 0) 
			{
					//ballSpeedX = -ballSpeedX
					if (ballY > paddle1Y &&
					ballY < paddle1Y+ PADDLE_HEIGHT)
					{
					ballSpeedX = -ballX;
					
					var deltaY = ballY -(paddle1Y+PADDLE_HEIGHT/2);
					ballSpeedY = deltaY *0.35;
					} else {
					player2Score++; // add score before ball reset
					ballReset(); //reseting the ball
					
					}
									
			}
			
			if (ballY < 0){
					ballSpeedY = -ballSpeedY 
			}
			if (ballY > canvas.height) {
					ballSpeedY= -ballSpeedY 
			}
			
		}
	function drawNet(){
			for(var i=0; i<canvas.height; i+=40){
					colorRect(canvas.width/2-1,i,2,20,'white');
					
					}
	}
	function drawEverything(){
			
		console.log(ballY);
		//canvansContext.fillStyle = 'black';
		
		
		//next line is background black
		colorRect(0,0,canvas.width,canvas.height,'black');
		
		if(showingWinScreen) {
					canvansContext.fillStyle = 'white';
				if(player1Score >= Winning_Score){
					canvansContext.fillText("Left Player Won the Game!",350,200);
				}
				else if (player2Score >= Winning_Score){
					canvansContext.fillText("Right Player Won the Game!",350,200);
				}	
					canvansContext.fillText ("click to continue",400,300)
					return;
			}
		drawNet();
		// next is left paddle
		colorRect(2,paddle1Y,5,100,'white');
		// right paddle
		colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,100,'white');
		// next is the ball
		colorCircle(ballX,ballY,10,'blue');
		
			
			
			canvansContext.fillText(player1Score, 100,50);
			canvansContext.fillText(player2Score, canvas.width -100,50);
			
			}
			
	
	function colorCircle(centerX, centerY,radius,drawColor)
	{
		canvansContext.fillStyle = drawColor;
		canvansContext.beginPath();
		canvansContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
		canvansContext.fill();
	}
	
	function colorRect(leftX,topY,width,height, drawColor) 
	{
		canvansContext.fillStyle = drawColor;
		canvansContext.fillRect(leftX,topY,width,height);
	}