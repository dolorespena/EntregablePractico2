"use strict";

import Board from "./Board.js";
import Cell from "./Cell.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let rangeDiscs = document.getElementById("rangeDiscs"); //El selector de cantidad de fichas
let spanDiscs = document.getElementById("showCantDiscs"); //Donde se muestra la cantidad de fichas seleccionadas
spanDiscs.innerHTML = rangeDiscs.value + " en línea"; //Seteo por defecto en 4 línea

let discsToWin = Number(rangeDiscs.value);  // Cantidad de fichas consecutivas para ganar

let isMouseDown = false;
let lastClickedFigure = null;


let cellP1 = new Cell(100,250, 'red', ctx);
cellP1.print(ctx);

let cellP2 = new Cell(100,410, 'yellow', ctx);
cellP2.print(ctx);

let grippeableDiscs = [] ; //listado de fichas que se pueden agarrar
grippeableDiscs.push(cellP1, cellP2);

let board = new Board(discsToWin + 2 , discsToWin + 3, ctx); //Creación del tablero
board.draw();
console.log(board.getCells())


rangeDiscs.addEventListener("change", ()=> {
    let cellP1 = new Cell(100,250, 'red', ctx);
    let cellP2 = new Cell(100,410, 'yellow', ctx);

    spanDiscs.innerHTML = rangeDiscs.value + " en línea";
    discsToWin = Number(rangeDiscs.value); 
    board = new Board(discsToWin + 2 , discsToWin + 3, ctx);
    clearCanvas();
    board.draw();
    cellP1.print(ctx);
    cellP2.print(ctx);
})

// Selección de ficha

function onMouseDown(e){
    isMouseDown = true;

    if(lastClickedFigure != null){
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }

    let clickFig = findClickedFigure(e.layerX, e.layerY);
    if (clickFig != null){
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;

    }
}

function onMouseMove(e){
    if (isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        clearCanvas();
        board.draw();
        cellP1.print(ctx);
        cellP2.print(ctx);
        lastClickedFigure.draw();
    }
}

function onMouseUp(e){
    isMouseDown = false;
    console.log(e.layerX, e.layerY);

    if(board.getThrowZone().isPointerInside(e.layerX, e.layerY)){
        console.log("Está en la zona de tiro");  
    }
}

function clearCanvas(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function findClickedFigure(x, y){
    let clickedFigure = null;
    grippeableDiscs.forEach(cell => {
        if (cell.getDisc().isPointerInside(x,y)){
            console.log(cell.getDisc());
            clickedFigure = cell.getDisc();
        }
    });
    return clickedFigure;
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);