var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
 
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4;

  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  climberGroup = new Group();

}
function draw() {
  background(200);

  if (gameState === "play") {
 if (keyDown("space")) {
 ghost.velocityY = -10; 
 }
 
 if (keyDown("right_Arrow")){
  ghost.x = ghost.x  + 3; 
  }

  if (keyDown("left_Arrow")){
    ghost.x = ghost.x - 3;
  }

 ghost.velocityY = ghost.velocityY + 0.7

 if(tower.y > 400){
 tower.y = 300
 }
 spawndoors();

 if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
  gameState = "end"
}

  drawSprites();

 }

 if (gameState === "end"){
   stroke("yellow");
   fill("yellow");
   textSize(30);
   text("GameOver", 230, 250)
 }

}

function spawndoors() {
  if (frameCount % 240 === 0 ){
  var doors = createSprite(200, -50);
  var climber = createSprite(200, 10);
  var invisibleBlock = createSprite(200, 15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  
  door.x = Math.round(random(120,400));
  climber.x = door.x;
  invisibleBlock.x = door.x;

  doors.addImage(doorImg);
  climber.addImage(climberImg);
  //doors.scale=0.7;
  //climber.scale=0.7;
  doors.velocityY = 3;
  climber.velocityY = 3;
  invisibleBlock.velocityY = 3;
  ghost.depth = door.depth;
  ghost.depth +=1;
  invisibleBlock.lifetime = 200;
  doors.lifetime = 200;
  climber.lifetime = 200;

  doorsGroup.add(door);
  invisibleBlock.debug = true;
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
  }

}
