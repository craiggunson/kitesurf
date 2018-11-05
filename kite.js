

var east='A',
southeast='B',
south='C',
southwest='D',
west='E',
northwest='F',
north='G',
northeast='H',
southsoutheast='C',
southsouthwest='C',
northnortheast='G',
northnorthwest='G',
westnorthwest='E',
westsouthweast='E',
eastnortheast='A',
eastsoutheast='A',
nowind='~'


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

		var i;
		for (i = 0; i < wind.length; i++) {
		    var check=wind[i];
			switch (check) {

				case 'E':
				wind[i] = east;
				break;

				case 'SE':
				wind[i] = southeast;
				break;

				case 'S':
				wind[i] = south;
				break;

				case 'SW':
				wind[i] = southwest;
				break;

				case 'W':
				wind[i] = west;
				break;

				case 'NW':
				wind[i] = northwest;
        break;

				case 'N':
				wind[i] = north;
				break;

				case 'NE':
				wind[i] = northeast;
				break;

				case 'SSE':
				wind[i] = southsoutheast;
				break;

				case 'SSW':
				wind[i] = southsouthwest;
				break;

				case 'NNE':
				wind[i] = northnortheast;
				break;

				case 'NNW':
				wind[i] = northnorthwest;
				break;

				case 'WNW':
				wind[i] = westnorthwest;
				break;

				case 'WSW':
				wind[i] = westsouthweast;
				break;

				case 'ENE':
				wind[i] = eastnortheast;
				break;

				case 'ESE':
				wind[i] = eastsoutheast;
        break;

				case 'CALM':
				wind[i] = nowind;
				break;

		}
	}

	var t1=wind[0].split("/");
	windspeed1=t1[1]+" "+wind[1]+"-"+wind[2]+'<div class="arrow"> '+wind[3]+'</div>';
	var t2=wind[4].split("/");
	windspeed2=t2[1]+" "+wind[5]+"-"+wind[6]+'<div class="arrow"> '+wind[7]+'</div>';
	var t3=wind[8].split("/");
	windspeed3=t3[1]+" "+wind[9]+"-"+wind[10]+'<div class="arrow"> '+wind[11]+'</div>';
	var t4=wind[12].split("/");
	windspeed4=t4[1]+" "+wind[13]+"-"+wind[14]+'<div class="arrow"> '+wind[15]+'</div>';
	var t5=wind[16].split("/");
	windspeed5=t5[1]+" "+wind[17]+"-"+wind[18]+'<div class="arrow"> '+wind[19]+'</div>';

  var today = ordinal_suffix_of(t1[0]);


	 document.getElementById("replace").innerHTML = 'South Channel Island<br>'+today+"<br><br>"+windspeed1+"<br>"+windspeed2+"<br>"+windspeed3+"<br>"+windspeed4+"<br>"+windspeed5;

	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", "https://foweexlbzi.execute-api.ap-southeast-2.amazonaws.com/Stage/wind", true);
	oReq.send();



//canvas init
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
var myintervalid;


function resize() {
	clearInterval(myintervalid);
  window.addEventListener('resize', resize, false);

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

		ctx.strokeStyle = "rgba(0,0,0,.3)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = airbubbles[i];
			ctx.moveTo(p.x+p.r, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
      ctx.moveTo(p.x+p.r/1.5, p.y);

		}
		ctx.stroke();
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
