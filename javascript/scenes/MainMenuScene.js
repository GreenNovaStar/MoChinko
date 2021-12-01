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
	this.load.setPath("../../assets/Scene Assets/");
	this.load.image("play-btn", "MainMenu/PlayGame.png");
	this.load.image("leaderboard-btn", "MainMenu/Leaderboard.png");
	this.load.image("help-btn", "MainMenu/Help.png");
	this.load.image("ball-sprite", "medicine-ball.png");
	this.load.image("bg2", "Background/gradient2.png");

	// this.load.setBaseURL("https://labs.phaser.io");

	// this.load.image("bg2", "assets/skies/gradient2.png");
	// this.load.image("ball", "assets/sprites/blue_ball.png");

	game.scene.stop("Preload");
}
function Create() {
	console.log("MainMenu");
	// game.scene.start("GamePlay");

	// game.scene.start("LevelSelect");

	let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg2");
	let scaleX = this.cameras.main.width / image.width;
	let scaleY = this.cameras.main.height / image.height;
	let scale = Math.max(scaleX, scaleY);
	image.setScale(scale).setScrollFactor(0);
	const logo = this.add.text(xOffset, yOffset, "Mochinko", { fontSize: 64, fill: "#0f0" });

	let hoverball = this.add.sprite(100, 100, "ball-sprite");
	hoverball.setScale(0.08);
	hoverball.setVisible(false);

	this.input.mouse.disableContextMenu();

	let playButton = this.add.image(width / 2, yOffset + 200, "play-btn");
	playButton.setInteractive(
		new Phaser.Geom.Rectangle(0, 60, 300, 50),
		Phaser.Geom.Rectangle.Contains
	);
	playButton.on("pointerdown", () => {
		game.scene.start("LevelSelect");
		// console.log("play game button");
	});
	playButton.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.x = playButton.x - 200;
		hoverball.y = playButton.y;
	});
	playButton.on("pointerout", () => {
		hoverball.setVisible(false);
	});

	let leaderboardButton = this.add.image(width / 2, yOffset + 300, "leaderboard-btn");
	leaderboardButton.setInteractive(
		new Phaser.Geom.Rectangle(0, 60, 300, 50),
		Phaser.Geom.Rectangle.Contains
	);
	leaderboardButton.on("pointerdown", () => {
		game.scene.start("Leaderboard");
		// console.log("leaderboard button");
	});
	leaderboardButton.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.x = leaderboardButton.x - 200;
		hoverball.y = leaderboardButton.y;
	});
	leaderboardButton.on("pointerout", () => {
		hoverball.setVisible(false);
	});

	let helpButton = this.add.image(width / 2, yOffset + 400, "help-btn");
	helpButton.setInteractive(
		new Phaser.Geom.Rectangle(0, 60, 150, 50),
		Phaser.Geom.Rectangle.Contains
	);
	helpButton.on("pointerdown", () => {
		game.scene.start("Help");
		// console.log("help button");
	});
	helpButton.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.x = helpButton.x - 200;
		hoverball.y = helpButton.y;
	});
	helpButton.on("pointerout", () => {
		hoverball.setVisible(false);
	});
}
function Update() {}

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);
