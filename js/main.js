"use strict";

import Board from "./Board.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let rangeDiscs = document.getElementById("rangeDiscs"); //El selector de cantidad de fichas
let spanDiscs = document.getElementById("showCantDiscs"); //Donde se muestra la cantidad de fichas seleccionadas
spanDiscs.innerHTML = rangeDiscs.value + " en línea"; //Seteo por defecto en 4 línea

let discsToWin = Number(rangeDiscs.value); 

let isMouseDown = false;
let lastClickedFigure = null;

let board = new Board(discsToWin + 2 , discsToWin + 3, ctx);
board.draw();
console.log(board.getCells())


rangeDiscs.addEventListener("change", ()=> {
    spanDiscs.innerHTML = rangeDiscs.value + " en línea";
    discsToWin = Number(rangeDiscs.value); 
    board = new Board(discsToWin + 2 , discsToWin + 3, ctx);
    clearCanvas();
    board.draw();
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
    //lastClickedFigure.draw();
}

function onMouseMove(e){
    if (isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        clearCanvas();
        board.draw();
        lastClickedFigure.draw();
    }
}

function onMouseUp(){
    isMouseDown = false;
}

function clearCanvas(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function findClickedFigure(x, y){
    let clickedFigure = null;
    board.getCells().forEach(rows => {
        rows.forEach(cell => {
            if (cell.getDisc().isPointerInside(x,y)){
                console.log(cell.getDisc());
                clickedFigure = cell.getDisc();
            }
        })
    });
    return clickedFigure;
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);