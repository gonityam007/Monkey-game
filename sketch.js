var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime
var score
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(600, 400);

 monkey = createSprite(80,340,20,10);
  monkey.addAnimation("running", monkey_running);
monkey.scale=0.1;
  console.log(monkey.y);
  
ground = createSprite(300,370,600,10);
  ground.x = ground.width /2;
  ground.velocityX=-4;

obstacleGroup=createGroup();
foodGroup=createGroup();

  survivalTime=0;
  score=0;
}

function draw() {

  background(180);
  //displaying score
  text("Survial Time: "+ survivalTime, 100,50);
  
  text("Score: "+ score, 250,50);
  
  if(gameState===PLAY){
  
    survivalTime=Math.ceil(frameCount/frameRate());
  ground.velocityX=-4;
    
    if(monkey.isTouching(foodGroup)){
      score=score+1;
      foodGroup.destroyEach();
    }
  
    if(ground.x>0){
      ground.x=ground.width/2;
    }
      
     if(keyDown("space")&&monkey.y>330){
        monkey.velocityY = -12;  
    } 
      
      monkey.velocityY = monkey.velocityY + 0.8
      spawnObstacles();
    spawnBanana();
    
    
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
      monkey.velocityX=0;
      obstacleGroup.velocityX=0;
      foodGroup.velocityX=0
      ground.velocityX=0;
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
      monkey.destroy();
    }
    }
    else if (gameState === END){
      stroke("black");
      textSize(20);
      fill("red");
      text("Game Over",270,100);
    }
  
  monkey.collide(ground);
  drawSprites();
}  

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,340,10,10);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -5;
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
 }

}

function spawnBanana(){
  
  if (frameCount % 100 === 0){
   var banana = createSprite(600,340,10,10);
    banana.y=Math.round(random(200,300));
   banana.addImage(bananaImage);
   banana.velocityX = -5;
    banana.scale = 0.1;
    banana.lifetime = 300;
    foodGroup.add(banana);
  
}
}