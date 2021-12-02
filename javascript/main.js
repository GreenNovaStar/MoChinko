var config = {
	type: Phaser.AUTO,
	width: width,
	height: height,
	parent: "game-window",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
	scene: myGame.scenes,
};

//Instantiate the game with the config
var game = new Phaser.Game(config);
