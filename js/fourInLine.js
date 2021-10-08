"use strict";

import Disc from './disc.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIG = 30;

let discs = [];
let lastClickedFigure = null;
let isMouseDown = false;

function drawDiscs(){
    clearCanvas();
    for (let i = 0; i< discs.length; i++)
        discs[i].draw();
}

function addDiscs(){
    addDisc();
    drawDiscs();
    if(discs.length < CANT_FIG)
        setTimeout(addDiscs, 333);
}

setTimeout(() => {
    addDiscs();
}, 333);


function addDisc(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();

    let disc = new Disc(posX, posY, 20, color, ctx);
    discs.push(disc);
}

function randomRGBA(){
    let r = Math.round(Math.random () * 255);
    let g = Math.round(Math.random () * 255);
    let b = Math.round(Math.random () * 255);
    let a = 255;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

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
    ctx.fillRect(0,0, canvasWidth, canvasHeight);
}

function findClickedFigure(x, y){
    for (let i = 0; i< discs.length; i++)
        if (discs[i].isPointerInside(x, y))
            return discs[i];
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);