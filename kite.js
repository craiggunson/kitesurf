var canvas,
	context,
	particles,
	particleColor = "rgba(0, 0, 0,.1)",
	particleDensity = 20,
	motionBlur = true, //Motion blur effect on or off
	particleSize = window.innerHeight/20,
	collisionDetection = false, //collision effect on or off, this may degrade performance after set to true
  windspeed1='',
	windspeed2='',
	windspeed3='',
	windspeed4='',
	windspeed5=''


	$.get({
		url: "https://foweexlbzi.execute-api.ap-southeast-2.amazonaws.com/Stage/wind",
		async: false,
		timeout: 7000,
		error: function(){
						console.log("no wind data");
						return true;
				},
		success: function(responseData,status) {

		var wind=JSON.parse(responseData);
		//console.log('wind',wind);

	 windspeed1=wind[0]+" "+wind[1]+"~"+wind[2]+" "+wind[3];
	 windspeed2=wind[4]+" "+wind[5]+"~"+wind[6]+" "+wind[7];
	 windspeed3=wind[8]+" "+wind[9]+"~"+wind[10]+" "+wind[11];
	 windspeed4=wind[12]+" "+wind[13]+"~"+wind[14]+" "+wind[15];
	 windspeed5=wind[16]+" "+wind[17]+"~"+wind[18]+" "+wind[19];
	 windspeed1 = windspeed1.split("/");
	 windspeed2 = windspeed2.split("/");
	 windspeed3 = windspeed3.split("/");
	 windspeed4 = windspeed4.split("/");
	 windspeed5 = windspeed5.split("/");

}});


function init(windspeed1,windspeed2,windspeed3,windspeed4,windspeed5) {
	console.log (windspeed1);
	console.log (windspeed2);
	console.log (windspeed3);
	console.log (windspeed4);
	console.log (windspeed5);


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

function moveParticle(windspeed1,windspeed2,windspeed3,windspeed4,windspeed5) {
	if (motionBlur) {
		//motion effect is on
		context.fillStyle = "rgba(255, 255, 0,1)";
		context.fillRect(0, 0, canvas.width, canvas.height);

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
		context.arc(this.posX, this.posY, particleSize, Math.PI * 2, false);
		context.fill();

		//context.fillRect(this.posX, this.posY, this.posX/2, this.posY/2);
		context.fillStyle = "rgba(0, 0, 0,.03)";
		context.textAlign = 'center';

		var fontsize = canvas.height/20
		context.font = 'normal '+fontsize+'px Courier New';

		context.fillText(windspeed1[0],canvas.width/2,canvas.height/2-(fontsize*5));

		context.fillText(windspeed1[1],canvas.width/2,canvas.height/2-(fontsize*3));
		context.fillText(windspeed2[1],canvas.width/2,canvas.height/2-(fontsize*2));
		context.fillText(windspeed3[1],canvas.width/2,canvas.height/2-(fontsize));
		context.fillText(windspeed4[1],canvas.width/2,canvas.height/2);
		context.fillText(windspeed5[1],canvas.width/2,canvas.height/2+(fontsize));


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
init(windspeed1,windspeed2,windspeed3,windspeed4,windspeed5);
