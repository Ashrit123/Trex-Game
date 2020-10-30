var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage
var obstacle1,  obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var cactus
var score=0
var PLAY = 1;
var END = 0;
var gameState = PLAY
var collided


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png")
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
  gameOverImage= loadImage("gameOver.png")
  restartImage= loadImage("restart.png")
  dieSound= loadSound("die.mp3")
  jumpSound= loadSound("jump.mp3")
  checkPointSound= loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(8 + score/1000);
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
  trex.setCollider("circle",0,0,50);
  
  gameOver = createSprite(300,100)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5
  gameOver.visible = false
  restart = createSprite(300,150);
  restart. addImage(restartImage);
  restart.scale = 0.5
  restart.visible = false
}

function draw() {
  //set background color
  background("grey");
  
  fill("white");
  text("Score :"+ score,500,20); 
  
  if(gameState === PLAY){
    score=score+Math.round(getFrameRate()/40); 
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    jumpSound.play();
    }
    if(score>0 && score% 100 === 0){
      checkPointSound.play();
    }
    spawnClouds();
    spawnObstacles();
  trex.velocityY = trex.velocityY + 0.8
  if (ground.x < 0){
    ground.x = ground.width/2;
  } 
    if( obstacleGroup.isTouching(trex)){
      dieSound.play();
      gameState = END
    }
     }
  else if(gameState === END){
        trex.changeAnimation("collided", trex_collided);
     ground.velocityX=0
     cloudGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)){
    reset()
  }
}
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites();
}
function reset(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0
  trex.changeAnimation("running", trex_running);
  frameCount=0
}

//function to spawn the clouds
function spawnClouds(){
    if (frameCount % 40===0){
  cloud = createSprite(600,100,30,10);
  cloud.y=Math.round(random(10,80));
  cloud.addImage(cloudimage);
  cloud.velocityX=-8
  cloud.scale=0.5
  cloud.lifetime=200;
  cloud.depth=trex.depth
  cloudGroup.add(cloud);
  trex.depth+=1
  }
}
function spawnObstacles(){
  if(frameCount % 60===0){
  cactus = createSprite(600,160,10,40)
  cactus.velocityX=-(5+score/1000);
  var Images= Math.round(random(1,6))
  switch (Images){
    case 1:
    cactus.addImage(obstacle1);
    break;
    case 2:
    cactus.addImage(obstacle2);
    break;
    case 3:
    cactus.addImage(obstacle3);
    break;
    case 4:
    cactus.addImage(obstacle4)
    break;
    case 5:
    cactus.addImage(obstacle5)
    break;
    case 6:
    cactus.addImage(obstacle6)
    break;
    default:
    break;
  }
    cactus.scale=0.5
    cactus.lifetime=200
    obstacleGroup.add(cactus);
  }

}