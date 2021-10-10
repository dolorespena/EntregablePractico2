"use strict";

import Board from "./Board.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let rangeDiscs = document.getElementById("rangeDiscs"); //El selector de cantidad de fichas
let spanDiscs = document.getElementById("showCantDiscs"); //Donde se muestra la cantidad de fichas seleccionadas
spanDiscs.innerHTML = rangeDiscs.value + " en línea"; //Seteo por defecto en 4 línea

let discsToWin = Number(rangeDiscs.value); 

let board = new Board(discsToWin + 2 , discsToWin + 3, ctx);
board.draw(canvas);
console.log(board.getCells())


rangeDiscs.addEventListener("change", ()=> {
    spanDiscs.innerHTML = rangeDiscs.value + " en línea";
    discsToWin = Number(rangeDiscs.value); 
    board = new Board(discsToWin + 2 , discsToWin + 3, ctx);
    board.draw(canvas);
})