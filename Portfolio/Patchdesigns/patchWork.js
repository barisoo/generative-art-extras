// alert("let's go!");
console.log("Start");
console.log(Math.random());

var square_side = 30;
var square_side = 60;
var square_side = 90;
var background_color = "black";
var palette1 = ["#0a043c", "#03506f","#bbbbbb","#ffe3d8"];
var palette2 = ["#16697a", "#db6400","#ffa62b","#f8f1f1"];
var palette3 = ["#120078", "#9d0191","#fd3a69","#fecd1a"];
var palette4 = ["#e8e8e8", "#f05454","#30475e","#222831"];

var palette5 = ["#ea2c62", "#ff9a8c","#fad5ad","#adb36e"];
var palette6 = ["#000000", "#52057b","#892cdc","#bc6ff1"];
var palette7 = ["#9ad3bc", "#f3eac2","#f5b461","#ec524b"];
var palette8 = ["#214252", "#f05454","#af2d2d","#ce6262"];

var palette9 = ["#d2d3c9", "#0e918c","#f6830f","#bb2205"];
var palette10 = ["#f1d4d4", "#e6739f","#cc0e74","#790c5a"];



var palettes = [palette1,palette2,palette3,palette4,palette5,palette6,palette7,palette8,palette9,palette10];

var palette = getRandomElement(palettes);

//background_color = palette[1];

window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// setInterval(drawPattern,1000/10)
	createPatchwork();
}


function getRandomElement(array){
	var randomElement = array[Math.floor(Math.random() * array.length)];
	return randomElement
}



function createPatchwork(){
	// Either diagonal triangle, centre diamond, 
	//centre square, or plain(this can be if a squares have the same colors for both components)
	var horizontal = window.innerWidth / square_side;
	var vertical   = window.innerHeight / square_side;

	//+1 for both loops incase there are partial squares at screen borders
	for (var i = 0; i<horizontal + 1; i++){
		for (var j= 0; j < vertical + 1; j++){
			var x1 = i* square_side;
			var x2 = (i+1)* square_side;
			var y1 = j* square_side;
			var y2 = (j+1)* square_side;
			var color1 = getRandomElement(palette);
			var color2 = getRandomElement(palette);
			var patch  = paintPatch(color1,color2,x1,x2,y1,y2);
		}
	}

}

function paintPatch(color1,color2,x1,x2,y1,y2){
	//paints patch to canvas
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var select =  Math.floor(Math.random()*5);

	switch(select) {
	  	case 0:
		    ctx.fillStyle = color1;
		    ctx.fillRect(x1,y1,x2-x1,y2-y1);
		    ctx.fillStyle = color2;
			ctx.beginPath();
			ctx.moveTo((x1+x2)/2,y1);
			ctx.lineTo(x2,(y1+y2)/2);
			ctx.moveTo((x1+x2)/2,y2);
			ctx.lineTo(x1,(y1+y2)/2);
			ctx.closePath();
			ctx.fill();
		    break;

	  	case 1:
	    	ctx.fillStyle = color2;
		    ctx.fillRect(x1,y1,x2-x1,y2-y1);
		    break;

		case 2:
			//diagonal 1
			ctx.fillStyle = color2;
			ctx.fillRect(x1,y1,x2-x1,y2-y1);
			ctx.fillStyle = color1;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y1);
			ctx.lineTo(x2,y2);
			ctx.closePath();
			ctx.fill();
			break;

		case 3:
			//diagonal 2
			ctx.fillStyle = color2;
			ctx.fillRect(x1,y1,x2-x1,y2-y1);
			ctx.fillStyle = color1;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y1);
			ctx.lineTo(x1,y2);
			ctx.closePath();
			ctx.fill();
			break;

		case 4:
			var distBy6 = (x1-x2)/6;
			ctx.fillStyle = color2;
			ctx.fillRect(x1,y1,x2-x1,y2-y1);
			ctx.fillStyle = color1;
			ctx.fillRect(x1+distBy6,y1+distBy6,distBy6*4,distBy6*4);
			break;

	  	default:
	    break;
	} 
}