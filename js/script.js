document.addEventListener('DOMContentLoaded', () => {
    // Utility function for logging errors with stack traces for better debugging
    const logError = (section, error) => {
        console.error(`Error in ${section}:`, error.message, '\nStack Trace:', error.stack);
    };

    // Utility: Debounce function to limit the rate of event handling
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Utility: Throttle function to limit the frequency of event handling
    const throttle = (func, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    };

    // Loading Spinner: Hides the spinner after 1 second to simulate a loading effect
    try {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            setTimeout(() => {
                spinner.style.display = 'none';
            }, 1000);
        }
    } catch (error) {
        logError('Loading Spinner', error);
    }

    // Theme Toggle: Toggles between light and dark mode, persists the choice in localStorage
    try {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const themeSpan = themeToggle.querySelector('span');
            if (themeSpan) {
                // Check for saved theme preference on page load
                if (localStorage.getItem('theme') === 'dark') {
                    document.body.classList.add('dark-mode');
                    themeSpan.textContent = 'light_mode';
                }
                themeToggle.addEventListener('click', () => {
                    try {
                        document.body.classList.toggle('dark-mode');
                        themeSpan.textContent = document.body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
                        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
                    } catch (error) {
                        logError('Theme Toggle Click', error);
                    }
                });
                themeToggle.addEventListener('keydown', (e) => {
                    try {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            themeToggle.click();
                        }
                    } catch (error) {
                        logError('Theme Toggle Keydown', error);
                    }
                });
            }
        }
    } catch (error) {
        logError('Theme Toggle', error);
    }

    // Custom Cursor: Creates a custom cursor effect with a trailing orb for visual appeal
    try {
        const cursor = document.querySelector('.custom-cursor');
        const orb = document.querySelector('.cursor-orb');
        if (cursor && orb) {
            let orbPos = [];
            const updateCursor = throttle((e) => {
                try {
                    cursor.style.left = `${e.clientX}px`;
                    cursor.style.top = `${e.clientY}px`;
                    orbPos.push({ x: e.clientX, y: e.clientY });
                    if (orbPos.length > 10) orbPos.shift();
                    if (orbPos[0]) {
                        orb.style.left = `${orbPos[0].x}px`;
                        orb.style.top = `${orbPos[0].y}px`;
                    }
                } catch (error) {
                    logError('Custom Cursor Mousemove', error);
                }
            }, 16);
            document.addEventListener('mousemove', updateCursor);
            document.querySelectorAll('a, button, .project-card, .skill-card, .badge, .carousel-btn, .contact-btn, .social-icon, .resume-btn').forEach((el) => {
                try {
                    el.addEventListener('mouseenter', () => cursor.classList.add('glow'));
                    el.addEventListener('mouseleave', () => cursor.classList.remove('glow'));
                } catch (error) {
                    logError('Custom Cursor Hover', error);
                }
            });
        }
    } catch (error) {
        logError('Custom Cursor', error);
    }

    // Hamburger Menu: Toggles the navbar menu icon and ensures accessibility with keyboard support
    try {
        const hamburger = document.querySelector('.navbar-toggler');
        if (hamburger) {
            const hamburgerSpan = hamburger.querySelector('span');
            if (hamburgerSpan) {
                hamburger.addEventListener('click', () => {
                    try {
                        const nav = document.querySelector('#navbarNav');
                        if (nav) {
                            nav.classList.toggle('show');
                            hamburgerSpan.textContent = nav.classList.contains('show') ? 'close' : 'menu';
                            hamburger.setAttribute('aria-expanded', nav.classList.contains('show'));
                        }
                    } catch (error) {
                        logError('Hamburger Menu Click', error);
                    }
                });
                hamburger.addEventListener('keydown', (e) => {
                    try {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            hamburger.click();
                        }
                    } catch (error) {
                        logError('Hamburger Menu Keydown', error);
                    }
                });
            }
        }
    } catch (error) {
        logError('Hamburger Menu', error);
    }

    // Smooth Scroll: Adds smooth scrolling to nav links for better user experience
    try {
        document.querySelectorAll('.nav-link').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                try {
                    e.preventDefault();
                    const targetId = anchor.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 60,
                            behavior: 'smooth'
                        });
                    }
                } catch (error) {
                    logError('Smooth Scroll', error);
                }
            });
        });
    } catch (error) {
        logError('Smooth Scroll Setup', error);
    }

    // Scroll-Based Navigation Highlighting: Highlights active nav link based on the section in view
    try {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        window.addEventListener('scroll', () => {
            try {
                let currentSection = '';
                sections.forEach((section) => {
                    const sectionTop = section.offsetTop;
                    if (window.scrollY >= sectionTop - 60) {
                        currentSection = section.getAttribute('id');
                    }
                });
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            } catch (error) {
                logError('Scroll Navigation Highlighting', error);
            }
        });
    } catch (error) {
        logError('Scroll Navigation Setup', error);
    }

    // Typing Animation: Types out a name with a typewriter effect in the hero section
    try {
        const typingName = document.querySelector('.typing-name');
        if (typingName) {
            const name = 'Sanskrati Shukla';
            let nameIndex = 0;
            typingName.textContent = '';
            function typeName() {
                try {
                    if (!typingName) return;
                    if (nameIndex < name.length) {
                        typingName.textContent += name.charAt(nameIndex++);
                        setTimeout(typeName, 150);
                    } else {
                        typingName.style.borderRight = 'none';
                        if (typeof gsap !== 'undefined') {
                            gsap.to(typingName, { scale: 1.05, duration: 0.5, yoyo: true, repeat: 1 });
                        }
                    }
                } catch (error) {
                    logError('Typing Animation Loop', error);
                }
            }
            setTimeout(typeName, 500);
        }
    } catch (error) {
        logError('Typing Animation', error);
    }

    // Hero Slider: Rotates through slider items every 4 seconds for dynamic content display
    try {
        const sliderItems = document.querySelectorAll('.slider-item');
        if (sliderItems.length) {
            let sliderIndex = 0;
            function updateSlider() {
                try {
                    sliderItems.forEach((item) => {
                        item.classList.remove('active');
                        item.style.display = 'none';
                        item.style.opacity = '0';
                    });
                    sliderItems[sliderIndex].classList.add('active');
                    sliderItems[sliderIndex].style.display = 'flex';
                    if (typeof gsap !== 'undefined') {
                        gsap.to(sliderItems[sliderIndex], { opacity: 1, y: 0, duration: 0.8 });
                    }
                    sliderIndex = (sliderIndex + 1) % sliderItems.length;
                } catch (error) {
                    logError('Hero Slider Update', error);
                }
            }
            updateSlider();
            setInterval(updateSlider, 4000);
        }
    } catch (error) {
        logError('Hero Slider', error);
    }

    // Particle Background: Creates a canvas-based particle animation with connections for visual effect
    try {
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                function resizeCanvas() {
                    try {
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                        // Adjust particle density based on screen size
                        const particleCount = window.innerWidth < 576 ? 50 : window.innerWidth < 992 ? 100 : 150;
                        particles.length = 0;
                        for (let i = 0; i < particleCount; i++) {
                            particles.push({
                                x: Math.random() * canvas.width,
                                y: Math.random() * canvas.height,
                                radius: Math.random() * 2 + 1,
                                vx: Math.random() * 0.5 - 0.25,
                                vy: Math.random() * 0.5 - 0.25
                            });
                        }
                    } catch (error) {
                        logError('Particle Background Resize', error);
                    }
                }
                const particles = [];
                resizeCanvas();
                function animateParticles() {
                    try {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        particles.forEach((p, i) => {
                            p.x += p.vx;
                            p.y += p.vy;
                            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                            ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#00FFFF' : '#007FFF';
                            ctx.fill();
                            for (let j = i + 1; j < particles.length; j++) {
                                const p2 = particles[j];
                                const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                                if (distance < 100) {
                                    ctx.beginPath();
                                    ctx.moveTo(p.x, p.y);
                                    ctx.lineTo(p2.x, p2.y);
                                    ctx.strokeStyle = `rgba(0, 127, 255, ${1 - distance / 100})`;
                                    ctx.stroke();
                                }
                            }
                        });
                        requestAnimationFrame(animateParticles);
                    } catch (error) {
                        logError('Particle Background Animation', error);
                    }
                }
                animateParticles();
                window.addEventListener('resize', resizeCanvas);
            }
        }
    } catch (error) {
        logError('Particle Background', error);
    }

    // Mouse Parallax Effect: Adds subtle parallax to hero section for an interactive feel
    try {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const updateParallax = throttle((e) => {
                try {
                    const x = (window.innerWidth / 2 - e.clientX) / 50;
                    const y = (window.innerHeight / 2 - e.clientY) / 50;
                    if (typeof gsap !== 'undefined') {
                        gsap.to(heroSection, { x, y, duration: 0.5, ease: 'power2.out' });
                    }
                } catch (error) {
                    logError('Mouse Parallax Mousemove', error);
                }
            }, 16);
            document.addEventListener('mousemove', updateParallax);
        }
    } catch (error) {
        logError('Mouse Parallax', error);
    }

    // Three.js Cube: Renders a rotating 3D cube with lighting and texture in the hero section
    try {
        if (typeof THREE !== 'undefined') {
            const cubesContainer = document.getElementById('three-cubes');
            if (cubesContainer) {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true });
                function resizeCubes() {
                    const size = window.innerWidth < 576 ? 150 : window.innerWidth < 992 ? 180 : 200;
                    renderer.setSize(size, size);
                }
                resizeCubes();
                cubesContainer.appendChild(renderer.domElement);
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const textureLoader = new THREE.TextureLoader();
                const texture = textureLoader.load('https://threejs.org/examples/textures/crate.gif');
                const material = new THREE.MeshPhongMaterial({ map: texture });
                const cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
                const ambientLight = new THREE.AmbientLight(0x404040);
                scene.add(ambientLight);
                const pointLight = new THREE.PointLight(0xffffff, 1, 100);
                pointLight.position.set(5, 5, 5);
                scene.add(pointLight);
                camera.position.z = 5;
                function animateCube() {
                    try {
                        cube.rotation.x += 0.01;
                        cube.rotation.y += 0.01;
                        cube.rotation.z += 0.005;
                        renderer.render(scene, camera);
                        requestAnimationFrame(animateCube);
                    } catch (error) {
                        logError('Three.js Cube Animation', error);
                    }
                }
                animateCube();
                window.addEventListener('resize', resizeCubes);
            }
        }
    } catch (error) {
        logError('Three.js Cube', error);
    }

    // Scroll Progress: Updates a progress bar based on the user's scroll position
    try {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            window.addEventListener('scroll', () => {
                try {
                    const scrollTop = window.pageYOffset;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    if (docHeight > 0) {
                        scrollProgress.style.width = `${(scrollTop / docHeight) * 100}%`;
                    }
                } catch (error) {
                    logError('Scroll Progress', error);
                }
            });
        }
    } catch (error) {
        logError('Scroll Progress Setup', error);
    }

    // Back to Top: Shows/hides a back-to-top button based on scroll position with keyboard support
    try {
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                try {
                    backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
                } catch (error) {
                    logError('Back to Top Scroll', error);
                }
            });
            backToTop.addEventListener('click', () => {
                try {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } catch (error) {
                    logError('Back to Top Click', error);
                }
            });
            backToTop.addEventListener('keydown', (e) => {
                try {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        backToTop.click();
                    }
                } catch (error) {
                    logError('Back to Top Keydown', error);
                }
            });
        }
    } catch (error) {
        logError('Back to Top', error);
    }

    // Education Section: Dynamically populate timeline with typing effect
    try {
        const educationTimeline = document.querySelector('#education .timeline');
        if (educationTimeline) {
            const educationData = [
                { year: '2024-2028', title: 'B.Tech in Computer Science', institution: 'SVVV, Indore' },
                { year: '2022-2024', title: 'High School', institution: 'St. Mary’s School, Lucknow' },
                { year: '2020-2022', title: 'Secondary School', institution: 'St. Mary’s School, Lucknow' }
            ];

            educationData.forEach((edu, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.classList.add('timeline-item');
                timelineItem.setAttribute('data-year', edu.year);
                timelineItem.setAttribute('tabindex', '0');
                timelineItem.setAttribute('aria-label', `Education: ${edu.title} at ${edu.institution}`);
                timelineItem.innerHTML = `
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>${edu.year}</h3>
                        <p class="edu-title">${edu.title}</p>
                        <p class="edu-institution typing-effect" data-text="${edu.institution}"></p>
                    </div>
                `;
                educationTimeline.appendChild(timelineItem);
            });

            const typingElements = document.querySelectorAll('.edu-institution');
            typingElements.forEach((el, index) => {
                const text = el.dataset.text;
                let charIndex = 0;
                el.textContent = '';
                setTimeout(() => {
                    function typeInstitution() {
                        try {
                            if (charIndex < text.length) {
                                el.textContent += text.charAt(charIndex++);
                                setTimeout(typeInstitution, 100);
                            } else {
                                el.style.borderRight = 'none';
                                if (typeof gsap !== 'undefined') {
                                    gsap.to(el, { scale: 1.02, duration: 0.5, yoyo: true, repeat: 1 });
                                }
                            }
                        } catch (error) {
                            logError(`Education Typing (${index})`, error);
                        }
                    }
                    typeInstitution();
                }, index * 1000);
            });

            // Add accessibility and interactivity
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                try {
                    item.addEventListener('click', () => {
                        window.scrollTo({
                            top: item.offsetTop - 60,
                            behavior: 'smooth'
                        });
                    });
                    item.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            item.click();
                        }
                    });
                } catch (error) {
                    logError(`Education Timeline Item (${index})`, error);
                }
            });
        }
    } catch (error) {
        logError('Education Section', error);
    }

    // GSAP Animations: Applies exactly 55 animations, including 3D effects
    try {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // 1-10: Hero Animations (10 animations)
            gsap.from('.text-slider', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, opacity: 0, y: 50, duration: 1 }); // 1
            gsap.from('.typing-name', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, opacity: 0, duration: 2, delay: 0.5 }); // 2
            gsap.from('.tagline', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, opacity: 0, y: 20, duration: 1, delay: 1 }); // 3
            gsap.from('.slider-content', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, opacity: 0, scale: 0.8, duration: 1, delay: 1.5 }); // 4
            gsap.from('.resume-btn', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, opacity: 0, y: 30, duration: 1, delay: 2 }); // 5
            gsap.from('.profile-img', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, scale: 0, rotation: 360, duration: 1.5 }); // 6
            gsap.from('.three-cubes', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, opacity: 0, rotateY: 180, duration: 1.5, delay: 0.5 }); // 7 (3D)
            gsap.to('.hero', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, backgroundPosition: '100% 50%', duration: 10, repeat: -1, yoyo: true }); // 8
            gsap.from('.slider-item', { opacity: 0, y: 20, stagger: 0.5, duration: 1 }); // 9
            gsap.to('.profile-container', { scrollTrigger: { trigger: '.hero', start: 'top 80%' }, rotateX: 10, rotateY: 10, duration: 2, yoyo: true, repeat: -1 }); // 10 (3D)

            // 11-18: About Animations (8 animations)
            gsap.from('.section-header', { scrollTrigger: { trigger: '.section-header', start: 'top 80%' }, opacity: 0, x: -100, duration: 1 }); // 11
            gsap.from('.about-intro', { scrollTrigger: { trigger: '.about', start: 'top 80%' }, opacity: 0, duration: 2 }); // 12
            gsap.from('.about-text', { scrollTrigger: { trigger: '.about', start: 'top 80%' }, opacity: 0, y: 20, duration: 0.5, stagger: 0.2 }); // 13
            gsap.from('.timeline', { scrollTrigger: { trigger: '.timeline', start: 'top 80%' }, opacity: 0, y: 50, duration: 1 }); // 14
            gsap.from('.timeline-item', { scrollTrigger: { trigger: '.timeline', start: 'top 80%' }, opacity: 0, y: 50, stagger: 0.3, duration: 0.8 }); // 15
            gsap.from('.timeline-dot', { scrollTrigger: { trigger: '.timeline', start: 'top 80%' }, scale: 0, duration: 0.5, stagger: 0.3 }); // 16
            gsap.from('.timeline-content', { scrollTrigger: { trigger: '.timeline', start: 'top 80%' }, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.3 }); // 17
            gsap.to('.section-header h2', { scrollTrigger: { trigger: '.about', start: 'top 80%' }, textShadow: '0 0 10px rgba(0, 123, 255, 0.5)', duration: 1, yoyo: true, repeat: -1 }); // 18

            // 19-25: Education Animations (7 animations)
            gsap.from('#education .section-header', { scrollTrigger: { trigger: '#education', start: 'top 80%' }, opacity: 0, x: -100, duration: 1 }); // 19
            gsap.from('#education .timeline', { scrollTrigger: { trigger: '#education .timeline', start: 'top 80%' }, opacity: 0, y: 50, duration: 1 }); // 20
            gsap.from('#education .timeline-item', { scrollTrigger: { trigger: '#education .timeline', start: 'top 80%' }, opacity: 0, y: 50, stagger: 0.3, duration: 0.8 }); // 21
            gsap.from('#education .timeline-dot', { scrollTrigger: { trigger: '#education .timeline', start: 'top 80%' }, scale: 0, duration: 0.5, stagger: 0.3 }); // 22
            gsap.from('#education .timeline-content', { scrollTrigger: { trigger: '#education .timeline', start: 'top 80%' }, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.3 }); // 23
            gsap.from('.edu-institution', { opacity: 0, x: 20, duration: 0.5, stagger: 0.3 }); // 24
            gsap.to('#education .section-header h2', { scrollTrigger: { trigger: '#education', start: 'top 80%' }, textShadow: '0 0 10px rgba(0, 123, 255, 0.5)', duration: 1, yoyo: true, repeat: -1 }); // 25

            // 26-32: Services Animations (7 animations)
            gsap.from('.service-card', { scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }, scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.1 }); // 26
            gsap.from('.service-card h3', { scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }, opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }); // 27
            gsap.from('.service-card .material-symbols-outlined', { scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }, scale: 0, duration: 0.5, stagger: 0.2 }); // 28
            gsap.from('.service-card p', { scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }, opacity: 0, duration: 0.5, stagger: 0.1 }); // 29
            gsap.to('.service-card', { scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }, boxShadow: '0 0 20px rgba(0, 123, 255, 0.3)', duration: 1, yoyo: true, repeat: -1 }); // 30
            document.querySelectorAll('.service-card').forEach((card) => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { rotateY: 10, rotateX: 5, duration: 0.3 }); // 31 (3D)
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.3 }); // 32 (3D)
                });
            });

            // 33-38: Skills Animations (6 animations)
            gsap.from('.skill-card', { scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }, x: -50, opacity: 0, duration: 0.8, stagger: 0.1 }); // 33
            gsap.from('.skill-img', { scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }, scale: 0, duration: 0.5, stagger: 0.1 }); // 34
            gsap.from('.skill-card h4', { scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }, opacity: 0, y: 20, duration: 0.5, stagger: 0.2 }); // 35
            gsap.from('.skill-progress', { scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }, width: 0, duration: 1.5, ease: 'power2.out', stagger: 0.2 }); // 36
            gsap.from('.progress-circle', { scrollTrigger: { trigger: '.progress-circles', start: 'top 80%' }, scale: 0, duration: 0.5, stagger: 0.2 }); // 37
            gsap.from('.progress-circle .circle-fg', { scrollTrigger: { trigger: '.progress-circles', start: 'top 80%' }, strokeDashoffset: 283, duration: 1, stagger: 0.2 }); // 38

            // 39-43: Projects Animations (5 animations)
            gsap.from('.project-card', { scrollTrigger: { trigger: '.project-carousel', start: 'top 80%' }, y: 100, opacity: 0, duration: 0.8, stagger: 0.1 }); // 39
            gsap.from('.project-img', { scrollTrigger: { trigger: '.project-carousel', start: 'top 80%' }, scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.2 }); // 40
            gsap.from('.carousel-btn', { scrollTrigger: { trigger: '.project-carousel', start: 'top 80%' }, opacity: 0, x: -20, duration: 0.5, stagger: 0.2 }); // 41
            document.querySelectorAll('.project-card').forEach((card) => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { rotateY: 5, rotateX: 3, duration: 0.3 }); // 42 (3D)
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.3 }); // 43 (3D)
                });
            });

            // 44-47: Certifications Animations (4 animations)
            gsap.from('.certification-card', { scrollTrigger: { trigger: '#certifications', start: 'top 80%' }, opacity: 0, y: 50, stagger: 0.2, duration: 0.8 }); // 44
            gsap.from('.certification-card h4', { scrollTrigger: { trigger: '#certifications', start: 'top 80%' }, opacity: 0, x: -20, duration: 0.5, stagger: 0.2 }); // 45
            gsap.from('.certification-card p', { scrollTrigger: { trigger: '#certifications', start: 'top 80%' }, opacity: 0, x: 20, duration: 0.5, stagger: 0.2 }); // 46
            gsap.to('#certifications .section-header h2', { scrollTrigger: { trigger: '#certifications', start: 'top 80%' }, textShadow: '0 0 10px rgba(0, 123, 255, 0.5)', duration: 1, yoyo: true, repeat: -1 }); // 47

            // 48-51: Contact Animations (4 animations)
            gsap.from('.form-input', { scrollTrigger: { trigger: '#contact-form', start: 'top 80%' }, y: 50, opacity: 0, duration: 0.6, stagger: 0.2 }); // 48
            gsap.from('.contact-btn', { scrollTrigger: { trigger: '#contact-form', start: 'top 80%' }, opacity: 0, scale: 0.8, duration: 0.5 }); // 49
            gsap.from('.social-links .social-icon', { scrollTrigger: { trigger: '.social-links', start: 'top 80%' }, opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }); // 50
            gsap.from('.quote-container', { scrollTrigger: { trigger: '.quote-container', start: 'top 80%' }, opacity: 0, y: 20, duration: 1 }); // 51

            // 52-55: Footer Animations (4 animations)
            gsap.from('.footer-text', { scrollTrigger: { trigger: '.footer', start: 'top 80%' }, opacity: 0, y: 20, duration: 0.5, stagger: 0.2 }); // 52
            gsap.from('.footer-social-links .social-icon', { scrollTrigger: { trigger: '.footer', start: 'top 80%' }, opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }); // 53
            gsap.from('.footer-date-time', { scrollTrigger: { trigger: '.footer', start: 'top 80%' }, opacity: 0, y: 20, duration: 0.5 }); // 54
            gsap.to('.footer .heart', { scale: 1.3, duration: 0.8, repeat: -1, yoyo: true }); // 55
        }
    } catch (error) {
        logError('GSAP Animations', error);
    }

    // Download Button Enhancements: Add 3D tilt and ripple effect
    try {
        const resumeBtn = document.querySelector('.resume-btn');
        if (resumeBtn) {
            resumeBtn.addEventListener('mousemove', (e) => {
                try {
                    const rect = resumeBtn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    if (typeof gsap !== 'undefined') {
                        gsap.to(resumeBtn, { rotateX: y / 10, rotateY: -x / 10, duration: 0.3 }); // 3D tilt
                    }
                } catch (error) {
                    logError('Resume Button Mousemove', error);
                }
            });
            resumeBtn.addEventListener('mouseleave', () => {
                try {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(resumeBtn, { rotateX: 0, rotateY: 0, duration: 0.3 });
                    }
                } catch (error) {
                    logError('Resume Button Mouseleave', error);
                }
            });
            resumeBtn.addEventListener('click', (e) => {
                try {
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    const rect = resumeBtn.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = `${size}px`;
                    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                    resumeBtn.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                } catch (error) {
                    logError('Resume Button Click', error);
                }
            });
        }
    } catch (error) {
        logError('Download Button Enhancements', error);
    }

    // Project Carousel: Handles project card carousel navigation with keyboard support
    try {
        const carouselInner = document.querySelector('.carousel-inner');
        const projectCards = document.querySelectorAll('.project-card');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        let currentIndex = 0;

        function updateCarousel() {
            try {
                if (carouselInner && projectCards.length && typeof gsap !== 'undefined') {
                    const cardWidth = projectCards[0].offsetWidth + 10;
                    gsap.to(carouselInner, {
                        x: -(currentIndex * cardWidth),
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            } catch (error) {
                logError('Project Carousel Update', error);
            }
        }

        if (projectCards.length > 3) {
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    try {
                        if (currentIndex < projectCards.length - 3) {
                            currentIndex++;
                            updateCarousel();
                        }
                    } catch (error) {
                        logError('Project Carousel Next Button', error);
                    }
                });
                nextBtn.addEventListener('keydown', (e) => {
                    try {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            nextBtn.click();
                        }
                    } catch (error) {
                        logError('Project Carousel Next Keydown', error);
                    }
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    try {
                        if (currentIndex > 0) {
                            currentIndex--;
                            updateCarousel();
                        }
                    } catch (error) {
                        logError('Project Carousel Prev Button', error);
                    }
                });
                prevBtn.addEventListener('keydown', (e) => {
                    try {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            prevBtn.click();
                        }
                    } catch (error) {
                        logError('Project Carousel Prev Keydown', error);
                    }
                });
            }

            document.addEventListener('keydown', (e) => {
                try {
                    if (e.key === 'ArrowRight' && currentIndex < projectCards.length - 3) {
                        currentIndex++;
                        updateCarousel();
                    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                } catch (error) {
                    logError('Project Carousel Keyboard Navigation', error);
                }
            });
        }
    } catch (error) {
        logError('Project Carousel', error);
    }

    // Modal Popup: Displays project details in a modal with keyboard support and accessibility
    try {
        const modal = document.querySelector('#project-modal');
        if (modal) {
            const modalTitle = modal.querySelector('#modal-title');
            const modalDescription = modal.querySelector('#modal-description');
            const modalClose = modal.querySelector('.modal-close');
            const projectData = [
                { id: '1', title: 'Task Manager', description: 'A Python CLI tool to manage tasks with a sleek interface and efficient data handling.' },
                { id: '2', title: 'Portfolio Website', description: 'A responsive portfolio showcasing my skills with interactive animations and modern design.' },
                { id: '3', title: 'Data Visualizer', description: 'A Python tool for visualizing datasets with interactive charts and graphs.' },
                { id: '4', title: 'Algorithm Library', description: 'A collection of optimized C/C++ for competitive programming and real-world applications.' },
                { id: '5', title: 'E-commerce Platform', description: 'A full-stack e-commerce solution with payment integration.' }
            ];

            projectCards.forEach((card, index) => {
                try {
                    card.setAttribute('tabindex', '0');
                    card.setAttribute('aria-label', `Project ${index + 1}: View details`);
                    card.addEventListener('click', () => {
                        try {
                            const projectId = card.dataset.project;
                            const project = projectData.find((p) => p.id === projectId);
                            if (project && modalTitle && modalDescription) {
                                modalTitle.textContent = project.title;
                                modalDescription.textContent = project.description;
                                modal.style.display = 'flex';
                                modal.focus();
                                if (typeof gsap !== 'undefined') {
                                    gsap.from('.modal-content', { scale: 0.8, opacity: 0, duration: 0.5 });
                                }
                            }
                        } catch (error) {
                            logError(`Project Card Click (${index})`, error);
                        }
                    });
                    card.addEventListener('keydown', (e) => {
                        try {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                card.click();
                            }
                        } catch (error) {
                            logError(`Project Card Keydown (${index})`, error);
                        }
                    });
                } catch (error) {
                    logError(`Project Card Setup (${index})`, error);
                }
            });

            if (modalClose) {
                modalClose.addEventListener('click', () => {
                    try {
                        modal.style.display = 'none';
                    } catch (error) {
                        logError('Modal Close Click', error);
                    }
                });
                modalClose.addEventListener('keydown', (e) => {
                    try {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            modalClose.click();
                        }
                    } catch (error) {
                        logError('Modal Close Keydown', error);
                    }
                });
            }

            modal.addEventListener('click', (e) => {
                try {
                    if (e.target === modal) modal.style.display = 'none';
                } catch (error) {
                    logError('Modal Background Click', error);
                }
            });

            modal.addEventListener('keydown', (e) => {
                try {
                    if (e.key === 'Escape') {
                        modal.style.display = 'none';
                    }
                } catch (error) {
                    logError('Modal Escape Keydown', error);
                }
            });
        }
    } catch (error) {
        logError('Modal Popup', error);
    }

    // Contact Form: Handles form submission with validation and ARIA live region for accessibility
    try {
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.setAttribute('aria-live', 'polite');
            contactForm.appendChild(errorMessage);

            contactForm.addEventListener('submit', (e) => {
                try {
                    e.preventDefault();
                    let errors = [];

                    if (!nameInput.value.trim()) {
                        errors.push('Name is required');
                        nameInput.classList.add('error');
                        nameInput.setAttribute('aria-invalid', 'true');
                    } else {
                        nameInput.classList.remove('error');
                        nameInput.setAttribute('aria-invalid', 'false');
                    }

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                        errors.push('A valid email is required');
                        emailInput.classList.add('error');
                        emailInput.setAttribute('aria-invalid', 'true');
                    } else {
                        emailInput.classList.remove('error');
                        emailInput.setAttribute('aria-invalid', 'false');
                    }

                    if (!messageInput.value.trim()) {
                        errors.push('Message is required');
                        messageInput.classList.add('error');
                        messageInput.setAttribute('aria-invalid', 'true');
                    } else {
                        messageInput.classList.remove('error');
                        messageInput.setAttribute('aria-invalid', 'false');
                    }

                    if (errors.length > 0) {
                        errorMessage.textContent = errors.join(', ');
                        errorMessage.style.display = 'block';
                    } else {
                        errorMessage.style.display = 'none';
                        errorMessage.textContent = 'Message sent successfully!';
                        alert("Message sent! I'll get back to you soon.");
                        contactForm.reset();
                    }
                } catch (error) {
                    logError('Contact Form Submit', error);
                }
            });
        }
    } catch (error) {
        logError('Contact Form', error);
    }

    // Random Quote: Displays a random quote with animation and updates ARIA live region
    try {
        const quoteText = document.querySelector('#random-quote');
        if (quoteText) {
            quoteText.setAttribute('aria-live', 'polite');
            const quotes = [
                'Code is like humor: when you have to explain it, it’s bad.',
                'The best way to predict the future is to create it.',
                'Simplicity is the ultimate sophistication.',
                'Programming is the art of telling another human what one wants the computer to do.',
                'Innovation distinguishes between a leader and a follower.',
                'Technology is best when it brings people together.'
            ];
            quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
            if (typeof gsap !== 'undefined') {
                gsap.from(quoteText, { opacity: 0, y: 20, duration: 1, delay: 0.5 });
            }
        }
    } catch (error) {
        logError('Random Quote', error);
    }

    // Lazy Loading Images: Applies lazy loading and animation to images for performance optimization
    try {
        document.querySelectorAll('img').forEach((img) => {
            try {
                img.setAttribute('loading', 'lazy');
                if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                    gsap.from(img, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.5,
                        scrollTrigger: { trigger: img, start: 'top 90%' }
                    });
                }
            } catch (error) {
                logError('Lazy Loading Image', error);
            }
        });
    } catch (error) {
        logError('Lazy Loading Images', error);
    }

    // Confetti for Badges: Triggers confetti effect on badge click for a celebratory effect
    try {
        function triggerConfetti(element) {
            try {
                if (typeof gsap === 'undefined') return;
                const rect = element.getBoundingClientRect();
                for (let i = 0; i < 30; i++) {
                    const confetti = document.createElement('div');
                    confetti.style.position = 'absolute';
                    confetti.style.width = '5px';
                    confetti.style.height = '5px';
                    confetti.style.background = document.body.classList.contains('dark-mode') ? '#00FFFF' : '#007FFF';
                    confetti.style.left = `${rect.left + Math.random() * rect.width}px`;
                    confetti.style.top = `${rect.top + Math.random() * rect.height}px`;
                    document.body.appendChild(confetti);
                    gsap.to(confetti, {
                        y: -150,
                        x: Math.random() * 100 - 50,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'power2.out',
                        onComplete: () => confetti.remove()
                    });
                }
            } catch (error) {
                logError('Trigger Confetti', error);
            }
        }

        document.querySelectorAll('.badge[data-confetti]').forEach((badge) => {
            try {
                badge.setAttribute('tabindex', '0');
                badge.setAttribute('aria-label', 'Badge with confetti effect');
                badge.addEventListener('click', () => triggerConfetti(badge));
                badge.addEventListener('keydown', (e) => {
                    try {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            badge.click();
                        }
                    } catch (error) {
                        logError('Badge Keydown', error);
                    }
                });
            } catch (error) {
                logError('Badge Confetti Setup', error);
            }
        });
    } catch (error) {
        logError('Confetti for Badges', error);
    }

    // Dynamic Date/Time Footer: Displays current date and time in the footer, updates every minute
    try {
        const dateTimeFooter = document.querySelector('.footer-date-time');
        if (dateTimeFooter) {
            const updateDateTime = () => {
                try {
                    const now = new Date();
                    const options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZone: 'Asia/Kolkata'
                    };
                    dateTimeFooter.textContent = now.toLocaleDateString('en-US', options);
                } catch (error) {
                    logError('Date/Time Footer Update', error);
                }
            };
            updateDateTime();
            setInterval(updateDateTime, 60000);
        }
    } catch (error) {
        logError('Dynamic Date/Time Footer', error);
    }
});