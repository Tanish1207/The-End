
var monkey , monkeyIMG;
var bananasGroup, bananaImage; obstacle, obstacleGroup, obstacleImage
var obstacleGroup, obstacleImage;
var score
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime
var message
var ground, invisbleGround;
var obstacle,obstacleImage;
var background, backgroundIMG;
var gameOver, gameOverImg;
var lives, livesImg;
var lives1, lives1Img;
var lives3, lives3Img;


function preload(){
  
  
  monkeyIMG = loadImage("tiger1.png");
  bananaImage = loadImage("coin.jpg");
  obstacleImage = loadImage("log.png");
  backgroundIMG = loadImage("forest.jpg");
  gameOverImg = loadImage("gameOver.png");
  livesImg = loadImage("lives.png");
  lives1Img = loadImage("lives2.png");
  lives3Img = loadImage("lives3.png");
 
}



function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  console.log(message);
  
  monkey=createSprite(150,620,30,30);
  monkey.addImage(monkeyIMG);
  monkey.scale=0.5;
  
  ground=createSprite(450,830,6000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(450,830,6000,10);
  invisibleGround.velocityX=-4;
  invisibleGround.x=ground.width/2;
  invisibleGround.visible = false;
  lives1 = createSprite(1495,120,20,20);
  lives1.addImage(lives1Img);

  
  obstacleGroup = createGroup();
  bananasGroup = createGroup();
  
  score=0;
}



function draw() {
  
background(backgroundIMG);

  stroke("green");
  textSize(50);
  fill("red");
  text("Score:"+score,570,100);
  //text("Lives:" - lives, 570,400);
  
  stroke("green");
  strokeWeight(4);
  textSize(20);
  fill("green");
  //survivalTime=Math.ceil(frameCount/frameRate())
  //text("Survival Time: "+ survivalTime, 100,50);
  
  if(gameState===PLAY) {
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    food();
    Obstacles();
    
    if(bananasGroup.isTouching(monkey)) {
      bananasGroup.destroyEach();
      score = score + 2;
    }
    
     if(keyDown("space")&& monkey.y >= 140) {
        monkey.velocityY = -12;
    }

    /*if(obstacleGroup.isTouching(monkey)){
      gameState=END;
      monkey.velocityY = 0;
      monkey.velocityX = 0;
      bananasGroup.velocityX = 0;
      bananasGroup.velocityY = 0;
      obstacleGroup.velocityX = 0;
      obstacleGroup.velocityY = 0;
      bananasGroup.destroyEach();
      obstacleGroup.destroyEach();
      textSize(30);
      text("gameOver", 500, 500);
    }*/
  
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
  monkey.collide(invisibleGround);
  }
    if (obstacleGroup.isTouching(monkey)){
    gameState=END;
    gameOver = createSprite(750,400,10,10);
    gameOver.addImage(gameOverImg);
    lives3 = createSprite(1364,248,20,20);
    lives3.addImage(lives3Img);
    lives3.scale=0.25;

    bananasGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0;
    survivalTime = 0;
    textSize(30);
    text("gameOver", 500, 500);

  }
                                                                               
    
  
  
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    var banana=createSprite(450,700,30,10);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.y = random(420,530);
    banana.velocityX = -7;
    banana.setLifetime = 100 ;
    monkey.depth = banana.depth;
    monkey.depth = banana.depth + 1;
    bananasGroup.add(banana);
  }
    
}

function Obstacles() {
  if (frameCount % 300 === 0){
    var obstacle=createSprite(420,790,90,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5;
    obstacle.scale = 0.3;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}