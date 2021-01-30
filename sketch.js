var dog,sadDog,happyDog;
var feed, addFood;
var foodObj;
var database;
var food;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  milkBottle = loadImage("Images/Milk.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food()

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);
  drawSprites();

  foodObj.display()


}

//function to read food Stock
function readStock(data){
  foodS=data.val();
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
}



//function to add food in stock
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
