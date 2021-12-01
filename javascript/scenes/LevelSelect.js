var levelSelectState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function MainMenu() {
		Phaser.Scene.call(this, { key: "LevelSelect" });
	},

	preload: Preload,
	create: Create,
	update: Update,
});

var xOffset = 100;
var yOffset = 100;

function Preload() {
	this.load.setBaseURL("https://labs.phaser.io");

	this.load.image("bg3", "assets/skies/gradient3.png");
}
function Create() {
	console.log("Level Select");
	// game.scene.start("GamePlay");
	let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg3");
	let scaleX = this.cameras.main.width / image.width;
	let scaleY = this.cameras.main.height / image.height;
	let scale = Math.max(scaleX, scaleY);
	image.setScale(scale).setScrollFactor(0);

	const levelSelect = this.add
		.text(xOffset - 20, yOffset, "Level Select", { fontSize: 48, fill: "#0f0" })
		.setInteractive();

	const goBack = this.add
		.text(width - 50, 30, "X", { fill: "#0f0" })
		.setInteractive()
		.on("pointerdown", () => {
			// game.scene.remove("LevelSelect");
			game.scene.stop("LevelSelect");
		});

	const clickClassic = this.add
		.text(xOffset, yOffset + 150, "Classic Pachinko", { fill: "#0f0" })
		.setInteractive()
		.on("pointerdown", () => {
			// game.scene.remove("LevelSelect");
			game.scene.start("Classic");
		});
	const clickSimple = this.add
		.text(xOffset, yOffset + 200, "Simple Pachinko", { fill: "#0f0" })
		.setInteractive()
		.on("pointerdown", () => {
			// game.scene.remove("LevelSelect");
			game.scene.start("Simple");
		});
}
function Update() {}

// Add scene to list of scenes
myGame.scenes.push(levelSelectState);
