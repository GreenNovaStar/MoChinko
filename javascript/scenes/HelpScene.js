var HelpState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function Help() {
		Phaser.Scene.call(this, { key: "Help" });
	},

	preload: function () {
		// Preload images for this state
		// this.load.setBaseURL("https://labs.phaser.io");

		// this.load.image("bg7", "assets/skies/gradient7.png");
		this.load.setPath("../../assets/Scene Assets/");
		this.load.image("close-btn", "delete.png");
		this.load.image("bg7", "Background/gradient7.png");
	},

	create: function () {
		// Create objects
		console.log("Help");
		// let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg7");
		// let scaleX = this.cameras.main.width / image.width;
		// let scaleY = this.cameras.main.height / image.height;
		// let scale = Math.max(scaleX, scaleY);
		// image.setScale(scale).setScrollFactor(0);

		loadBackground(this, "bg7");

		const help = this.add.text(30, 30, "Help/Controls", { fontSize: 48, fill: "#0f0" });

		let closeButton = this.add.image(width - 50, 50, "close-btn");
		closeButton.setScale(0.08);
		closeButton.setInteractive(
			new Phaser.Geom.Rectangle(0, 600, 700, 700),
			Phaser.Geom.Rectangle.Contains
		);
		closeButton.on("pointerdown", () => {
			game.scene.stop("Help");
		});
		closeButton.on("pointerover", () => {});
	},

	update: function () {
		// Update objects & variables
	},
});

// Add scene to list of scenes
myGame.scenes.push(HelpState);
