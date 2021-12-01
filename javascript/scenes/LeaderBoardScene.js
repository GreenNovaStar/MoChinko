var LeaderboardState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function Leaderboard() {
		Phaser.Scene.call(this, { key: "Leaderboard" });
	},

	preload: function () {
		// Preload images for this state
		this.load.setBaseURL("https://labs.phaser.io");

		this.load.image("bg6", "assets/skies/gradient6.png");
	},

	create: function () {
		// Create objects
		console.log("Leaderboard");
		let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg6");
		let scaleX = this.cameras.main.width / image.width;
		let scaleY = this.cameras.main.height / image.height;
		let scale = Math.max(scaleX, scaleY);
		image.setScale(scale).setScrollFactor(0);

		const goBack = this.add
			.text(width - 50, 30, "X", { fill: "#0f0" })
			.setInteractive()
			.on("pointerdown", () => {
				// game.scene.remove("LevelSelect");
				game.scene.stop("Leaderboard");
			});
	},

	update: function () {
		// Update objects & variables
	},
});

// Add scene to list of scenes
myGame.scenes.push(LeaderboardState);
