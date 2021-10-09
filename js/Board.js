export default class Board {
    constructor (width, height){
        this.height = height;
        this.width = width;
    }

    draw(ctx) {
        ctx.fillStyle = "dodgerblue";
        ctx.fillRect(0, 0, this.width, this.height);
    }

}