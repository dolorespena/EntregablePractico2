import Disc from "./Disc.js";

export default class Cell {
    constructor (x, y, ctx){
        this.x = x;
        this.y = y;
        this.disc = new Disc(x + 100/2 ,y +100/2, 40, 'white', ctx);
    }

    print(ctx){
        ctx.fillStyle = "dodgerblue";
        ctx.fillRect(this.x, this.y, 100, 100);
        this.disc.draw();
    }

    getDisc(){
        return this.disc;
    }
}
