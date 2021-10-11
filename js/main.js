"use strict";

import Board from "./Board.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let rangeDiscs = document.getElementById("rangeDiscs"); //El selector de cantidad de fichas
let spanDiscs = document.getElementById("showCantDiscs"); //Donde se muestra la cantidad de fichas seleccionadas
spanDiscs.innerHTML = rangeDiscs.value + " en línea"; //Seteo por defecto en 4 línea

let discsToWin = Number(rangeDiscs.value); 

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
    drawDiscs();
}

function onMouseMove(e){
    if (isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        drawDiscs();
    }
}

function onMouseUp(){
    isMouseDown = false;
}

function clearCanvas(){
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function findClickedFigure(x, y){
    for (let i = 0; i< discs.length; i++)
        if (discs[i].isPointerInside(x, y))
            return discs[i];
}

// canvas.addEventListener('mousedown', onMouseDown, false);
// canvas.addEventListener('mouseup', onMouseUp, false);
// canvas.addEventListener('mousemove', onMouseMove, false);