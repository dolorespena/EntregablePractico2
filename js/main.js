"use strict";

import Board from "./Board.js";
import Cell from "./Cell.js";
import Disc from "./Disc.js";

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
        lastClickedFigure = null;
    }

    let clickFig = findClickedFigure(e.layerX, e.layerY);
    if (clickFig != null){
        lastClickedFigure = clickFig;

    }
}

function onMouseMove(e){
    if (isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        drawGameElements();
        lastClickedFigure.draw();
    }
}

function onMouseUp(e){
    isMouseDown = false;
    drawGameElements();

    if(board.getThrowZone().isPointerInside(e.layerX, e.layerY)){ // si la ficha está en la zona de tiro
        let color = lastClickedFigure.fill;
        let throwX = board.getThrowZone().positionTrow(e.layerX);
        console.log("color", color);
        console.log("posTiro", throwX);
        board.insertDisc(color,throwX);
        drawGameElements();
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
            clickedFigure = cell.getDisc().getAttributes();
        }
    });
    return new Disc(clickedFigure.posX,clickedFigure.posY,clickedFigure.radius,clickedFigure.fill,clickedFigure.ctx);
}

function drawGameElements(){
    clearCanvas();
    board.draw();
    cellP1.print(ctx);
    cellP2.print(ctx);
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);