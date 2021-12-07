var SimplePachinkoState = new Phaser.Class({
	// Define scene
	Extends: Phaser.Scene,
	initialize: function SimplePachinko() {
		Phaser.Scene.call(this, { key: "Simple" });
	},

	preload: Preload,
	create: Create,
	update: Update,
});
var dings = [];
var winDings = [];
var hitDings = [];
var ding;
var cols = 7;
var rows = 11;
var spacing = width / cols;
var offsetY = 50;
var pegs;
var keySpace;
var cursorKeys;
var winning;
var boxes = [];
var isBallReleased = false;
var winningheight = 35;
var score = 0;
var timedEvent;
var text;
var ballcountertext;
var ballcounter = 5;
var gameover = false;
var gameovertext;
var gameovertext2;

function Preload() {
	// Preload images for this state
	ballcounter = 5;
	score = 0;
	gameover = false;
	// this.load.setBaseURL("https://labs.phaser.io");

	// this.load.image("bg5", "assets/skies/gradient9.png");

	// this.load.image("ball", "assets/sprites/pangball.png");
	// this.load.image("peg", "assets/sprites/orb-red.png");

	// this.load.image("logo", "assets/sprites/slime.png");
	// this.load.image("peg2", "assets/particles/green-orb.png");
	// this.load.image("score10", "assets/particles/blue.png");
	// this.load.image("score20", "assets/particles/yellow.png");
	// this.load.image("score15", "assets/particles/red.png");

	// this.load.setPath("../../assets/Scene_Assets/");
	this.load.setPath("../../MoChinko/assets/Scene_Assets/");
	this.load.image("close-btn", "delete.png");
	this.load.image("bg5", "Background/gradient2.png");
	this.load.image("ball", "pangball.png");
	this.load.image("peg", "orbred.png");

	this.load.audio("ding0", "Audio/star-collect.mp3");
	this.load.audio("ding1", "Audio/pop-ding.mp3");
	this.load.audio("ding2", "Audio/pop-ding-2.mp3");
	this.load.audio("ding3", "Audio/swoosh-ding.mp3");

	this.load.audio("hit0", "Audio/box-hit-1.mp3");
	this.load.audio("hit1", "Audio/box-hit-2.mp3");
	this.load.audio("hit2", "Audio/box-hit-3.mp3");

	this.load.image("score10", "score10.png");
	this.load.image("score15", "score15.png");
	this.load.image("score20", "score20.png");
}

function Create() {
	// Create objects
	console.log("Simple Pachinko");
	// let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg5");
	// let scaleX = this.cameras.main.width / image.width;
	// let scaleY = this.cameras.main.height / image.height;
	// let scale = Math.max(scaleX, scaleY);
	// image.setScale(scale).setScrollFactor(0);

	loadBackground(this, "bg5");

	// let closeButton = this.add.text(width - 50, 30, "X", { fill: "#0f0" });
	// closeButton.setScale(0.08);
	// closeButton.setInteractive(
	// 	new Phaser.Geom.Rectangle(0, 600, 700, 700),
	// 	Phaser.Geom.Rectangle.Contains
	// );
	// closeButton.on("pointerdown", () => {
	// 	game.scene.stop("Simple");
	// 	console.log("simple: close button clicked");
	// });
	// closeButton.on("pointerover", () => {
	// 	console.log("simple: close button hover");
	// });

	createCloseButton(this, "Simple");

	keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	cursorKeys = this.input.keyboard.createCursorKeys();
	text = this.add.text(10, 10, "Score: 0", { font: "32px Courier", fill: "#3333ff" });
	ballcountertext = this.add.text(10, 60, "Balls Left:" + ballcounter, {
		font: "28px Courier",
		fill: "#3333ff",
	});

	ball = this.physics.add.sprite(width / 2, 30, "ball");
	ball.setScale(0.8);
	ball.setCollideWorldBounds(true);
	ball.setBounce(1.0, 0.75);
	ball.setVelocity(0);
	ball.body.setCircle(17);

	pegs = this.physics.add.staticGroup({
		key: "peg",
		frameQuantity: 0,
		setScale: { x: 1, y: 1 },
		collideWorldBounds: true,
		gridAlign: true,
	});
	for (let i = 0; i < 3; i++) {
		ding = this.sound.add("ding" + i);
		dings.push(ding);
	}
	ding = this.sound.add("ding3");
	winDings.push(ding);

	for (let i = 0; i < 3; i++) {
		ding = this.sound.add("hit" + i);
		hitDings.push(ding);
	}

	winning = this.physics.add.group({
		defaultKey: "score10",
		collideWorldBounds: true,
	});
	winning2 = this.physics.add.group({
		defaultKey: "score20",
		collideWorldBounds: true,
	});
	winning3 = this.physics.add.group({
		defaultKey: "score15",
		collideWorldBounds: true,
	});

	//added the plinko pieces, and offsetted it
	//variables are initialized on the top  --brian
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols + 1; j++) {
			let x = j * spacing;
			if (i % 2 == 0) {
				x += spacing / 2;
			}
			let y = spacing + i * spacing;
			pegs.create(x, y + offsetY, "peg").body.setCircle(11);
		}
	}

	var particles = this.add.particles("red");

	// need to add collision box --brian
	var numBoxes = width / 8;
	var b = this.add.rectangle(width / 2, height + 40, width, 100, 0x79ff33);
	boxes.push(b);
	for (var i = 0; i < numBoxes; i++) {
		var x = i * numBoxes;
		var h = 80;
		var w = 10;
		var y = height - h / 2;
		b = this.add.rectangle(x, y, w, h, 0x79ff33);
		this.physics.add.existing(b);
		b.body.setCollideWorldBounds(true);
		b.body.setImmovable();
		boxes.push(b);
	}

	winning3.create(35, height - winningheight).setScale(0.35);
	winning.create(95, height - winningheight).setScale(0.35);
	winning.create(160, height - winningheight).setScale(0.35);
	winning2.create(225, height - winningheight).setScale(0.35);
	winning2.create(289, height - winningheight).setScale(0.35);
	winning.create(351, height - winningheight).setScale(0.35);
	winning.create(415, height - winningheight).setScale(0.35);
	winning3.create(477, height - winningheight).setScale(0.35);

	gameovertext = this.add.text(60, height / 2, "Game Over!", {
		font: "65px Courier",
		fill: "#FF0000",
		stroke: "#000",
		strokeThickness: 10,
	});
	gameovertext2 = this.add.text(50, 700, "   Check \nLeaderBoard!", {
		font: "50px Courier",
		fill: "#FF0000",
		stroke: "#000",
		strokeThickness: 10,
	});

	gameovertext.setVisible(false);
	gameovertext2.setVisible(false);

	pegs.refresh();

	this.physics.add.collider(ball, pegs, function () {
		let rand = Math.floor(Math.random() * dings.length);
		dings[rand].play();
	});
	this.physics.add.collider(ball, boxes, function () {
		let rand = Math.floor(Math.random() * hitDings.length);
		hitDings[rand].play();
	});

	this.physics.add.overlap(ball, winning, overlapscore);
	this.physics.add.overlap(ball, winning2, overlapscore2);
	this.physics.add.overlap(ball, winning3, overlapscore3);
}

function Update() {
	text.setText("Score: " + score);
	ballcountertext.setText("Balls Left:" + ballcounter);
	if (!gameover) {
		if (keySpace.isDown) {
			if (!isBallReleased) {
				ball.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(5, width));
				ball.setGravityY(200);
				isBallReleased = true;
				console.log("spacebar");
			}
		}
		if (cursorKeys.left.isDown) {
			if (!isBallReleased) {
				ball.setVelocityX(-60);
				console.log("left key");
			}
		}
		if (cursorKeys.right.isDown) {
			if (!isBallReleased) {
				ball.setVelocityX(60);
				console.log("right key");
			}
		}

		if (!(cursorKeys.left.isDown || cursorKeys.right.isDown)) {
			if (!isBallReleased) {
				ball.setVelocityX(0);
			}
		}
	}
	if (gameover) {
		gameovertext.setVisible(true);
		gameovertext2.setVisible(true);

		pegs.setVisible(false);
	}
}

function overlapscore(ball, winning) {
	let rand = Math.floor(Math.random() * winDings.length);
	winDings[rand].play();
	winning.body.enable = false;
	score += 10;
	resetball();
	winning.body.enable = true;
}

function overlapscore2(ball, winning2) {
	let rand = Math.floor(Math.random() * winDings.length);
	winDings[rand].play();
	winning2.body.enable = false;
	score += 20;
	resetball();
	winning2.body.enable = true;
}
function overlapscore3(ball, winning3) {
	let rand = Math.floor(Math.random() * winDings.length);
	winDings[rand].play();
	winning3.body.enable = false;
	score += 15;
	resetball();
	winning3.body.enable = true;
}

function resetball() {
	ball.setPosition(width / 2, 30);
	isBallReleased = false;
	ball.setBounce(1.0, 0.7);
	ball.setVelocity(0);
	ball.setGravityY(0);
	ballcounter--;
	if (ballcounter <= 0) {
		addScoreToLeaderboard(1, score);
		gameover = true;
	}
}
// Add scene to list of scenes
myGame.scenes.push(SimplePachinkoState);
