var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
trackTransforms(ctx);
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var lineWidth = 1;

var pt = ctx.transformedPoint(canvas.width/2,canvas.height/2);
ctx.translate(pt.x,pt.y);
var factor = Math.pow(2.5,3.75);
ctx.scale(factor,factor);
ctx.translate(-pt.x,-pt.y);
lineWidth*=1/factor;
		  
function draw(){
    var p1 = ctx.transformedPoint(0,0);
    var p2 = ctx.transformedPoint(canvas.width,canvas.height);
    ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.restore();

    grid();
	for(i = 0; i < functions.length; i++){
		xPos2 = "."; yPos2 = ".";
		for(z = 0; z < functions[i].length; z++){
			//if(functions[i][z]>canvas.height&&functions[i][z-1]<canvas.height){functions[i][z] = canvas.height;}else if(functions[i][z]>canvas.height){functions[i][z] = ".";}
			//if(functions[i][z]<0&&functions[i][z-1]>0){functions[i][z] = 0;}else if(functions[i][z]<0){functions[i][z] = ".";}
			var xPos1 = z/20;
			var yPos1 = functions[i][z];

			ctx.beginPath();
			ctx.moveTo(xPos1,yPos1);
			ctx.lineTo(xPos2,yPos2);
			ctx.strokeStyle = functions[i]["color"];
			ctx.lineWidth = 3*lineWidth;
			ctx.stroke();

			var xPos2 = z/20;
			var yPos2 = functions[i][z];
		}
	}
}

document.getElementById("textbox").onclick = function(){
	document.getElementById("textbox").style.border = "3px solid black";
	document.getElementById("textbox").style.marginTop = "5px";
	document.getElementById("textbox").style.marginLeft = "5px";
} 

var functions = [];

document.onkeydown = checkKeyDown;

function checkKeyDown(e) {

    e = e || window.event;

    if (e.keyCode == '13') {
    	document.getElementById("textbox").style.border = "3px solid black";
    	document.getElementById("textbox").style.marginTop = "5px";
		document.getElementById("textbox").style.marginLeft = "5px";
    	var equation = document.getElementById("textbox").value;
    	document.getElementById("textbox").value = "";
		try {
			if(equation != ""){
				var arr = [];
				functions.push(arr);
				functions[functions.length-1]["color"] = randomColor();
				document.getElementById('field').innerHTML += "<font id='function"+functions.length+"' onclick='display("+functions.length+")' style = 'color: " + functions[functions.length-1]["color"] + ";'> &nbsp;&nbsp;" + equation + "</font><br>";
				for (var x =-window.innerWidth/2; x < window.innerWidth/2; x+=0.05) {
					functions[functions.length-1].push(-eval(equation) + window.innerHeight/2);
				}
			}else{
				document.getElementById("textbox").style.border = "5px solid red";
				document.getElementById("textbox").style.marginTop = "3px";
				document.getElementById("textbox").style.marginLeft = "3px";
			}
		} catch (e) {
		    if (e instanceof ReferenceError) {
		        document.getElementById("textbox").style.border = "5px solid red";
		        document.getElementById("textbox").style.marginTop = "3px";
				document.getElementById("textbox").style.marginLeft = "3px";
			}
		}
		draw();
	}
}

function grid(){

	ctx.beginPath();
	ctx.moveTo(canvas.width/2,0);
	ctx.lineTo(canvas.width/2,canvas.height);
	ctx.lineWidth=5*lineWidth;
	ctx.strokeStyle = "black";
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0,canvas.height/2);
	ctx.lineTo(canvas.width,canvas.height/2);
	ctx.lineWidth=5*lineWidth;
	ctx.strokeStyle = "black";
	ctx.stroke();

	for (var x = canvas.width/2; x < canvas.width; x+=1) {
		ctx.beginPath();
		ctx.moveTo(x,0);
		ctx.lineTo(x,canvas.height);
		ctx.lineWidth=0.5*lineWidth;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	for (var y = canvas.height/2; y < canvas.height; y+=1) {
		ctx.beginPath();
		ctx.moveTo(0,y);
		ctx.lineTo(canvas.width,y);
		ctx.lineWidth=0.5*lineWidth;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	for (var x = canvas.width/2; x > 0; x-=1) {
		ctx.beginPath();
		ctx.moveTo(x,0);
		ctx.lineTo(x,canvas.height);
		ctx.lineWidth=0.5*lineWidth;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
	for (var y = canvas.height/2; y > 0; y-=1) {
		ctx.beginPath();
		ctx.moveTo(0,y);
		ctx.lineTo(canvas.width,y);
		ctx.lineWidth=0.5*lineWidth;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
}

function randomColor() {
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    if(red > 250 && blue > 250 && red > 250){randomColor();}
    rc = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rc;
}

var lastX=canvas.width/2, lastY=canvas.height/2;
var dragStart,dragged;

canvas.addEventListener('mousedown',function(evt){
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    dragStart = ctx.transformedPoint(lastX,lastY);
    dragged = false;
},false);

canvas.addEventListener('mousemove',function(evt){
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    dragged = true;
    if (dragStart){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
        draw();
    }
},false);

canvas.addEventListener('mouseup',function(evt){
    dragStart = null;
    if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
},false);

var scaleFactor = 1.1;

var zoom = function(clicks){
	var pt = ctx.transformedPoint(lastX,lastY);
	ctx.translate(pt.x,pt.y);
	var factor = Math.pow(scaleFactor,clicks);
	ctx.scale(factor,factor);
	ctx.translate(-pt.x,-pt.y);
	lineWidth*=1/factor;
	draw();
}

var handleScroll = function(evt){
    var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
    if (delta) zoom(delta);
    return evt.preventDefault() && false;
};
    
canvas.addEventListener('DOMMouseScroll',handleScroll,false);
canvas.addEventListener('mousewheel',handleScroll,false);
	
function trackTransforms(ctx){
    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform; };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
    };
	    
    var restore = ctx.restore;
    ctx.restore = function(){
	    xform = savedTransforms.pop();
	    return restore.call(ctx);
    };

	var scale = ctx.scale;
	ctx.scale = function(sx,sy){
	    xform = xform.scaleNonUniform(sx,sy);
	    return scale.call(ctx,sx,sy);
	};
	    
	var rotate = ctx.rotate;
	ctx.rotate = function(radians){
	    xform = xform.rotate(radians*180/Math.PI);
	    return rotate.call(ctx,radians);
	};
	    
	var translate = ctx.translate;
	ctx.translate = function(dx,dy){
	    xform = xform.translate(dx,dy);
	    return translate.call(ctx,dx,dy);
	};
    
    var transform = ctx.transform;
    ctx.transform = function(a,b,c,d,e,f){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };
    
    var setTransform = ctx.setTransform;
    ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };
    
    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
}

function display(x){
	functions.splice(x-1,1);
	var elem = document.getElementById("function"+x);
    elem.parentNode.removeChild(elem);
    document.getElementById("field").style.height = 34 + functions.length*25.2 + "px";
	draw();
}

draw();