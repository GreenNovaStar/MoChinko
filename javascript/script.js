//import  'phaser';
var width = 512;
var height = 1024;
var ball;
var logo;
var Phaser;
var pegs;
var keySpace;
var cursorKeys;

// ball attributes

//peg attributes

var config = {
	type: Phaser.AUTO,
	width: width,
	height: height,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
};

var game = new Phaser.Game(config);

//phaser asset url : https://labs.phaser.io/assets/
function preload() {
	this.load.setBaseURL("https://labs.phaser.io");
	this.load.image("sky", "assets/skies/gradient13.png");
	this.load.image("ball", "assets/sprites/pangball.png");
	this.load.image("peg", "assets/sprites/orb-red.png");

	this.load.image("logo", "assets/sprites/slime.png");
	this.load.image("peg2", "assets/particles/green-orb.png");
	this.load.image("score1", "assets/particles/blue.png");
}

function create() {
	keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	cursorKeys = this.input.keyboard.createCursorKeys();

	this.add.image(width / 2, height / 2, "sky");
	pegs = this.physics.add.staticGroup({
		key: "peg",
		frameQuantity: 40,
		setScale: { x: 1, y: 1 },
		collideWorldBounds: true,
		gridAlign: true,
	});

	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");
	pegs.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg");

	// game.stage.backgroundColor = '#124184';

	var particles = this.add.particles("red");

	ball = this.physics.add.sprite(width / 2, 100, "ball");
	ball.setScale(1.0);
	ball.setCollideWorldBounds(true);
	ball.setBounce(0.5, 0.5);
	ball.setVelocity(0);
	ball.body.setCircle(18);

	logo = this.physics.add.image(256, 256, "logo");
	logo.setScale(0.5); //change the size of the image (1 == default, smaller # is smaller image, larger # is larger image)

	logo.setVelocity(100, 200); //(x,y)
	logo.setBounce(1, 1); //(x,y) (1 is max, meaning it keeps the same velocity, lower will make it bounch less )
	logo.setCollideWorldBounds(true);
	logo.body.setCircle(22);

	//pegs.body.setCircle(22);
	pegs.refresh();

	this.physics.add.collider(ball, pegs);
	this.physics.add.collider(logo, pegs);
}
function update() {
	if (keySpace.isDown) {
		ball.setVelocity(1000);
		console.log("spacebar");
	}
	if (cursorKeys.left.isDown) {
		ball.setVelocityX(-20);
		console.log("left key");
	}
	if (cursorKeys.right.isDown) {
		ball.setVelocityX(20);
		console.log("right key");
	}

	if (!(cursorKeys.left.isDown || cursorKeys.right.isDown)) {
		ball.setVelocityX(0);
	}
}

function collide() {}
