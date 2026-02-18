function showSection(id){

document.querySelectorAll(".section")
.forEach(sec=>sec.classList.remove("active"));

document.getElementById(id)
.classList.add("active");

window.scrollTo({
top:0,
behavior:"smooth"
});

}

function toggleMenu(){

document.getElementById("navLinks")
.classList.toggle("show");

}

function closeMenu(){

document.getElementById("navLinks")
.classList.remove("show");

}


/* INTRO REMOVE */

window.addEventListener("load",()=>{

setTimeout(()=>{

const intro=document.getElementById("intro3d");

if(intro) intro.style.display="none";

},6000);

});


/* ORIGINAL NEURAL BACKGROUND */

const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let mouse={
x:canvas.width/2,
y:canvas.height/2
};

document.addEventListener("mousemove",e=>{
mouse.x=e.clientX;
mouse.y=e.clientY;
});

let particles=[];
const count=180;

class Particle{

constructor(){

this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;

this.vx=(Math.random()-0.5)*0.6;
this.vy=(Math.random()-0.5)*0.6;

}

move(){

let dx=this.x-mouse.x;
let dy=this.y-mouse.y;

let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<150){

this.x+=dx*0.02;
this.y+=dy*0.02;

}

this.x+=this.vx;
this.y+=this.vy;

if(this.x<0)this.x=canvas.width;
if(this.x>canvas.width)this.x=0;
if(this.y<0)this.y=canvas.height;
if(this.y>canvas.height)this.y=0;

}

draw(){

let glow=ctx.createRadialGradient(
this.x,this.y,0,
this.x,this.y,10
);

glow.addColorStop(0,"rgba(255,215,0,1)");
glow.addColorStop(1,"rgba(255,215,0,0)");

ctx.fillStyle=glow;

ctx.beginPath();
ctx.arc(this.x,this.y,2,0,Math.PI*2);
ctx.fill();

}

}

for(let i=0;i<count;i++){
particles.push(new Particle());
}

function connect(){

for(let a=0;a<count;a++){

for(let b=a;b<count;b++){

let dx=particles[a].x-particles[b].x;
let dy=particles[a].y-particles[b].y;

let dist=dx*dx+dy*dy;

if(dist<15000){

ctx.strokeStyle=
"rgba(255,215,0,"+(1-dist/15000)+")";

ctx.lineWidth=0.5;

ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.stroke();

}

}

}

}

function animate(){

ctx.fillStyle="rgba(0,0,0,0.25)";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.move();
p.draw();
});

connect();

requestAnimationFrame(animate);

}

animate();
