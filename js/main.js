"use strict";

import Board from "./Board.js";
import Cell from "./Cell.js";
import Disc from "./Disc.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let btnStart = document.getElementById("startGame");
let btnRestart = document.getElementById("restartGame");
let countdown = document.getElementById("countdown");
let msgSelectPlayer = document.getElementById("selectPlayer");
let msgWinPlayer = document.getElementById("winPlayer"); //Mensaje jugador ganador
let rangeDiscs = document.getElementById("rangeDiscs"); //El selector de cantidad de fichas
let spanDiscs = document.getElementById("showCantDiscs"); //Donde se muestra la cantidad de fichas seleccionadas
spanDiscs.innerHTML = rangeDiscs.value + " en línea"; //Seteo por defecto en 4 línea


let discsToWin = Number(rangeDiscs.value);  // Cantidad de fichas consecutivas para ganar

let isMouseDown = false;
let lastClickedFigure = null;

let board = new Board(discsToWin + 2 , discsToWin + 3, ctx); //Creación del tablero
let cellP1 = new Cell(100,250, true, null, ctx);
let cellP2 = new Cell(100,410, true, null, ctx);

drawGameElements();

let grippeableDiscs = [] ; //listado de fichas que se pueden agarrar

let imagesDisc = document.querySelectorAll("img"); // Devuelve una lista de img

imagesDisc.forEach(image => {
    image.addEventListener("click", setPlayer);
})

function setPlayer(evt){ // Seleccion de las fichas para cada jugador. Se anulan todos los botones una vez seleccionadas las fichas que van a jugar.

    let elementsWithClass = document.getElementsByClassName('borderP1').length + document.getElementsByClassName('borderP1').length;
    if (elementsWithClass == 2){
        removeListenerAllButtons();
    }

    let selectImg = evt.target;
    
    msgSelectPlayer.innerHTML = 'Elegir jugador 2:';
    selectImg.removeEventListener('click', setPlayer);
    
    if (document.getElementsByClassName('borderP1').length != 0){
        cellP2 = new Cell(100,410, false, selectImg, ctx);
        cellP2.print(ctx);
        selectImg.classList.add('borderP2');
        msgSelectPlayer.innerHTML = '¡Estamos listos!';  
        btnStart.classList.toggle('show');     
    }
    else{
        cellP1 = new Cell(100,250, false, selectImg, ctx);
        cellP1.print(ctx);
        selectImg.classList.add('borderP1');    
    }
}

function removeListenerAllButtons(){
    imagesDisc.forEach(image => {
        image.removeEventListener("click", setPlayer);
    })
}

rangeDiscs.addEventListener("change", restartGame)

// Selección de ficha por el jugador de turno
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

    console.log(grippeableDiscs);

    if(board.getThrowZone().isPointerInside(e.layerX, e.layerY) && lastClickedFigure != null){ // si la ficha está en la zona de tiro
        let img = lastClickedFigure.getImg();
        let throwX = board.getThrowZone().positionTrow(e.layerX);
        board.insertDisc(img,throwX);
        drawGameElements();
        
        let player = img.id;
        if(isWinner(player, discsToWin)){
            msgWinPlayer.innerHTML = `${player} Wins!`;
            grippeableDiscs = [];
            btnRestart.classList.toggle('show');
        }
        else{
            let actualDisc = grippeableDiscs.pop();// Elimina el ultimo elemento 
            if(actualDisc.getDisc().getImg().id == cellP1.getDisc().getImg().id){
                grippeableDiscs.push(cellP2);
                
            }else{
                grippeableDiscs.push(cellP1);
            }

        }
    }
}

function startGame(){ //una vez seleccionado el boton de inicio de juego se le da comienzo a la jugada

    grippeableDiscs.push(cellP1);
    btnStart.classList.toggle('show'); 
    msgSelectPlayer.innerHTML = '';

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    countdown.style.display = "block";
    timeDown();
}

function restartGame(){ //Un vez obtenido el ganador, con esta funcion comienza una nueva partida
    btnStart.classList.remove('show'); 
    btnRestart.classList.remove('show');
    spanDiscs.innerHTML = rangeDiscs.value + " en línea";
    discsToWin = Number(rangeDiscs.value); 
    board = new Board(discsToWin + 2 , discsToWin + 3, ctx);

    cellP1 = new Cell(100,250, true, null, ctx);
    cellP2 = new Cell(100,410, true, null, ctx);

    grippeableDiscs = [];

    imagesDisc.forEach(image => {
        image.addEventListener("click", setPlayer);
        image.classList.remove('borderP1', 'borderP2');
    })

    msgSelectPlayer.innerHTML = 'Elegir jugador 1:';
    msgWinPlayer.innerHTML = '';

    drawGameElements();
    clearInterval(timeInterval);
    countdown.style.display = "none";

}

function isWinner(player, discsToWin){ // funcionalidad que define si hay ganador
    return board.isFourInLine(player, discsToWin);
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

//tiempo
function timeDown(){
    let segundos = 300;
    let timeInterval = setInterval(run, 1000);

    function run(){
        if( segundos == 0){
            clearInterval(timeInterval);
        }else {
            segundos--;
            countdown.innerHTML =  segundos;
        }
    }
}

btnStart.addEventListener("click", startGame);
btnRestart.addEventListener("click", restartGame);
