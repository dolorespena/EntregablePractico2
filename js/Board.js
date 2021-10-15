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

    buildMatrix() { //onstructor de matriz
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

    getFreePlaces(){ // obtiene los lugares vacios
        let freePlaces = [];
        this.getCells().forEach(column => {
            freePlaces.push(this.getFreePlace(column));
        })
        return freePlaces;
    }

    getFreePlace(column){ // obtiene los lugares vacios por columna
        for (let i = column.length-1; i>=0; i--){
            if (column[i].isEmpty){
                return i;
            }
        }
        return null;
    }

    insertDisc(img, trowX){ // inserta la ficha dentro de la matriz
        let trowY = this.freePlaces[trowX]
        if(trowY != null){
            this.getCell(trowX, trowY).getDisc().setImg(img);
            this.getCell(trowX, trowY).setIsEmpty(false);
            this.freePlaces = this.getFreePlaces();
        }
        
    }

    isFourInLine(player, discsToWin){
        return this.connect4Vertical(player,discsToWin) || this.connect4Horizontal(player,discsToWin) ||
            this.connect4Diagonal1(player,discsToWin) ||this.connect4Diagonal2(player,discsToWin);   
    }

    connect4Vertical(player, discsToWin){

        let count = 0;
        let hasWinner = false;
        this.getCells().forEach(column => {
            count = 0;
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
    
    connect4Diagonal1(player, discsToWin){
        let diagonals = this.getDiagonals1();

        let count = 0;
        let hasWinner = false;
        diagonals.forEach(column => {
            count = 0;
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

    connect4Diagonal2(player, discsToWin){
        let diagonals = this.getDiagonals2();

        let count = 0;
        let hasWinner = false;
        diagonals.forEach(column => {
            count = 0;
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

    getDiagonals1(){
        let diagonals = [];
        let Ylength = this.cells.length;
        let Xlength = this.cells[0].length;
        let maxLength = Math.max(Xlength, Ylength);
        let temp;
        for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
            temp = [];
            for (let y = Ylength - 1; y >= 0; --y) {
                let x = k - y;
                if (x >= 0 && x < Xlength) {
                    temp.push(this.cells[y][x]);
                }
            }
            if(temp.length > 0) {
                diagonals.push(temp);
            }
        }
        return diagonals;
    }

    getDiagonals2(){

        let diagonals = [];
        let Ylength = this.cells.length;
        let Xlength = this.cells[0].length;
        let maxLength = Math.max(Xlength, Ylength);
        let temp;
        for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
            temp = [];
            for (let y = Ylength - 1; y >= 0; --y) {
                var x = k - (Ylength - y);
                if (x >= 0 && x < Xlength) {
                    temp.push(this.cells[y][x]);
                }
            }
            if(temp.length > 0) {
                diagonals.push(temp);
            }
        }
        return diagonals;
    }
}