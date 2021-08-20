class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    surfer1 = createSprite(100,200);
    surfer1.addImage(surfer1Img);
    surfer2 = createSprite(300,200);
    surfer2.addImage(surfer1Img);
    surfer1.setCollider("circle",0,0,40);
    surfer2.setCollider("circle",0,0,40);
    // surfer1.debug=true;
    // surfer2.debug=true;
    heart1 = createSprite(displayWidth-100,60);
    heart1.addImage(ob3Img);
    heart1.scale = 0.07;
    heart2 = createSprite(displayWidth-100,80);
    heart2.addImage(ob3Img);
    heart2.scale = 0.07;
    heart3 = createSprite(displayWidth-100,100);
    heart3.addImage(ob3Img);
    heart3.scale = 0.07;



    surfers = [surfer1,surfer2];
  }

  play(){
    form.hide();

    player.getPlayerInfo();
    player.getFinishedPlayers();

    if(allPlayers !== undefined){
      //var display_position = 100;
      image(bg, 0,-displayHeight*4,displayWidth, displayHeight*20);

      //index of the array
      var index =0;

      //x and y position of the cars
      var x =200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        // x = x + 200


        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        x = x+allPlayers[plr].lr+200;
        surfers[index-1].x = x;
        surfers[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name ,surfers[index-1].x,surfers[index-1].y+75);


        if (index === player.index){
          surfers[index - 1].shapeColor = "red";
         camera.position.x = displayWidth/2;


          camera.position.y = surfers[index-1].y

          heart1.x=surfers[index-1].x-20;
          heart2.x=surfers[index-1].x;
          heart3.x=surfers[index-1].x+20;

          heart1.y=surfers[index-1].y+80
          heart2.y=surfers[index-1].y+80
          heart3.y=surfers[index-1].y+80

        }
        if (life === 1) {
        heart1.visible = false;
      }
      if (life === 2) {
        heart2.visible = false;
      }
      if (life === 3) {
        heart3.visible = false;
        gameState=2;
      }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
     player.lr+=10;
     player.update();
   }
   if(keyIsDown(LEFT_ARROW) && player.index !== null){
     player.lr-=10;
     player.update();
   }
    if(player.distance > 3770){
      gameState = 2;
      player.rank=player.rank+1;
      textSize(30)
      fill("red")
      stroke("red")
     text("Rank: "+player.rank,100,-3100);
      player.updatedFinishedPlayers();
    }
   console.log(player.rank);
   console.log(player.distance);
    drawSprites();
  }

  end(){
    console.log("Game Ended");



  }
}
