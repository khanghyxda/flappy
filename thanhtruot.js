

function ThanhTruot(context){
    this.img = new Image();
    this.img.src = 'thanhtruot.png';
    this.x = 0;
    this.y = 395;
    this.width= 290;
    this.height = 10;
    this.speed = 2;
}
ThanhTruot.prototype.addNew = function(x){
    this.x = x;
}
ThanhTruot.prototype.draw = function(context){
        context.drawImage(this.img,this.x,this.y,this.width,this.height);
}
ThanhTruot.prototype.update = function(context){
    this.x-=this.speed;
    if(this.x<=-290){
        this.x = 290;
    }
    this.draw(context);
}
