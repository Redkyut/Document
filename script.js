const teacherName = "William Villanueva";
document.getElementById("teacherName").innerText = teacherName;

const message = `Thank You, Sir ${teacherName}, `;

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

function getCurrentFormattedDate() {
    const now = new Date();

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };
    return now.toLocaleString(undefined, options);
}

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
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.display = "none";
modal.style.alignItems = "center";
modal.style.justifyContent = "center";
modal.style.background = "rgba(0,0,0,0.4)";
modal.style.backdropFilter = "blur(15px)";
modal.style.webkitBackdropFilter = "blur(15px)";
modal.style.transition = "opacity 0.35s ease";
modal.style.zIndex = "1000";
modal.style.opacity = "0";

modalImage.style.transition = "transform 0.35s ease, opacity 0.35s ease";
modalImage.style.transform = "scale(0.9)";
modalImage.style.opacity = "0";

function openModal(imgSrc) {
    modal.style.display = "flex";

    setTimeout(() => {
        modal.style.opacity = "1";
        modalImage.style.transform = "scale(1)";
        modalImage.style.opacity = "1";
    }, 10);

    modalImage.src = imgSrc;
    downloadBtn.href = imgSrc;

    document.getElementById("uploadDate").innerText = "Uploaded on: " + new Date().toLocaleString();
}

function closeModal() {
    modal.style.opacity = "0";
    modalImage.style.transform = "scale(0.9)";
    modalImage.style.opacity = "0";

    setTimeout(() => {
        modal.style.display = "none";
    }, 350);
}

images.forEach(img => {
    img.addEventListener("click", () => {
        openModal(img.src);
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
    }
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

closeBtn.addEventListener("click", closeModal);

let startY = 0;
let currentY = 0;
let isDragging = false;

modalImage.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    isDragging = true;
});

modalImage.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentY = e.touches[0].clientY;
    let diff = currentY - startY;

    if (diff > 0) {
        modalImage.style.transform = `translateY(${diff}px) scale(1)`;
        modal.style.opacity = 1 - diff / 600;
    }
});

modalImage.addEventListener("touchend", () => {
    isDragging = false;
    let diff = currentY - startY;

    if (diff > 120) {
        closeModal();
    } else {
        modalImage.style.transition = "0.3s ease";
        modalImage.style.transform = "translateY(0) scale(1)";
        modal.style.opacity = "1";

        setTimeout(() => {
            modalImage.style.transition = "";
        }, 300);
    }
});

const blackCloseBtn = document.createElement("div");

blackCloseBtn.innerHTML = "X";

blackCloseBtn.style.position = "absolute";
blackCloseBtn.style.top = "-45px";
blackCloseBtn.style.right = "0";
blackCloseBtn.style.fontSize = "28px";
blackCloseBtn.style.fontWeight = "bold";
blackCloseBtn.style.color = "#000";
blackCloseBtn.style.background = "#fff";
blackCloseBtn.style.width = "40px";
blackCloseBtn.style.height = "40px";
blackCloseBtn.style.borderRadius = "50%";
blackCloseBtn.style.display = "flex";
blackCloseBtn.style.alignItems = "center";
blackCloseBtn.style.justifyContent = "center";
blackCloseBtn.style.cursor = "pointer";
blackCloseBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
blackCloseBtn.style.transition = "0.3s ease";
blackCloseBtn.style.zIndex = "1003";

blackCloseBtn.addEventListener("mouseenter", () => {
    blackCloseBtn.style.transform = "scale(1.1)";
});
blackCloseBtn.addEventListener("mouseleave", () => {
    blackCloseBtn.style.transform = "scale(1)";
});
blackCloseBtn.addEventListener("click", closeModal);
modalImage.parentElement.style.position = "relative";
modalImage.parentElement.appendChild(blackCloseBtn);