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

xOffset = 100;
yOffset = 100;

function Preload() {
	// this.load.setBaseURL("https://labs.phaser.io");

	// this.load.image("bg3", "assets/skies/gradient3.png");
	this.load.setPath("../../assets/Scene Assets/");
	this.load.image("close-btn", "delete.png");
	this.load.image("bg3", "Background/gradient3.png");
	this.load.image("classic", "Temp Assets/blocka.png");
	this.load.image("simple", "Temp Assets/blockb.png");
	this.load.image("ball-sprite", "medicine-ball.png");
}
function Create() {
	console.log("Level Select");
	// game.scene.start("GamePlay");
	// let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg3");
	// let scaleX = this.cameras.main.width / image.width;
	// let scaleY = this.cameras.main.height / image.height;
	// let scale = Math.max(scaleX, scaleY);
	// image.setScale(scale).setScrollFactor(0);

	loadBackground(this, "bg3");

	let hoverball = this.add.sprite(100, 100, "ball-sprite");
	hoverball.setScale(0.08);
	hoverball.setVisible(false);

	const levelSelectTitle = this.add.text(30, 30, "Level Select", { fontSize: 48, fill: "#0f0" });

	// create a close button and its functionality
	// let closeButton = this.add.image(width - 50, 50, "close-btn");
	// closeButton.setScale(0.08);
	// closeButton.setInteractive(
	// 	new Phaser.Geom.Rectangle(0, 600, 700, 700),
	// 	Phaser.Geom.Rectangle.Contains
	// );
	// closeButton.on("pointerdown", () => {
	// 	game.scene.stop("LevelSelect");
	// });
	// closeButton.on("pointerover", () => {});

	createCloseButton(this, "LevelSelect");

	// create a classic pachinko selector
	let ClassicPachinko = this.add.image(xOffset + 50, yOffset + 150, "classic");
	ClassicPachinko.setInteractive(
		new Phaser.Geom.Rectangle(0, 60, 65, 65),
		Phaser.Geom.Rectangle.Contains
	);
	ClassicPachinko.on("pointerdown", () => {
		game.scene.start("Classic");
		// console.log("play game button");
	});
	ClassicPachinko.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.x = ClassicPachinko.x - 80;
		hoverball.y = ClassicPachinko.y;
	});
	ClassicPachinko.on("pointerout", () => {
		hoverball.setVisible(false);
	});

	// create simple pachinko selector
	let SimplePachinko = this.add.image(xOffset + 50, yOffset + 250, "simple");
	SimplePachinko.setInteractive(
		new Phaser.Geom.Rectangle(0, 60, 65, 65),
		Phaser.Geom.Rectangle.Contains
	);
	SimplePachinko.on("pointerdown", () => {
		game.scene.start("Simple");
		// console.log("play game button");
	});
	SimplePachinko.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.x = SimplePachinko.x - 80;
		hoverball.y = SimplePachinko.y;
	});
	SimplePachinko.on("pointerout", () => {
		hoverball.setVisible(false);
	});
}
function Update() {}

// Add scene to list of scenes
myGame.scenes.push(levelSelectState);
