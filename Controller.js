import {View} from './View.js';
import {Board} from './Board.js';
console.log("Controller loaded!");

const canvas = document.getElementById('game');
const view = new View(canvas, 6,7);
const gameManeger = new Board(6, 7, -1, 4);
view.drawEmptyBoard();


canvas.addEventListener('click', function(event) {
    let col = view.getColumn(event.pageX);
    console.log("got event!", col);
    let move = gameManeger.makeMove(col);
    if(move.row !== -1){
        if(move.player){
            view.drawCycle( move.player, move.row, col);
        } 
        else{
            view.drawCycle( move.player, move.row, col);
        }
        
        setTimeout(()=>{
            if(move.win){
                view.win(move.player);
                gameManeger.restartAll();
                view.drawEmptyBoard();
            }
            else if(move.tie){
                view.tie(move.player);
                gameManeger.restartAll();
                view.drawEmptyBoard();
            }
        }, 1);

    }

}, false);
