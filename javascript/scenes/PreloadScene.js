var preloadState = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function Preload() {
		Phaser.Scene.call(this, { key: "Preload" });
	},
	preload: function () {
		// Preload images for this state
		this.load.setBaseURL("https://labs.phaser.io");

		this.load.image("bg1", "assets/skies/gradient1.png");
	},

	create: function () {
		console.log("Preload");
		// let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg1");
		// let scaleX = this.cameras.main.width / image.width;
		// let scaleY = this.cameras.main.height / image.height;
		// let scale = Math.max(scaleX, scaleY);
		// image.setScale(scale).setScrollFactor(0);

		loadBackground(this, "bg1");

		game.scene.start("MainMenu");
	},
	update: function () {
		// Update objects & variables
	},
});

// Add scene to list of scenes
myGame.scenes.push(preloadState);
