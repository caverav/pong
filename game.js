//GAME VARIABLES
var scoreP1 = 0;
var scoreP2 = 0;
var h = window.innerHeight - 3.6;
var w = window.innerWidth - 3.6;
var wc = window.innerWidth;
var hc = window.innerHeight;
var first = true;
var cancha = false;
var back = 0;
//BALL VARIABLES
var ballX = w / 2;
var ballY = h / 2;
var ballSpeedX;
var ballSpeedY;
//PLAYER1 VARIABLES
var player1W = w / 70;
var player1H = h / 5;
var player1Y = h / 2 - player1H / 2;
var player1X = 0;
//PLAYER2 VARIABLES
var player2W = w / 70;
var player2H = h / 5;
var player2Y = h / 2 - player2H / 2;
var player2X = w - player2W;
function setup() {
	createCanvas(w, h);
}
function draw() {
	textSize(wc / 55);
	back;
	canchaTenis();
	ellipse(ballX, ballY, wc / 40);
	rect(player1X, player1Y, player1W, player1H);
	rect(player2X, player2Y, player2W, player2H);
	moveP1();
	moveP2();
	moveBall();
	collision();
	stroke(255);
	maya();
	showScore();
	checkWin();
	if (first) {
		fill(255);
		text('Para iniciar una partida presiona espacio.', wc / 1.7 - wc / 4, 50, wc / 2 + wc / 4, 50);
		ballCenter();
		if (keyIsDown(32)) {
			resetGame();
			first = false;
		}
	}
}
//MOVES
function moveP1() {
	if (keyIsDown(87)) {
		player1Y -= hc / 45;
	} else if (keyIsDown(83)) {
		player1Y += hc / 45;
	}
	if (player1Y <= 0) {
		player1Y = 0;
	} else if (player1Y >= hc - player1H) {
		player1Y = hc - player1H;
	}
}
function moveP2() {
	if (keyIsDown(UP_ARROW)) {
		player2Y -= hc / 45;
	} else if (keyIsDown(DOWN_ARROW)) {
		player2Y += hc / 45;
	}
	if (player2Y <= 0) {
		player2Y = 0;
	} else if (player2Y >= hc - player2H) {
		player2Y = hc - player2H;
	}
}
function moveBall() {
	ballY += ballSpeedY;
	ballX += ballSpeedX;
	if (ballY >= h || ballY <= 0) {
		ballSpeedY = -ballSpeedY;
	} else if (ballX <= 0) {
		ballReset();
		scoreP2 += 1;
	} else if (ballX >= wc) {
		ballReset();
		scoreP1 += 1;
	}
}
//Detector de colisiones
function collision() {
	if (ballX >= player1X && ballX <= player1X + player1W && (ballY >= player1Y && ballY <= player1Y + player1H)) {
		ballSpeedX = -ballSpeedX;
		var deltaY = ballY - (player1Y + player1H / 2);
		ballSpeedY = deltaY * 0.1;
	} else if (
		ballX >= player2X &&
		ballX <= player2X + player2W &&
		(ballY >= player2Y && ballY <= player2Y + player2H)
	) {
		var deltaY = ballY - (player2Y + player2H / 2);
		ballSpeedY = deltaY * 0.1;
		ballSpeedX = -ballSpeedX;
	}
}
//MAYA
function maya() {
	for (let i = 0; i < h; i += 40) {
		line(w / 2, i, w / 2, i + 20);
	}
}
//BALL
function ballReset() {
	ballX = w / 2;
	ballY = h / 2;
	ballSpeedX = -ballSpeedX;
}
//Partida
function showScore() {
	fill(255);
	text('Puntaje: ' + scoreP1, w / 7, 50, w / 7, 100);
	text('Puntaje: ' + scoreP2, w - w / 7, 50, w - w / 7, 100);
}
function checkWin() {
	if (scoreP1 >= 5) {
		text('Player1 Ganó, presiona espacio para comenzar otro juego.', wc / 2 - wc / 4, 50, wc / 2 + wc / 4, 50);
		ballCenter();
		if (keyIsDown(32)) {
			resetGame();
		}
	} else if (scoreP2 >= 5) {
		text('Player2 Ganó, presiona espacio para comenzar otro juego.', wc / 2 - wc / 4, 50, wc / 2 + wc / 4, 50);
		ballCenter();
		if (keyIsDown(32)) {
			resetGame();
		}
	}
}
function resetGame() {
	ballX = w / 2;
	ballY = h / 2;
	ballSpeedX = wc / 110;
	ballSpeedY = hc / 110;
	scoreP1 = 0;
	scoreP2 = 0;
}
function ballCenter() {
	ballX = w / 2;
	ballY = h / 2;
	ballSpeedX = 0;
	ballSpeedY = 0;
}
function canchaTenis() {
	if (cancha) {
	back = background(0, 60, 110);
	line(w/4, h/2, w/2, h/2);
	line(w/4, h/8, w/4, h-h/8);
	line(0, h/8, w, h/8);
	line(0, h-h/8, w, h-h/8);
	line(w/2, h/2, w-w/4, h-h/2);
	line(w-w/4, h/8, w-w/4, h-h/8);
	} else {
		bach = background(0);
	}
}
function keyPressed() {
	if (keyCode == 80) {
		cancha = !cancha;
	}
}
