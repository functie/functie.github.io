var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);
ctx.clearRect(0, 0, canvas.width, canvas.height);

function grid(){
	ctx.beginPath();
	ctx.moveTo(canvas.width/2,0);
	ctx.lineTo(canvas.width/2,canvas.height);
	ctx.lineWidth=5;
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0,canvas.height/2);
	ctx.lineTo(canvas.width,canvas.height/2);
	ctx.lineWidth=5;
	ctx.strokeStyle = "black";
	ctx.stroke();

	for (var x = canvas.width/2; x < canvas.width; x+=50) {
		ctx.beginPath();
		ctx.moveTo(50+x,0);
		ctx.lineTo(50+x,canvas.height);
		ctx.lineWidth=0.5;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	for (var y = canvas.height/2; y < canvas.height; y+=50) {
		ctx.beginPath();
		ctx.moveTo(0,50+y);
		ctx.lineTo(canvas.width+y,50+y);
		ctx.lineWidth=0.5;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	for (var x = canvas.width/2; x > -50; x-=50) {
		ctx.beginPath();
		ctx.moveTo(50+x,0);
		ctx.lineTo(50+x,canvas.height);
		ctx.lineWidth=0.5;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	for (var y = canvas.height/2; y > -50; y-=50) {
		ctx.beginPath();
		ctx.moveTo(0,50+y);
		ctx.lineTo(canvas.width+y,50+y);
		ctx.lineWidth=0.5;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
}
grid();

var functions = [];

var equations = [];

var count = 0;

document.onkeydown = checkKeyDown;

function checkKeyDown(e) {

    e = e || window.event;

    if (e.keyCode == '13') {
	    equations.push(prompt("Equation?"));

		for (var x = -canvas.width/2; x < canvas.width/2; x+=0.01) {
			count++;

			x/=25;
			functions.push(-eval(equations[equations.length-1]) + canvas.height/2);

			var xPos = x*25+canvas.width/2;
			var yPos = (functions[count-1]-canvas.height/2)*25 + canvas.height/2;

			ctx.beginPath();
			ctx.arc(xPos, yPos, 1, 0, 2*Math.PI);
			ctx.closePath();
			ctx.fillStyle = "black";
			ctx.fill();

			x*=25;
		}
	}
}