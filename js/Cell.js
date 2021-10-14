import Disc from "./Disc.js";

export default class Cell {
    constructor (x, y, isEmpty, img, ctx){
        this.x = x;
        this.y = y;
        this.isEmpty = isEmpty;
        this.disc = new Disc(x + 70/2 ,y + 70/2, 28, img, ctx);
    }

    print(ctx){
        ctx.fillStyle = "#2A66D4";
        ctx.fillRect(this.x, this.y, 70, 70);
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
