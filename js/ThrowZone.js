
export default class throwZone {
    constructor (startX, startY, width, heigth, ctx){
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.heigth = heigth;
        this.ctx = ctx;
    }

    isPointerInside(x,y){
        return !(x < this.startX || x > this.startX + this.width || y < this.startY || y > this.startY + this.heigth);
    }

    draw(){
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(this.startX, this.startY, this.width, this.heigth);
    }
}