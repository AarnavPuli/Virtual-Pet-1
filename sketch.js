var dog, dogimg1, dogimg2;
var database;
var foods,foodstock;

function preload()
{
  dogimg1=loadImage("images/dogImg.png")
  dogimg2=loadImage("images/dogImg1.png")
}

function setup() {
	database=firebase.database()
  createCanvas(500,500);
  dog=createSprite(250,300,150,150)
  dog.addImage(dogimg1)
  dog.scale=0.15
  foodstock=database.ref('Food')
  foodstock.on("value",readstock)
  
}


function draw() {  
background(46,139,87)
if(keyWentDown(UP_ARROW)){
  writestock(foods)
  dog.addImage(dogimg2)
}
  drawSprites();
  textsize(25)
  text("foodremaining"+foods,170,200)
  text("press up arrow to feed the dog",130,10,300,20)
  function readstock(data){
    foods=data.val()
  }
}
function writestock(x){
  if(x<=0){
    x=0
  }
  else {
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}


