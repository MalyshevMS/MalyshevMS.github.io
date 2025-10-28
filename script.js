const pages = [
    { name: "Projects", url: "githubprojects/index.html" }
];

const track = document.getElementById("track");

const totalCopies = 10;
for (let i = 0; i < totalCopies; i++) {
    pages.forEach(p => {
        const a = document.createElement("a");
        a.href = p.url;
        a.className = "card";
        a.textContent = p.name;
        track.appendChild(a);
    });
}

let offset = 0;
let speed = 1;
let manualShift = 0;

function animate() {
    offset -= speed + manualShift;
    const trackWidth = track.scrollWidth / totalCopies;
    
    if (Math.abs(offset) >= trackWidth) offset = 0;
    track.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
document.getElementById("year").textContent = new Date().getFullYear();