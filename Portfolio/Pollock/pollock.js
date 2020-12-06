var background_color = "black";
var run_condition = true;
var space = [];
const G = 6.67408 * 10**(-3);
const z_axis_initial_max = 100;
const max_rand_planets =100;
const given_planets = Math.floor((Math.random() * 40) + 5);
const growth_frames = Math.random() * 10000;
var shrink_frames = Math.random() * 50000;
var current_frame = 0;
const alpha_denom = 15;
const one_in_blotch = 1.5;
const max_rad = 40;
var interval = 1/1000;
var max_speed = 1;

const line_color = "hsl(300, 100%, 38%)";
const line_color2 = "hsl(300, 100%, 67%)";
const line_color3 = "hsl(300, 100%, 88%)";
//const color_pallete = ["hsl(114, 73%, 38%)","hsl(160, 73%, 38%)","hsl(218, 73%, 38%)","hsl(218, 73%, 100%)","hsl(0, 73%, 38%)"]
// const color_pallete = ["hsl(181, 98%, 48%)","hsl(233, 98%, 54%)","hsl(50, 98%, 54%)","hsl(349, 98%, 54%)","hsl(207, 98%, 54%)"]
const color_pallete =["hsl(45, 100%, 70%)", "hsl(30, 100%, 58%)","hsl(96, 31%, 38%)", "hsl(46, 100%, 77%)","hsl(18, 99%, 54%)","hsl(46, 2%, 76%)"];

window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	setInterval(main,interval);
	//main();
}



class planet{
	constructor(m, x, y, z, dx, dy,dz,colour){
		this.m = m;
		this.x = x;
		this.y = y;
		this.z = z;
		this.dx = dx/10;
		this.dy = dy/10;
		this.dz = dz/10;
		this.aplha = this.z/z_axis_initial_max;
		this.display = true;
		this.color = colour;
		if (this.z>0) {
			this.radius = (m**(1/2) *2)/((this.z)**3);
		} else {
			this.radius = (m**(1/2) *2);
		}
		
		if (this.radius < 0) {
			this.radius = 0.01
		}

		this.sAngle = 0;
		this.endAngle = 2*Math.PI;
	}

	}

function createPlanet(m,x,y,z,dx,dy,dz,color){
	var new_space = space;
	var pp = new planet(m,x,y,z, dx,dy,dz,color);
	new_space.push(pp);
	return new_space;
	}

function deleteMasses(deleted){
	var toDel = deleted.sort();
	var returnList = [];
	for (var i = space.length - 1; i >= 0; i--) {
		if (!toDel.includes(space[i])) {
			returnList.push(space[i]);
		}
	}

	space = returnList;
	}



var min_shape_points = 15;
var posible_extras = Math.random()
function blobFill(line_color,alpha){
	ctx.strokeStyle=line_color;
	ctx.fillStyle=line_color;
	ctx.globalAlpha = 1;
	ctx.beginPath();
	ctx.arc(p.x, p.y, little_rad, p.sAngle, p.endAngle);
	ctx.stroke(); 
	ctx.fill();
	ctx.closePath();
}


function updateCoords(){
	current_frame++;
	var deleted = [];
	for (var i = given_planets - 1; i >= 0; i--) {
		var p = space[i];
		p.x += p.dx;
		p.y += p.dy;
		//p.z += 0.001;
		if (p.z >=100){
			p.aplha = 0;
		}else{
			p.aplha = (100 - p.z )/150;
		}
		if (current_frame<growth_frames){
			var multiplier = current_frame/growth_frames;
		}else{
			multiplier = (shrink_frames - current_frame + growth_frames) / shrink_frames;
			if (multiplier<0){
				multiplier =0;
			}
		}
		if (p.z>0) {
			p.radius = (multiplier*p.m**(1/3) *2)/(p.z/50);
		} else {
			p.radius = (multiplier*p.m**(1/3) *2);
		}

		if(p.radius>max_rad){
			p.radius = max_rad;
		}

		
		var fg_tot_x = 0;
		var fg_tot_y = 0;
		var fg_tot_z = 0;
		for (var j = space.length - 1; j >= given_planets; j--) {
			if(i!=j){
				p2 = space[j];
				var dist = (((p.x - p2.x)**2) + ((p.y - p2.y)**2) + ((p.z - p2.z)**2))**(0.5);
				if (dist <1) {
					dist = 1;
				}
				var dirX = (p2.x - p.x) / dist;
				var dirY = (p2.y - p.y) / dist;
				var dirZ = (p2.z - p.z) / dist;
				var fg = (G * (p.m) * (p2.m)) / (dist**2);
				fg_tot_x += (fg * dirX); 
				fg_tot_y += (fg * dirY);
				fg_tot_z += (fg * dirZ);
				if(p2.radius>max_rad){
					p2.radius = max_rad;
				}
			}

		var accel_x = fg_tot_x / p.m;
		var accel_y = fg_tot_y / p.m;
		var accel_z = fg_tot_z / p.m;
		p.dx += accel_x;
		p.dy += accel_y;
		p.dz += accel_z;
		}
	}
	if (deleted.length > 0) {
		deleteMasses(deleted);
		document.getElementById("counter").innerHTML = space.length;

	}
	}




var number_of_objects = (Math.random()*max_rand_planets) + given_planets;


for (var i = 0; i < number_of_objects; i++) {
	var pos_neg_x = 0;
	var pos_neg_y = 0;
	var pos_neg_z = 0;
	if (Math.random() >= 0.5){
		pos_neg_x = 1;
	} else {
		pos_neg_x = -1;
	}

	if (Math.random() >= 0.5){
		pos_neg_y = 1;
	} else {
		pos_neg_y = -1;
	}
	if (Math.random() >= 0.5){
		pos_neg_z = 1;
	} else {
		pos_neg_z = -1;
	}

	var create_m = 1000;
	// var create_m = Math.random() * 1000;

	var create_x = Math.random() * window.innerWidth;//window.width;
	var create_y = Math.random() * window.innerHeight;;//window.height;
	var create_z = Math.random() * z_axis_initial_max;//window.height;

	var create_dx = Math.random()* pos_neg_x * max_speed;
	var create_dy = Math.random() * pos_neg_y * max_speed;
	// var create_dz = Math.random() * pos_neg_z;
	var create_dz =  0;
	var chosen_color = color_pallete[Math.floor(Math.random()*color_pallete.length)];
	space = createPlanet(create_m, create_x, create_y, create_z, create_dx, create_dy, create_dz,chosen_color);

}


function main(){
	var canvas=document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
	if(run_condition){
		updateCoords();
		ctx.fillStyle="black";
		
		for (var i = space.length - 1; i >= 0; i--) {
			var p = space[i];
			if (p.display){
				
				ctx.strokeStyle=p.color;
				ctx.fillStyle=p.color;
				var pos_neg = 0.1;
				var pos_neg_little1 = 1;
				var pos_neg_little2 = 1;
				if (Math.random()<.5){
					pos_neg = -0.1;
				}
				if (Math.random()<.5){
					pos_neg_little1 = -1;
				}
				if (Math.random()<.5){
					pos_neg_little2 = -1;
				}
				var little_rad = Math.random()*.2*p.radius;
				var little_x = p.x  + (p.radius*pos_neg_little1); //+ (Math.random()*p.radius)
				var little_y = p.y  + (p.radius*pos_neg_little2); //+ (Math.random()*p.radius)
				var condition = Math.floor(Math.random()*one_in_blotch);

				switch(condition){
					case 0:
					ctx.strokeStyle=p.color;
					ctx.fillStyle=p.color;
					ctx.globalAlpha = 1;
					ctx.beginPath();
					var xl = p.x + little_x;
					var yl = p.y + little_y;
					ctx.arc(p.x, p.y, little_rad, p.sAngle, p.endAngle);
					ctx.stroke(); 
					ctx.fill()
					ctx.closePath();
					break;
				}


				ctx.globalAlpha = p.aplha/alpha_denom;
				if (Math.random()<.5){
					pos_neg = -0.1;
				}
				var current_rad = p.radius * (1 + (pos_neg*Math.random()))
				ctx.beginPath();
				ctx.arc(p.x, p.y, current_rad, p.sAngle, p.endAngle);
				//ctx.stroke(); 
				//ctx.fill()
				ctx.closePath();
			}
		}
	} 
	}



function Run() {
	run_condition = true;
    var canvas=document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
    setInterval(main,1);
	}	

function Add(){
	var canvas=document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	for (var i = space.length - 1; i >= 0; i--) {
		p = space[i];
		if (p.display){
			ctx.fillStyle="red";
			ctx.fillRect(p.x,p.y,p.radius,p.radius);
		}}
	mass = parseFloat(document.getElementById("mass").value);
	xpos = parseFloat(document.getElementById("xPos").value);
	ypos = parseFloat(document.getElementById("yPos").value);
	xvel = parseFloat(document.getElementById("xVel").value);
	yvel = parseFloat(document.getElementById("yVel").value);
	space = createPlanet(mass,xpos,ypos,xvel,yvel);
	document.getElementById("counter").innerHTML = space.length;
	
	}

function Stop(){
	run_condition = false;
	}

function Reset(){
	run_condition = false;
	var canvas=document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	space = [];
	document.getElementById("counter").innerHTML = space.length;
}
