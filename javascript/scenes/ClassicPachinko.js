var ClassicPachinkoState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function ClassicPachinko() {
		Phaser.Scene.call(this, { key: "Classic" });
	},

	preload: function () {
		// Preload images for this state
		this.load.setBaseURL("https://labs.phaser.io");

		this.load.image("bg4", "assets/skies/gradient4.png");
	},

	create: function () {
		// Create objects
		console.log("Classic Pachinko");
		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg4");
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);

		const goBack = this.add
			.text(width - 50, 30, "X", { fill: "#0f0" })
			.setInteractive()
			.on("pointerdown", () => {
				// game.scene.remove("LevelSelect");
				game.scene.stop("Classic");
			});
	},

	update: function () {
		// Update objects & variables
	},
});

// Add scene to list of scenes
myGame.scenes.push(ClassicPachinkoState);
