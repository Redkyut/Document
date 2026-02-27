const teacherName = "Sir William Villanueva";
document.getElementById("teacherName").innerText = teacherName;

const message = `Thank You, ${teacherName}, `;

const typewriter = document.getElementById("typewriter");
let i = 0;

function typeEffect() {
    if (i < message.length) {
        typewriter.innerHTML = message.charAt(i);
        i++;
        setTimeout(typeEffect, 40);
    }
}
typeEffect();

function equalizeImages() {
    const images = document.querySelectorAll(".gallery-img");
    let maxHeight = 0;

    images.forEach(img => {
        if (img.offsetHeight > maxHeight) {
            maxHeight = img.offsetHeight;
        }
    });

    images.forEach(img => {
        img.style.height = maxHeight + "px";
    });
}

window.addEventListener("load", equalizeImages);
window.addEventListener("resize", equalizeImages);

const images = document.querySelectorAll(".gallery-img");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const downloadBtn = document.getElementById("downloadBtn");

images.forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImage.src = img.src;
        downloadBtn.href = img.src;

        downloadBtn.style.display = "inline-block";
    });
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.getElementById("themeToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "<i class='bi bi-volume-down-fill'></i>";
    } else {
        music.pause();
            musicBtn.innerHTML = "<i class='bi bi-music-note-beamed'></i>";
        }
});
const sections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});
sections.forEach(section => observer.observe(section));

function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const emojis = ["💗", "🌸"];
    particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = (Math.random() * 3 + 4) + "s";

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 7000);
}

setInterval(createParticle, 900);