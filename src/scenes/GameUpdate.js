import CONFIG from "../config.js";
import Moves from "./Moves.js";
import Button from "./Button.js";
export default class GameUpdate extends Phaser.Scene {
	constructor() {
        super("game-update");
        this.phaser = this;
        this.text;
        this.POS_ARRAY;
        this.gameStarted = false;
        this.gameOver = false;
        this.player = 1;
        this.opp = 2;
        this.moves = new Moves();
        this.board = [0,0,0,0,0,0,0,0,0];
    }
	
    preload() {
        this.load.image("X", "assets/X.png");
        this.load.image("O", "assets/O.png");
    }

    create() {
        this.text = this.add
            .text(CONFIG.WIDTH / 2, 125, "Click to start", {
                fontFamily: "Impact",
                fontSize: "32px",
                fill: "#351848"
            })
            .setOrigin(0.5);

        const gridWidth = 300;
        const gridCellWidth = gridWidth / 3;
        const grid = this.add.grid(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, gridWidth, gridWidth, 
        		gridCellWidth, gridCellWidth, 0xffffff, 0, 0x351848);
        const gridCenterX = grid.getCenter().x;
        const gridCenterY = grid.getCenter().y;    
        const topY = gridCenterY - gridCellWidth;
        const bottomY = gridCenterY + gridCellWidth;

        const gridLeft = gridCenterX - gridCellWidth
        const gridRight = gridCenterX + gridCellWidth
        this.POS_ARRAY = {
            0: { 'x': gridLeft, 'y': topY },
            1: { 'x': gridCenterX, 'y': topY },
            2: { 'x': gridRight, 'y': topY },

            3: { 'x': gridLeft, 'y': gridCenterY },
            4: { 'x': gridCenterX, 'y': gridCenterY },
            5: { 'x': gridRight, 'y': gridCenterY },

            6: { 'x': gridLeft, 'y': bottomY },
            7: { 'x': gridCenterX, 'y': bottomY },
            8: { 'x': gridRight, 'y': bottomY }
        }
        let r1 = this.add
            .rectangle(gridCenterX - gridCellWidth, topY, gridCellWidth, gridCellWidth)
            .setInteractive({useHandCursor: true});
        this.playerMove(0,r1);
        
        let r2 = this.add
            .rectangle(gridCenterX, topY, gridCellWidth, gridCellWidth)
            .setInteractive({ useHandCursor: true });
        this.playerMove(1, r2);
        
        let r3 = this.add
            .rectangle(gridCenterX + gridCellWidth, topY, gridCellWidth, gridCellWidth)
            .setInteractive({ useHandCursor: true });
        this.playerMove(2, r3);    

        let r4 = this.add
            .rectangle(gridCenterX - gridCellWidth, gridCenterY, gridCellWidth, gridCellWidth)
            .setInteractive({ useHandCursor: true });
        this.playerMove(3, r4);

        let r5 = this.add
            .rectangle(gridCenterX, gridCenterY, gridCellWidth, gridCellWidth)
            .setInteractive({ useHandCursor: true });
        this.playerMove(4, r5);

        let r6 = this.add
            .rectangle(gridCenterX + gridCellWidth, gridCenterY, gridCellWidth, gridCellWidth)
            .setInteractive({ useHandCursor: true })
        this.playerMove(5, r6);

        let r7 = this.add
            .rectangle(gridCenterX - gridCellWidth, bottomY, gridCellWidth, gridCellWidth)
            .setInteractive({ useHandCursor: true })
        this.playerMove(6, r7);

        let r8 = this.add
            .rectangle(gridCenterX, bottomY, gridCellWidth, gridCellWidth)
            .setInteractive({ useHandCursor: true })
        this.playerMove(7, r8);

        let r9 = this.add
            .rectangle(gridCenterX + gridCellWidth, bottomY, gridCellWidth, gridCellWidth)
            .setInteractive({ useHandCursor: true })
        this.playerMove(8, r9);
    }
    
    playerMove(index, rect){
    	rect.once("pointerdown", async () => {
    		console.log("hello")
    		if(!this.gameOver && this.board[index]!= this.opp){
    			this.gameStarted = true;
                this.text.setText("Your turn")                    
            	
                this.board[index] = this.player;
                this.phaser.add.image(this.POS_ARRAY[index].x, this.POS_ARRAY[index].y, "X");
                if(this.moves.checkWinner(this.player, this.board)){
                	this.endGame(this.player)
                }
                else if(this.moves.checkTie(this.board)){
                	this.endGame(0)
                }
                else{
                	await this.botMove()
                }
    		}	
        });
    }
    
    async botMove(){
    	let moveBot = this.moves.findMove(this.board)
        if(moveBot < this.board.length && moveBot >=0){
        	this.phaser.add.image(this.POS_ARRAY[moveBot].x, this.POS_ARRAY[moveBot].y, "O");
        	this.board[moveBot] = this.opp;
        }
    	if(this.moves.checkWinner(this.opp, this.board)){
    		this.gameOver = true;
    		this.endGame(this.opp)
    	}
    }
    
    endGame(winner) {
    	this.gameOver = true;
        const button = new Button(CONFIG.WIDTH / 2, 625, "Restart", this, "restart", 1)
        if (winner === this.player) {
            this.text.setText("Winner!")
        } 
        else if (winner === 0)
        {
            this.text.setText("Tie!")
        }
        else {
            this.text.setText("You loose!")
        }
    }
    restart(){
    	this.gameOver = false;
        this.gameStarted = false;
        this.board = [0,0,0,0,0,0,0,0,0];
        this.scene.restart();
    }
}