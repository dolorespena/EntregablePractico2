import Cell from "./Cell.js";

export default class Board {
    constructor (width, height, ctx){
        this.height = height;
        this.width = width;
        this.ctx = ctx;
        this.cells = this.buildMatrix(); //Matrix of Cells
        //this.throwZone = new throwZone();
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
                matrix[i][j] = new Cell(i*100,j*100, this.ctx);
            }
        }
        return matrix;
    }

    draw(canvas){
        this.ctx.clearRect(0,0,canvas.width,canvas.height)
        this.cells.forEach(rows => {
            rows.forEach(cell => {
                cell.print(this.ctx);
            })
        });
    }
}