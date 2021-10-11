import Disc from "./Disc.js";

export default class Cell {
    constructor (x, y, color, ctx){
        this.x = x;
        this.y = y;
        this.color = color;
        this.disc = new Disc(x + 80/2 ,y +80/2, 32, color, ctx);
    }

    print(ctx){
        ctx.fillStyle = "dodgerblue";
        ctx.fillRect(this.x, this.y, 80, 80);
        this.disc.draw();
    }

    getDisc(){
        return this.disc;
    }

    setDisc(disc){
        this.disc = disc;
    }
}
