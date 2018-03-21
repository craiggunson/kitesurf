var canvas,
	context,
	particles,
	particleColor = "rgba(0, 0, 0,.1)",
	particleDensity = 20,
	motionBlur = true, //Motion blur effect on or off
	particleSize = window.innerHeight/100,
	collisionDetection = false;//collision effect on or off, this may degrade performance after set to true

function init() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d')
	context.scale(2,2);
	particles = new Array();

	setBoundary();
	window.addEventListener("resize", setBoundary, true); //when window resize resize cavas as well

	//Create particles

	for (var i = 0; i < particleDensity; i++) {
		particles.push(new particle());
	}

	requestAnimationFrame(moveParticle);
}

function setBoundary() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function moveParticle() {
	if (motionBlur) {
		//motion effect is on
		context.fillStyle = "rgba(255, 240, 0,1)";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgba(0, 0, 0,.4)";
		context.textAlign = 'center';
		var fontsize = canvas.height/15
		context.font = 'normal '+fontsize+'px sans-serif';
		context.fillText("speed1",canvas.width/2,canvas.height/2-(fontsize*3));
		context.fillText("speed2",canvas.width/2,canvas.height/2-(fontsize*2));
		context.fillText("speed3",canvas.width/2,canvas.height/2-(fontsize));
		context.fillText("speed4",canvas.width/2,canvas.height/2);
		context.fillText("speed5",canvas.width/2,canvas.height/2+(fontsize));

	} else {
		//if motion blur effect is off
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	for (i = 0; i < particleDensity; i++) {
		particles[i].move();
	}

	if (collisionDetection) {
		for (var i = 0; i < particleDensity; i++) {
			for (var j = i + 1; j < particleDensity; j++) {
				particles[i].detectCollision(particles[j]);
			}
		}
	}

	requestAnimationFrame(moveParticle);
}

function particle() {
	this.posX = Math.floor((Math.random() * window.innerWidth) + 1); //Current X position of a particle
	this.posY = Math.floor((Math.random() * window.innerHeight) + 1); //Current Y position of a particle
	this.speed = 1; //speed of particle
	this.velocityX = (Math.random() - 0.5) * this.speed; //x Direction
	this.velocityY = (Math.random() - 0.5) * this.speed; //Y direction
	this.color = particleColor;

	this.draw = function() {
		context.beginPath();
		context.fillStyle = this.color;
		//context.arc(this.posX, this.posY, particleSize, Math.PI * 2, false);
		context.fillRect(this.posX, this.posY, this.posX+particleSize, this.posY+particleSize);

		//context.fill();
	}

	this.move = function() {
		this.posX = (this.posX + this.velocityX);
		this.posY = (this.posY + this.velocityY);

		//if particle reached to max X
		if (this.posX >= (window.innerWidth - particleSize)) {
			this.velocityX *= -1;
		}
		//if particle reached to max y
		else if (this.posY >= (window.innerHeight - particleSize)) {
			this.velocityY *= -1;
		}
		//if particle reached to min x
		else if (this.posX <= particleSize) {
			this.velocityX *= -1;
		}
		//if particle reached to min y
		else if (this.posY <= particleSize) {
			this.velocityY *= -1;
		}

		this.draw();
	}

	this.findDistance = function(particle1) {
		//Finding distance between two particles
		//rootover diffrence between x cordinates and and y corndinates
		return Math.round(
			Math.sqrt(
				Math.pow(this.posX - particle1.posX, 2) +
				Math.pow(this.posY - particle1.posY, 2)
			)
		);
	}

	this.detectCollision = function(particle1) {

		var distance = this.findDistance(particle1);

		if ((distance <= 2 * particleSize)) {
			var x = this.velocityX;
			this.velocityX = particle1.velocityX;
			particle1.velocityX = x;
		}
	}
}

init();
