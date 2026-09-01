

// Arrow font (see style.css): letters map to compass points, clockwise from north.
function degToArrow(deg) {
	if (deg == null || isNaN(deg)) return '~';
	var letters = ['G','H','A','B','C','D','E','F']; // N,NE,E,SE,S,SW,W,NW
	return letters[Math.round(deg / 45) % 8];
}

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


	function renderWind(lat, lon) {
		var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
			'&longitude=' + lon +
			'&hourly=wind_speed_10m,wind_gusts_10m,wind_direction_10m' +
			'&wind_speed_unit=kn&timezone=auto&forecast_days=1';

		fetch(url)
			.then(function (r) { return r.json(); })
			.then(function (data) {
				var h = data.hourly;
				// start at the current hour, then show that plus the next 4 readings
				var now = Date.now();
				var start = 0;
				for (var k = 0; k < h.time.length; k++) {
					if (new Date(h.time[k]).getTime() >= now) { start = k; break; }
				}
				start = Math.min(start, Math.max(0, h.time.length - 5));

				var rows = '';
				var headerDay;
				for (var n = 0; n < 5; n++) {
					var idx = start + n;
					var t = h.time[idx];              // "2026-09-01T14:00"
					if (n === 0) headerDay = parseInt(t.slice(8, 10), 10);
					var clock = t.slice(11, 16);      // "14:00"
					var spd = Math.round(h.wind_speed_10m[idx]);
					var gust = Math.round(h.wind_gusts_10m[idx]);
					var arrow = degToArrow(h.wind_direction_10m[idx]);
					rows += clock + ' ' + spd + '-' + gust + '<div class="arrow"> ' + arrow + '</div><br>';
				}

				document.getElementById("replace").innerHTML =
					lat.toFixed(4) + ', ' + lon.toFixed(4) + '<br>' + ordinal_suffix_of(headerDay) + '<br><br>' + rows;
			})
			.catch(function (err) { console.log('wind fail', err); });
	}

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (pos) { renderWind(pos.coords.latitude, pos.coords.longitude); },
			function (err) {
				console.log('geolocation unavailable, using default', err);
				renderWind(-38.30, 144.82);
			}
		);
	} else {
		renderWind(-38.30, 144.82);
	}



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
	var mp = 100,
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
			r: Math.random()*15+4, //radius
			d: Math.random()*mp //density
		})
	}
	console.log ('bubbles');

	//Lets draw the bubbles
	function draw()
	{
		ctx.clearRect(0, 0, W, H);

		ctx.fillStyle = "rgba(0,0,0,.2)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = airbubbles[i];
			ctx.moveTo(p.x, p.y);
			ctx.rect(p.x, p.y, p.r,p.r);

		}
		ctx.fill();
		update();
	}


	function update()
	{
		for(var i = 0; i < mp; i++)
		{
			var p = airbubbles[i];

			p.x += 1 - 2 - p.r/2;
      console.log('x',p.x)
			if(p.x < 0)
			{

					airbubbles[i] = {x: W, y: Math.random()*H, r: p.r, d: p.d};

			}
		}
	}
	myintervalid = setInterval(draw, 30);
}
resize();
//bubbles();
