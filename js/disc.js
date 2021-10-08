export default class Disc {
    constructor (posX, posY,radius,fill,context){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.fill = fill;
        this.resaltado = false;
        this.resaltadoEstilo = 'red';
        this.ctx = context;
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

    draw(){
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.arc(this.posX,this.posY,this.radius,0,2 * Math.PI);
        this.ctx.fill();

        if (this.resaltado == true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }

    getRadius(){
        return this.radius;
    }

    setRadius(radius){
        this.radius = radius;
    }

    setResaltado(resaltado){
        this.resaltado = resaltado;
    }

    isPointerInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}