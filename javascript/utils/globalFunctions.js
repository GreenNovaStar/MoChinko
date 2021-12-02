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

function addScoreToLeaderboard(gameIndex, score) {
	var selectedGameScores = gameScores[gameIndex];
	if (gameScores[gameIndex].length < 10) {
		gameScores[gameIndex].push(score);
		gameScores[gameIndex].sort(function (a, b) {
			return b - a;
		});
	} else {
		gameScores[gameIndex][9] = score;
		gameScores[gameIndex].sort(function (a, b) {
			return b - a;
		});
	}
}

/*
var storeBestTimes = function() {
  let currentTime = minutes * 6000 + seconds * 100 + milliseconds;
  if (bestTimes[test].length < 3) {
    bestTimes[test].push([currentTime]);
    bestTimes[test].sort(function(a, b) {
      return a - b;
    });
  } else if (bestTimes[test][2] > 0 && bestTimes[test][2] != -1) {
    console.log(
      "minutes = " + minutes < 10
        ? "0" + minutes
        : minutes + "\nseconds = " + seconds < 10
        ? "0" + seconds
        : seconds + "\nmilli = " + milliseconds < 10
        ? "0" + milliseconds
        : milliseconds
    );
    if (bestTimes[test].length > 2) {
      let time = bestTimes[test][2];

      if (currentTime < time) {
        bestTimes[test][2] = currentTime;
        bestTimes[test].sort(function(a, b) {
          return a - b;
        });
      }
    }
  } else {
    bestTimes[test][2] = currentTime;
    bestTimes[test].sort(function(a, b) {
      return a - b;
    });
  }

  // else{
  //   bestTimes[test].push([currentTime]);
  //   bestTimes[test].sort(function(a, b){return a - b});
  // }
  fillLeaderBoard();
  console.log(bestTimes);
};*/
