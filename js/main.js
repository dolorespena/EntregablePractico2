"use strict";

import Board from "./Board.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let board = new Board(800,800, ctx);

board.draw(ctx);