
function Chim(context,image,x){
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = 186;
    this.move= "MOVE_DOWN";
    this.giatoc = 0.25;
    this.speed = 0;
    this.angle = 0;
    this.moveangle = "DOWN";
    this.giatocgoc = 0.1;
    this.speedgoc = 0;
   this.rect = new Rect();
}
Chim.prototype.addNew = function(x){
    this.x = x;
}
Chim.prototype.draw = function(context){
     //context.drawImage(this.img,this.x,this.y,30,30);
    drawRotated(this.angle,context,this.img,this.x,this.y);
    this.rect = new Rect(this.x+10,this.y+3,15,25);
    //this.rect.draw(context);
}
Chim.prototype.update = function(context){
    if(this.move!="DIE")
    {
    if(this.y<=370 && this.move == "MOVE_DOWN"  ){
    this.speed += this.giatoc;
    this.y += this.speed;
    }
    if(this.move == "MOVE_UP" && this.y<=350)
    {
            this.speed=0;
            this.y-=3.5;
    }
    if(this.y>370){
        this.move="DIE";
    }
    if(this.angle<90 && this.moveangle=="DOWN"){
        this.speedgoc+=this.giatocgoc;
        this.angle+=this.speedgoc;
    }
    if(this.moveangle=="UP" && this.angle>-30){
        this.speedgoc=0;
        this.angle-=2;
    }
    if(this.angle<-40){

        this.moveangle=="DOWN";
    }
    if(this.angle>90){
        this.speedgoc=0;
    }
    }
    if(this.move=="DIE"){
        if(this.y<=370){
            this.speed += 2*this.giatoc;
            this.y += this.speed;
        }
        if(this.y>370){
            this.y=370;
        }
    }
    this.draw(context);
}
Chim.prototype.setMove = function(move){
    this.move = move;
}
Chim.prototype.setMoveAngle = function(move){
    this.moveangle = move;
}
Chim.prototype.checkCollision = function(ongkhoi){
    var a1 = findIntersectionRect(ongkhoi.rect1,this.rect);
    var a2 = findIntersectionRect(ongkhoi.rect2,this.rect);
    var a3 = findIntersectionRect(ongkhoi.rect3,this.rect);
    var a4 = findIntersectionRect(ongkhoi.rect4,this.rect);
    return a1 || a2 || a3 || a4;
}
function drawRotated(degrees,context,image,x,y){

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();
    // move to the center of the canvas
    context.translate(x+15,y+15);

    // rotate the canvas to the specified degrees
    context.rotate(degrees*Math.PI/180);

    // draw the image
    // since the context is rotated, the image will be rotated also
    context.drawImage(image,-15,-15,30,30);

    // we’re done with the rotating so restore the unrotated context
    context.restore();
}
function findIntersectionRect(img1,img2){
    var rect = {
        left: Math.max(img1.x,img2.x),
        top: Math.max(img1.y,img2.y),
        right: Math.min(img1.x+img1.width,img2.x+img2.width),
        bottom: Math.min(img1.y+img1.height,img2.y+img2.height)
    };
    //console.log(img2);
    if(rect.left>rect.right || rect.top>rect.bottom)
        return false;
    return true;
}