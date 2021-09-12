
var bg,runani,boy,bd,edge,inobst;
var gamestate,firegroup,obsgroup,invgroup,punch;
gamestate="start";
var lives=3;

function preload(){
bg=loadImage("1624.jpg")
runani=loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png")
runani2=loadAnimation("jump3.png","jump2.png","jump1.png")
fireimage=loadImage("fireball.png")
obstacleimg=loadImage("obstacle.png")
punch=loadAnimation("punch.png")
}

function setup(){
    var canvas = createCanvas(800,600);
   
bd=createSprite(0,300)
bd.addImage(bg)
firegroup=new Group();
obsgroup=new Group();
invgroup=new Group();
  boy=createSprite(100,550)
  boy.addAnimation("anime",runani)
boy.addAnimation("stopboi",runani2)
boy.addAnimation("punch",punch)
boy.setCollider("rectangle",0,0,50,80)
edge=createEdgeSprites();
}

function draw(){
    background("black");
   
    drawSprites();
textSize(28)
fill("blue")
if (gamestate==="start"){
text("Press Enter To Start Game",250,250);
boy.visible=false;
}

if(keyDown("enter")){
  gamestate="play"
}
if (gamestate==="play"){
  bd.velocityX=-5
  spawnFire()
  spawnObstacle()
  //boy.y=550
  if(boy.isTouching(obsgroup)){
    boy.changeAnimation("punch",punch)
    obsgroup.velocityX=-0;
    obsgroup.destroyEach();
    invgroup.destroyEach();
    bd.velocityX=0;
   // boy.changeAnimation("anime",runani)
    }
    
  if(bd.x<0){
    bd.x=bd.width/2
  }
  console.log(boy.y)
  if (keyDown("space")&&boy.y>525){

    boy.velocityY=-8;
    boy.changeAnimation("stopboi",runani2)
  }
  if(keyWentUp("space")){
  boy.changeAnimation("anime",runani)
  }
  boy.velocityY=boy.velocityY+0.8
  boy.collide(edge[3]);
  boy.visible=true;
  
  text("lives:"+lives,400,100)
    if (boy.isTouching(firegroup)&&lives>=1){
lives=lives-1
bd.velocityX=0;
boy.velocityY=0
gamestate="start";
boy.changeAnimation("anime",runani)
  }
if(boy.isTouching(firegroup)&&lives<1){
  gamestate="over";
  
}
}
if (gamestate==="over")
{
  text("U R a loser",350,250)
  boy.destroy();
}


}
function spawnFire(){
  if(frameCount%130===0){
    var fire=createSprite(800,120,40,10)
    fire.y = Math.round(random(560, 575));
    fire.addImage(fireimage);
    fire.scale=0.20
    fire.velocityX = -18;    
    fire.lifetime = 200;
  
    firegroup.add(fire);
  }
}
function spawnObstacle(){
  if(frameCount%170===0){
    var obstacle=createSprite(800,120,40,10)
    obstacle.y = Math.round(random(550, 560));
    obstacle.addImage(obstacleimg);
    obstacle.scale=0.25
    obstacle.velocityX = -15;    
    obstacle.lifetime = 200;
    inobst=createSprite(obstacle.x,obstacle.y,55,25)
inobst.velocityX=-15
inobst.visible=false;
obsgroup.add(obstacle)
invgroup.add(inobst)
  }
}