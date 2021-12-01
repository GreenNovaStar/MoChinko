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

var yOffset = 100;
var xOffset = 100;

function Preload() {
	this.load.setBaseURL("https://labs.phaser.io");

	this.load.image("bg2", "assets/skies/gradient2.png");
}
function Create() {
	console.log("MainMenu");
	// game.scene.start("GamePlay");
	let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg2");
	let scaleX = this.cameras.main.width / image.width;
	let scaleY = this.cameras.main.height / image.height;
	let scale = Math.max(scaleX, scaleY);
	image.setScale(scale).setScrollFactor(0);

	const logo = this.add
		.text(xOffset, yOffset, "Mochinko", { fontSize: 64, fill: "#0f0" })
		.setInteractive();

	const playGameButton = this.add
		.text(xOffset, yOffset + 150, "Play Game", { fill: "#0f0" })
		.setInteractive()
		.on("pointerdown", () => {
			game.scene.start("LevelSelect");
		});
	const leaderboardButton = this.add
		.text(xOffset, yOffset + 200, "Leaderboard", { fill: "#0f0" })
		.setInteractive()
		.on("pointerdown", () => {
			game.scene.start("Leaderboard");
		});
	const helpButton = this.add
		.text(xOffset, yOffset + 250, "Help", { fill: "#0f0" })
		.setInteractive()
		.on("pointerdown", () => {
			game.scene.start("Help");
		});
	// playGameButton = this.add.text(100, 100, "Play Game", { fill: "#0f0" });
	// playGameButton.setInteractive();
	// playGameButton.on("pointerdown", () => game.scene.start("LevelSelect"));
}
function Update() {}

// Add scene to list of scenes
myGame.scenes.push(mainMenuState);
