// alert("let's go!");
console.log("Start");
console.log(Math.random());

var square_side = 70;
var background_color = "black";
var bg_colors = ["red", "green", "blue"];

console.log(window.innerWidth);


window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// setInterval(drawPattern,1000/10)
	drawPattern();
}

function drawPattern(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	// ctx.globalAlpha = 0.5;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i <= window.innerWidth/square_side; i++) {
		for (var j =0; j<= window.innerHeight/square_side; j++){
			ctx.beginPath();
			ctx.strokeStyle = "white";
			ctx.lineWidth = "3";
			var x = i*square_side;
			var y = j*square_side;
			var x_end = (i+1)*square_side;
			var y_end = (j+1)*square_side;
			var choice = Math.random();
			if (choice < 0.5) {
				ctx.moveTo(x, y);
				ctx.lineTo(x_end, y_end);
				ctx.stroke(); 
			} else{
				ctx.moveTo(x_end, y);
				ctx.lineTo(x, y_end);
				ctx.stroke(); 
			}
		}
	}
}

function drawPatternWithOffset(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	// ctx.globalAlpha = 0.05;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var offset = 0; offset < square_side/25;  offset++) {
		for (var i = 0; i <= window.innerWidth/square_side; i++) {
			for (var j =0; j<= window.innerHeight/square_side; j++){

				var drawCircle = Math.random(); //false;
				ctx.beginPath();
				ctx.strokeStyle = "white";
				ctx.lineWidth = "1";
				var off5 = offset * 10;
				var x = i*square_side + off5;
				var y = j*square_side;
				var x_end = (i+1)*square_side + off5;
				var y_end = (j+1)*square_side;
				var choice = Math.random();
				if (choice < 0.5) {
					ctx.moveTo(x, y);
					ctx.lineTo(x_end, y_end);
					ctx.closePath();
					ctx.stroke(); 
				} else{
					ctx.moveTo(x_end, y);
					ctx.lineTo(x, y_end);
					ctx.closePath();
					ctx.stroke(); 
				}

				if (drawCircle<=0.05) {
					ctx.strokeStyle = "yellow";
					ctx.fillStyle = "yellow";
					ctx.lineWidth = "5";
					ctx.beginPath();
					ctx.arc(x,y,square_side/4,0*Math.PI,2*Math.PI);
					ctx.closePath();
					// ctx.fill();
					ctx.stroke(); 
				}
			}
		}
	}
}


function drawPatternWithOffset2(){

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	// ctx.globalAlpha = 0.05;
	
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var offset = 0; offset < bg_colors.length;  offset++) {
		for (var i = 0; i <= window.innerWidth/square_side; i++) {
			for (var j =0; j<= window.innerHeight/square_side; j++){
				ctx.strokeStyle = bg_colors[offset];
				ctx.beginPath();
				ctx.lineWidth = "3";
				var off5 = offset * 10;
				var x = i*square_side + off5;
				var y = j*square_side;
				var x_end = (i+1)*square_side + off5;
				var y_end = (j+1)*square_side;
				var choice = Math.random();
				if (choice < 0.5) {
					ctx.moveTo(x, y);
					ctx.lineTo(x_end, y_end);
					ctx.stroke(); 
				} else{
					ctx.moveTo(x_end, y);
					ctx.lineTo(x, y_end);
					ctx.stroke(); 
				}
			}
		}
	}
}