export default class Disc {
    constructor (posX, posY,radius, img, context){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.img = img;
        this.fill = 'white';
        this.ctx = context;
    }

    getAttributes(){
        return [this.posX, this.posY, this.radius, this.img, this.ctx];
    }

    setFill (fill){
        this.fill = fill;
    }

    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPosition(){
        return {
            x : this.getPosX(),
            y : this.getPosY() 
        }
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getFill(){
        return this.fill;
    }

    isEmpty(){
        return this.IsEmpty;
    }

    setIsEmpty(empty){
        this.IsEmpty = empty;
    }

    getImg(){
        return this.img;
    }

    setImg(img){
        this.img = img;
    }



    draw(){
        this.ctx.beginPath();

        if(this.img != null){
            this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
            this.ctx.arc(this.posX, this.posY, this.radius, 0,2 * Math.PI);
        }
        else{
            this.ctx.fillStyle = this.fill;
            this.ctx.arc(this.posX, this.posY, this.radius, 0,2 * Math.PI);
            this.ctx.fill();
        }
        this.ctx.closePath();
    }
    



    getRadius(){
        return this.radius;
    }

    setRadius(radius){
        this.radius = radius;
    }

    isPointerInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}