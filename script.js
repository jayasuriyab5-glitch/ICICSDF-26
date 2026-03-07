/* ========================= */
/* SECTION SWITCHING */
/* ========================= */

function showSection(id){
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });

  const target = document.getElementById(id);
  if(target){
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ========================= */
/* MOBILE MENU */
/* ========================= */

function toggleMenu(){
  const navLinks = document.getElementById("navLinks");
  if(navLinks){
    navLinks.classList.toggle("show");
  }
}

function closeMenu(){
  const navLinks = document.getElementById("navLinks");
  if(navLinks){
    navLinks.classList.remove("show");
  }
}

/* ========================= */
/* OPEN BOOK REVEAL */
/* ========================= */

function openBookReveal(){
  showSection("bookReveal");
}

/* ========================= */
/* BOOK REVEAL ELEMENTS */
/* ========================= */

const revealFullscreen = document.getElementById("revealFullscreen");
const bookClosed = document.getElementById("bookClosed");
const closedBookImg = document.getElementById("closedBookImg");
const bookSpread = document.getElementById("bookSpread");
const leftStaticPage = document.getElementById("leftStaticPage");
const rightStaticPage = document.getElementById("rightStaticPage");
const flipPage = document.getElementById("flipPage");
const flipSheet = document.getElementById("flipSheet");
const flipPageImg = document.getElementById("flipPageImg");
const counter = document.getElementById("counter");
const finalMessage = document.getElementById("finalMessage");

let revealTimers = [];
let running = false;

/* ========================= */
/* IMAGE HELPER */
/* ========================= */

function setImg(el, src){
  el.onerror = () => {
    console.error("Failed to load image:", src);
  };
  el.src = src;
}

/* ========================= */
/* TIMER HELPERS */
/* ========================= */

function wait(ms, fn){
  const id = setTimeout(fn, ms);
  revealTimers.push(id);
  return id;
}

function clearRevealTimers(){
  revealTimers.forEach(id => clearTimeout(id));
  revealTimers = [];
}

/* ========================= */
/* FULLSCREEN HELPERS */
/* ========================= */

function showRevealOverlay(){
  revealFullscreen.classList.add("show");
  document.body.style.overflow = "hidden";

  if(revealFullscreen.requestFullscreen){
    revealFullscreen.requestFullscreen().catch(() => {});
  }
}

function hideRevealOverlay(){
  revealFullscreen.classList.remove("show");
  document.body.style.overflow = "";

  if(document.fullscreenElement && document.exitFullscreen){
    document.exitFullscreen().catch(() => {});
  }
}

/* ========================= */
/* FLIP RESET */
/* ========================= */

function resetFlipState(){
  flipPage.classList.remove("flipping");

  if(flipSheet){
    flipSheet.style.transition = "none";
    flipSheet.style.transform = "rotateY(0deg)";
    void flipSheet.offsetWidth;
    flipSheet.style.transition = "";
  }
}

/* ========================= */
/* REVEAL RESET */
/* ========================= */

function resetReveal(){
  clearRevealTimers();
  running = false;

  bookClosed.classList.remove("hide");
  bookSpread.classList.remove("show");

  resetFlipState();
  flipPage.style.display = "block";

  setImg(closedBookImg, "pages/page1.jpg");
  setImg(leftStaticPage, "pages/page2.jpg");
  setImg(rightStaticPage, "pages/page3.jpg");
  setImg(flipPageImg, "pages/page3.jpg");

  counter.textContent = "1 / 6";
  finalMessage.classList.remove("show");
}

/* ========================= */
/* OPEN BOOK */
/* ========================= */

function openBook(){
  bookClosed.classList.add("hide");

  wait(500, () => {
    bookSpread.classList.add("show");

    setImg(leftStaticPage, "pages/page2.jpg");
    setImg(rightStaticPage, "pages/page3.jpg");
    setImg(flipPageImg, "pages/page3.jpg");

    resetFlipState();
    flipPage.style.display = "block";

    counter.textContent = "2 - 3 / 6";
  });
}

/* ========================= */
/* FLIP TO 4-5 */
/* ========================= */

function flipTo45(){
  resetFlipState();

  setImg(flipPageImg, "pages/page3.jpg");
  setImg(rightStaticPage, "pages/page5.jpg");
  flipPage.style.display = "block";

  wait(50, () => {
    flipPage.classList.add("flipping");
  });

  wait(2900, () => {
    resetFlipState();
    flipPage.style.display = "none";

    setImg(leftStaticPage, "pages/page4.jpg");
    setImg(rightStaticPage, "pages/page5.jpg");
    counter.textContent = "4 - 5 / 6";
  });
}

/* ========================= */
/* FLIP TO 6 */
/* ========================= */

function flipTo6(){
  flipPage.style.display = "block";
  resetFlipState();

  setImg(leftStaticPage, "pages/page4.jpg");
  setImg(rightStaticPage, "pages/page5.jpg");
  setImg(flipPageImg, "pages/page5.jpg");

  wait(50, () => {
    flipPage.classList.add("flipping");
  });

  wait(2900, () => {
    resetFlipState();
    flipPage.style.display = "none";

    setImg(rightStaticPage, "pages/page6.jpg");
    bookSpread.classList.remove("show");

    wait(300, () => {
      setImg(closedBookImg, "pages/page6.jpg");
      bookClosed.classList.remove("hide");
      counter.textContent = "6 / 6";
    });
  });
}

/* ========================= */
/* START SEQUENCE */
/* ========================= */

function startRevealSequence(){
  if(running) return;

  resetReveal();
  showRevealOverlay();
  running = true;

  wait(300, () => {
    openBook();

    wait(2200, () => {
      flipTo45();

      wait(6700, () => {
        flipTo6();

        wait(4600, () => {
          finalMessage.classList.add("show");

          wait(2600, () => {
            running = false;
            hideRevealOverlay();
          });
        });
      });
    });
  });
}

/* ========================= */
/* ESC CLOSE */
/* ========================= */

document.addEventListener("keydown", e => {
  if(e.key === "Escape" && revealFullscreen.classList.contains("show")){
    hideRevealOverlay();
    resetReveal();
  }
});

/* ========================= */
/* PREMIUM FLOATING LIGHT BACKGROUND */
/* ========================= */

const bgCanvas = document.getElementById("bg");
const bgCtx = bgCanvas.getContext("2d");

function resizeBgCanvas(){
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

resizeBgCanvas();
window.addEventListener("resize", resizeBgCanvas);

let lights = [];

for(let i = 0; i < 6; i++){
  lights.push({
    x: Math.random() * bgCanvas.width,
    y: Math.random() * bgCanvas.height,
    radius: 200 + Math.random() * 200,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  });
}

function animateBackground(){
  bgCtx.fillStyle = "#000";
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  lights.forEach(light => {
    const gradient = bgCtx.createRadialGradient(
      light.x,
      light.y,
      0,
      light.x,
      light.y,
      light.radius
    );

    gradient.addColorStop(0, "rgba(212,175,55,0.18)");
    gradient.addColorStop(1, "transparent");

    bgCtx.fillStyle = gradient;
    bgCtx.beginPath();
    bgCtx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
    bgCtx.fill();

    light.x += light.dx;
    light.y += light.dy;

    if(light.x < 0 || light.x > bgCanvas.width) light.dx *= -1;
    if(light.y < 0 || light.y > bgCanvas.height) light.dy *= -1;
  });

  requestAnimationFrame(animateBackground);
}

animateBackground();
