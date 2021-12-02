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
		this.load.setPath("../../Mochinko/assets/Scene Assets/");
		this.load.image("close-btn", "delete.png");
		this.load.image("bg8", "Background/gradient8.png");
		this.load.image("blueball", "blue_ball.png");
	},

	create: function () {
		keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		cursorKeys = this.input.keyboard.createCursorKeys();
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

		ball = this.physics.add.sprite(10, height, "blueball");
		ball.setScale(2.0);
		ball.setCollideWorldBounds(true);
		ball.setBounce(1.0, 0.75);
		ball.setVelocity(0);
		ball.body.setCircle(9);
		var r3 = this.add.ellipse(width / 2, height / 2, width - 10, height / 2 + 150);

		r3.setStrokeStyle(10, 0xffffff);
	},

	update: function () {
		// Update objects & variables
	},
});

// Add scene to list of scenes
myGame.scenes.push(ClassicPachinkoState);
