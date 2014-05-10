function RectBG(context){
    this.img = new Image();
    this.img.src = "gameover.png";
    this.x = 50;
    this.y = 490;
    this.speed = 10;
    this.ymax = 200;
    this.width = 200;
    this.height = 100;
}
RectBG.prototype.draw = function(context){
    context.drawImage(this.img,this.x,this.y,this.width,this.height);
    context.font = "20px Arial";
    context.fillStyle = "#ff0000";
    if(this.y<= this.ymax){
    context.fillText(diem,210,245,100);
    context.fillText(hight,210,280,100);
    }
}
RectBG.prototype.update = function(context,diem,hight){
    this.y -= this.speed;
    if(this.y<= this.ymax){
        this.speed=0;
        drawdiem(context,diem,hight);
    }
    this.draw(context,diem,hight);
}
function drawdiem(context,diem,hight){

}
function RectRerun(context){
    this.img = new Image();
    this.img.src = "rerun.png";
    this.x = 100;
    this.y = 590;
    this.speed = 3;
    this.ymax = 300;
    this.width = 100;
    this.height = 100;
}
RectRerun.prototype.draw = function(context){
    context.drawImage(this.img,this.x,this.y,this.width,this.height);
}
RectRerun.prototype.update = function(context){
    this.y -= this.speed;
    if(this.y<= this.ymax){
        this.speed=0;
    }
    this.draw(context);
}
RectRerun.prototype.checkCollision = function(x,y){
    var cx=150;
    var cy=350;
    var radius = 50;
    var vx = x - cx;
    var vy = y - cy;
    length = Math.sqrt(vx*vx + vy*vy);
    if(length<radius && this.speed==0){
        return true;
    }
    else{
        return false;
    }
}