function loadBackground(key) {
	//scale background image to fit the width
	let image = game.add.image(game.cameras.main.width / 2, game.cameras.main.height / 2, key);
	let scaleX = game.cameras.main.width / image.width;
	let scaleY = game.cameras.main.height / image.height;
	let scale = Math.max(scaleX, scaleY);
	image.setScale(scale).setScrollFactor(0);
}
