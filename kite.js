var windspeed1='',
	windspeed2='',
	windspeed3='',
	windspeed4='',
	windspeed5=''

	function ordinal_suffix_of(i) {
			var j = i % 10,
					k = i % 100;
			if (j == 1 && k != 11) {
					return i + "st";
			}
			if (j == 2 && k != 12) {
					return i + "nd";
			}
			if (j == 3 && k != 13) {
					return i + "rd";
			}
			return i + "th";
	}


	function reqListener () {
	  console.log(this.responseText);

		var wind=JSON.parse(this.responseText);

		wind = wind.toString();
		wind=JSON.parse(wind);

		console.log('wind',wind);

	 windspeed1=wind[0]+" "+wind[1]+"-"+wind[2]+wind[3];
	 windspeed2=wind[4]+" "+wind[5]+"-"+wind[6]+wind[7];
	 windspeed3=wind[8]+" "+wind[9]+"-"+wind[10]+wind[11];
	 windspeed4=wind[12]+" "+wind[13]+"-"+wind[14]+wind[15];
	 windspeed5=wind[16]+" "+wind[17]+"-"+wind[18]+wind[19];
	 windspeed1 = windspeed1.split("/");
	 windspeed2 = windspeed2.split("/");
	 windspeed3 = windspeed3.split("/");
	 windspeed4 = windspeed4.split("/");
	 windspeed5 = windspeed5.split("/");

var today = ordinal_suffix_of(windspeed1[0]);

	 document.getElementById("replace").innerHTML = "today "+today+"<br><br>"+windspeed1[1]+"<br><br>"+windspeed2[1]+"<br><br>"+windspeed3[1]+"<br><br>"+windspeed4[1]+"<br><br>"+windspeed5[1];

	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", "https://foweexlbzi.execute-api.ap-southeast-2.amazonaws.com/Stage/wind", true);
	oReq.send();



window.addEventListener('resize', resize, false);
//canvas init
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
var myintervalid;


function resize() {
	clearInterval(myintervalid);

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	W = window.innerWidth;
	H = window.innerHeight;

	console.log('resized',W,H);
	bubbles();
}

function bubbles() {

	//canvas dimensions

	canvas.width = W;
	canvas.height = H;


	//drink bubbles
	var mp = 250,
	airbubbles = [],
	x=0,
	y=0,
	r=0,
	d=0,
	p=0


	for(var i = 0; i < mp; i++)
	{
		airbubbles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*7+1, //radius
			d: Math.random()*mp //density
		})
	}
	console.log ('bubbles');

	//Lets draw the bubbles
	function draw()
	{
		ctx.clearRect(0, 0, W, H);

		ctx.fillStyle = "rgba(0,0,0,.1)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = airbubbles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}


	function update()
	{
		for(var i = 0; i < mp; i++)
		{
			var p = airbubbles[i];

			p.y += 1 - 2 - p.r/2;
			if(p.x > W+5 || p.x < -5 || p.y < 0)
			{

					airbubbles[i] = {x: Math.random()*W, y: H, r: p.r, d: p.d};

			}
		}
	}
	myintervalid = setInterval(draw, 30);
}
resize();
//bubbles();
