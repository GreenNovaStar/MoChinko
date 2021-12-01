var HelpState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function Help() {
		Phaser.Scene.call(this, { key: "Help" });
	},

	preload: function () {
		// Preload images for this state
		this.load.setBaseURL("https://labs.phaser.io");

		this.load.image("bg7", "assets/skies/gradient7.png");
	},

	create: function () {
		// Create objects
		console.log("Help");
		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg7");
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);

		const goBack = this.add
			.text(width - 50, 30, "X", { fill: "#0f0" })
			.setInteractive()
			.on("pointerdown", () => {
				// game.scene.remove("LevelSelect");
				game.scene.stop("Help");
			});
	},

	update: function () {
		// Update objects & variables
	},
});

// Add scene to list of scenes
myGame.scenes.push(HelpState);
