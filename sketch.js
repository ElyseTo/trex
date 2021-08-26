var trex;
var trex_running;
var ground, groundImg;
var invisibleGround;
var cloud,cloudImg;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var wall
var cloudGroup, obstacleGroup;
var gameState = "PLAY";
var PLAY = 1;
var END = 0;
var trex_collided;
var gameOver,gameOverImg;
var restart,restartImg;
var wall;
function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg = loadImage("ground2.png");
  // create cloud image
  cloudImg = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameOverImg = loadImage("gameOver.jpg");
  restartImg = loadImage("restart.jpg");
}
function setup(){ 
  createCanvas (600,200);
  trex = createSprite (200,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  // cloud add animation

  // create ground sprite
  ground = createSprite (300,180, 600,1);
  ground.addImage(groundImg);

  //wall
   
  //create invisible ground
  invisibleGround = createSprite (300,180,600,5);
  invisibleGround.visible = false;

  // create obstacle and cloud group
  obstacleGroup = new Group();
  cloudGroup = new Group();
  //set a collider
  trex.setCollider("rectangle",0,0,50,10);
  trex.debug = true;
  //gameover sprite
  gameOver = createSprite(300,50,300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.1;
  restart = createSprite(300,100,300,200);
  restart.addImage(restartImg);
  restart.scale = 0.1
  wall = createSprite(197,70,50,10);
}

function draw(){
  background("#ffe4c4");
  // console.log(trex.y);
 if (gameState === "PLAY"){
  // move the ground
   ground.velocityX = -3;
   // jump when the space key is pressed
   if(keyDown("space") && trex.y >= 175){  
    trex.velocityY = -12;
  }
  // and gravity to trex jump
  trex.velocityY = trex.velocityY + 0.08;
  // spawn the clouds
  spawnClouds();
  //spawn obstacle on the ground
  spawnObstacle();
  // scoring
  score = score + Math.round(frameCount/200);
  // reset the ground
  if(ground.x<300){
    ground.x = ground.width/2;
  }
  gameOver.visible = false;
  restart.visible = false;
  if(obstacleGroup.isTouching(trex)){
    gameState = "END";
  
  }
 }
 else if (gameState === "END"){
  // stop the ground
   ground.velocityX = 0;
   obstacleGroup.setVelocityXEach(0);
   trex.changeAnimation("collided",trex_collided);
  gameOver.visible = true;
  restart.visible =  true;
  if(mousePressedOver(restart)){
    reset();
  }

   
 }
  text("Score: " + score, 500,50);
 


  // console.logtrex.y);
   console.log(gameState);
  trex.collide(invisibleGround);

  wall.visible = true;
  trex.bounceOff(wall);
 
  drawSprites();
  
}

function spawnClouds(){
  if(frameCount % 60 === 0){

  
  cloud = createSprite (600,80,20,50);
  cloud.velocityX = -3;
  cloud.addImage(cloudImg);
  cloud.scale = 0.15;
  cloud.y = Math.round(random(80,120));
  cloud.lifetime = 250;
  // add each cloud to the group
   cloudGroup.add(cloud);
  }
}

function spawnObstacle(){
  if(frameCount % 60 === 0){

  
  var obstacle = createSprite (600,165,20,50);
  obstacle.velocityX = -3;
//generate random obstacle
var rand = Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(obstacle1);
          break;
  case 2: obstacle.addImage(obstacle2);
          break;
  case 3: obstacle.addImage(obstacle3);
          break;
  case 4: obstacle.addImage(obstacle4);
          break;
  case 5: obstacle.addImage(obstacle5);
          break;
  case 6: obstacle.addImage(obstacle6);
          break;
  default:break;        
}

  obstacle.scale = 0.05;
  obstacle.lifetime = 250; 
  //add each obstacle to the group
   obstacleGroup.add(obstacle);
}
}
function reset(){
  gameState = "PLAY";
  trex.changeAnimation("running",trex_running);
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
}