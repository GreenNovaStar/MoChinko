function loadBackground(game, key) {
	//scale background image to fit the width
	let image = game.add.image(game.cameras.main.width / 2, game.cameras.main.height / 2, key);
	let scaleX = game.cameras.main.width / image.width;
	let scaleY = game.cameras.main.height / image.height;
	let scale = Math.max(scaleX, scaleY);
	image.setScale(scale).setScrollFactor(0);
}

function loadLeaderboardScores(gameIndex) {
	var scoreList = "";
	for (let i = 0; i < gameScores[gameIndex].length; i++) {
		if (i + 1 < 10) scoreList += " " + (i + 1) + ". " + gameScores[gameIndex][i] + "\n";
		else scoreList += i + 1 + ". " + gameScores[gameIndex][i] + "\n";
	}

	if (scoreList == "") scoreList = "No Scores Recorded.";
	return scoreList;
}

function createCloseButton(game, sceneName) {
	let closeButton = game.add.image(width - 50, 50, "close-btn");
	closeButton.setScale(0.08);
	closeButton.setInteractive(
		new Phaser.Geom.Rectangle(0, 600, 700, 700),
		Phaser.Geom.Rectangle.Contains
	);
	closeButton.on("pointerdown", () => {
		game.scene.stop(sceneName);
	});
	closeButton.on("pointerover", () => {});
}
