// alert("let's go!");
// console.log("Start");
// console.log(Math.random());

var square_side = 70;
var background_color = "white";
var line_color = "black";
var bg_colors = ["red", "green", "blue"];
console.log(window.innerWidth);
var number_of_lines = 100;
var number_of_points = 750;
var averaging_points = 30;
var amp =30;


window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// setInterval(drawPattern,1000/10)
	drawLandscape();
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


function drawLandscape(){
	var x = randomList(number_of_points);
	x = rollingAve(x,averaging_points);
	// x = reflect(x);
	// x = rollingAve(x,averaging_points);
	createLandscape(x,amp);
}


function createLandscape(listOfMultiplier, maxAmp){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	console.log(canvas.width);
	for (var i = 0; i <maxAmp; i++) {
		ctx.strokeStyle = line_color;
		ctx.beginPath();
		var currenty = canvas.height - (canvas.height*i/maxAmp);
		var previousy = canvas.height - (canvas.height*i/maxAmp);
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