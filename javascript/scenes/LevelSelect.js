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
	this.load.setPath("../../MoChinko/assets/Scene_Assets/");
	this.load.image("close-btn", "delete.png");
	this.load.image("bg3", "Background/gradient3.png");
	this.load.image("classic", "Temp Assets/blocka.png");
	this.load.image("simple", "Temp Assets/blockb.png");
	this.load.image("ball-sprite", "medicine-ball.png");
	this.load.spritesheet("shift-balls", "Temp Assets/balls.png", {
		frameHeight: 17,
		frameWidth: 17,
	});
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

	const levelSelectTitle = this.add.text(30, 30, "Level Select", { fontSize: 48, fill: "#0f0" });

	// create a close button and its functionality
	createCloseButton(this, "LevelSelect");

	// create a classic pachinko selector
	let ClassicPachinko = this.add.image(xOffset + 50, yOffset + 150, "classic");
	ClassicPachinko
		.setInteractive
		// new Phaser.Geom.Rectangle(0, 60, 65, 65),
		// Phaser.Geom.Rectangle.Contains
		();
	ClassicPachinko.on("pointerdown", () => {
		game.scene.start("Classic");
		// console.log("play game button");
	});
	ClassicPachinko.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.play("change-color");
		hoverball.x = ClassicPachinko.x - 80;
		hoverball.y = ClassicPachinko.y;
	});
	ClassicPachinko.on("pointerout", () => {
		hoverball.setVisible(false);
	});

	// create simple pachinko selector
	let SimplePachinko = this.add.image(xOffset + 50, yOffset + 250, "simple");
	SimplePachinko
		.setInteractive
		// new Phaser.Geom.Rectangle(0, 60, 65, 65),
		// Phaser.Geom.Rectangle.Contains
		();
	SimplePachinko.on("pointerdown", () => {
		game.scene.start("Simple");
		// console.log("play game button");
	});
	SimplePachinko.on("pointerover", () => {
		hoverball.setVisible(true);
		hoverball.play("change-color");
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
