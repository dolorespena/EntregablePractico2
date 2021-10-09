import Cell from "./Cell.js";

export default class Board {
    constructor (width, height){
        this.height = height;
        this.width = width;
        this.cells = this.buildMatrix();//Construyo la matriz vacía
    }

    getCells(){
        return this.cells;
    }

    getCell(x,y){
        return this.cells[x][y];
    }

    buildMatrix() {
        let matrix = new Array(this.height);
        for (let i = 0; i < matrix.length; i++){
            matrix[i] = new Array(this.width);
            for(let j = 0; j < matrix[i].length; j++){
                matrix[i][j] = new Cell(i*100,j*100);
            }
        }
        return matrix;
    }

    draw(ctx,canvas){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        this.cells.forEach(rows => {
            rows.forEach(cell => {
                cell.print(ctx);
                })
        });
    }
}