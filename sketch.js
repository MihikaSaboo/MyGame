var player;
var bush1, bush2, bush3;
var stone1,stone2,stone3;
var door1,door2,door3
var keyObj1,keyObj2,keyObj3,keyObj4;
var keyCount=0;
var life=5;
var fruitCount=0;
var gameState="bush";
var spidergrp, fruitgrp;

function preload(){

//loading bush imgs    
bush1Img= loadImage("bush/Bush1.png");
bush2Img= loadImage("bush/Bush2.png");
bush3Img= loadImage("bush/Bush3.png");
//loading stone imgs
stone1img= loadImage("stones/stone1.png");
stone2img= loadImage("stones/stone2.png");
stone3img= loadImage("stones/stone3.png")
//loading door image
door1img= loadImage("door/door1.png")
}

function setup(){
//creating edges and canvas
createCanvas(windowWidth, windowHeight);
edges=createEdgeSprites();

// main player
player= createSprite(100,100,10,10);
player.shapeColor="blue";
//keys
keyObj1= createSprite(405,204,20,20);
keyObj1.shapeColor="red";
keyObj1.visible= false;
keyObj2= createSprite(180,74,20,20);
keyObj2.shapeColor="green";
keyObj2.visible= false;
//creating bushes
bush1=createSprite(140,450,20,20)
bush1.shapeColor="greenyellow";
bush2=createSprite(540,370,20,20)
bush2.shapeColor="lime";
bush3=createSprite( 630,50,20,20)
bush3.shapeColor="darkgreen";
//creating stones
stone1=createSprite(830,660,30,30);
stone1.shapeColor="black";
stone2=createSprite(990,300,30,30);
stone2.shapeColor="black";
stone3=createSprite(1473,210,30,30);
stone3.shapeColor="black";
//creating door
door1=createSprite(displayWidth/2-210,displayHeight/2-160,50,50)
door1.visible=false;
//adding images to doors
door1.addImage(door1img);
door1.scale=3;
//creating group
spidergrp=createGroup();
fruitrgrp= createGroup();
}



function draw(){

background(19,20,20);
console.log(gameState);
player.depth+=10
fill("white");
text(mouseX+","+mouseY,mouseX,mouseY);


//adding images to bushes
//bush1.addImage(bush1Img,5,10);

//adding images to stones
//stone1.addImage(stone1img);

//movement of main player
if(keyDown("left")){
player.x-=5
}
if(keyDown("right")){
    player.x+=5
    }
  if(keyDown("down")){



    player.y+=5
  }
  if(keyDown("up")){
    player.y-=5
    }

//making the main player collide with the edges
player.collide(edges);



//if correct bush touch
if(player.isTouching(bush1)){
keyObj1.visible=true;
}
//when key collected
if(player.isTouching(keyObj1)){
  keyCount+=1
  keyObj1.destroy();
  gameState="stone";
}
//if wrong bushes touched
if(player.isTouching(bush2)|| player.isTouching(bush3)){
  gameState="spider";
}
//spide attack
if(gameState=="spider"){
  stone1.visible=false;
  stone2.visible=false;
  stone3.visible=false;
  door1.visible=false;
  bush1.width=80
  bush2.width=80
  bush3.width=80
  bush1.height=80
  bush2.height=80
  bush3.height=80
  bush3.x= 1120
  bush3.y=150;
  bush2.x= 146
  bush2.y=275
  bush1.x= 740;
  bush1.y=600;
  spiderwick();
  //consequence of touching spider
if(player.isTouching(spidergrp)){
  life-=1;
  spidergrp.destroyEach();
}
  
}
//after bush stage over
if(gameState=="stone"){
  bush1.remove();
  bush2.remove();
  bush3.remove();
  stone1.visible=true;
  stone2.visible=true;
  stone3.visible=true;
  
  stone1.width=80;
  stone2.width=80;
  stone3.width=80;
  stone1.height=80;
  stone2.height=80;
  stone3.height=80;
  stone1.x= 1140
  stone1.y=190;
  stone2.x= 740
  stone2.y=600
  stone3.x= 206;
  stone3.y=275;
//when stone1 (right) touched
if(player.isTouching(stone1)){
  gameState="fruits";
  stone1.destroy();
  stone2.visible= false;
  stone3.visible= false;
}

}


if(gameState=="fruits"){

    /*for(var i=0; i<fruitgrp.length(); i++){
      if(fruitgrp.get(i).isTouching(player)){
        fruitgrp.get(i).destroy();
        fruitCount+=1;
      } 
    
    }*/
    fruitCollector();
    if(fruitCount==5){
      keyObj2.visible=true;
    }
    if(player.isTouching(keyObj2)){
      keyCount+=1;
      gameState="stone";
    }

    if (gameState=="memory"){
      stone2.visible=true;
      stone3.visible= true;
    }
    textSize(25);
    fill("white")
    text("Fruit Count= "+fruitCount,50,100);
}

drawSprites();
//key text
fill("white");
textSize(25);
text("Your Keys: " +keyCount,width/2,50);
//life text
text("Your life: " +life,50,50);
}
function fruitCollector(){
  if(frameCount%60==0){
  fruit= createSprite(random(50,displayWidth-50),-10,5,5);
  fruit.shapeColor= "red";
  fruit.velocityY= Math.round(random(5,8));
  fruit.lifetime= displayHeight;
  fruitgrp.add(fruit);

  }
}