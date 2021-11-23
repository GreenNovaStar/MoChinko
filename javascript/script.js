var width = 512;
var height = 1024;

var config = {
	type: Phaser.AUTO,
	width: width,
	height: height,
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
	},
};

var game = new Phaser.Game(config);

//phaser asset url : https://labs.phaser.io/assets/
function preload() {
	// this.load.setBaseURL("https://labs.phaser.io");
	this.load.setPath("../assets");
	// this.load.image("ball", "assets/sprites/spikedball.png");
	this.load.image("logo", "Animal_1.png");
	this.load.image("sky", "assets/skies/starfield.png");
	// this.load.image("logo", "assets/sprites/slime.png");
	this.load.image("red", "assets/particles/green-orb.png");
}

function create() {
	this.add.image(256, 256, "sky");

	var particles = this.add.particles("red");

	var emitter = particles.createEmitter({
		speed: 100,
		scale: { start: 0.5, end: 0 },
		blendMode: "ADD",
	});
	var ball = this.physics.add.image(width / 2, 20, "ball");
	ball.setScale(0.5);

	var logo = this.physics.add.image(256, 256, "logo");
	logo.setScale(0.5); //change the size of the image (1 == default, smaller # is smaller image, larger # is larger image)

	logo.setVelocity(100, 200); //(x,y)
	logo.setBounce(0.5, 0.9); //(x,y) (1 is max, meaning it keeps the same velocity, lower will make it bounch less )
	logo.setCollideWorldBounds(true);

	emitter.startFollow(logo);
}

function logKey(space) {}
