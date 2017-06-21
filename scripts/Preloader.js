var BasicGame = {};

BasicGame.Preloader = function (game) {
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
		//Displays a loading screen message while the assets are loaded into memory
		this.preloadText = this.add.text(this.world.centerX, this.world.centerY, 'Loading...', {
			fontSize: '96px',
			fill: '#fff',
			align: 'center'
		});
		this.preloadText.anchor.setTo(0.5, 0.5);

		//preload the images, sprites and audio assets into memory
		this.load.image('logo', 'assets/logo.png');
		this.load.image('starfield', 'assets/background.png');
		this.load.image('startButton', 'assets/startButton.png');
		this.load.image('ship', 'assets/goku.png');
		this.load.image('bullet', 'assets/kiBlast.png');
	},

	create: function () {

	},

	update: function () {

		this.game.state.start('MainMenu');
	}

};
