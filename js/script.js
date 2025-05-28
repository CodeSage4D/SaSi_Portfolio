document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('span').textContent = 'light_mode';
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.querySelector('span').textContent = document.body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const trail = document.querySelector('.cursor-trail');
    let trailPos = [];
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        trailPos.push({ x: e.clientX, y: e.clientY });
        if (trailPos.length > 5) trailPos.shift();
        trail.style.left = `${trailPos[0]?.x || e.clientX}px`;
        trail.style.top = `${trailPos[0]?.y || e.clientY}px`;
    });
    document.querySelectorAll('a, button, .project-card, .skill-card, .badge').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('glow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('glow'));
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.nav-hamburger');
    hamburger.addEventListener('click', () => {
        const nav = document.querySelector('#navbarNav');
        hamburger.querySelector('span').textContent = nav.classList.contains('show') ? 'menu' : 'close';
    });

    // Smooth Scroll
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Typing Name Animation
    const typingName = document.querySelector('.typing-name');
    const name = 'Sanskrati Shukla';
    let nameIndex = 0;
    function typeName() {
        if (nameIndex < name.length) {
            typingName.textContent += name[nameIndex++];
            setTimeout(typeName, 150);
        }
    }
    typeName();

    // Hero Content Slider
    const sliderItems = document.querySelectorAll('.slider-item');
    let sliderIndex = 0;
    function updateContentSlider() {
        sliderItems.forEach(item => item.classList.remove('active'));
        sliderItems[sliderIndex].classList.add('active');
        sliderIndex = (sliderIndex + 1) % sliderItems.length;
    }
    updateContentSlider();
    setInterval(updateContentSlider, 5000);

    // Particle Background
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 - 0.5
    }));
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#DD88CF';
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        document.querySelector('.scroll-progress').style.width = `${(scrollTop / docHeight) * 100}%`;
    });

    // Scroll Reveal
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Side Skills Animation
    const sideSkills = document.querySelectorAll('.side-skill');
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.transitionDelay = `${i * 0.2}s`;
            }
        });
    }, { threshold: 0.5 });
    sideSkills.forEach(skill => skillObserver.observe(skill));

    // Progress Bars
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = `${entry.target.getAttribute('data-progress')}%`;
            }
        });
    }, { threshold: 0.5 });
    progressBars.forEach(bar => progressObserver.observe(bar));

    // Project Carousel
    const carouselInner = document.querySelector('.carousel-inner');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let carouselIndex = 0;
    function updateCarousel() {
        const cardWidth = projectCards[0].offsetWidth + 16;
        carouselInner.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
    }
    prevBtn.addEventListener('click', () => {
        if (carouselIndex > 0) {
            carouselIndex--;
            updateCarousel();
        }
    });
    nextBtn.addEventListener('click', () => {
        if (carouselIndex < projectCards.length - 1) {
            carouselIndex++;
            updateCarousel();
        }
    });
    window.addEventListener('resize', updateCarousel);

    // Project Modal
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.modal-close');
    const projectDetails = {
        1: { title: 'Task Manager', description: 'Python CLI tool for task automation with reminders.' },
        2: { title: 'Portfolio Website', description: 'Responsive portfolio using HTML, CSS, JS.' },
        3: { title: 'Data Visualizer', description: 'Interactive data visualization tool in Python.' },
        4: { title: 'Algorithm Library', description: 'C++ library for competitive programming.' }
    };
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            modalTitle.textContent = projectDetails[projectId].title;
            modalDescription.textContent = projectDetails[projectId].description;
            modal.style.display = 'flex';
        });
    });
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();
        if (name.length < 3) return alert('Name must be at least 3 characters.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Invalid email format.');
        if (message.length < 10) return alert('Message must be at least 10 characters.');
        alert('Message sent to sanskratishukla8@gmail.com!');
        contactForm.reset();
    });

    // Random Quote
    const quotes = [
        'Code is poetry in motion.',
        'Innovation drives progress.',
        'Learning fuels growth.',
        'Tech shapes the future.'
    ];
    const quoteContainer = document.getElementById('random-quote');
    quoteContainer.textContent = quotes[Math.floor(Math.random() * quotes.length)];

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = `${window.pageYOffset * 0.3}px`;
    });

    // Skill Card Tilt
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (centerY - y) / 20;
            const tiltY = (x - centerX) / 20;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Badge Confetti
    const badges = document.querySelectorAll('.badge[data-confetti]');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            const rect = badge.getBoundingClientRect();
            for (let i = 0; i < 15; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.position = 'absolute';
                confetti.style.width = '8px';
                confetti.style.height = '8px';
                confetti.style.background = '#DD88CF';
                confetti.style.left = `${rect.left + Math.random() * rect.width}px`;
                confetti.style.top = `${rect.top}px`;
                confetti.style.transform = `translateY(-${Math.random() * 100}px) rotate(${Math.random() * 360}deg)`;
                confetti.style.transition = 'all 1s ease-out';
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 1000);
            }
        });
    });

    // Lazy Load Images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
        imageObserver.observe(img);
    });
});