var BasicGame = {};

BasicGame.Preloader = function (game) {
this.ready = false;
};

BasicGame.Preloader.prototype = {

preload: function () {
//Displays a loadng screen message while the assets are loaded into menory
this.preloaderText = this.add.text(this.world.centerX, this.world.centerY, 'Loading...', {
fontSize: '96px',
fill: '#fff',
align: 'center'
});
this.preloaderText.anchor.setTo(0.5, 0.5);

//preload the images, sprites and audio assets into memory
this.load.image('logo', 'assets/logo.png');
this.load.image('starfield', 'assets/background.png');
this.load.image('startButton', 'assets/startButton.png');
this.load.image('ship', 'assets/goku.png');
this.load.image('ufo', 'assets/frieza.png');
this.load.image('life', 'assets/dBall.png');
this.load.image('bullet', 'assets/bullet.png');
this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128, 16);
this.load.spritesheet('lifeAnimation', 'assets/lifeAnimation.png', 100, 100, 4);
this.load.audio('music', ['assets/music.m4a', 'assets/music.mp3']);
this.load.audio('bullet', ['assets/laser_human.mp3']);
this.load.audio('explosion', ['assets/explosion.mp3']);
},

create: function () {

},

update: function () {

// You don't actually need to do this, but I find it gives a much smoother game experience.
// Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
// You can jump right into the menu if you want and still play the music, but you'll have a few
// seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
// it's best to wait for it to decode here first, then carry on.

// If you don't have any music in your game then put the game.state.start line into the create function and delete
// the update function completely.

if (this.cache.isSoundDecoded('music') && this.ready == false) {
this.ready = true;
this.game.state.start('MainMenu');
}

}

};
