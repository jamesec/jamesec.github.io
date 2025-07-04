var show = 0;
var slides = document.getElementsByTagName("section");
function update() {
    if (show < 0 || isNaN(show)) show = 0;
    if (show >= slides.length) show = slides.length - 1;
    // url
    url_parts = (document.location + "").split("#");
    document.location = url_parts[0] + "#" + show;
    // slide
    for (var i = 0; i < slides.length; i++) {
        if (i == show) {
            slides[i].style.left = ((window.innerWidth - slides[i].scrollWidth) / 2) + "px";
        } else if (i < show) {
            slides[i].style.left = -window.innerWidth + "px";
        } else {
            slides[i].style.left = 50 + window.innerWidth + "px";
        }
    }
}
document.onkeydown = function(e) {
    var event = window.event ? window.event : e;
    if (event.keyCode == 37) {
        show--;
        event.preventDefault();
    }
    if (event.keyCode == 39) {
        show++;
        event.preventDefault();
    }
    update();
};
// init
var footer = document.getElementsByTagName("footer");
for (var i = 0; i < slides.length; i++) {
    var height = window.innerHeight - 80 - 35*2;
    slides[i].style.height   = height + "px";
    slides[i].style.top      = "40px";
    slides[i].style.width    = Math.round((height/3.0)*4) + "px";
    slides[i].style.fontSize = Math.round(height/15) + "px";
    // move footer into slides (but skip the very first slide)
    if (footer.length > 0 && i > 0) {
        slides[i].appendChild(footer[0].cloneNode(true));
    }
}
// hide original footer
footer[0].style.display = "none";
url_parts = (document.location + "").split("#");
if (url_parts.length == 2) {
    show = parseInt(url_parts[1]);
}
update();
