// alert("let's go!");
// console.log("Start");
// console.log(Math.random());

var square_side = 70;
var background_color = "black";
var bg_colors = ["red", "green", "blue"];
console.log(window.innerWidth);
var number_of_lines = 100;
var number_of_points = 250;
var number_of_points = 10;
var amp =20;

function drawGrid(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	for (var i = 0; i <= window.innerWidth/square_side; i++) {
		for (var j =0; j<= window.innerHeight/square_side; j++){
			ctx.beginPath();
			ctx.strokeStyle = "white";
			ctx.lineWidth = "1";
			var x = i*square_side;
			var y = j*square_side;
			ctx.rect(x, y, square_side, square_side);
			ctx.stroke();
			console.log("b");
		}
	}
}

window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// setInterval(drawPattern,1000/10)
	drawWaves();
}

function drawPatternQuarterCircle(){

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
			if (choice < 0.25) {
				ctx.moveTo(x, y);
				ctx.lineTo(x_end, y_end);
				ctx.stroke(); 
			} else if (choice >= .25 && choice <.5) {
				ctx.moveTo(x_end, y);
				ctx.lineTo(x, y_end);
				ctx.stroke(); 
			}else if (choice >= .5 && choice <.75) {
				ctx.moveTo(x_end, y);
				ctx.lineTo(x, y_end);
				ctx.stroke(); 
			}else {
				ctx.moveTo(x_end, y);
				ctx.lineTo(x, y_end);
				ctx.stroke(); 
			}
		}
	}
}

function randomControlledNoise(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	// ctx.globalAlpha = 0.5;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = "white";
	ctx.globalAlpha = 0.01;

	var currenty = canvas.height / 2;
	var previousy = canvas.height /2;
	ctx.beginPath();
	for (var i = 0; i < number_of_lines; i++) {
		var points = [0]
		var ys = []
		for (var j = 1; j < number_of_points; j++ ){
			var posNeg = 1;
			if (Math.random() < 0.5) {
				posNeg = -1;
			}
			var nextval = Math.random() * amp * posNeg;
			points.push(nextval);
		}
		for (var j = points.length - 1; j >= 0; j--) {
			points.push(-points[j]);
		}
		var deltax = canvas.width / points.length;
		ctx.moveTo(0, previousy);
		for (var j =0; j < points.length - 1; j++) {
			var x  = j * deltax;
			var xc = x + (deltax/2);
			currenty = previousy + points[j]
			var nexty = currenty + points[j + 1]
	      	var yc = (currenty + nexty) / 2;
	      	ctx.quadraticCurveTo(x, currenty, xc, yc);
	      	previousy = currenty;
	      	
		}
		ctx.stroke();
	}
}

function changingAmplitude(listOfMultiplier, maxAmp){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	console.log(canvas.width);
	for (var i = 0; i <maxAmp; i++) {
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			var currenty = canvas.height / 2;
			var previousy = canvas.height /2;
			var points = []
			for (var p = listOfMultiplier.length - 1; p >= 0; p--) {
			points.push(listOfMultiplier[p]*i);
		}

		ctx.moveTo(0, previousy);
		var deltax = canvas.width / points.length;//Math.ceil( 2* );
		for (var j =0; j < points.length - 1; j++) {
			var x  = j * deltax;
			var xc = x + (deltax/2);
			currenty = previousy + points[j];
			var nexty = currenty + points[j + 1];
	      	var yc = (currenty + nexty) / 2;
	      	ctx.quadraticCurveTo(xc, yc,x, currenty);
	      	previousy = currenty;
		}

		ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width, canvas.height);
		console.log(xc);
		ctx.stroke();
		ctx.closePath();
	}
	
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width/2, canvas.height/3);
	ctx.quadraticCurveTo(0,0, 2*canvas.width/2, 2*canvas.height/3);
	ctx.stroke();
}


function rollingAve(listToAve,pointsToAverage){
	//return rolling ave, adds zero values to start to get rolling average with first input
	// e.g. places four 0s if it is a five point average 
	var dummyList = []
	var averaged = []

	for (var i = pointsToAverage; i > 0; i--) {
		dummyList.push(0);
	}

	for (var i = 0; i<listToAve.length; i++) {
		dummyList.push(listToAve[i]);
	}

	for (var  i = 0; i<listToAve.length; i++){
		var start = i;
		var end = i+pointsToAverage ;
		var sum = 0;
		for (var j = start; j<end; j++) {
			sum = sum + dummyList[j];
		}
		var ave = sum / pointsToAverage;
		averaged.push(ave);
	}
	return averaged;
}

function randomList(length){
	//starts with 0, populates with random values b/w 0&1; 
	// DOES NOT: reflects after reaching length (meaning it ends with 0 as well).
	var points = [0]
	
	for (var j = 1; j < length; j++ ){
		var posNeg = 1;
		if (Math.random() < 0.5) {
			posNeg = -1;
		}
		var nextval = Math.random() * posNeg;
		points.push(nextval);
	}

	return points;
}

function reflect(original){
	var reflection = [];
	for (var j = 0; j < original.length; j++) {
		reflection.push(original[j]);
	}
	for (var j = original.length - 1; j >= 0; j--) {
		reflection.push(-original[j]);
	}
	return reflection;
}


function negativeList(original){
	output = []
	for(var i =0; i<original.length; i++){
		output.push(-original[i]);
	}
	return output;
}


function drawWaves(){
	var x = randomList(100);
	x = rollingAve(x,5);
	x = reflect(x);
	changingAmplitudeWithNoise(x,80);
	
	var x = randomList(100);
	x = rollingAve(x,5);
	x = reflect(x);
	x = negativeList(x);
	changingAmplitudeWithNoise(x,80);
}


function changingAmplitudeWithNoise(listOfMultiplier, maxAmp){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	console.log(canvas.width);
	for (var i = 0; i <maxAmp; i++) {
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		var currenty = canvas.height / 2;
		var previousy = canvas.height /2;
		var points = []
	
		for (var p = listOfMultiplier.length - 1; p >= 0; p--) {
			points.push(listOfMultiplier[p]*i);
		}
		ctx.moveTo(0, previousy);
		var deltax = window.innerWidth / points.length;//Math.ceil( 2* );
		for (var j =0; j < points.length - 1; j++) {
			var x  = j * deltax;
			var xc = x + (deltax/2);
			currenty = previousy + points[j];
			var nexty = currenty + points[j + 1] + Math.random();
	      	var yc = (currenty + nexty) / 2;
	      	ctx.quadraticCurveTo(x, currenty, xc, yc);
	      	previousy = currenty;
	      	
		}
		console.log("xs:");
		console.log(x);
		console.log(xc);
		ctx.quadraticCurveTo(x, currenty, xc, yc);
		ctx.stroke();
		ctx.closePath();
	}
}
