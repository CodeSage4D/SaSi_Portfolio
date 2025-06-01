const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let dots = [];
const numDots = 80;
const connectDistance = 100;
const cursorRadius = 80;

// Dot class
class Dot {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = 3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(128, 0, 128, 0.8)'; // Purple dots
        ctx.fill();
    }

    update(cursor) {
        // Move dot
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Cursor interaction
        if (cursor.x && cursor.y) {
            const dx = cursor.x - this.x;
            const dy = cursor.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < cursorRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (cursorRadius - distance) / cursorRadius;
                this.vx -= Math.cos(angle) * force * 0.5;
                this.vy -= Math.sin(angle) * force * 0.5;
            }
        }
    }
}

// Connect dots
function connectDots() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectDistance) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = `rgba(128, 0, 128, ${1 - distance / connectDistance})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);

    dots.forEach(dot => {
        dot.update(cursor);
        dot.draw();
    });

    connectDots();
    requestAnimationFrame(animate);
}

// Resize canvas
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector('.hero').offsetHeight;
}

// Cursor position
let cursor = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});
window.addEventListener('mouseout', () => {
    cursor.x = null;
    cursor.y = null;
});

// Initialize
function init() {
    resizeCanvas();
    dots = Array.from({ length: numDots }, () => new Dot());
    animate();
}

window.addEventListener('resize', resizeCanvas);
init();