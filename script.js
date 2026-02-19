/* ========================= */
/* SECTION SWITCHING */
/* ========================= */

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

/* ========================= */
/* MOBILE MENU */
/* ========================= */

function toggleMenu(){
document.getElementById("navLinks")
.classList.toggle("show");
}

function closeMenu(){
document.getElementById("navLinks")
.classList.remove("show");
}

/* ========================= */
/* INTRO REMOVE */
/* ========================= */

window.addEventListener("load",()=>{
setTimeout(()=>{
const intro=document.getElementById("intro3d");
if(intro) intro.style.display="none";
},6000);
});
/* ========================= */
/* PREMIUM FLOATING LIGHT BACKGROUND */
/* ========================= */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let lights = [];

for(let i=0;i<6;i++){
lights.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
radius:200 + Math.random()*200,
dx:(Math.random()-0.5)*0.3,
dy:(Math.random()-0.5)*0.3
});
}

function animate(){

ctx.fillStyle="#000";
ctx.fillRect(0,0,canvas.width,canvas.height);

lights.forEach(light=>{

let gradient = ctx.createRadialGradient(
light.x,
light.y,
0,
light.x,
light.y,
light.radius
);

gradient.addColorStop(0,"rgba(212,175,55,0.18)");
gradient.addColorStop(1,"transparent");

ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(light.x,light.y,light.radius,0,Math.PI*2);
ctx.fill();

light.x += light.dx;
light.y += light.dy;

if(light.x < 0 || light.x > canvas.width) light.dx *= -1;
if(light.y < 0 || light.y > canvas.height) light.dy *= -1;

});

requestAnimationFrame(animate);
}

animate();
