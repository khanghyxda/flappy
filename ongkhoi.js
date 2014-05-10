function Rect(){
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
}
function Rect(x,y,w,h){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}
Rect.prototype.draw = function(context){
    context.beginPath();
    context.rect(this.x,this.y,this.width,this.height);
    context.strokeStyle = "#000000";
    context.lineWidth="1";
    context.stroke();
}
var arrayData=[];
function OngKhoi(context,arr,vitri){
    this.img1 = new Image();
    this.img1.src = 'chanong.png';
    this.img2 = new Image();
    this.img2.src = 'dinhong.png';
    this.x = 0;
    this.width= 50;
	this.arrayData = arr;
	console.log(this.arrayData);
    this.heighttren = arr[vitri];
    this.speed = 2;
	this.vitri = vitri;
    this.rect1 = new Rect();
    this.rect2 = new Rect();
    this.rect3 = new Rect();
    this.rect4 = new Rect();
}
OngKhoi.prototype.addNew = function(x){
    this.x = x;
}
OngKhoi.prototype.draw = function(context){
    this.rect1= new Rect(this.x,0,this.width,this.heighttren);
    this.rect2= new Rect(this.x-3,this.heighttren,this.width+6,22);
    this.rect3= new Rect(this.x-3,this.heighttren+108+22,this.width+6,22);
    this.rect4= new Rect(this.x,this.heighttren+108+22+22,this.width,this.heightduoi);
    //this.rect1.draw(context);
    //this.rect2.draw(context);
    //this.rect3.draw(context);
    //  this.rect4.draw(context);
    this.heightduoi = 395 - (this.heighttren+108+22+22)+1;
    context.drawImage(this.img1,this.x,0,this.width,this.heighttren);
    context.drawImage(this.img2,this.x-3,this.heighttren,this.width+6,22);
    context.drawImage(this.img2,this.x-3,this.heighttren+108+22,this.width+6,22);
    context.drawImage(this.img1,this.x,this.heighttren+108+22+22,this.width,this.heightduoi);
}
OngKhoi.prototype.update = function(context){
    this.x -= this.speed;
    if(this.x<-110){
        this.x = 430;
		this.vitri=this.vitri+3;
        //this.heighttren = 50+Math.random()*150;
		this.heighttren = this.arrayData[this.vitri];
		console.log(this.arrayData[this.vitri]);
    }
    this.draw(context);
}
