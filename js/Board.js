import Cell from "./Cell.js";
import throwZone from "./ThrowZone.js";

export default class Board {
    constructor (width, height, ctx){
        this.height = height; //cantidad de fichas en largo
        this.width = width; //cantidad de fichas en ancho
        this.ctx = ctx;
        this.spaceX = 300; //Distancia del punto 0 del canvas;
        this.spaceY = 100; //Distancia del punto 0 del canvas;
        this.cells = this.buildMatrix(); //Matrix of Cells
        this.throwZone = new throwZone(this.spaceX, 0, this.height * 80, this.spaceY, this.ctx);
    }

    getCells(){
        return this.cells;
    }

    getCell(x,y){
        return this.cells[x][y];
    }

    getThrowZone(){
        return this.throwZone;
    }

    buildMatrix() {
        let matrix = new Array(this.height);
        for (let i = 0; i < matrix.length; i++){
            matrix[i] = new Array(this.width);
            for(let j = 0; j < matrix[i].length; j++){
                matrix[i][j] = new Cell(i*80+this.spaceX,j*80+this.spaceY, 'white', this.ctx);
            }
        }
        return matrix;
    }

    draw(){
        this.throwZone.draw();
        this.cells.forEach(rows => {
            rows.forEach(cell => {
                cell.print(this.ctx);
            })
        });
    }

    insertDisc(){
        
    }
}