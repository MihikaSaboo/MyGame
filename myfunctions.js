
function spiderwick(){
    if(frameCount%5==0){
    spidy=createSprite(100,800,8,8)
    spidy.shapeColor="purple";
    spidy.x=random(100,displayWidth-100);
    spidy.y=random(100,displayHeight-100);
    spidy.velocityX=random(-5,5);
    spidy.velocityX=random(-6,6);
    spidy.lifetime=400;
    spidy.bounceOff(edges);
    spidergrp.add(spidy);
    
    }
    }

  