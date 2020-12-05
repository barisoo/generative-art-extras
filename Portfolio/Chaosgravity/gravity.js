var space = [];
const G = 6.67408 * 10**(-3);	 // 6.67408 * (10**-11)
var run_condition = false;
class planet{
	constructor(m, x, y, dx, dy){
		this.m = m;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.display = true;
		this.radius = m**(1/3) *2;
		if (this.radius < 0) {
			this.radius = 0.01
		}

		this.sAngle = 0;
		this.endAngle = 2*Math.PI;
	}

	}

function createPlanet(m,x,y,dx,dy){
	var pp = new planet(m,x,y, dx,dy);
	space.push(pp);
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
	var deleted = []
	for (var i = space.length - 1; i >= 0; i--) {
		p = space[i];
		p.x += p.dx;
		p.y += p.dy;
		var fg_tot_x = 0;
		var fg_tot_y = 0;
		for (var j = space.length - 1; j >= 0; j--) {
			if(i!=j){
				p2 = space[j];
				var dist = (((p.x - p2.x)**2) + ((p.y - p2.y)**2))**(0.5);


				var dirX = (p2.x - p.x) / dist;
				var dirY = (p2.y - p.y) / dist;
				var fg = (G * (p.m) * (p2.m)) / (dist**2);
				fg_tot_x += (fg * dirX); 
				fg_tot_y += (fg * dirY);

				var deletionMass = 0.0000000001;


				if (dist < (p.radius+ p2.radius)/2 && p2.m !=deletionMass) {
					if (p2.m > p.m) {
						var h = p2;
						p2 = p;
						p = h;
						deleted.push(i);
					} else{
						deleted.push(j);
					}
					p.m += p2.m;
					var ndx = ((p.m * p.dx) + (p2.m * p2.dx)) / (p.m + p2.m);
					var ndy = ((p.m * p.dy) + (p2.m * p2.dy)) / (p.m + p2.m);
					p.m += p2.m;
					p.dx = ndx;
					p.dy = ndy;
					// p.radius +=3;
					p.radius =  m**(1/3) * 2;

					p2.m = deletionMass;
					p2.radius = 100000;
					p2.x = 0;
					p2.y = 0;
					p2.dx = 0;
					p2.dy = 0;
					// p2.display = false;
				}

				//console.log(dist);

			}
		var accel_x = fg_tot_x / p.m;
		var accel_y = fg_tot_y / p.m;
		p.dx += accel_x;
		p.dy += accel_y;
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

// createPlanet(50, 365, 500, 0, 0);
// createPlanet(50000, 100, 100, 0, 0);
// createPlanet(500, 700, 400, 0, 0);
// createPlanet(300, 365*(1/3), 500,0, 0);
// createPlanet(30, 100*(1/3), 100,0, 0);
// createPlanet(70000, 700*(1/3), 400,0, 0);





createPlanet(500, 365, 500, 0.05, -0.08);
createPlanet(500, 100, 100, 0.1, 0.1);
createPlanet(500, 700, 400, -0.03, 0);
createPlanet(300, 365*(1/3), 500, 0.05, -0.08);
createPlanet(300, 100*(1/3), 100, 0.1, 0.1);
createPlanet(300, 700*(1/3), 400, -0.03, 0);


function main(){
	// for (var i = 100000; i >= 0; i--) {
	if(run_condition){
		updateCoords();
		ctx.fillStyle="black";
		// ctx.fillRect(0,0,canv.width,canv.height);
		for (var i = space.length - 1; i >= 0; i--) {
			p = space[i];
			if (p.display){
				ctx.strokeStyle="white";
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, p.sAngle, p.endAngle);
				ctx.stroke(); 
				// ctx.fillRect(p.x,p.y,p.radius,p.radius);	Math.PI
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
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    setInterval(main,1);
	}	

function Add(){
	canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);
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
	createPlanet(mass,xpos,ypos,xvel,yvel);
	document.getElementById("counter").innerHTML = space.length;
	
	}

// window.onload = function(){
// 	//document.getElementById("counter").innerHTML = space.length;
// 	//document.addEventListener("keydown",enter);
// }


function Stop(){
	run_condition = false;
	}

function Reset(){
	run_condition = false;
	canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);
	space = [];
	document.getElementById("counter").innerHTML = space.length;
}

// // function enter(evt){
// 	switch(evt.keyCode){
// 		case 13:
// 			Add();
// 			break;
// 		default:
// 			// run_condition = run_condition;
// 			break;

// 	}
// 	}

window.onload = function(){
	ctx.fillRect(0,0,canv.width,canv.height);
	console.log("Na");
}