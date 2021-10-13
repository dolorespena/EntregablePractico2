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

let imagesDisc = document.getElementsByTagName("img");

let random1 = Math.floor( Math.random() * imagesDisc.length);
let random2 = Math.floor( Math.random() * imagesDisc.length);

let board = new Board(discsToWin + 2 , discsToWin + 3, ctx); //Creación del tablero
let cellP1 = new Cell(100,250, false, imagesDisc.item(random1), ctx);
let cellP2 = new Cell(100,410, false, imagesDisc.item(random2), ctx);

drawGameElements();

let grippeableDiscs = [] ; //listado de fichas que se pueden agarrar
grippeableDiscs.push(cellP1, cellP2);


rangeDiscs.addEventListener("change", ()=> {
    let cellP1 = new Cell(100,250, 'red', ctx);
    let cellP2 = new Cell(100,410, 'yellow', ctx);

    spanDiscs.innerHTML = rangeDiscs.value + " en línea";
    discsToWin = Number(rangeDiscs.value); 
    board = new Board(discsToWin + 2 , discsToWin + 3, ctx);
    drawGameElements();
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
        let img = lastClickedFigure.getImg();
        let throwX = board.getThrowZone().positionTrow(e.layerX);
        board.insertDisc(img,throwX);
        drawGameElements();
    }
}

function clearCanvas(){
    ctx.fillStyle = '#5C94FC';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function findClickedFigure(x, y){
    let clickedFigure = null;
    grippeableDiscs.forEach(cell => {
        if (cell.getDisc().isPointerInside(x,y)){
            let attributes = cell.getDisc().getAttributes();
            clickedFigure = new Disc(...attributes)
        }
    });
    return clickedFigure;
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