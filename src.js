function Particle(x,y) {
	this.pos = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	
	this.update = function() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}
	
	this.show = function() {
		point(this.pos.x, this.pos.y);
	}
}

function Firework() {
	this.body = new Particle(random(width),height);
	this.body.vel.add(createVector(0,random(-8,-10)));
	this.exploded = false;
	this.age = 0
	
	this.particles = [];
	
	this.update = function() {
		if(!this.exploded) {
			this.body.acc.add(createVector(0,0.2));
			this.body.update();

			if(this.body.vel.y >= 0) {
				this.exploded = true;
				this.explode()
			}
		} else {
			for(var i = this.particles.length - 1; i>=0; i--) {
				this.particles[i].acc.add(createVector(0,0.2));
				this.particles[i].vel.mult(0.9);
				this.particles[i].update();
			}
			this.age++;
		}
	}
	
	this.show = function() {
		stroke(255);
		if(!this.exploded) {
			strokeWeight(4);
			this.body.show();
		} else {
			strokeWeight(2);
			for(var i = this.particles.length - 1; i>=0; i--) {
				this.particles[i].show();
			}
		}
		

	}
	
	this.explode = function() {
		for(var i = 0; i<100; i++) {
			this.particles.push(new Particle(this.body.pos.x, this.body.pos.y));
			this.particles[i].vel.add(p5.Vector.random2D().mult(random(5)));
		}
	}
}

var fireworks = [];

function setup() {
	createCanvas(400, 300);
}

function draw() {
	background(0,0,0,5);
	//background(0);
	
	
	if(random(1) < 0.1) {	
		fireworks.push(new Firework());
	}
	stroke(255);
	strokeWeight(4);
	for(var i = fireworks.length - 1; i>=0; i--) {
		fireworks[i].update();
		fireworks[i].show();
		if(fireworks[i].exploded && fireworks[i].age > 32) {
			fireworks.splice(i,1)
		}
	}
}
