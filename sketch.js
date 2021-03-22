var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var FeadDog;
var LastFead;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  FeadDog=createButton("Fead The Dog");
  FeadDog.position(800,150);
  FeadDog.mousePressed(FeadDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  FedTime = database.ref("FeadTime")
  FedTime.on("value",function(data){
  LastFead = data.val();
  })
  
  if(LastFead>=12)
  {
    text("Last Feed" + LastFead%12,350,30)
  }
  else
  if(LastFead==0)
  {
    text("Last Feed = 12",350,30)
  }
 else
{
  text("Last Feed" + LastFead,350,30)
}
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
dog.addImage(happyDog);
var foodStock = foodObj.getFoodStock();
if(foodStock<=0){
  foodObj.updateFoodStock(foodStock*0); 
}
else
{foodObj.updateFoodStock(foodStock-1)}
  //write code here to update food stock and last fed time


database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FedTime:hour()
})
}
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
