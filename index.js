function load_images(){
    //player,virus,gem
    enemy_image=new Image();
    enemy_image.src="virus.png";
    player_img=new Image();
    player_img.src="mask.png";
    gem_image=new Image();
    gem_image.src="gems.png";
    
    
    
    
}
function init(){
//define the objects that we will have in the game
canvas=document.getElementById("mycanvas");
W=700;
H=399;
    canvas.width=W;
    canvas.height=H;
//create a context -that help to draw object on canvas
    pen=canvas.getContext('2d');//pen object to draw something on screen
    console.log(pen);
    game_over=false;
    e1 ={
       x:150,
       y:50,
       w:60,
       h:60,
       speed:20,            
    };    
    e2 ={
       x:300,
       y:200,
       w:60,
       h:60,
       speed:20,            
    };    
    e3 ={
       x:450,
       y:20,
       w:60,
       h:60,
       speed:20,            
    };    
 enemy=[e1,e2,e3];   
    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:"false",
        health:100,
    }
    //gem static object
    gem={
        x:W-100,
        y:H/2,
        w:60,
        h:60,
    }
    //listen to events on the canvas
    canvas.addEventListener('mousedown',function(){
        console.log("mouse pressed"); 
        player.moving=true;
    });
    canvas.addEventListener('mouseup',function(){
        console.log("mouse released"); 
        player.moving=false;//stop the player when mouse is not pressed
    });
         
                            
} 
function isOverlap(rect1 ,rect2){
    if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
    // collision detected!
        return true;
}
    return false;
}
function isOverlap2(rect1 ,rect2){
    if (rect1.x >rect2.x &&  rect1.x < rect2.x + rect2.w) {
    // collision detected!
        return true;
}
    return false;
}

function draw(){
    
    //clear the canvas area for the old frame
    pen.clearRect(0,0,W,H);
  //  pen.fillStyle="aqua";
    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    //drw the player
    //draw the gem
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
   pen.fillStyle="white";
    pen.fillText("Score "+ player.health,14,14);
}
function update(){
    //if the player is in moving state
    if(player.moving==true){
        player.x +=player.speed;
        player.health +=20;
    }
    //overlap with enemy
    for(let i=0;i<enemy.length;i++)
        {
            if(isOverlap(enemy[i],player)){
                player.health-=50;
                if(player.health<0){
                    console.log(player.health);
                    game_over=true;
                    alert("Game over!!Player health: " + player.health);
                }
            }
        }
    
    //overlap of player and gem
    if(isOverlap2(player , gem))
        {
            console.log("You won the game");
            alert("You won!!");
            game_over=true;
            return;
        }
    //move the box downwards
   // box.y+=box.speed;
    //if(box.y>=H-box.h|| box.y<=0){
    //    box.speed *= -1;
    //}
    //update each enemy by same logic
    for(let i=0;i<enemy.length;i++){
        enemy[i].y +=enemy[i].speed;
        if(enemy[i].y>=H-enemy[i].h ||enemy[i].y<=0){
            enemy[i].speed *=-1;
        }
    }
}
function gameloop(){
    if(game_over==true){
       clearInterval(f); 
    }
    draw();
    update();
    console.log("in game loop");
}
load_images();
init();
var f=setInterval(gameloop,100);