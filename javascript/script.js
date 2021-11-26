//import  'phaser';
var width = 512;
var height = 1024;
var ball;
var logo;
var Phaser;
var pegs;
var keySpace;
var cursorKeys;
var winning;
var boxes = [];
// ball attributes

//peg attributes
//# of pegs per row/col
var cols = 5;
var rows = 7;
var spacing = width / cols;
var offsetY = 50;

var config = {
	type: Phaser.AUTO,
	width: width,
	height: height,
	parent: "game-window",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 200 },
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

	winning = this.physics.add.group({
		defaultKey: "score1",
		collideWorldBounds: true,
	});

	// for (let i = 0; i < 75; i++) {
	// 	pegs
	// 		.create(Phaser.Math.Between(0, width), Phaser.Math.Between(200, height - 100), "peg")
	// 		.body.setCircle(10);
	// }

	//added the plinko pieces, and offsetted it
	//variables are initialized on the top  --brian
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let x = j * spacing;
			if (i % 2 == 0) {
				x += spacing / 2;
			}
			let y = spacing + i * spacing;
			pegs.create(x, y + offsetY, "peg").body.setCircle(10);
		}
	}

	winning.create(200, height - 50).setScale(0.5);
	winning.create(450, height - 50).setScale(0.5);
	winning.create(300, height - 50).setScale(0.5);
	winning.create(50, height - 50).setScale(0.5);

	var particles = this.add.particles("red");

	// boxes = this.add.rectangle(0, height, 50, 200, 0xff0000);
	var b = this.add.rectangle(width / 2, height + 150, width, 100, 0xff0000);
	boxes.push(b);
	for (var i = 0; i < cols + 2; i++) {
		var x = i * spacing;
		var h = 80;
		var w = 10;
		var y = height - h / 2;
		var b = this.add.rectangle(x, y, w, h, 0xff0000);
		boxes.push(b);
	}

	/*
		var b = new Boundary(width / 2, height + 50, width, 100);
		bounds.push(b);

		for (var i = 0; i < cols + 2; i++) {
			var x = i * spacing;
			var h = 100;
			var w = 10;
			var y = height - h / 2;
			var b = new Boundary(x, y, w, h);
			bounds.push(b);
		}
		}
	*/
	ball = this.physics.add.sprite(width / 2, 30, "ball");
	ball.setScale(1.0);
	ball.setCollideWorldBounds(true);
	ball.setBounce(1.0, 1.0);
	ball.setVelocity(0);
	ball.body.setCircle(18);

	logo = this.physics.add.image(256, 256, "logo");
	logo.setScale(0.5); //change the size of the image (1 == default, smaller # is smaller image, larger # is larger image)

	logo.setVelocity(100, 200); //(x,y)
	logo.setBounce(0.7, 0.7); //(x,y) (1 is max, meaning it keeps the same velocity, lower will make it bounch less )
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
