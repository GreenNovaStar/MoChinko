//import  'phaser';
//screen attributes
var width = 512;
var height = 1024;
//declare the ball, logo pegs and keys, winning pegs
var ball;
var logo;
var Phaser;
var pegs;
var keySpace;
var cursorKeys;
var winning;
var boxes = [];
var isBallReleased = false;
var winningheight = 35;
var score = 0;
var timedEvent;

// ball attributes
//html valuse
var text;
//var scores = document.getElementById("score-value");

//peg attributes
//# of pegs per row/col
var cols = 7;
var rows = 11;
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
			gravity: { y: 0 },
			debug: false,
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
	// this.load.setPath("../assets/");
	// this.load.image("ball", "Animal_1.png");
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
	text = this.add.text(10, 10, 'Score: 0', { font: '32px Courier', fill: '#3333ff' });

	this.add.image(width / 2, height / 2, "sky");
	ball = this.physics.add.sprite(width / 2, 30, "ball");
	ball.setScale(.8);
	ball.setCollideWorldBounds(true);
	ball.setBounce(1.0, 0.8);
	ball.setVelocity(0);
	ball.body.setCircle(17); 

	
	pegs = this.physics.add.staticGroup({
		key: "peg",
		frameQuantity: 0,
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
	var b = this.add.rectangle(width / 2, height + 40, width, 100, 0x79FF33);
	boxes.push(b);
	for (var i = 0; i < numBoxes; i++)
	 {

		var x = i * numBoxes;
		var h = 80;
		var w = 10;
		var y = height - h / 2;
		b = this.add.rectangle(x, y, w, h, 0x79FF33);
		this.physics.add.existing(b);
		b.body.setCollideWorldBounds(true);
		b.body.setImmovable();
		boxes.push(b);
	}

    winning.create(35, height - winningheight).setScale(0.35);
	winning.create(95, height - winningheight).setScale(0.35);
	winning.create(160, height - winningheight).setScale(0.35);
    winning.create(225, height - winningheight).setScale(0.35);
    winning.create(289, height - winningheight).setScale(0.35);
	winning.create(351, height - winningheight).setScale(0.35);
	winning.create(415, height - winningheight).setScale(0.35);
	winning.create(477, height - winningheight).setScale(0.35);

	pegs.refresh();

	this.physics.add.collider(ball, pegs);
	this.physics.add.collider(ball, boxes);

	this.physics.add.overlap(ball, winning, overlapscore);
	
	
	
	
}
function update() 
{
	text.setText('Score: ' + score);
	if (keySpace.isDown) 
	{
		if(!isBallReleased)
        {
			ball.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(5, width));
            ball.setGravityY(200);
            isBallReleased = true;
            console.log("spacebar");
        }
    }
    if (cursorKeys.left.isDown) 
    {
		if(!isBallReleased)
        {
			ball.setVelocityX(-200);
            console.log("left key");
        }
    }
    if (cursorKeys.right.isDown) 
	{
		if(!isBallReleased)
        {
			ball.setVelocityX(200);
            console.log("right key");
        }
    }
	
    if (!(cursorKeys.left.isDown || cursorKeys.right.isDown))
	{
		if(!isBallReleased)
        {
			ball.setVelocityX(0);
        }
	}
}

function overlapscore (ball, winning)
{
	
	winning.body.enable = false;
	score += 10;
	resetball();
	
	
	
}

function resetball()
{	
	ball.setPosition(width / 2, 30);
	isBallReleased = false;
	ball.setBounce(1.0, 0.8);
	ball.setVelocity(0);
	ball.setGravityY(0);
	
	


 }
 
