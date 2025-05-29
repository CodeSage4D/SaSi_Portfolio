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
const helixPoints = new Float32Array(helixCount * 3);
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
        orbit.position.x = Math.cos(Date.now() * 0.0008 + i * Math.PI / 3.5) * 1.4;
        orbit.position.z = Math.sin(Date.now() * 0.0008 + i * Math.PI / 3.5) * 1.4;
    });
    certOrbitRenderer.render(certOrbitScene, certOrbitCamera);
    requestAnimationFrame(animateCertOrbit);
}
animateCertOrbit();

const blogSpiralScene = new THREE.Scene();
const blogSpiralCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const blogSpiralRenderer = new THREE.WebGLRenderer({ alpha: true });
blogSpiralRenderer.setSize(220, 220);
document.getElementById('blog').appendChild(blogSpiralRenderer.domElement);
blogSpiralCamera.position.z = 6;

const blogSpiralGeometry = new THREE.BufferGeometry();
const blogSpiralCount = 900;
const blogSpiralPos = new Float32Array(blogSpiralCount * 3);
for (let i = 0; i < blogSpiralCount; i++) {
    const t = i / blogSpiralCount * Math.PI * 6.5;
    blogSpiralPos[i * 3] = t * 0.12 * Math.cos(t);
    blogSpiralPos[i * 3 + 1] = t * 0.12 * Math.sin(t);
    blogSpiralPos[i * 3 + 2] = t * 0.06;
}
blogSpiralGeometry.setAttribute('position', new THREE.BufferAttribute(blogSpiralPos, 3));
const blogSpiralMaterial = new THREE.PointsMaterial({ size: 0.025, color: 0x9370DB });
const blogSpiral = new THREE.Points(blogSpiralGeometry, blogSpiralMaterial);
blogSpiralScene.add(blogSpiral);
blogSpiralScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
blogSpiralScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateBlogSpiral() {
    blogSpiral.rotation.z += 0.008;
    blogSpiralRenderer.render(blogSpiralScene, blogSpiralCamera);
    requestAnimationFrame(animateBlogSpiral);
}
animateBlogSpiral();

const contactPulseScene = new THREE.Scene();
const contactPulseCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const contactPulseRenderer = new THREE.WebGLRenderer({ alpha: true });
contactPulseRenderer.setSize(220, 220);
document.getElementById('contact').appendChild(contactPulseRenderer.domElement);
contactPulseCamera.position.z = 6;

const contactPulseGeometry = new THREE.SphereGeometry(0.9, 32, 32);
const contactPulseMaterial = new THREE.MeshStandardMaterial({ color: 0xE6E6FA });
const contactPulseMesh = new THREE.Mesh(contactPulseGeometry, contactPulseMaterial);
contactPulseScene.add(contactPulseMesh);
contactPulseScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
contactPulseScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateContactPulse() {
    contactPulseMesh.scale.setScalar(1 + 0.12 * Math.sin(Date.now() * 0.0018));
    contactPulseRenderer.render(contactPulseScene, contactPulseCamera);
    requestAnimationFrame(animateContactPulse);
}
animateContactPulse();

const starFieldScene = new THREE.Scene();
const starFieldCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const starFieldRenderer = new THREE.WebGLRenderer({ alpha: true });
starFieldRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('home').appendChild(starFieldRenderer.domElement);
starFieldCamera.position.z = 12;

const starFieldGeometry = new THREE.BufferGeometry();
const starFieldCount = 6000;
const starFieldPos = new Float32Array(starFieldCount * 3);
for (let i = 0; i < starFieldCount * 3; i++) {
    starFieldPos[i] = (Math.random() - 0.5) * 22;
}
starFieldGeometry.setAttribute('position', new THREE.BufferAttribute(starFieldPos, 3));
const starFieldMaterial = new THREE.PointsMaterial({ size: 0.04, color: 0xE6E6FA });
const starField = new THREE.Points(starFieldGeometry, starFieldMaterial);
starFieldScene.add(starField);
starFieldScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));

function animateStarField() {
    const positions = starFieldGeometry.attributes.position.array;
    for (let i = 0; i < starFieldCount * 3; i += 3) {
        positions[i + 2] -= 0.04;
        if (positions[i + 2] < -12) positions[i + 2] = 12;
    }
    starFieldGeometry.attributes.position.needsUpdate = true;
    starFieldRenderer.render(starFieldScene, starFieldCamera);
    requestAnimationFrame(animateStarField);
}
animateStarField();

const skillOrbitScene = new THREE.Scene();
const skillOrbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const skillOrbitRenderer = new THREE.WebGLRenderer({ alpha: true });
skillOrbitRenderer.setSize(220, 220);
document.getElementById('skills').appendChild(skillOrbitRenderer.domElement);
skillOrbitCamera.position.z = 6;

const skillOrbitGeometry = new THREE.SphereGeometry(0.25, 16, 16);
const skillOrbitMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
const skillOrbits = [];
for (let i = 0; i < 5; i++) {
    const orbit = new THREE.Mesh(skillOrbitGeometry, skillOrbitMaterial);
    orbit.position.x = Math.cos(i * Math.PI / 2.5) * 1.6;
    orbit.position.z = Math.sin(i * Math.PI / 2.5) * 1.6;
    skillOrbits.push(orbit);
    skillOrbitScene.add(orbit);
}
skillOrbitScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
skillOrbitScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateSkillOrbit() {
    skillOrbits.forEach((orbit, i) => {
        orbit.position.x = Math.cos(Date.now() * 0.0008 + i * Math.PI / 2.5) * 1.6;
        orbit.position.z = Math.sin(Date.now() * 0.0008 + i * Math.PI / 2.5) * 1.6;
    });
    skillOrbitRenderer.render(skillOrbitScene, skillOrbitCamera);
    requestAnimationFrame(animateSkillOrbit);
}
animateSkillOrbit();

const icosahedronSwarmScene = new THREE.Scene();
const icosahedronSwarmCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const icosahedronSwarmRenderer = new THREE.WebGLRenderer({ alpha: true });
icosahedronSwarmRenderer.setSize(320, 320);
document.getElementById('home').appendChild(icosahedronSwarmRenderer.domElement);
icosahedronSwarmCamera.position.z = 12;

const icosahedronGeometry = new THREE.IcosahedronGeometry(0.35, 0);
const icosahedronMaterial = new THREE.MeshStandardMaterial({ color: 0x8A2BE2 });
const icosahedrons = [];
for (let i = 0; i < 22; i++) {
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set((Math.random() - 0.5) * 5.5, (Math.random() - 0.5) * 5.5, (Math.random() - 0.5) * 5.5);
    icosahedrons.push(icosahedron);
    icosahedronSwarmScene.add(icosahedron);
}
icosahedronSwarmScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
icosahedronSwarmScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateIcosahedronSwarm() {
    icosahedrons.forEach((icosahedron, i) => {
        icosahedron.rotation.x += 0.012;
        icosahedron.rotation.y += 0.012;
        icosahedron.position.y += Math.sin(Date.now() * 0.0008 + i) * 0.018;
    });
    icosahedronSwarmRenderer.render(icosahedronSwarmScene, icosahedronSwarmCamera);
    requestAnimationFrame(animateIcosahedronSwarm);
}
animateIcosahedronSwarm();

const vortexScene = new THREE.Scene();
const vortexCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const vortexRenderer = new THREE.WebGLRenderer({ alpha: true });
vortexRenderer.setSize(320, 320);
document.getElementById('about').appendChild(vortexRenderer.domElement);
vortexCamera.position.z = 6;

const vortexGeometry = new THREE.BufferGeometry();
const vortexCount = 2200;
const vortexPos = new Float32Array(vortexCount * 3);
for (let i = 0; i < vortexCount; i++) {
    const t = i / vortexCount * Math.PI * 10.5;
    const r = t * 0.12;
    vortexPos[i * 3] = r * Math.cos(t);
    vortexPos[i * 3 + 1] = r * Math.sin(t);
    vortexPos[i * 3 + 2] = t * 0.06 - 2.2;
}
vortexGeometry.setAttribute('position', new THREE.BufferAttribute(vortexPos, 3));
const vortexMaterial = new THREE.PointsMaterial({ size: 0.025, color: 0x9370DB });
const vortex = new THREE.Points(vortexGeometry, vortexMaterial);
vortexScene.add(vortex);
vortexScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
vortexScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateVortex() {
    vortex.rotation.z += 0.015;
    vortexRenderer.render(vortexScene, vortexCamera);
    requestAnimationFrame(animateVortex);
}
animateVortex();

const torusKnotScene = new THREE.Scene();
const torusKnotCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const torusKnotRenderer = new THREE.WebGLRenderer({ alpha: true });
torusKnotRenderer.setSize(320, 320);
document.getElementById('projects').appendChild(torusKnotRenderer.domElement);
torusKnotCamera.position.z = 6;

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.9, 0.25, 100, 16);
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0xE6E6FA });
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotScene.add(torusKnot);
torusKnotScene.add(new THREE.AmbientLight(0xE6E6FA, 0.6));
torusKnotScene.add(new THREE.PointLight(0xE6E6FA, 1).setPosition(5, 5, 5));

function animateTorusKnot() {
    torusKnot.rotation.x += 0.012;
    torusKnot.rotation.y += 0.012;
    torusKnot.scale.setScalar(1 + 0.12 * Math.sin(Date.now() * 0.0018));
    torusKnotRenderer.render(torusKnotScene, torusKnotCamera);
    requestAnimationFrame(animateTorusKnot);
}
animateTorusKnot();

const profileImg = document.querySelector('.profile-img');
profileImg.style.display = 'block';
gsap.from(profileImg, { opacity: 0, scale: 0.6, duration: 1.2, ease: 'back.out(1.8)' });

gsap.from('.navbar', { y: -120, opacity: 0, duration: 1.2, ease: 'power2.out' });
gsap.from('.hero-content', { opacity: 0, y: 60, duration: 1.8, ease: 'power2.out', delay: 0.6 });
gsap.from('.social-sidebar a', { x: -60, opacity: 0, duration: 0.6, stagger: 0.12, delay: 1.8 });
gsap.from('.about-content p', { opacity: 0, y: 25, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#about', start: 'top 85%' } });
gsap.from('.timeline-item', { opacity: 0, x: -60, duration: 1.2, stagger: 0.35, scrollTrigger: { trigger: '#about', start: 'top 85%' } });
gsap.from('.service-card', { opacity: 0, scale: 0.7, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#services', start: 'top 85%' } });
gsap.from('.skill-card', { opacity: 0, y: 60, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#skills', start: 'top 85%' } });
gsap.from('.project-card', { opacity: 0, x: 60, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#projects', start: 'top 85%' } });
gsap.from('.certification-card', { opacity: 0, y: 60, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#certifications', start: 'top 85%' } });
gsap.from('.blog-card', { opacity: 0, scale: 0.7, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#blog', start: 'top 85%' } });
gsap.from('.stats-card', { opacity: 0, y: 60, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#stats', start: 'top 85%' } });
gsap.from('.faq-item', { opacity: 0, x: -60, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#faq', start: 'top 85%' } });
gsap.from('.newsletter-form', { opacity: 0, y: 60, duration: 1.2, scrollTrigger: { trigger: '#newsletter', start: 'top 85%' } });
gsap.from('.contact-btn', { opacity: 0, scale: 0.7, duration: 1.2, scrollTrigger: { trigger: '#contact', start: 'top 85%' } });
gsap.from('.form-input', { opacity: 0, y: 25, duration: 1.2, stagger: 0.25, scrollTrigger: { trigger: '#contact', start: 'top 85%' } });

function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    cubeCamera.aspect = 1;
    cubeCamera.updateProjectionMatrix();
    cubeRenderer.setSize(Math.min(250, width * 0.35), Math.min(250, width * 0.35));
    sphereCamera.aspect = width / height;
    sphereCamera.updateProjectionMatrix();
    sphereRenderer.setSize(width, height);
    torusCamera.aspect = width / height;
    torusCamera.updateProjectionMatrix();
    torusRenderer.setSize(Math.min(220, width * 0.3), Math.min(220, width * 0.3));
    skillCamera.aspect = width / height;
    skillCamera.updateProjectionMatrix();
    skillRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    projectCamera.aspect = width / height;
    projectCamera.updateProjectionMatrix();
    projectRenderer.setSize(Math.min(420, width * 0.55), Math.min(420, width * 0.55));
    certCamera.aspect = width / height;
    certCamera.updateProjectionMatrix();
    certRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    blogCamera.aspect = width / height;
    blogCamera.updateProjectionMatrix();
    blogRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    interactiveSphereCamera.aspect = width / height;
    interactiveSphereCamera.updateProjectionMatrix();
    interactiveSphereRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    particleSphereCamera.aspect = width / height;
    particleSphereCamera.updateProjectionMatrix();
    particleSphereRenderer.setSize(Math.min(420, width * 0.55), Math.min(420, width * 0.55));
    ringCamera.aspect = width / height;
    ringCamera.updateProjectionMatrix();
    ringRenderer.setSize(Math.min(220, width * 0.3), Math.min(220, width * 0.3));
    skillHoverCamera.aspect = width / height;
    skillHoverCamera.updateProjectionMatrix();
    skillHoverRenderer.setSize(Math.min(160, width * 0.25), Math.min(160, width * 0.25));
    projectHoverCamera.aspect = width / height;
    projectHoverCamera.updateProjectionMatrix();
    projectHoverRenderer.setSize(Math.min(160, width * 0.25), Math.min(160, width * 0.25));
    certHoverCamera.aspect = width / height;
    certHoverCamera.updateProjectionMatrix();
    certHoverRenderer.setSize(Math.min(160, width * 0.25), Math.min(160, width * 0.25));
    blogHoverCamera.aspect = width / height;
    blogHoverCamera.updateProjectionMatrix();
    blogHoverRenderer.setSize(Math.min(160, width * 0.25), Math.min(160, width * 0.25));
    contactCamera.aspect = width / height;
    contactCamera.updateProjectionMatrix();
    contactRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    helixCamera.aspect = width / height;
    helixCamera.updateProjectionMatrix();
    helixRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    prismCamera.aspect = width / height;
    prismCamera.updateProjectionMatrix();
    prismRenderer.setSize(Math.min(220, width * 0.3), Math.min(220, width * 0.3));
    galaxyCamera.aspect = width / height;
    galaxyCamera.updateProjectionMatrix();
    galaxyRenderer.setSize(Math.min(520, width * 0.65), Math.min(520, height * 0.65));
    morphCamera.aspect = width / height;
    morphCamera.updateProjectionMatrix();
    morphRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    waveCamera.aspect = width / height;
    waveCamera.updateProjectionMatrix();
    waveRenderer.setSize(Math.min(420, width * 0.55), Math.min(420, width * 0.55));
    orbitCamera.aspect = width / height;
    orbitCamera.updateProjectionMatrix();
    orbitRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    spiralCamera.aspect = width / height;
    spiralCamera.updateProjectionMatrix();
    spiralRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    pulseCamera.aspect = width / height;
    pulseCamera.updateProjectionMatrix();
    pulseRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    gridCamera.aspect = width / height;
    gridCamera.updateProjectionMatrix();
    gridRenderer.setSize(Math.min(420, width * 0.55), Math.min(420, width * 0.55));
    cubeGridCamera.aspect = width / height;
    cubeGridCamera.updateProjectionMatrix();
    cubeGridRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    skillPulseCamera.aspect = width / height;
    skillPulseCamera.updateProjectionMatrix();
    skillPulseRenderer.setSize(Math.min(220, width * 0.3), Math.min(220, width * 0.3));
    projectWaveCamera.aspect = width / height;
    projectWaveCamera.updateProjectionMatrix();
    projectWaveRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    certOrbitCamera.aspect = width / height;
    certOrbitCamera.updateProjectionMatrix();
    certOrbitRenderer.setSize(Math.min(220, width * 0.3), Math.min(220, width * 0.3));
    blogSpiralCamera.aspect = width / height;
    blogSpiralCamera.updateProjectionMatrix();
    blogSpiralRenderer.setSize(Math.min(220, width * 0.3), Math.min(220, width * 0.3));
    contactPulseCamera.aspect = width / height;
    contactPulseCamera.updateProjectionMatrix();
    contactPulseRenderer.setSize(Math.min(220, width * 0.3), Math.min(220, width * 0.3));
    starFieldCamera.aspect = width / height;
    starFieldCamera.updateProjectionMatrix();
    starFieldRenderer.setSize(width, height);
    skillOrbitCamera.aspect = width / height;
    skillOrbitCamera.updateProjectionMatrix();
    skillOrbitRenderer.setSize(Math.min(220, width * 0.3), Math.min(220, width * 0.3));
    icosahedronSwarmCamera.aspect = width / height;
    icosahedronSwarmCamera.updateProjectionMatrix();
    icosahedronSwarmRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    vortexCamera.aspect = width / height;
    vortexCamera.updateProjectionMatrix();
    vortexRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
    torusKnotCamera.aspect = width / height;
    torusKnotCamera.updateProjectionMatrix();
    torusKnotRenderer.setSize(Math.min(320, width * 0.45), Math.min(320, width * 0.45));
}
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(handleResize, 100);
});
handleResize();

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (contactForm.checkValidity()) {
        const alert = document.querySelector('.alert');
        alert.classList.remove('d-none');
        gsap.from(alert, { opacity: 0, y: 25, duration: 0.6 });
        contactForm.reset();
        setTimeout(() => alert.classList.add('d-none'), 3500);
    } else {
        contactForm.classList.add('was-validated');
    }
});

const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (newsletterForm.checkValidity()) {
        const toast = new bootstrap.Toast(document.getElementById('newsletterToast'));
        toast.show();
        gsap.from('.toast', { opacity: 0, x: 60, duration: 0.6 });
        newsletterForm.reset();
    } else {
        newsletterForm.classList.add('was-validated');
    }
});

gsap.utils.toArray('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.12, duration: 0.35 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, duration: 0.35 });
    });
});

const confettiBadges = document.querySelectorAll('[data-confetti-badge]');
confettiBadges.forEach(badge => {
    badge.addEventListener('click', () => {
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = badge.offsetLeft + 'px';
            confetti.style.top = badge.offsetTop + 'px';
            confetti.style.background = ['#8A2BE2', '#4169E1', '#E6E6FA'][Math.floor(Math.random() * 3)];
            document.body.appendChild(confetti);
            gsap.to(confetti, {
                x: Math.random() * 220 - 110,
                y: Math.random() * 220 - 110,
                opacity: 0,
                rotation: Math.random() * 360,
                duration: 1.2,
                onComplete: () => confetti.remove()
            });
        }
    });
});

const name = "Sanskrati Shukla";
    const nameSpan = document.getElementById('typing-name');
    // const cursor = document.querySelector('.cursor');
    let index = 0;

    function typeEffect() {
        if (index < name.length) {
            nameSpan.textContent += name.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        }
    }

    // Start typing on load
    typeEffect();

    // Cursor blinking
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);


// Dark/Light mode toggle logic
const toggleBtn = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Change icon
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("bi-moon-fill");
        icon.classList.add("bi-sun-fill");
        toggleBtn.classList.remove("btn-outline-dark");
        toggleBtn.classList.add("btn-outline-light");
    } else {
        icon.classList.remove("bi-sun-fill");
        icon.classList.add("bi-moon-fill");
        toggleBtn.classList.remove("btn-outline-light");
        toggleBtn.classList.add("btn-outline-dark");
    }
});
