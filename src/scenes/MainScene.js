import CONFIG from "../config.js";
import Button from "./Button.js";
import GameUpdate from "./GameUpdate.js";
export default class MainScene extends Phaser.Scene {

	constructor() {
		super("main-scene");
	}

	create() {
        const gridWidth = 300;
        // Title
        this.add
            .text(CONFIG.WIDTH / 2, 130, "Tic Tac Toe", {
                fontFamily: "Impact",
                fontSize: "72px",
                fill: "#351848"
            })
            .setOrigin(0.5);

        this.add.grid(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, gridWidth, gridWidth, 
        		gridWidth/3, gridWidth /3, 0xffffff, 0, 0x351848);	
        //add Start button using custom button class
        const button = new Button(CONFIG.WIDTH / 2, 625, "Start", this, "game-update", 0)
    }
}