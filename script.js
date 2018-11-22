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

		for (var x = -canvas.width/2; x < canvas.width/2; x++) {
			count++;

			x/=25;
			functions.push(-eval(equations[equations.length-1]) + canvas.height/2);

			var xPos1 = x*25+canvas.width/2;
			var yPos1 = (functions[count-1]-canvas.height/2)*25 + canvas.height/2;

			ctx.beginPath();
			ctx.moveTo(xPos1,yPos1);
			ctx.lineTo(xPos2,yPos2);
			ctx.lineWidth = 3;
			if(equations.length%7==1){ctx.strokeStyle = "blue";}else if(equations.length%7==2){ctx.strokeStyle = "red";}else if(equations.length%7==3){ctx.strokeStyle = "green";}else if(equations.length%7==4){ctx.strokeStyle = "yellow";}else if(equations.length%7==5){ctx.strokeStyle = "orange";}else if(equations.length%7==6){ctx.strokeStyle = "pink";}else if(equations.length%7==0){ctx.strokeStyle = "purple";}  
			ctx.stroke();

			var xPos2 = x*25+canvas.width/2;
			var yPos2 = (functions[count-1]-canvas.height/2)*25 + canvas.height/2;

			x*=25;
		}
	}
}