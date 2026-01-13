const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;

        this.radius = Math.random() * 1.5 + 0.5;

        // 🌙 Dreamy slow movement
        this.speedY = Math.random() * 0.25 + 0.1;

        // 💫 Sideways drift
        this.speedX = Math.random() * 0.3 - 0.15;

        this.opacity = Math.random() * 0.4 + 0.3;
        this.color =
            Math.random() > 0.5
                ? "85,107,47"   // olive green
                : "255,255,255"; // white
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        // float up
        this.y -= this.speedY;

        // sideways drift
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.12;

        // 🖱️ mouse interaction (gentle)
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }
        }

        // reset if out of view
        if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
            this.reset();
        }

        this.draw();
    }
}

// init
for (let i = 0; i < 90; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
}
animate();
