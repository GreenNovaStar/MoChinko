var ClassicPachinkoState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function ClassicPachinko() {
		Phaser.Scene.call(this, { key: "Classic" });
	},

	preload: function () {
		// Preload images for this state
		// this.load.setBaseURL("https://labs.phaser.io");

		// this.load.image("bg4", "assets/skies/gradient8.png");
		this.load.setPath("../../assets/Scene Assets/");
		this.load.image("close-btn", "delete.png");
		this.load.image("bg8", "Background/gradient8.png");
	},

	create: function () {
		// Create objects
		console.log("Classic Pachinko");
		// let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg8");
		// let scaleX = this.cameras.main.width / image.width;
		// let scaleY = this.cameras.main.height / image.height;
		// let scale = Math.max(scaleX, scaleY);
		// image.setScale(scale).setScrollFactor(0);

		loadBackground(this, "bg8");

		// let closeButton = this.add.image(width - 50, 50, "close-btn");
		// closeButton.setScale(0.08);
		// closeButton.setInteractive(
		// 	new Phaser.Geom.Rectangle(0, 600, 700, 700),
		// 	Phaser.Geom.Rectangle.Contains
		// );
		// closeButton.on("pointerdown", () => {
		// 	game.scene.stop("Classic");
		// });
		// closeButton.on("pointerover", () => {});

		createCloseButton(this, "Classic");
	},

	update: function () {
		// Update objects & variables
	},
});

// Add scene to list of scenes
myGame.scenes.push(ClassicPachinkoState);
