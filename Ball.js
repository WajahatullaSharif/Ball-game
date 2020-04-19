var ball;
var pipes = [];
var sc = 0;

function setup() {
  createCanvas(1366, 657);
  ball = new Ball();
  //pipes.push(new Pipe());
}

function draw() {
  background(0);
  textSize(20);
  fill(0, 255, 0);
  text("Score:",600,50);
  
    for(var i = pipes.length - 1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();
    
    if(pipes[i].hits(ball)==0){
      sc += 1;
     text(int(sc/10), 660, 50); 
   }
   else{
     //background(0);
     textSize(60);
     fill(255 ,0 , 0);
     text("GAME OVER", 200, 200);
     delay(1);
   }
    
    if(pipes[i].offscreen()){
     pipes.splice(i, 1); 
    }
  }
  
  ball.show();
  ball.update();
  
  if(frameCount % 80 == 0){
    pipes.push(new Pipe());
  }
}

function keyPressed(){
  if(key === ' '){
      ball.up();
   } 
}

function Ball() {
  this.x = 100;
  this.y = 250;
  this.yspeed = 0;
  this.dir = 1;
  this.flag = 0;

  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 25, 25);
    stroke(255);
    line(0, 265, 1400, 265);
  };

  this.up = function() {
    this.yspeed = 6;
  };

  this.update = function() {
    this.y -= this.yspeed * this.dir;
    if (this.y >= 250) {
      this.yspeed = 0;
      this.dir = 1;
    } else if (this.y < 150) {
      this.dir = -1;
    }
  };
}

function Pipe(){
 this.w = 10;
 this.bottom = random(10,70);
 this.speed = 4;
 this.x = width;
 this.flag = 0;
 
 this.hits = function(ball){
  if(ball.y >= 240 - this.bottom && ball.x >this.x && ball.x < this.x + this.w ){
    this.flag = 1;
    return true;
  }
  return false;
 };
 
 this.show = function(){
   fill(255);
   if(this.flag == 1){
    fill(255, 0, 0); 
   }
   rect(this.x, 265-this.bottom, this.w, this.bottom);
 };
 
 this.update = function(){
   this.x -= this.speed;
 };
 
 this.offscreen = function(){
  if(this.x < -this.w){
   return true; 
  }
  else{
    return false;
  }
 };
}
