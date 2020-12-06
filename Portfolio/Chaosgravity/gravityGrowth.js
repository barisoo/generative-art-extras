var background_color = "black";
var run_condition = true;
var space = [];
const G = 6.67408 * 10**(-3);
const z_axis_initial_max = 100;
const max_rand_planets =30;
const given_planets = 5;
const growth_frames = 6000;
var shrink_frames = Math.random() * 100000;
var current_frame = 0;
const line_color = "red";

window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
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

function updateCoords(){
	// console.log("updating coords...")
	current_frame++;
	var deleted = [];
	for (var i = space.length - 1; i >= 0; i--) {
		p = space[i];
		p.x += p.dx;
		p.y += p.dy;
		p.z += 0.01;
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

		
		var fg_tot_x = 0;
		var fg_tot_y = 0;
		var fg_tot_z = 0;
		for (var j = space.length - 1; j >= 0; j--) {
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
				ctx.strokeStyle=line_color;
				ctx.fillStyle=line_color;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, p.sAngle, p.endAngle);
				ctx.stroke(); 
				// ctx.fill(); 
			}
		}
	} 
	}

