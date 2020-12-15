		/* ----------  NOTES  ----------  
	No notes atm
*/


// ----------  Hyperparameters  ---------- 
var functionList = [];
var functionList2 = [];
var items = [];
var items2= [];
var dx = 1/100;
const chosen_colour = "white";
const background_colour = "black";
const mass = 0.2; //i.e. radius
const alpha = 0.8;//0.2;
var interval = 1/1000;
var canvas = "";
var ctx = "";
var tranformation = [];
const NUMBER_OF_BRUSHES =5;
const MAX_FRAMES = 10000; //frames for brush to grow
const MAX_RAD = 4;
const RUNTIME_FRAMES = 10000;

const x_range = 10; //the range that x can take (e.g. this could be -5 to 5)
const y_range = 10; 
var max_number_of_function_components = 25;
var number_of_function_components = (Math.floor(Math.random() * max_number_of_function_components)) + 1;
const origin_loc = [0.5,0.5];//[.5,.5]; //as ratio of max width and max height, can be made random later;
var number_of_function_options = 24;
var y_dir = 1; //to allow the function to flow down the screen



// ----------  class and function definitions ----------  
class brush{
	constructor(x,y,m,colour){
		this.frame = 0;
		this.m = 0;
		this.x = ((x/canvas.width) - origin_loc[0])*x_range;
		this.y = ((y/canvas.height) - origin_loc[1])*y_range;
		this.abs_x = null; // position on page instead of the relative coordinate system
		this.abs_y = null;
		this.prev_abs_x = null;
		this.prev_abs_y = null;
		this.aplha = alpha;  //can be tuned later
		this.colour = colour;
		this.radius = m;
		this.startAngle = 0;
		this.endAngle = 2*Math.PI;
	}

	update(transformationList, transformationList2){
		this.frame ++;
		var x_dir = 0;
		for (var i=0; i<transformationList.length;i++){
			var new_x_dir = functionTransform(x_dir,transformationList[i],this.x,this.y);
			x_dir = new_x_dir;
		}
		var y_dir = 0;
		for (var i=0; i<transformationList2.length;i++){
			var new_y_dir = functionTransform(x_dir,transformationList2[i],this.x,this.y);
			y_dir = new_y_dir;
		}
		var vec = [x_dir,y_dir];
		var length= vecLen(vec);
		this.x += (x_dir/length)* dx; //dividing by length allows for the movement to be in unit increments, this can then be multiplied by dx to move in smaller increments
		this.y += (y_dir/length)* dx;
		if (this.frame <= MAX_FRAMES){
			if (this.frame <= MAX_FRAMES/2){
				this.radius = (this.frame*2/MAX_FRAMES) * MAX_RAD;
			} else {
				this.radius = (2*(MAX_FRAMES -  this.frame)/MAX_FRAMES)*MAX_RAD;
			}
		} else{
			this.reset();
		}
		this.prev_abs_x = this.abs_x;
		this.prev_abs_y = this.abs_y;	
		this.transform_to_abs();
		
	}

	draw(){
		if (this.prev_abs_x != null){
			ctx.strokeStyle=this.colour;
			ctx.fillStyle=this.colour;
			ctx.globalAlpha = alpha; 
			ctx.beginPath();
			ctx.lineWidth =this.radius;
			var midpoint_x  = (this.prev_abs_x + this.abs_x) /2;
			var midpoint_y  = (this.prev_abs_y + this.abs_y) /2;
			ctx.moveTo(this.prev_abs_x, this.prev_abs_y);
			ctx.quadraticCurveTo(midpoint_x, midpoint_y, this.abs_x, this.abs_y);			
			ctx.stroke(); 
			ctx.fill();
			ctx.closePath();
		}
	}

	reset(){	
		this.frame = 0;
		this.abs_x = null;
		this.abs_y = null;
		this.x = Math.random();
		this.y = Math.random();

	}

	transform_to_abs(){		var abs_x = ((this.x  / x_range) + origin_loc[0]) * canvas.width;
		var abs_y = ((this.y  / y_range) + origin_loc[1]) * canvas.height;
		this.abs_x = abs_x;
		this.abs_y = abs_y;

	}
	}

function vecLen(coordinates){
	var sum = 0;
	for (var i =0; i< coordinates.length; i++){
		sum += coordinates[i]**2;
	}
	sum = sum **(.5);
	return sum;
}


function create_function_list(){
	var output = [];
	for (var i = 0; i<number_of_function_components; i++){
		output.push(Math.floor(Math.random() *number_of_function_options));
	}
	return output;
}


function triangle(){


}



function posNegMultiplier(){
	//randomly returns +1 or -1
	var posNeg = 1;
	if (Math.random() < .5){
		posNeg = -1;
	}
	return posNeg;
}


function populateBrushes(numberOfBrushes, designated_m, max_x, max_y, max_z, colour){
	var listToPopulate = [];
	for (var i = numberOfBrushes - 1; i >= 0; i--) {
		var m = designated_m;
		var x = Math.random() * max_x;
		var y = Math.random() * max_y;
		//var z = Math.random() * max_z;
		//var coords = [x,y];
		var c = colour;
		var new_brush = new brush(x,y,m,c);
		listToPopulate.push(new_brush);
	}
	return listToPopulate;
}

function drawFirstFrame(){
	for (var i = items.length - 1; i >= 0; i--) {
		var current_brush = items[i];
		current_brush.draw();
	}
}


function functionTransform(current_function_output, option, x , y){
	//If new cases are added the 'number_of_function_options' variable should be adjusted

	var calc = current_function_output;
	switch(option){
		case -1:
		calc = 1;
		break;

		case 0:
		calc += y;
		break;

		case 1:
		calc += x;
		break;

		case 2:
		calc -= 1;
		break;

		case 3:
		calc *= Math.sin(x) ;;
		break; 

		case 4:
		calc -= y;
		break;

		case 5:
		calc -= x;
		break;

		case 6:
		calc += 1;
		break;

		case 7:
		calc += Math.sin(y);
		break;

		case 8:
		calc += Math.cos(y);
		break;

		case 9:
		calc += Math.sin(x);
		break;

		case 10:
		calc += Math.cos(x);
		break;

		case 11:
		calc -= Math.sin(y);
		break;

		case 12:
		calc -= Math.cos(y);
		break;

		case 13:
		calc -= Math.sin(x);
		break;

		case 14:
		calc -= Math.cos(x);
		break;

		case 15:
		calc += x**2;
		break;

		case 16:
		calc += y**2;
		break;

		case 17:
		calc -= y**2;
		break;

		case 18:
		calc -= x**2;
		break;

		case 19:
		calc *= Math.sin(y);
		break; 

		case 20:
		calc *= y;
		break;

		case 21:
		calc *= x;
		break;

		case 22:
		calc *= Math.cos(x);
		break;

		case 23:
		calc *= Math.cos(y) ;
		break;


		default:
		calc = calc;
		break;
	}

	return calc;
}


function main(){
	//console.log(items[0]);
	for (var i = items.length - 1; i >= 0; i--) {
		var current_brush = items[i];
		current_brush.update(functionList,functionList2);
	}
	//console.log(items[0]);
	ctx.beginPath();
	ctx.strokeStyle= chosen_colour;
	ctx.lineWidth =1;//items[items.length -1].radius;
	ctx.moveTo(items[items.length -1].abs_x,items[items.length -1].abs_y);
	for (var i = items.length - 1; i >= 0; i--) {
		var current_brush = items[i];
		ctx.lineTo(current_brush.abs_x,current_brush.abs_y);
		ctx.moveTo(current_brush.abs_x,current_brush.abs_y);
	}

	ctx.stroke(); 
	ctx.closePath();
}



//  ----------  code execution  ----------  
window.onload = function() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	//594mm X 841mm
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillStyle = background_colour;
	ctx.fillRect(0, 0, canvas.width, canvas.height);


	if (functionList.length == 0){
	console.log("x"); //functionLists added as hyperparameter for recreation of nice patterns!;
	functionList = create_function_list();
	}

	if (functionList2.length == 0){ 
	if (Math.random() > 0) {
	functionList2 = create_function_list();
	} else {
	functionList2 = [-1]}
	}
	console.log(functionList);
	console.log(functionList2);


	//items = [new brush(0,0,1,chosen_colour),new brush(canvas.width,0,1,chosen_colour),new brush(0.5*canvas.width,canvas.height,1,chosen_colour)];
	items =populateBrushes(NUMBER_OF_BRUSHES, mass, canvas.width, canvas.height, canvas.height, chosen_colour);
	
	drawFirstFrame();
	main();
	setInterval(main,interval);
}