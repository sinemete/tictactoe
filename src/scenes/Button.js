import CONFIG from "../config.js";

export default class Button{

	constructor(x, y, label, scene, callback, type) {      
        const button = scene.add.rectangle(x, y, 225, 70,  0xAC33FF)
        	.setInteractive({ useHandCursor: true })
	        .on('pointerdown', () => {
	        	if(type ===0)
	        		scene.scene.start(callback)
	        	else
	        		scene[callback]()
	        })
	        .on('pointerover', () => {
	        	button.setScale(1.2);
	        	buttonText.setScale(1.2);
	        	})
	        .on('pointerout', () => {
	        	button.setScale(1);
	        	buttonText.setScale(1);
	        	});
        const buttonText = scene.add.text(x, y, label,  {
            fontFamily: "Impact",
            fontSize: "36px",
        })
        .setOrigin(0.5)
        .setPadding(10)
    }
}