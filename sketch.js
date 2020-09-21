var day1, dayImage;
var soldier, soliderImage, plague, plagueImage;
var soldiersGroup, plagueGroup;
var score = 0;
var ground;
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = 1;

function preload() {

  plagueGroup = createGroup();
  soldiersGroup = createGroup();

  soldierImage = loadImage("soldier.jpg");
  plagueImage = loadImage("plague.png");
  
  dayImage = loadImage("day.png");
  
}



function setup() {
  ground = createSprite(250, 490, 500, 20);
  day1 = createSprite(50, 450, 1, 1);
  day1.addImage(dayImage);
  day1.scale = 0.1;
}


function draw() {
  createCanvas(500, 500);
  
  background("white");
  
  //day1.debug = true;
  
  text("Score: " + score, 430, 50);
  
  if (gameState === 1) {
    if (keyDown("space") && day1.y > 420) {
      day1.velocityY = -20;
    }
  
    if (day1.isTouching(plagueGroup)) {
      plagueGroup.destroyEach();
      score = score + 1;
    }
    
    if (day1.isTouching(soldiersGroup)) {
      gameState = END;
      plagueGroup.destroyEach();
    }
    spawnPlague();
    spawnSoldiers();
    
    if(score === 10) {
      gameState = WIN; 
    }
  }
  
  day1.velocityY = day1.velocityY + 0.6;
  day1.collide(ground);
  
  if (gameState === END) {
    textSize(50);
    text("Day has been caught!", 0, 250);
    day1.velocityY = 0;
    day1.depth = 1;
  }
  
  if (gameState === WIN) {
    textSize(40);
    text("Day Escaped!", 200, 250); 
    day1.velocityY = 0;
    day1.depth = 1;
  }
  
  console.log(gameState)
  
  drawSprites();
}

function spawnPlague() {
  if (frameCount % 120 === 0) {
    
    plague = createSprite(500, 120, 40, 10);
    plague.y = Math.round(random(120, 200));
    plague.addImage(plagueImage);
    plague.scale = 0.09;
    plague.velocityX = -4;
    plague.setCollider("rectangle", 10, 10);
  
    plague.lifetime = 250;

    //add each cloud to the group
    plagueGroup.add(plague);
  }
}

function spawnSoldiers() {
  if (frameCount % 300 === 0) {
    soldier = createSprite(600, 380, 1, 1);
    soldier.addImage(soldierImage);
    soldier.scale = 0.17;
    soldier.velocityX = -6;

    //assign lifetime to the variable
    soldier.lifetime = 250;

    //add each cloud to the group
    soldiersGroup.add(soldier);
  }
}
