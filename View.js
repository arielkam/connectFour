console.log("View loaded!");
export class View{
    canvas;
    ctx;
    cols;
    rows;
    RightShift;
    backgroundColor;
    cyclesColor;
    constructor(canvas, numberRows, numberCols){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.cellWidth = canvas.width / numberCols;
        this.cellHeight = canvas.height / numberRows;
        this.cols = numberCols;
        this.rows = numberRows;
        this.RightShift = canvas.offsetLeft + canvas.clientLeft;
        this.cyclesColor = {
            "-1": "white",
            "0": "red",
            "1": "yellow"
        }
        this.backgroundColor = "blue";
    }

    drawCycle(player, y, x){
        let radius = Math.min(this.cellWidth,this.cellHeight) / 3;
        let yCenter = this.canvas.height - y * this.cellHeight - this.cellHeight/2;
        let xCenter = x * this.cellWidth + this.cellWidth/2;
        this.ctx.beginPath();
        this.ctx.moveTo(xCenter + radius, yCenter);
        this.ctx.arc(xCenter, yCenter , radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.cyclesColor[player];
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawEmptyBoard(){
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); //draw the board!
        this.ctx.stroke();
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                let xCoordinate = this.canvas.width - (this.cols - j)*this.cellWidth;
                let yCoordinate = this.canvas.height - (i + 1)*this.cellHeight;
                this.ctx.beginPath();
                this.ctx.rect(xCoordinate, yCoordinate, this.cellWidth, this.cellHeight);
                this.ctx.stroke();
                this.drawCycle("-1", i, j);
            }
        }
    }

    getColumn(x){
        x = x - this.RightShift; //handle the tab, start from the begining of canvas
        for(let j = 0; j < this.canvas.width; j += this.cellWidth){
            if(x > j && x < j + this.cellWidth){
                return Math.round(j / this.cellWidth);
            }
        }
        return -1;
    }

    win(player){
        alert("Well done " + this.cyclesColor[player] +" win");
    }
    tie(){
        alert("It's a tie!");
    }

}
