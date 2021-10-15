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
        this.throwZone = new throwZone(this.spaceX, 0, this.height * 70, this.spaceY, this.ctx);
        this.freePlaces = this.getFreePlaces(); // Devuelve un arreglo indices disponible;
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
                matrix[i][j] = new Cell(i*70+this.spaceX,j*70+this.spaceY, true, null, this.ctx);
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

    getFreePlaces(){
        let freePlaces = [];
        this.getCells().forEach(column => {
            freePlaces.push(this.getFreePlace(column));
        })
        return freePlaces;
    }

    getFreePlace(column){
        for (let i = column.length-1; i>=0; i--){
            if (column[i].isEmpty){
                return i;
            }
        }
        return null;
    }

    insertDisc(img, trowX){
        let trowY = this.freePlaces[trowX]
        if(trowY != null){
            this.getCell(trowX, trowY).getDisc().setImg(img);
            this.getCell(trowX, trowY).setIsEmpty(false);
            this.freePlaces = this.getFreePlaces();
        }
        
    }

    isFourInLine(player, discsToWin){
        return this.connect4Vertical(player,discsToWin) || this.connect4Horizontal(player,discsToWin);
        // ||connect4Diagonal1(player,discsToWin) ||connect4Diagonal2(player,discsToWin));   
    }

    connect4Vertical(player, discsToWin){

        let count = 0;
        let hasWinner = false;
        this.getCells().forEach(column => {
        
            column.forEach(cell => {
                if (cell.getDisc().getImg() != null && cell.getDisc().getImg().id == player){
                    count ++;
                }
                else{
                    count = 0;
                }
                if (count == discsToWin){
                    hasWinner = true;
                }
            })
        })
        return hasWinner;
    }

    connect4Horizontal(player, discsToWin){

        let count = 0;
        let hasWinner = false;

        console.log(this.cells)

        for(let i = 0; i < this.cells[0].length; i ++){
            count = 0;
            for (let j = this.cells.length -1; j >= 0 ; j--){
                if (this.cells[j][i].getDisc().getImg() != null && this.cells[j][i].getDisc().getImg().id == player){
                    count ++;
                }
                else{
                    count = 0;
                }
                if (count == discsToWin){
                    hasWinner = true;
                }
            }
        }
         
        return hasWinner;
    }
    
    connect4Diagonal1(player){
        return false;
    }

    connect4Diagonal2(player){
        return false;
    }
}