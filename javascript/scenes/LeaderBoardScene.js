var LeaderboardState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function Leaderboard() {
		Phaser.Scene.call(this, { key: "Leaderboard" });
	},

	preload: Preload,
	create: Create,
	update: Update,
});

function Preload() {
	// Preload images for this state
	// this.load.setBaseURL("https://labs.phaser.io");

	// this.load.image("bg6", "assets/skies/gradient6.png");
	this.load.setPath("../../assets/Scene Assets/");
	this.load.image("close-btn", "delete.png");
	this.load.image("bg6", "Background/gradient6.png");
	this.load.image("arrow-left", "arrow_left.png");
	this.load.image("arrow-right", "arrow_right.png");
}

var gameIndex = 0;
var title;
var topScores;

function Create() {
	// Create objects
	console.log("Leaderboard");
	// let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg6");
	// let scaleX = this.cameras.main.width / image.width;
	// let scaleY = this.cameras.main.height / image.height;
	// let scale = Math.max(scaleX, scaleY);
	// image.setScale(scale).setScrollFactor(0);

	loadBackground(this, "bg6");

	const leaderboard = this.add.text(30, 30, "Leaderboard", { fontSize: 48, fill: "#0f0" });

	// let closeButton = this.add.image(width - 50, 50, "close-btn");
	// closeButton.setScale(0.08);
	// closeButton.setInteractive(
	// 	new Phaser.Geom.Rectangle(0, 600, 700, 700),
	// 	Phaser.Geom.Rectangle.Contains
	// );
	// closeButton.on("pointerdown", () => {
	// 	game.scene.stop("Leaderboard");
	// });
	// closeButton.on("pointerover", () => {});

	createCloseButton(this, "Leaderboard");

	//left arrow button
	let arrowLeftButton = this.add.image(50, 150, "arrow-left");
	arrowLeftButton.setScale(0.1);
	arrowLeftButton.setInteractive(
		new Phaser.Geom.Rectangle(0, 600, 525, 525),
		Phaser.Geom.Rectangle.Contains
	);
	arrowLeftButton.on("pointerdown", () => {
		if (gameIndex == 0) {
			gameIndex = gameNames.length - 1;
		} else {
			gameIndex--;
		}
	});
	arrowLeftButton.on("pointerover", () => {});

	//right arrow button
	let arrowRightButton = this.add.image(width - 50, 150, "arrow-right");
	arrowRightButton.setScale(0.1);
	arrowRightButton.setInteractive(
		new Phaser.Geom.Rectangle(0, 600, 525, 525),
		Phaser.Geom.Rectangle.Contains
	);
	arrowRightButton.on("pointerdown", () => {
		if (gameIndex == gameNames.length - 1) {
			gameIndex = 0;
		} else {
			gameIndex++;
		}
	});
	arrowRightButton.on("pointerover", () => {});

	title = this.add.text(width / 3.2, 130, "Classic", {
		fontSize: 48,
		fill: "#0f0",
	});

	topScores = this.add.text(50, 230, loadLeaderboardScores(gameIndex), {
		fontSize: 32,
		fill: "#0f0",
	});

	let addRandomScore = this.add.text(50, height - 100, "Add Random Score");
	addRandomScore.setInteractive(
		new Phaser.Geom.Rectangle(0, 50, 525, 525),
		Phaser.Geom.Rectangle.Contains
	);
	addRandomScore.on("pointerdown", () => {
		console.log("add random score click");
		addScoreToLeaderboard(Math.floor(Math.random() * 2), Math.floor(Math.random() * 50));
	});
	addRandomScore.on("pointerover", () => {
		console.log("add random score hover");
	});
}

function Update() {
	title.setText(gameNames[gameIndex]);
	topScores.setText(loadLeaderboardScores(gameIndex));
}

// Add scene to list of scenes
myGame.scenes.push(LeaderboardState);
