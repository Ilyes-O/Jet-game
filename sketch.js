var wall;
var ballGroup1, ballGroup2;
var ball1, ball2;
var attempts = 0;
var player1, playerImg;
var timer = 50;
var gameState = 0;

function preload() {
  playerImg = loadImage("spaceShip.png");
}

function setup() {
  createCanvas(1800, 785);

  wall = createSprite(900, 800, 5, 1000);
  wall.shapeColor = "white"

  player1 = createSprite(450, 750, 10, 35)
  player1.addImage(playerImg)
  player1.scale = .4
  player1.debug = false;
  player1.setCollider("circle", 0, 0, 80);

  ballGroup1 = createGroup();
  ballGroup2 = createGroup();
}


function draw() {
  background(0);
  if (gameState === 1) {
    player1.visible = true;
    //timer stuff
    if (frameCount % 40 == 0 && timer > 0) {
      timer--;
    }
    if (timer == 45) {
      wall.height = 900;
    }
    if (timer == 40) {
      wall.height = 800;
    }
    if (timer == 35) {
      wall.height = 700;
    }
    if (timer == 30) {
      wall.height = 600;
    }
    if (timer == 25) {
      wall.height = 500;
    }
    if (timer == 20) {
      wall.height = 400;
    }
    if (timer == 15) {
      wall.height = 300;
    }
    if (timer == 10) {
      wall.height = 200;
    }
    if (timer == 5) {
      wall.height = 100;
    }
    if (timer == 0) {
      wall.height = 0;
      gameState = 2;
    }

    if (keyDown("UP")) {
      player1.y = player1.y - 5
    }

    if (keyDown("DOWN")) {
      player1.y = player1.y + 5
    }

    if (ballGroup1.isTouching(player1) || (ballGroup2.isTouching(player1))) {
      attempts += 1;
      player1.x = 450;
      player1.y = 750;
    }


    if (player1.y == -30) {
      player1.y = 750;
    }

    spawnBall1();
    spawnBall2();
    //Text commands
    textSize(40);
    textFont("Impact")
    text("Attempts : " + attempts, 800, 70);
  }
  else if (gameState == 2) {
    player1.visible = false;
    ballGroup1.destroyEach();
    ballGroup2.destroyEach();
    textSize(35);
    textFont("Roboto Mono")
    textAlign(LEFT)
    fill(255, 204, 0);
    text("Try to beat your record of " + attempts + " attempts!", 500, 150);
    text("Press 'R' to try again!", 500, 300);
    if (keyDown("R")) {
      restarting();
    }
  }
  if (gameState == 0) {
    textSize(30);
    textFont("Impact")
    text("Press up and down for movement", 600, 60);
    text("Try to make it to the top with avoiding the debris", 600, 100);
    text("When the white wall gets smaller, you are losing time", 600, 160);
    text("Try to get the least amount of attempts before time runs out!", 600, 220);
    text("Press 'S' to start", 600, 270);

    if (keyDown("S")) {
      gameState = 1;
    }
  }

  drawSprites();


}

function spawnBall1() {
  if (frameCount % 10 === 0) {
    ball1 = createSprite(-100, 50, 20, 20);
    ball1.y = Math.round(random(0, 670));
    ball1.shapeColor = "red"
    ball1.velocityX = 5;
    ball1.lifetime = 190;
    ballGroup1.add(ball1)
  }
}

function spawnBall2() {
  if (frameCount % 10 === 0) {
    ball2 = createSprite(1900, 50, 20, 20);
    ball2.y = Math.round(random(0, 670));
    ball2.shapeColor = "red"
    ball2.velocityX = -5;
    ball2.lifetime = 400;
    ballGroup2.add(ball2)
  }
}

function restarting() {
  gameState = 1;
  timer = 50;
  wall.height = 1000;
  player1.visible = true;
  attempts = 0;
}