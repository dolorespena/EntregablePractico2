export default class Cell {
    constructor (x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    print(ctx){
        ctx.fillStyle = "dodgerblue";
        ctx.strokeStyle = 'black';
        ctx.fillRect(this.x, this.y, 100, 100);
        ctx.strokeRect(this.x,this.y, 100, 100);
    }
}
