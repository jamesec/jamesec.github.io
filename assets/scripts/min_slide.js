// min_slide.js, forked from https://github.com/rwos/minslide

var show = 0;
var slides = [];

function update() {
    if (show < 0 || isNaN(show)) show = 0;
    if (show >= slides.length) show = slides.length - 1;

    // Update URL hash
    const urlParts = (document.location + "").split("#");
    document.location = urlParts[0] + "#" + show;

    // Position slides
    for (let i = 0; i < slides.length; i++) {
        if (i === show) {
            // Center current slide horizontally
            slides[i].style.left = ((window.innerWidth - slides[i].scrollWidth) / 2) + "px";
        } else if (i < show) {
            slides[i].style.left = -window.innerWidth + "px"; // offscreen left
        } else {
            slides[i].style.left = window.innerWidth + 50 + "px"; // offscreen right
        }
    }
}

document.onkeydown = function(e) {
    var event = window.event ? window.event : e;
    if (event.keyCode === 37) { // left arrow
        show--;
        event.preventDefault();
    }
    if (event.keyCode === 39) { // right arrow
        show++;
        event.preventDefault();
    }
    update();
};

// Called after slides are loaded and inserted in DOM
function initializeSlides() {
    slides = document.getElementsByTagName("section");

    for (let i = 0; i < slides.length; i++) {
        let height = window.innerHeight - 80 - 70; // 80 + (padding * 2)
        slides[i].style.height = height + "px";
        slides[i].style.top = "40px";

        // Maintain 4:3 aspect ratio width based on height
        slides[i].style.width = Math.round((height / 3) * 4) + "px";

        slides[i].style.fontSize = Math.round(height / 15) + "px";
    }

    // Restore current slide from URL hash if present
    const urlParts = (document.location + "").split("#");
    if (urlParts.length === 2) {
        const parsed = parseInt(urlParts[1]);
        if (!isNaN(parsed)) {
            show = parsed;
        }
    }

    update();
}

// Touch support for mobile devices
let touchStartX = null;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(e) {
    if (touchStartX === null) return;
    let touchEndX = e.changedTouches[0].screenX;
    let deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) { // minimum swipe distance
        if (deltaX > 0) {
            show--; // swipe right → previous slide
        } else {
            show++; // swipe left → next slide
        }
        update();
    }

    touchStartX = null;
}, false);
