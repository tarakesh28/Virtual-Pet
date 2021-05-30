var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedFood;
var foodObj;
var feed, lastFed;
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
  addFood.position(850,95);
  addFood.mousePressed(addFoods);

  feedFood = createButton("Feed the dog")
  feedFood.position(750,95);
  feedFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
 console.log(lastFed);
  //write code to read fedtime value from the database 
  lastFed = hour();

  //write code to display text lastFed time here
  fill("white");
  textSize(15);
  text("Last Feed: ", 425,30);

  
 
  if(lastFed < 12 ){
    fill("white");
    textSize(15);    
    text("am",517,30);
  }else if(lastFed>=12){
    lastFed = lastFed-12;
    fill("white");
    textSize(15);    
    text("pm",517,30);    
  }

  text(lastFed,499,30);

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
   foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
    database.ref('/').update({
      Food: food_stock_val-1
    })
  }


 
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
