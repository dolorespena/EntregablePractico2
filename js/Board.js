import Cell from "./Cell.js";

export default class Board {
    constructor (width, height){
        this.height = height;
        this.width = width;
        this.cells = new Array(width).fill(new Array(height)); //Construyo la matriz vacía
    }

    draw(ctx) {
        ctx.fillStyle = "dodgerblue";

        for (let i = 0; i < this.cells.length; i++){
            //console.log(i);
            for(let j = 0; j < this.cells[i].length; j++){
                //console.log("celda actual es" + i + "," + j);
                this.cells[i][j] = new Cell(i,j);
                //console.log(this.cells[i][j]);
            }
        };
        //console.log(this.cells[0][0]);
    }
}