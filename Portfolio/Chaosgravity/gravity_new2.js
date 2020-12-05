var background_color = "black";
var run_condition = true;
var space = [];
const G = 6.67408 * 10**(-3);
const z_axis_initial_max = 100;
const max_rand_planets =30;
const given_planets = 5;


window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// setInterval(drawPattern,1000/10)
	setInterval(main,0.001);
}



class planet{
	constructor(m, x, y, z, dx, dy,dz){
		this.m = m;
		this.x = x;
		this.y = y;
		this.z = z;
		this.dx = dx;
		this.dy = dy;
		this.dz = dz;
		this.aplha = this.z/z_axis_initial_max;
		this.display = true;
		if (this.z>0) {
			this.radius = (m**(1/3) *2)/((this.z)**3);
		} else {
			this.radius = (m**(1/3) *2);
		}
		
		if (this.radius < 0) {
			this.radius = 0.01
		}

		this.sAngle = 0;
		this.endAngle = 2*Math.PI;
	}

	}

function createPlanet(m,x,y,z,dx,dy,dz){
	var new_space = space;
	var pp = new planet(m,x,y,z, dx,dy,dz);
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


function updateCoords(){
	// console.log("updating coords...")
	var deleted = [];
	for (var i = space.length - 1; i >= 0; i--) {
		p = space[i];
		p.x += p.dx;
		p.y += p.dy;
		// p.z += p.dz;
		p.z += 0.01;
		// p.aplha = p.z/100;
		if (p.z >=100){
			p.aplha = 0;
		}else{
			p.aplha = (100 - p.z )/150;
		}

		// if (p.z>0) {
		// 	p.radius = (p.m**(1/3) *2)/(p.z**(1/3));
		// } else {
		// 	p.radius = (p.m**(1/3) *2);
		// }

		if (p.z>0) {
			p.radius = (p.m**(1/3) *2)/(p.z/50);
		} else {
			p.radius = (p.m**(1/3) *2);
		}

		
		var fg_tot_x = 0;
		var fg_tot_y = 0;
		var fg_tot_z = 0;
		for (var j = space.length - 1; j >= 0; j--) {
			if(i!=j){
				p2 = space[j];
				var dist = (((p.x - p2.x)**2) + ((p.y - p2.y)**2) + ((p.z - p2.z)**2))**(0.5);
				if (dist > 0.5) {
					var dirX = (p2.x - p.x) / dist;
					var dirY = (p2.y - p.y) / dist;
					var dirZ = (p2.z - p.z) / dist;
					var fg = (G * (p.m) * (p2.m)) / (dist**2);
					fg_tot_x += (fg * dirX); 
					fg_tot_y += (fg * dirY);
					fg_tot_z += (fg * dirZ);
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

function printCoords(){
	for(var i = space.length-1; i>=0; i--){
		console.log(space[i].x, space[i].y);
	}
	}



var number_of_objects = (Math.random()*max_rand_planets) + given_planets;
number_of_objects =  Math.floor(number_of_objects + 3); 
console.log(number_of_objects);

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

	var create_dx = Math.random()* pos_neg_x;
	var create_dy = Math.random() * pos_neg_y;
	var create_dz = Math.random() * pos_neg_z;
	var create_dz =  0;
	space = createPlanet(create_m, create_x, create_y, create_z, create_dx, create_dy, create_dz);
}


function main(){
	console.log(space[0].z, space[0].radius);
	var canvas=document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
	if(run_condition){
		updateCoords();
		ctx.fillStyle="black";
		
		for (var i = space.length - 1; i >= 0; i--) {
			p = space[i];
			if (p.display){
				ctx.globalAlpha = p.aplha;
				ctx.strokeStyle="white";
				ctx.fillStyle="white";
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, p.sAngle, p.endAngle);
				ctx.stroke(); 
				// ctx.fill(); 
			}
		}
		for (var i = space.length - 1; i >= 0; i--) {
			p = space[i];
			if (p.display){
				ctx.strokeStyle="white";
				ctx.lineWidth= 5;
				ctx.fillStyle = "black";
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, p.sAngle, p.endAngle);
				ctx.fill(); 
				// ctx.fillRect(p.x,p.y,p.radius,p.radius);	Math.PI
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
