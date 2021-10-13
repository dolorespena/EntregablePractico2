import Disc from "./Disc.js";

export default class Cell {
    constructor (x, y, isEmpty, img, ctx){
        this.x = x;
        this.y = y;
        this.isEmpty = isEmpty;
        this.disc = new Disc(x + 80/2 ,y +80/2, 32, img, ctx);
    }

    print(ctx){
        ctx.fillStyle = "dodgerblue";
        ctx.fillRect(this.x, this.y, 80, 80);
        this.disc.draw();
    }

    setIsEmpty(boolean){
        this.isEmpty = boolean;
    }

    getDisc(){
        return this.disc;
    }

    setDisc(disc){
        this.disc = disc;
    }
}
