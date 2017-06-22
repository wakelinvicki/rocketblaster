BasicGame.Game = function (game) {};

//Graphical Object
var ship;
var ufos;
var lives;

var bullets; //Bullets which your spaceship fires
var fireRate = 100; //Ratte at which bullets are fired
var nextFire = 0;

//Misc Variables
var cursors; //Keyboard control

BasicGame.Game.prototype = {

	create: function () {
		//Specifying the physics game engine to ARCADE
		this.physics.startSystem(Phaser.Physics.ARCADE);
		//Adding the starfield, logo onto the screen
		this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
		//Adding the ship onto the screen, set the physics and the boundaries
		ship = this.add.sprite((this.world.width / 2), this.world.height -50, 'ship');
		ship.anchor.setTo(0.5,0);
		this.physics.enable(ship, Phaser.Physics.ARCADE);
		ship.body.collideWorldBounds = true;

		ufos = this.add.group();
		this.physics.enable(ufos, Phaser.Physics.ARCADE);

		ufos.setAll('outOfBoundsKill', true);
		ufos.setAll('checkWorldBounds', true);
		ufos.setAll('anchor.x' 0.5);
		ufos.setAll('anchor.y', 0.5;)

		lives = this.add.group();
 		this.physics.enable(lives, Phaser.Physics.ARCADE);

		lives.setAll('outOfBoundsKill', true);
		lives.setAll('checkWorldBounds', true);
		lives.setAll('anchor.x', 0.5);
		lives.setAll('anchor.y', 0.5);

		//Create the bullets group, set the physics, multiples and boundaries
		bullets = this.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet', 0, false);
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

			//Setting the keyboard to accept LEFT, RIGHT, and SPACE input
			this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
			cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		//execute 'createUfo' , 'createLife' , 'moveShip' , 'collisionDetection' function
		this.createUfo();
		this.createLife();
		this.moveShip();
	},

	//moves ship and fires bullets from keyboard controls
	moveShip: function () {
		//if left arrow key pressed player move left
		if (cursors.left.isDown) {
			//move to left
			ship.body.velocity.x = -200;
		}
		//if right arrow key pressed move right
		else if (cursors.right.isDown) {
			ship.body.velocity.x = 200;
		}
		//else stop ship
		else {
			ship.body.velocity.x = 0;
		}
		//if space bar is pressed execute the 'fireBullet' function
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.fireBullet();
		}
	},

	createUfo: function () {
		var random = this.rnd.integerInRange(0, 20);
		if (random === 0) {
			var randomX = this.rnd.integerInRange(0, this.world.width - 150);
			var ufo = ufos.create(randomX, -50, 'ufo');
			this.physics.enable(ufo, Phaser.Physics.ARCADE);
			ufo.body.velocity.y = this.rnd.integerInRange(100, 600);
		}
	},

	createLife: function () {
		var random = this.rnd.integerInRange(0, 500);
		if (random ===0) {
			var randomX = this.rnd.integerInRange(0, this.world.width - 150);
			var life - lives.create(randomX, -50, 'life');
			this.physics.enable(life, Phaser.Physics.ARCADE);
			life.body.velocity.y = 150;
		}
	},

	//Generate bullet and position in the x axis, set the velocity and play the audio
	fireBullet: function () {
		if (this.time.now > nextFire && bullets.countDead() > 0) {
			nextFire = this.time.now + fireRate;
			var bullet = bullets.getFirstExists(false);
			bullet.reset(ship.x, ship.y);
			bullet.body.velocity.y = -400;
		}
	}

};
