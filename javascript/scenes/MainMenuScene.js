var mainMenuState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,

	initialize: function MainMenu() {
		Phaser.Scene.call(this, { key: "MainMenu" });
	},

	preload: Preload,
	create: Create,
	update: Update,
});

let yOffset = 100;
let xOffset = 100;

function Preload() {
	// this.load.setPath("../../assets/Scene_Assets/");
	this.load.setPath("../../MoChinko/assets/Scene_Assets/");
	this.load.image("logo", "MochinkoLogo.png");
	this.load.image("play-btn", "MainMenu/PlayGame.png");
	this.load.image("leaderboard-btn", "MainMenu/Leaderboard.png");
	this.load.image("help-btn", "MainMenu/Help.png");
	this.load.image("ball-sprite", "medicine-ball.png");
	this.load.image("bg2", "Background/gradient2.png");
	this.load.spritesheet("shift-balls", "Temp Assets/balls.png", {
		frameHeight: 17,
		frameWidth: 17,
	});

	// this.load.setBaseURL("https://labs.phaser.io");

	// this.load.image("bg2", "assets/skies/gradient2.png");
	// this.load.image("ball", "assets/sprites/blue_ball.png");

	game.scene.stop("Preload");
}
function Create() {
	console.log("MainMenu");
	// game.scene.start("Classic");

	//scale background image to fit the width
	// let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg2");
	// let scaleX = this.cameras.main.width / image.width;
	// let scaleY = this.cameras.main.height / image.height;
	// let scale = Math.max(scaleX, scaleY);
	// image.setScale(scale).setScrollFactor(0);

	loadBackground(this, "bg2");

	// const logo = this.add.text(xOffset - 78, yOffset, "Mochinko!", { fontSize: 90, fill: "#0f0" });
	const logoImg = this.add.image(xOffset + 165, yOffset, "logo");

	//create a ball that shows up when hovered
	let hoverball = this.add.sprite(100, 100, "shift-balls");
	// hoverball.setScale(0.08);
	hoverball.setScale(2);
	hoverball.setVisible(false);

	this.anims.create({
		key: "change-color",
		frameRate: 3,
		repeat: -1,
		frames: this.anims.generateFrameNumbers("shift-balls", {
			frames: [0, 1, 2, 3, 4, 5],
		}),
	});

	//disable right click on mouse
	this.input.mouse.disableContextMenu();

	//load play button asset and functionality
	let playButton = this.add.image(width / 2, yOffset + 200, "play-btn");
	playButton
		.setInteractive
		// new Phaser.Geom.Rectangle(0, 60, 300, 50),
		// Phaser.Geom.Rectangle.Contains
		();
	playButton.on("pointerdown", () => {
		game.scene.start("LevelSelect");
		// console.log("play game button");
	});
	playButton.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.play("change-color");
		hoverball.x = playButton.x - 200;
		hoverball.y = playButton.y;
	});
	playButton.on("pointerout", () => {
		hoverball.setVisible(false);
	});

	//load leaderboard button asset and functionality
	let leaderboardButton = this.add.image(width / 2, yOffset + 300, "leaderboard-btn");
	leaderboardButton
		.setInteractive
		// new Phaser.Geom.Rectangle(0, 60, 300, 50),
		// Phaser.Geom.Rectangle.Contains
		();
	leaderboardButton.on("pointerdown", () => {
		game.scene.start("Leaderboard");
		// console.log("leaderboard button");
	});
	leaderboardButton.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.play("change-color");
		hoverball.x = leaderboardButton.x - 200;
		hoverball.y = leaderboardButton.y;
	});
	leaderboardButton.on("pointerout", () => {
		hoverball.setVisible(false);
	});

	//load help button asset and functionality
	let helpButton = this.add.image(width / 2, yOffset + 400, "help-btn");
	helpButton.setInteractive(
		new Phaser.Geom.Rectangle(0, -30, 150, 50),
		Phaser.Geom.Rectangle.Contains
	);

	// new Phaser.Geom.Rectangle(0, 60, 500, 500),

	helpButton.on("pointerdown", () => {
		game.scene.start("Help");
		console.log("help button");
	});
	helpButton.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.play("change-color");
		hoverball.x = helpButton.x - 200;
		hoverball.y = helpButton.y;
		console.log("help button hover");
	});
	helpButton.on("pointerout", () => {
		hoverball.setVisible(false);
	});
}
function Update() {}

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);
