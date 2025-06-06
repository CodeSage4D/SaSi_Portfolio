const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('particle-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0xE6E6FA, 0.6);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xE6E6FA, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 6000;
const posArray = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 12;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x8A2BE2,
    blending: THREE.AdditiveBlending,
    transparent: true
});
const particles = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particles);

function animateParticles() {
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.0008 + positions[i]) * 0.008;
        if (positions[i + 1] > 6) positions[i + 1] = -6;
    }
    particlesGeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
}
animateParticles();

const cubeScene = new THREE.Scene();
const cubeCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const cubeRenderer = new THREE.WebGLRenderer({ alpha: true });
cubeRenderer.setSize(250, 250);
document.querySelector('.three-cubes').appendChild(cubeRenderer.domElement);
cubeCamera.position.z = 6;

const cubeGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x4169E1 });
const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube1.position.set(-2.5, 0, 0);
cube2.position.set(0, 0, 0);
cube3.position.set(2.5, 0, 0);
cubeScene.add(cube1, cube2, cube3);
cubeScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
cubeScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateCubes() {
    cube1.rotation.x += 0.012;
    cube1.rotation.y += 0.012;
    cube2.rotation.x += 0.018;
    cube2.rotation.y += 0.018;
    cube3.rotation.x += 0.024;
    cube3.rotation.y += 0.024;
    cubeRenderer.render(cubeScene, cubeCamera);
    requestAnimationFrame(animateCubes);
}
animateCubes();

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ?
        '<i class="bi bi-sun-fill fs-5"></i>' : '<i class="bi bi-moon-stars-fill fs-5"></i>';
    gsap.from(themeToggle, { rotation: 360, duration: 0.5 });
    updateThreeColors();
});

function updateThreeColors() {
    const isDark = document.body.classList.contains('dark-mode');
    const color = isDark ? 0x8A2BE2 : 0xE6E6FA;
    particleMaterial.color.setHex(color);
    cubeMaterial.color.setHex(color);
    sphereMaterial.color.setHex(isDark ? 0x4169E1 : 0x9370DB);
    torusMaterial.color.setHex(isDark ? 0xE6E6FA : 0x8A2BE2);
    skillMaterial.color.setHex(isDark ? 0x9370DB : 0x4169E1);
    projectMaterial.color.setHex(isDark ? 0x4169E1 : 0xE6E6FA);
    certMaterial.color.setHex(isDark ? 0xE6E6FA : 0x9370DB);
    blogMaterial.color.setHex(isDark ? 0x9370DB : 0x8A2BE2);
}

const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
    });

    const typingElement = document.querySelector('.typing-name');
    const text = 'Software Programmer';
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(type, 150);
        }
    }
    setTimeout(type, 0);

    const cursor = document.querySelector('.custom-cursor');
    const orb = document.querySelector('.cursor-orb');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        orb.style.left = `${e.clientX}px`;
        orb.style.top = `${e.clientY}px`;
    });

    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    });

    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
});

const typingText = document.querySelector('.typing-name');
const typingWords = ['Sanskrati Shukla', 'A Developer', 'An Innovator', 'A Problem Solver'];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeEffect() {
    const currentWord = typingWords[typingIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            typingIndex = (typingIndex + 1) % typingWords.length;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    }
    setTimeout(typeEffect, isDeleting ? 60 : 120);
}
typeEffect();

const aboutTyping = document.querySelector('.about-intro');
const aboutText = aboutTyping.textContent;
aboutTyping.textContent = '';
let aboutCharIndex = 0;
function typeAbout() {
    if (aboutCharIndex < aboutText.length) {
        aboutTyping.textContent += aboutText.charAt(aboutCharIndex++);
        setTimeout(typeAbout, 60);
    }
}
typeAbout();

const projectButtons = document.querySelectorAll('[data-project]');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const projectDetails = {
    1: { title: 'Task Manager CLI', description: 'A Python-based CLI tool for task management with priority sorting and reminders.' },
    2: { title: 'Portfolio', description: 'Dynamic portfolio with 3D animations using Three.js and responsive design.' },
    3: { title: 'Data Visualization Dashboard', description: 'Interactive dashboard for real-time data analysis using Python and Flask.' },
    4: { title: 'Algorithm Library', description: 'Optimized C++ algorithms for competitive programming.' },
    5: { title: 'E-commerce Platform', description: 'Full-stack e-commerce site with React and Node.js.' },
    6: { title: 'AI-Powered Chatbot', description: 'NLP-driven chatbot for customer support using TensorFlow.' }
};
projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        modalTitle.textContent = projectDetails[projectId].title;
        modalDescription.textContent = projectDetails[projectId].description;
        gsap.from('.modal-content', { opacity: 0, scale: 0.9, duration: 0.4 });
    });
});

const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 150;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 15);
        } else {
            counter.innerText = target;
        }
    };
    gsap.from(counter, { opacity: 0, y: 30, duration: 0.8, scrollTrigger: { trigger: counter, start: 'top 85%' } });
    updateCounter();
});

const quotes = [
    "Code is art in motion.",
    "Innovation sparks progress.",
    "Technology shapes the future.",
    "Every challenge is a coding adventure.",
    "Create with passion, solve with precision."
];
const randomQuote = document.getElementById('random-quote');
randomQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
gsap.from(randomQuote, { opacity: 0, y: 25, duration: 0.8, scrollTrigger: { trigger: randomQuote, start: 'top 85%' } });

const cursor = document.querySelector('.custom-cursor');
const cursorOrb = document.querySelector('.cursor-orb');
document.addEventListener('mousemove', e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08 });
    gsap.to(cursorOrb, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'power2.out' });
});

const sphereScene = new THREE.Scene();
const sphereCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const sphereRenderer = new THREE.WebGLRenderer({ alpha: true });
sphereRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('home').appendChild(sphereRenderer.domElement);
sphereCamera.position.z = 6;

const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1, wireframe: true });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereScene.add(sphere);
sphereScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
sphereScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateSphere() {
    sphere.rotation.y += 0.008;
    sphere.rotation.x += 0.008;
    sphereRenderer.render(sphereScene, sphereCamera);
    requestAnimationFrame(animateSphere);
}
animateSphere();

const torusScene = new THREE.Scene();
const torusCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const torusRenderer = new THREE.WebGLRenderer({ alpha: true });
torusRenderer.setSize(220, 220);
document.getElementById('about').appendChild(torusRenderer.domElement);
torusCamera.position.z = 6;

const torusGeometry = new THREE.TorusGeometry(1.1, 0.35, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x9370DB });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torusScene.add(torus);
torusScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
torusScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateTorus() {
    torus.rotation.x += 0.012;
    torus.rotation.y += 0.012;
    torusRenderer.render(torusScene, torusCamera);
    requestAnimationFrame(animateTorus);
}
animateTorus();

const skillScene = new THREE.Scene();
const skillCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const skillRenderer = new THREE.WebGLRenderer({ alpha: true });
skillRenderer.setSize(320, 320);
document.getElementById('skills').appendChild(skillRenderer.domElement);
skillCamera.position.z = 6;

const skillGeometry = new THREE.IcosahedronGeometry(1.1, 0);
const skillMaterial = new THREE.MeshStandardMaterial({ color: 0x9370DB });
const skillMesh = new THREE.Mesh(skillGeometry, skillMaterial);
skillScene.add(skillMesh);
skillScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
skillScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateSkillMesh() {
    skillMesh.rotation.x += 0.015;
    skillMesh.rotation.y += 0.015;
    skillRenderer.render(skillScene, skillCamera);
    requestAnimationFrame(animateSkillMesh);
}
animateSkillMesh();

const projectScene = new THREE.Scene();
const projectCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const projectRenderer = new THREE.WebGLRenderer({ alpha: true });
projectRenderer.setSize(420, 420);
document.getElementById('projects').appendChild(projectRenderer.domElement);
projectCamera.position.z = 6;

const projectGeometry = new THREE.DodecahedronGeometry(1.1, 0);
const projectMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
const projectMesh = new THREE.Mesh(projectGeometry, projectMaterial);
projectScene.add(projectMesh);
projectScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
projectScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateProjectMesh() {
    projectMesh.rotation.x += 0.018;
    projectMesh.rotation.y += 0.018;
    projectRenderer.render(projectScene, projectCamera);
    requestAnimationFrame(animateProjectMesh);
}
animateProjectMesh();

const certScene = new THREE.Scene();
const certCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const certRenderer = new THREE.WebGLRenderer({ alpha: true });
certRenderer.setSize(320, 320);
document.getElementById('certifications').appendChild(certRenderer.domElement);
certCamera.position.z = 6;

const certGeometry = new THREE.OctahedronGeometry(1.1, 0);
const certMaterial = new THREE.MeshStandardMaterial({ color: 0xE6E6FA });
const certMesh = new THREE.Mesh(certGeometry, certMaterial);
certScene.add(certMesh);
certScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
certScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateCertMesh() {
    certMesh.rotation.x += 0.012;
    certMesh.rotation.y += 0.012;
    certRenderer.render(certScene, certCamera);
    requestAnimationFrame(animateCertMesh);
}
animateCertMesh();

const blogScene = new THREE.Scene();
const blogCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const blogRenderer = new THREE.WebGLRenderer({ alpha: true });
blogRenderer.setSize(320, 320);
document.getElementById('blog').appendChild(blogRenderer.domElement);
blogCamera.position.z = 6;

const blogGeometry = new THREE.TetrahedronGeometry(1.1, 0);
const blogMaterial = new THREE.MeshStandardMaterial({ color: 0x9370DB });
const blogMesh = new THREE.Mesh(blogGeometry, blogMaterial);
blogScene.add(blogMesh);
blogScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
blogScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateBlogMesh() {
    blogMesh.rotation.x += 0.015;
    blogMesh.rotation.y += 0.015;
    blogRenderer.render(blogScene, blogCamera);
    requestAnimationFrame(animateBlogMesh);
}
animateBlogMesh();

const interactiveSphereScene = new THREE.Scene();
const interactiveSphereCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const interactiveSphereRenderer = new THREE.WebGLRenderer({ alpha: true });
interactiveSphereRenderer.setSize(320, 320);
document.getElementById('home').appendChild(interactiveSphereRenderer.domElement);
interactiveSphereCamera.position.z = 6;

const interactiveSphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
const interactiveSphereMaterial = new THREE.MeshStandardMaterial({ color: 0x8A2BE2, wireframe: true });
const interactiveSphere = new THREE.Mesh(interactiveSphereGeometry, interactiveSphereMaterial);
interactiveSphereScene.add(interactiveSphere);
interactiveSphereScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
interactiveSphereScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

document.addEventListener('mousemove', e => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    gsap.to(interactiveSphere.rotation, { x: mouseY * 0.6, y: mouseX * 0.6, duration: 0.4 });
});

function animateInteractiveSphere() {
    interactiveSphereRenderer.render(interactiveSphereScene, interactiveSphereCamera);
    requestAnimationFrame(animateInteractiveSphere);
}
animateInteractiveSphere();

const particleSphereScene = new THREE.Scene();
const particleSphereCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const particleSphereRenderer = new THREE.WebGLRenderer({ alpha: true });
particleSphereRenderer.setSize(420, 420);
document.getElementById('about').appendChild(particleSphereRenderer.domElement);
particleSphereCamera.position.z = 6;

const particleSphereGeometry = new THREE.BufferGeometry();
const particleSphereCount = 2500;
const particleSpherePos = new Float32Array(particleSphereCount * 3);
for (let i = 0; i < particleSphereCount * 3; i += 3) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.8;
    particleSpherePos[i] = r * Math.sin(phi) * Math.cos(theta);
    particleSpherePos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    particleSpherePos[i + 2] = r * Math.cos(phi);
}
particleSphereGeometry.setAttribute('position', new THREE.BufferAttribute(particleSpherePos, 3));
const particleSphereMaterial = new THREE.PointsMaterial({ size: 0.018, color: 0x9370DB });
const particleSphere = new THREE.Points(particleSphereGeometry, particleSphereMaterial);
particleSphereScene.add(particleSphere);
particleSphereScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
particleSphereScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateParticleSphere() {
    particleSphere.rotation.y += 0.006;
    particleSphereRenderer.render(particleSphereScene, particleSphereCamera);
    requestAnimationFrame(animateParticleSphere);
}
animateParticleSphere();

const ringScene = new THREE.Scene();
const ringCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const ringRenderer = new THREE.WebGLRenderer({ alpha: true });
ringRenderer.setSize(220, 220);
document.getElementById('services').appendChild(ringRenderer.domElement);
ringCamera.position.z = 6;

const ringGeometry = new THREE.RingGeometry(0.6, 1.1, 32);
const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1, side: THREE.DoubleSide });
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
ringScene.add(ringMesh);
ringScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
ringScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateRingMesh() {
    ringMesh.rotation.x += 0.012;
    ringMesh.rotation.y += 0.012;
    ringRenderer.render(ringScene, ringCamera);
    requestAnimationFrame(animateRingMesh);
}
animateRingMesh();

const skillHoverScene = new THREE.Scene();
const skillHoverCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const skillHoverRenderer = new THREE.WebGLRenderer({ alpha: true });
skillHoverRenderer.setSize(160, 160);
document.querySelector('.skills-grid').appendChild(skillHoverRenderer.domElement);
skillHoverCamera.position.z = 6;

const skillHoverGeometry = new THREE.SphereGeometry(0.6, 16, 16);
const skillHoverMaterial = new THREE.MeshStandardMaterial({ color: 0x8A2BE2 });
const skillHoverMesh = new THREE.Mesh(skillHoverGeometry, skillHoverMaterial);
skillHoverScene.add(skillHoverMesh);
skillHoverScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
skillHoverScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateSkillHoverMesh() {
    skillHoverMesh.rotation.y += 0.015;
    skillHoverRenderer.render(skillHoverScene, skillHoverCamera);
    requestAnimationFrame(animateSkillHoverMesh);
}
animateSkillHoverMesh();

const projectHoverScene = new THREE.Scene();
const projectHoverCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const projectHoverRenderer = new THREE.WebGLRenderer({ alpha: true });
projectHoverRenderer.setSize(160, 160);
document.querySelector('.project-carousel').appendChild(projectHoverRenderer.domElement);
projectHoverCamera.position.z = 6;

const projectHoverGeometry = new THREE.TorusKnotGeometry(0.6, 0.12, 100, 16);
const projectHoverMaterial = new THREE.MeshStandardMaterial({ color: 0x9370DB });
const projectHoverMesh = new THREE.Mesh(projectHoverGeometry, projectHoverMaterial);
projectHoverScene.add(projectHoverMesh);
projectHoverScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
projectHoverScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateProjectHoverMesh() {
    projectHoverMesh.rotation.y += 0.018;
    projectHoverRenderer.render(projectHoverScene, projectHoverCamera);
    requestAnimationFrame(animateProjectHoverMesh);
}
animateProjectHoverMesh();

const certHoverScene = new THREE.Scene();
const certHoverCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const certHoverRenderer = new THREE.WebGLRenderer({ alpha: true });
certHoverRenderer.setSize(160, 160);
document.querySelector('.certifications-grid').appendChild(certHoverRenderer.domElement);
certHoverCamera.position.z = 6;

const certHoverGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
const certHoverMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
const certHoverMesh = new THREE.Mesh(certHoverGeometry, certHoverMaterial);
certHoverScene.add(certHoverMesh);
certHoverScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
certHoverScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateCertHoverMesh() {
    certHoverMesh.rotation.y += 0.012;
    certHoverRenderer.render(certHoverScene, certHoverCamera);
    requestAnimationFrame(animateCertHoverMesh);
}
animateCertHoverMesh();

const blogHoverScene = new THREE.Scene();
const blogHoverCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const blogHoverRenderer = new THREE.WebGLRenderer({ alpha: true });
blogHoverRenderer.setSize(160, 160);
document.querySelector('.blog-grid').appendChild(blogHoverRenderer.domElement);
blogHoverCamera.position.z = 6;

const blogHoverGeometry = new THREE.DodecahedronGeometry(0.6, 0);
const blogHoverMaterial = new THREE.MeshStandardMaterial({ color: 0xE6E6FA });
const blogHoverMesh = new THREE.Mesh(blogHoverGeometry, blogHoverMaterial);
blogHoverScene.add(blogHoverMesh);
blogHoverScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
blogHoverScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateBlogHoverMesh() {
    blogHoverMesh.rotation.x += 0.015;
    blogHoverRenderer.render(blogHoverScene, blogHoverCamera);
    requestAnimationFrame(animateBlogHoverMesh);
}
animateBlogHoverMesh();

const contactScene = new THREE.Scene();
const contactCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const contactRenderer = new THREE.WebGLRenderer({ alpha: true });
contactRenderer.setSize(320, 320);
document.getElementById('contact').appendChild(contactRenderer.domElement);
contactCamera.position.z = 6;

const contactGeometry = new THREE.SphereGeometry(0.9, 32, 32);
const contactMaterial = new THREE.MeshStandardMaterial({ color: 0x8A2BE2, wireframe: true });
const contactMesh = new THREE.Mesh(contactGeometry, contactMaterial);
contactScene.add(contactMesh);
contactScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
contactScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateContactMesh() {
    contactMesh.rotation.y += 0.012;
    contactRenderer.render(contactScene, contactCamera);
    requestAnimationFrame(animateContactMesh);
}
animateContactMesh();

const helixScene = new THREE.Scene();
const helixCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const helixRenderer = new THREE.WebGLRenderer({ alpha: true });
helixRenderer.setSize(320, 320);
document.getElementById('education').appendChild(helixRenderer.domElement);
helixCamera.position.z = 6;

const helixGeometry = new THREE.BufferGeometry();
const helixCount = 1200;
const helixPos = new Float32Array(helixCount * 3);
for (let i = 0; i < helixCount; i++) {
    const t = i / helixCount * Math.PI * 4.5;
    helixPos[i * 3] = Math.cos(t) * 1.2;
    helixPos[i * 3 + 1] = t * 0.25 - 1.2;
    helixPos[i * 3 + 2] = Math.sin(t) * 1.2;
}
helixGeometry.setAttribute('position', new THREE.BufferAttribute(helixPos, 3));
const helixMaterial = new THREE.PointsMaterial({ size: 0.025, color: 0x4169E1 });
const helix = new THREE.Points(helixGeometry, helixMaterial);
helixScene.add(helix);
helixScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
helixScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateHelix() {
    helix.rotation.y += 0.008;
    helixRenderer.render(helixScene, helixCamera);
    requestAnimationFrame(animateHelix);
}
animateHelix();

const prismScene = new THREE.Scene();
const prismCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const prismRenderer = new THREE.WebGLRenderer({ alpha: true });
prismRenderer.setSize(220, 220);
document.getElementById('services').appendChild(prismRenderer.domElement);
prismCamera.position.z = 6;

const prismGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 3);
const prismMaterial = new THREE.MeshStandardMaterial({ color: 0x9370DB });
const prism = new THREE.Mesh(prismGeometry, prismMaterial);
prismScene.add(prism);
prismScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
prismScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animatePrism() {
    prism.rotation.x += 0.012;
    prism.rotation.y += 0.012;
    prismRenderer.render(prismScene, prismCamera);
    requestAnimationFrame(animatePrism);
}
animatePrism();

const galaxyScene = new THREE.Scene();
const galaxyCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const galaxyRenderer = new THREE.WebGLRenderer({ alpha: true });
galaxyRenderer.setSize(520, 520);
document.getElementById('home').appendChild(galaxyRenderer.domElement);
galaxyCamera.position.z = 12;

const galaxyGeometry = new THREE.BufferGeometry();
const galaxyCount = 12000;
const galaxyPos = new Float32Array(galaxyCount * 3);
for (let i = 0; i < galaxyCount; i++) {
    const radius = Math.random() * 5.5;
    const spinAngle = radius * 4.5;
    const branchAngle = (i % 4) * Math.PI / 2 + Math.random() * 0.15;
    galaxyPos[i * 3] = Math.cos(branchAngle + spinAngle) * radius;
    galaxyPos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
    galaxyPos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius;
}
galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3));
const galaxyMaterial = new THREE.PointsMaterial({ size: 0.04, color: 0x8A2BE2 });
const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
galaxyScene.add(galaxy);
galaxyScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
galaxyScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateGalaxy() {
    galaxy.rotation.y += 0.004;
    galaxyRenderer.render(galaxyScene, galaxyCamera);
    requestAnimationFrame(animateGalaxy);
}
animateGalaxy();

const morphScene = new THREE.Scene();
const morphCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const morphRenderer = new THREE.WebGLRenderer({ alpha: true });
morphRenderer.setSize(320, 320);
document.getElementById('skills').appendChild(morphRenderer.domElement);
morphCamera.position.z = 6;

const morphGeometries = [
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.BoxGeometry(1.6, 1.6, 1.6),
    new THREE.TorusGeometry(1.1, 0.35, 16, 100)
];
const morphMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
const morphMesh = new THREE.Mesh(morphGeometries[0], morphMaterial);
morphScene.add(morphMesh);
morphScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
morphScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

let morphIndex = 0;
function animateMorph() {
    morphMesh.rotation.y += 0.008;
    if (Math.random() < 0.008) {
        morphIndex = (morphIndex + 1) % morphGeometries.length;
        morphMesh.geometry = morphGeometries[morphIndex];
    }
    morphRenderer.render(morphScene, morphCamera);
    requestAnimationFrame(animateMorph);
}
animateMorph();

const waveScene = new THREE.Scene();
const waveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const waveRenderer = new THREE.WebGLRenderer({ alpha: true });
waveRenderer.setSize(420, 420);
document.getElementById('projects').appendChild(waveRenderer.domElement);
waveCamera.position.z = 6;

const waveGeometry = new THREE.PlaneGeometry(5.5, 5.5, 32, 32);
const waveMaterial = new THREE.MeshStandardMaterial({ color: 0xE6E6FA, wireframe: true });
const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
waveScene.add(waveMesh);
waveScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
waveScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateWave() {
    const positions = waveGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(Date.now() * 0.0008 + positions[i]) * 0.6;
    }
    waveGeometry.attributes.position.needsUpdate = true;
    waveMesh.rotation.x = -Math.PI / 4;
    waveRenderer.render(waveScene, waveCamera);
    requestAnimationFrame(animateWave);
}
animateWave();

const orbitScene = new THREE.Scene();
const orbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbitRenderer = new THREE.WebGLRenderer({ alpha: true });
orbitRenderer.setSize(320, 320);
document.getElementById('certifications').appendChild(orbitRenderer.domElement);
orbitCamera.position.z = 6;

const orbitGeometry = new THREE.SphereGeometry(0.25, 16, 16);
const orbitMaterial = new THREE.MeshStandardMaterial({ color: 0x9370DB });
const orbits = [];
for (let i = 0; i < 6; i++) {
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.position.x = Math.cos(i * Math.PI / 3) * 1.6;
    orbit.position.z = Math.sin(i * Math.PI / 3) * 1.6;
    orbits.push(orbit);
    orbitScene.add(orbit);
}
orbitScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
orbitScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateOrbit() {
    orbits.forEach((orbit, i) => {
        orbit.position.x = Math.cos(Date.now() * 0.0008 + i * Math.PI / 3) * 1.6;
        orbit.position.z = Math.sin(Date.now() * 0.0008 + i * Math.PI / 3) * 1.6;
    });
    orbitRenderer.render(orbitScene, orbitCamera);
    requestAnimationFrame(animateOrbit);
}
animateOrbit();

const spiralScene = new THREE.Scene();
const spiralCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const spiralRenderer = new THREE.WebGLRenderer({ alpha: true });
spiralRenderer.setSize(320, 320);
document.getElementById('blog').appendChild(spiralRenderer.domElement);
spiralCamera.position.z = 6;

const spiralGeometry = new THREE.BufferGeometry();
const spiralCount = 1200;
const spiralPos = new Float32Array(spiralCount * 3);
for (let i = 0; i < spiralCount; i++) {
    const t = i / spiralCount * Math.PI * 8.5;
    spiralPos[i * 3] = t * 0.12 * Math.cos(t);
    spiralPos[i * 3 + 1] = t * 0.12 * Math.sin(t);
    spiralPos[i * 3 + 2] = t * 0.06;
}
spiralGeometry.setAttribute('position', new THREE.BufferAttribute(spiralPos, 3));
const spiralMaterial = new THREE.PointsMaterial({ size: 0.025, color: 0x8A2BE2 });
const spiral = new THREE.Points(spiralGeometry, spiralMaterial);
spiralScene.add(spiral);
spiralScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
spiralScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateSpiral() {
    spiral.rotation.z += 0.008;
    spiralRenderer.render(spiralScene, spiralCamera);
    requestAnimationFrame(animateSpiral);
}
animateSpiral();

const pulseScene = new THREE.Scene();
const pulseCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const pulseRenderer = new THREE.WebGLRenderer({ alpha: true });
pulseRenderer.setSize(320, 320);
document.getElementById('contact').appendChild(pulseRenderer.domElement);
pulseCamera.position.z = 6;

const pulseGeometry = new THREE.SphereGeometry(1.1, 32, 32);
const pulseMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
pulseScene.add(pulseMesh);
pulseScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
pulseScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animatePulse() {
    pulseMesh.scale.setScalar(1 + 0.12 * Math.sin(Date.now() * 0.0018));
    pulseRenderer.render(pulseScene, pulseCamera);
    requestAnimationFrame(animatePulse);
}
animatePulse();

const gridScene = new THREE.Scene();
const gridCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const gridRenderer = new THREE.WebGLRenderer({ alpha: true });
gridRenderer.setSize(420, 420);
document.getElementById('home').appendChild(gridRenderer.domElement);
gridCamera.position.z = 6;

const gridGeometry = new THREE.PlaneGeometry(5.5, 5.5, 12, 12);
const gridMaterial = new THREE.MeshStandardMaterial({ color: 0x8A2BE2, wireframe: true });
const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
gridScene.add(gridMesh);
gridScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
gridScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateGrid() {
    const positions = gridGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(Date.now() * 0.0008 + positions[i]) * 0.35;
    }
    gridGeometry.attributes.position.needsUpdate = true;
    gridRenderer.render(gridScene, gridCamera);
    requestAnimationFrame(animateGrid);
}
animateGrid();

const cubeGridScene = new THREE.Scene();
const cubeGridCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const cubeGridRenderer = new THREE.WebGLRenderer({ alpha: true });
cubeGridRenderer.setSize(320, 320);
document.getElementById('about').appendChild(cubeGridRenderer.domElement);
cubeGridCamera.position.z = 12;

const cubeGrid = [];
for (let x = -2.2; x <= 2.2; x += 1.1) {
    for (let y = -2.2; y <= 2.2; y += 1.1) {
        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), new THREE.MeshStandardMaterial({ color: 0x9370DB }));
        cube.position.set(x, y, 0);
        cubeGrid.push(cube);
        cubeGridScene.add(cube);
    }
}
cubeGridScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
cubeGridScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateCubeGrid() {
    cubeGrid.forEach(cube => {
        cube.rotation.x += 0.012;
        cube.rotation.y += 0.012;
        cube.position.z = Math.sin(Date.now() * 0.0008 + cube.position.x) * 0.6;
    });
    cubeGridRenderer.render(cubeGridScene, cubeGridCamera);
    requestAnimationFrame(animateCubeGrid);
}
animateCubeGrid();

const skillPulseScene = new THREE.Scene();
const skillPulseCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const skillPulseRenderer = new THREE.WebGLRenderer({ alpha: true });
skillPulseRenderer.setSize(220, 220);
document.getElementById('skills').appendChild(skillPulseRenderer.domElement);
skillPulseCamera.position.z = 6;

const skillPulseGeometry = new THREE.SphereGeometry(0.9, 32, 32);
const skillPulseMaterial = new THREE.MeshStandardMaterial({ color: 0xE6E6FA });
const skillPulseMesh = new THREE.Mesh(skillPulseGeometry, skillPulseMaterial);
skillPulseScene.add(skillPulseMesh);
skillPulseScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
skillPulseScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateSkillPulse() {
    skillPulseMesh.scale.setScalar(1 + 0.12 * Math.sin(Date.now() * 0.0018));
    skillPulseRenderer.render(skillPulseScene, skillPulseCamera);
    requestAnimationFrame(animateSkillPulse);
}
animateSkillPulse();

const projectWaveScene = new THREE.Scene();
const projectWaveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const projectWaveRenderer = new THREE.WebGLRenderer({ alpha: true });
projectWaveRenderer.setSize(320, 320);
document.getElementById('projects').appendChild(projectWaveRenderer.domElement);
projectWaveCamera.position.z = 6;

const projectWaveGeometry = new THREE.PlaneGeometry(5.5, 5.5, 32, 32);
const projectWaveMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1, wireframe: true });
const projectWaveMesh = new THREE.Mesh(projectWaveGeometry, projectWaveMaterial);
projectWaveScene.add(projectWaveMesh);
projectWaveScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
projectWaveScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateProjectWave() {
    const positions = projectWaveGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(Date.now() * 0.0008 + positions[i] + positions[i + 1]) * 0.6;
    }
    projectWaveGeometry.attributes.position.needsUpdate = true;
    projectWaveMesh.rotation.x = -Math.PI / 4;
    projectWaveRenderer.render(projectWaveScene, projectWaveCamera);
    requestAnimationFrame(animateProjectWave);
}
animateProjectWave();

const certOrbitScene = new THREE.Scene();
const certOrbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const certOrbitRenderer = new THREE.WebGLRenderer({ alpha: true });
certOrbitRenderer.setSize(220, 220);
document.getElementById('certifications').appendChild(certOrbitRenderer.domElement);
certOrbitCamera.position.z = 6;

const certOrbitGeometry = new THREE.SphereGeometry(0.25, 16, 16);
const certOrbitMaterial = new THREE.MeshStandardMaterial({ color: 0x8A2BE2 });
const certOrbits = [];
for (let i = 0; i < 7; i++) {
    const orbit = new THREE.Mesh(certOrbitGeometry, certOrbitMaterial);
    orbit.position.x = Math.cos(i * Math.PI / 3.5) * 1.4;
    orbit.position.z = Math.sin(i * Math.PI / 3.5) * 1.4;
    certOrbits.push(orbit);
    certOrbitScene.add(orbit);
}
certOrbitScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
certOrbitScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateCertOrbit() {
    certOrbits.forEach((orbit, i) => {
        orbit.position.x = Math.cos(Date.now() * * _0x1c76[15] + i * Math[_0x1c76[13]] / _0x1c76[14]) * _0x1c76[16];
        orbit[_0x1c76[2]][_0x1c76[17]] = Math[_0x1c76[18]](Date[_0x1c76[19]]() * _0x1c76[15] + i * Math[_0x1c76[13]] / _0x1c76[14]) * _0x1c76[16];
    });
    certOrbitRenderer[_0x1c76[20]](certOrbitScene, certOrbitCamera);
    requestAnimationFrame(animateCertOrbit);
}
animateCertOrbit();

const blogSpiralScene = new THREE[_0x1c76[21]]();
const blogSpiralCamera = new THREE[_0x1c76[22]](_0x1c76[3], window[_0x1c76[23]] / window[_0x1c76[24]], _0x1c76[25], _0x1c76[4]);
const blogSpiralRenderer = new THREE[_0x1c76[26]]({ alpha: true });
blogSpiralRenderer[_0x1c76[27]](_0x1c76[28], _0x1c76[28]);
document[_0x1c76[29]](_0x1c76[30])[_0x1c76[31]](blogSpiralRenderer[_0x1c76[32]]);
blogSpiralCamera[_0x1c76[2]][_0x1c76[17]] = _0x1c76[5];

const blogSpiralGeometry = new THREE[_0x1c76[33]]();
const blogSpiralCount = _0x1c76[34];
const blogSpiralPos = new Float32Array(blogSpiralCount * _0x1c76[1]);
for (let i = _0x1c76[6]; i < blogSpiralCount; i++) {
    const t = i / blogSpiralCount * Math[_0x1c76[13]] * _0x1c76[35];
    blogSpiralPos[i * _0x1c76[1]] = t * _0x1c76[36] * Math[_0x1c76[37]](t);
    blogSpiralPos[i * _0x1c76[1] + _0x1c76[7]] = t * _0x1c76[36] * Math[_0x1c76[18]](t);
    blogSpiralPos[i * _0x1c76[1] + _0x1c76[8]] = t * _0x1c76[38];
}
blogSpiralGeometry[_0x1c76[39]](_0x1c76[0], new THREE[_0x1c76[40]](blogSpiralPos, _0x1c76[1]));
const blogSpiralMaterial = new THREE[_0x1c76[41]]({ size: _0x1c76[42], color: _0x1c76[43] });
const blogSpiral = new THREE[_0x1c76[44]](blogSpiralGeometry, blogSpiralMaterial);
blogSpiralScene[_0x1c76[45]](blogSpiral);
blogSpiralScene[_0x1c76[45]](new THREE[_0x1c76[46]](_0x1c76[47], _0x1c76[48]));
blogSpiralScene[_0x1c76[45]](new THREE[_0x1c76[49]](_0x1c76[50], _0x1c76[7])[_0x1c76[51]](_0x1c76[52], _0x1c76[52], _0x1c76[52]));

function animateBlogSpiral() {
    blogSpiral[_0x1c76[53]][_0x1c76[17]] += _0x1c76[54];
    blogSpiralRenderer[_0x1c76[20]](blogSpiralScene, blogSpiralCamera);
    requestAnimationFrame(animateBlogSpiral);
}
animateBlogSpiral();

const contactPulseScene = new THREE[_0x1c76[21]]();
const contactPulseCamera = new THREE[_0x1c76[22]](_0x1c76[3], window[_0x1c76[23]] / window[_0x1c76[24]], _0x1c76[25], _0x[c76[4]]);
const contactPulseRenderer = new THREE[_0x1c76[26]]({ alpha: true });
contactPulseRenderer[_0x1c76[27]](_0x1c76[28], _0x1c76[28]);
document[_0x1c76[29]](_0x1c76[55])[_0x1c76[31]](contactPulseRenderer[_0x1c76[32]]);
contactPulseCamera[_0x1c76[2]][_0x1c76[17]] = _0x1c76[5];

const contactPulseGeometry = new THREE[_0x1c76[56]](_0x1c76[57], _0x1c76[58], _0x1c76[58]);
const contactPulseMaterial = new THREE[_0x1c76[59]]({ color: _0x1c76[60] });
const contactPulseMesh = new THREE[_0x1c76[61]](contactPulseGeometry, contactPulseMaterial);
contactPulseScene[_0x1c76[45]](contactPulseMesh);
contactPulseScene[_0x1c76[45]](new THREE[_0x1c76[46]](_0x1c76[47], _0x1c76[48]));
contactPulseScene[_0x1c76[45]](new THREE[_0x1c76[49]](_0x1c76[50], _0x1c76[7])[_0x1c76[51]](_0x1c76[52], _0x1c76[52], _0x1c76[52]));

function animateContactPulse() {
    contactPulseMesh[_0x1c76[62]][_0x1c76[63]](_0x1c76[7] + _0x1c76[64] * Math[_0x1c76[65]](Date[_0x1c76[19]]() * _0x1c76[66]));
    contactPulseRenderer[_0x1c76[20]](contactPulseScene, contactPulseCamera);
    requestAnimationFrame(animateContactPulse);
}
animateContactPulse();

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 1;

// Starfield Geometry
const geometry = new THREE.BufferGeometry();
const starCount = 10000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 2000; // Spread stars over space
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 1,
  color: 0xffffff
});

const stars = new THREE.Points(geometry, material);
scene.add(stars);

// Light (optional for slight illumination)
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

// Animation loop
function animate() {
  const posArray = geometry.attributes.position.array;

  for (let i = 0; i < starCount * 3; i += 3) {
    posArray[i + 2] -= 1; // Move star towards camera

    if (posArray[i + 2] < -1000) {
      posArray[i + 2] = 1000; // Reset star to far back
    }
  }

  geometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

const skillOrbitScene = new THREE[_0x1c76[21]]();
const skillOrbitCamera = new THREE[_0x1c76[22]](_0x1c76[3], window[_0x1c76[23]] / window[_0x3c76[24]]], _0x1c76[25], _0x1c76[4]);
const skillOrbitRenderer = new THREE[_0x1c76[26]]({ alpha: true });
skillOrbitRenderer[_0x1c76[27]](_0x1c76[28], _0x1c76[28]]);
document[_0x1c76[29]](_0x1c76[80])[_0x1c76[31]](skillOrbitRenderer[_0x1c76[32]]);
skillOrbitCamera[_0x1c76[2]][_0x1c76[17]] = _0x1c76[5];

const skillOrbitGeometry = new THREE[_0x1c76[81]](_0x1c76[82], _0x1c76[83], _0x1c76[83]);
const skillOrbitMaterial = new THREE[_0x1c76[84]]({ color: _0x1c76[85] });
const skillOrbits = [];
for (let i = _0x1c76[6]; i < _0x1c76[86]; i++) {
    const orbit = new THREE[_0x1c76[87]](skillOrbitGeometry, skillOrbitMaterial);
    orbit[_0x1c76[2]][_0x1c76[88]] = Math[_0x1c76[89]](i * Math[_0x1c76[90]] / _0x1c76[91]) * _0x1c76[92];
    orbit[_0x1c76[2]][_0x1c76[93]] = Math[_0x1c76[94]](i * Math[_0x1c76[95]] / _0x1c76[96]) * _0x1c76[97];
    skillOrbits[_0x1c76[98]](orbit);
    skillOrbitScene[_0x1c76[99]](orbit);
}
skillOrbitScene[_0x1c76[100]](new THREE[_0x1c76[101]](_0x1c76[102], _0x1c76[103]));
skillOrbitScene[_0x1c76[104]](new THREE[_0x1c76[105]](_0x1c76[106], _0x1c76[107])[_0x1c76[108]](_0x1c76[109], _0x1c76[110], _0x1c76[111]));

function animateSkillOrbit() {
    skillOrbits[_0x1c76[112]]((orbit, i) => {
        orbit[_0x1c76[113]][_0x1c76[114]] = Math[_0x1c76[115]](Date[_0x1c76[116]]() * _0x1c76[117] + i * Math[_0x1c76[118]] / _0x1c76[119]) * _0x1c76[120];
        orbit[_0x1c76[121]][_0x1c76[122]] = Math[_0x1c76[123]](Date[_0x1c76[124]]() * _0x1c76[125] + i * Math[_0x1c76[126]] / _0x1c76[127]) * _0x1c76[128];
    });
    skillOrbitRenderer[_0x1c76[129]](skillOrbitScene, skillOrbitCamera);
    requestAnimationFrame(animateSkillOrbit);
}
animateSkillOrbit();

const icosahedronSwarmScene = new THREE[_0x1c76[130]]();
const icosahedronSwarmCamera = new THREE[_0x1c76[131]](_0x1c76[132], window[_0x1c76[133]] / window[_0x1c76[134]], _0x1c76[135], _0x1c76[136]);
const icosahedronSwarmRenderer = new THREE[_0x1c76[137]]({ alpha: true });
icosahedronSwarmRenderer[_0x1c76[138]](_0x1c76[139], _0x1c76[140]);
document[_0x1c76[141]](_0x1c76[142])[_0x1c76[143]](icosahedronSwarmRenderer[_0x1c76[144]]);
icosahedronSwarmCamera[_0x1c76[145]][_0x1c76[146]] = _0x1c76[147];

const icosahedronGeometry = new THREE[_0x1c76[148]](_0x1c76[149], _0x1c76[150]);
const icosahedronMaterial = new THREE[_0x1c76[151]]({ color: _0x1c76[152] });
const icosahedrons = [];
for (let i = _0x1c76[153]; i < _0x1c76[154]; i++) {
    const icosahedron = new THREE[_0x1c76[155]](icosahedronGeometry, icosahedronMaterial);
    icosahedron[_0x1c76[156]][_0x1c76[157]](_0x1c76[158], _0x1c76[159], _0x1c76[160]);
    icosahedrons[_0x1c76[161]](icosahedron);
    icosahedronSwarmScene[_0x1c76[162]](icosahedron);
}
icosahedronSwarmScene[_0x1c76[163]](new THREE[_0x1c76[164]](_0x1c76[165], _0x1c76[166]));
icosahedronSwarmScene[_0x1c76[167]](new THREE[_0x1c76[168]](_0x1c76[169], _0x1c76[170])[_0x1c76[171]](_0x1c76[172], _0x1c76[173], _0x1c76[174]));

function animateIcosahedronSwarm() {
    icosahedrons[_0x1c76[175]]((icosahedron, i) => {
        icosahedron[_0x1c76[176]][_0x1c76[177]] += _0x1c76[178];
        icosahedron[_0x1c76[179]][_0x1c76[180]] += _0x1c76[181];
        icosahedron[_0x1c76[182]][_0x1c76[183]] += Math[_0x1c76[184]](Date[_0x1c76[185]]() * _0x1c76[186] + i) * _0x1c76[187];
    });
    icosahedronSwarmRenderer[_0x1c76[188]](icosahedronSwarmScene, icosahedronSwarmCamera);
    requestAnimationFrame(animateIcosahedronSwarm);
}
animateIcosahedronSwarm();

const vortexScene = new THREE[_0x1c76[189]]();
const vortexCamera = new THREE[_0x1c76[190]](_0x1c76[191], window[_0x1c76[192]] / window[_0x1c76[193]], _0x1c76[194], _0x1c76[195]);
const vortexRenderer = new THREE[_0x1c76[196]]({ alpha: true });
vortexRenderer[_0x1c76[197]](_0x1c76[198], _0x1c76[199]);
document[_0x1c76[200]](_0x1c76[201])[_0x1c76[202]](vortexRenderer[_0x1c76[203]]);
vortexCamera[_0x1c76[204]][_0x1c76[205]] = _0x1c76[206];

const vortexGeometry = new THREE[_0x1c76[207]]();
const vortexCount = _0x1c76[208];
const vortexPos = new Float32Array(vortexCount * _0x1c76[209]);
for (let i = _0x1c76[210]; i < vortexCount; i++) {
    const t = i / vortexCount * Math[_0x1c76[211]] * _0x1c76[212];
    const r = t * _0x1c76[213];
    vortexPos[i * _0x1c76[214]] = r * Math[_0x1c76[215]](t);
    vortexPos[i * _0x1c76[216] + _0x1c76[217]] = r * Math[_0x1c76[218]](t);
    vortexPos[i * _0x1c76[219] + _0x1c76[220]] = t * _0x1c76[221] - _0x1c76[222];
}
vortexGeometry[_0x1c76[223]](_0x1c76[224], new THREE[_0x1c76[225]](vortexPos, _0x1c76[226]));
const vortexMaterial = new THREE[_0x1c76[227]]({ size: _0x1c76[228], color: _0x1c76[229] });
const vortex = new THREE[_0x1c76[230]](vortexGeometry, vortexMaterial);
vortexScene[_0x1c76[231]](vortex);
vortexScene[_0x1c76[232]](new THREE[_0x1c76[233]](_0x1c76[234], _0x1c76[235]));
vortexScene[_0x1c76[236]](new THREE[_0x1c76[237]](_0x1c76[238], _0x1c76[239])[_0x1c76[240]](_0x1c76[241], _0x1c76[242], _0x1c76[243]));

function animateVortex() {
    vortex[_0x1c76[244]][_0x1c76[245]] += _0x1c76[246];
    vortexRenderer[_0x1c76[247]](vortexScene, vortexCamera);
    requestAnimationFrame(animateVortex);
}
animateVortex();

const torusKnotScene = new THREE[_0x1c76[248]]();
const torusKnotCamera = new THREE[_0x1c76[249]](_0x1c76[250], window[_0x1c76[251]] / window[_0x1c76[252]], _0x1c76[253], _0x1c76[254]);
const torusKnotRenderer = new THREE[_0x1c76[255]]({ alpha: true });
torusKnotRenderer[_0x1c76[256]](_0x1c76[257], _0x1c76[258]);
document[_0x1c76[259]](_0x1c76[260])[_0x1c76[261]](torusKnotRenderer[_0x1c76[262]]);
torusKnotCamera[_0x1c76[263]][_0x1c76[264]] = _0x1c76[265];

const torusKnotGeometry = new THREE[_0x1c76[266]](_0x1c76[267], _0x1c76[268], _0x1c76[269], _0x1c76[270]);
const torusKnotMaterial = new THREE[_0x1c76[271]]({ color: _0x1c76[272] });
const torusKnot = new THREE[_0x1c76[273]](torusKnotGeometry, torusKnotMaterial);
torusKnotScene[_0x1c76[274]](torusKnot);
torusKnotScene[_0x1c76[275]](new THREE[_0x1c76[276]](_0x1c76[277], _0x1c76[278]));
torusKnotScene[_0x1c76[279]](new THREE[_0x1c76[280]](_0x1c76[281], _0x1c76[282])[_0x1c76[283]](_0x1c76[284], _0x1c76[285], _0x1c76[286]));

function animateTorusKnot() {
    torusKnot[_0x1c76[287]][_0x1c76[288]] += _0x1c76[289];
    torusKnot[_0x1c76[290]][_0x1c76[291]] += _0x1c76[292];
    torusKnot[_0x1c76[293]][_0x1c76[294]](_0x1c76[295] + _0x1c76[296] * Math[_0x1c76[297]](Date[_0x1c76[298]]() * _0x1c76[299]));
    torusKnotRenderer[_0x1c76[300]](torusKnotScene, torusKnotCamera);
    requestAnimationFrame(animateTorusKnot);
}
animateTorusKnot();

const profileImg = document.querySelector('.profile-img');
profileImg.style.transition = 'all 0.5s ease';
gsap.from(profileImg, { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.out' });

gsap.from('.hero-text', { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out' });
gsap.from('.typing-name', { opacity: 0, y: 30, duration: 1, ease: 'power2.out', delay: 0.5 });
gsap.from('.social-links a', { x: -50, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.8 });
gsap.from('.nav-link', { opacity: 0, y: -20, duration: 0.8, stagger: 0.1, delay: 1 });

gsap.from('.section-title', {
    scrollTrigger: { trigger: '.section-title', start: 'top 85%' },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out'
});

gsap.from('.about-text', {
    scrollTrigger: { trigger: '.about-text', start: 'top 85%' },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.skills-grid .skill-item', {
    scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
});

gsap.from('.project-card', {
    scrollTrigger: { trigger: '.project-carousel', start: 'top 85%' },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.3,
    ease: 'power2.out'
});

gsap.from('.certification-item', {
    scrollTrigger: { trigger: '.certifications-grid', start: 'top 85%' },
    opacity: 0,
    x: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.blog-post', {
    scrollTrigger: { trigger: '.blog-grid', start: 'top 85%' },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.3,
    ease: 'power2.out'
});

gsap.from('.contact-form input, .contact-form textarea', {
    scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        gsap.to(link, { color: '#8A2BE2', duration: 0.3 });
        gsap.to(navLinks, { color: '#333', duration: 0.3 });
    });
});

const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
    });
    item.addEventListener('mouseleave', () => {
        gsap.to(item, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
});

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    sphereRenderer.setSize(window.innerWidth, window.innerHeight);
    sphereCamera.aspect = window.innerWidth / window.innerHeight;
    sphereCamera.updateProjectionMatrix();
    torusRenderer.setSize(220, 220);
    skillRenderer.setSize(320, 320);
    projectRenderer.setSize(420, 420);
    certRenderer.setSize(320, 320);
    blogRenderer.setSize(320, 320);
    interactiveSphereRenderer.setSize(320, 320);
    particleSphereRenderer.setSize(420, 420);
    ringRenderer.setSize(220, 220);
    skillHoverRenderer.setSize(160, 160);
    projectHoverRenderer.setSize(160, 160);
    certHoverRenderer.setSize(160, 160);
    blogHoverRenderer.setSize(160, 160);
    contactRenderer.setSize(320, 320);
    helixRenderer.setSize(320, 320);
    prismRenderer.setSize(220, 220);
    galaxyRenderer.setSize(520, 520);
    morphRenderer.setSize(320, 320);
    waveRenderer.setSize(420, 420);
    orbitRenderer.setSize(320, 320);
    spiralRenderer.setSize(320, 320);
    pulseRenderer.setSize(320, 320);
    gridRenderer.setSize(420, 420);
    cubeGridRenderer.setSize(320, 320);
    skillPulseRenderer.setSize(220, 220);
    projectWaveRenderer.setSize(320, 320);
    certOrbitRenderer.setSize(220, 220);
    blogSpiralRenderer.setSize(320, 320);
    contactPulseRenderer.setSize(320, 320);
    starFieldRenderer.setSize(window.innerWidth, window.innerHeight);
    skillOrbitRenderer.setSize(220, 220);
    icosahedronSwarmRenderer.setSize(320, 320);
    vortexRenderer.setSize(320, 320);
    torusKnotRenderer.setSize(320, 320);
});