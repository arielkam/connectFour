console.log("Board loaded!");
export class Board{
    numRows;
    numCols;
    connectNumber;
    defaultValue;
    board; 
    curPlayer;
    constructor(numRows, numCols, defaultValue, connectNumber){
        this.numRows = numRows;
        this.numCols = numCols;
        this.connectNumber = connectNumber;
        this.defaultValue = defaultValue;
        this.board = Array(numRows).fill(-1).map(() => Array(numCols).fill(-1));
        this.curPlayer = 0;
    }

    isFullBoard() {
        for(let j = 0; j < this.numCols; j++){
            if(this.board[this.numRows - 1][j] === this.defaultValue){
                return false;
            }
        }
        return true;
    }

    checkVictory(row, col){
        //row check (need only down check):
        let count = 0;
        for(let i = 0; i < this.connectNumber; i++){
            if(row - i < 0 || this.board[row - i][col] !== this.curPlayer){
                break;
            }
            if(i === this.connectNumber - 1){
                return true;
            }
        }
        //cols check (right & left):
        count = 0;
        for(let j = Math.max(0, col - this.connectNumber + 1);
                j < Math.min(this.numCols, col + this.connectNumber); j++){
            if(this.board[row][j] !== this.curPlayer){
                count = 0;
            }
            else{
                count++;
            }
            if(count === this.connectNumber ){
                return true;
            }
        }

        //down -> up arrow:
        for(let i = 0; i < this.connectNumber ; i++){//how much down the arrow
            if(col - i < 0 || row - i < 0 || this.board[row - i][col - i] !== this.curPlayer){
                break;
            }
            for(let j = 0; j < this.connectNumber - i ; j++){
                if(col + j >= this.numCols || row + j >= this.numRows || this.board[row+j][col+j] !== this.curPlayer){
                    break;
                }
                if(j === this.connectNumber - i - 1){
                    return true;
                }
            }
        }
        
        //up -> down arrow:
        for(let i = 0; i < this.connectNumber ; i++){//how much down the arrow
            if(col - i < 0 || row + i >= this.numRows || this.board[row + i][col - i] !== this.curPlayer){
                break;
            }
            for(let j = 0; j < this.connectNumber - i ; j++){
                if(col + j >= this.numCols || row - j < 0 || this.board[row-j][col+j] !== this.curPlayer){
                    break;
                }
                if(j === this.connectNumber - i - 1){
                    return true;
                }
            }
        }

        return false;
    }

    //return row index of inserted gamePiece. update the board with the gamePiece.
    drop(column){
        for(let i = 0; i <this.numRows; i++){            
            if(this.board[i][column] === this.defaultValue){
                this.board[i][column] = this.curPlayer;
                return i;
            }
        }
        //could not find an empty row to insert player move
        return -1;
    }

    restartAll(){
        this.board = Array(this.numRows).fill(-1).map(() => Array(this.numCols).fill(-1)); //TODO ! change declaration
        this.player = 0;
    }

    makeMove(column){
        let res = {"player" : this.curPlayer};
        res["row"] = this.drop(column);
        if(res.row === -1){
            return res;
        }
        if(this.checkVictory(res["row"],column)){
            res["win"] = 1;
            return res;
        }
        if(this.isFullBoard()){
            res["tie"] = 1;
            return res;
        }
        this.curPlayer = 1 - this.curPlayer;
        return res;
    }
}