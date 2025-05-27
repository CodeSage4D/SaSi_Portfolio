document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('glow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('glow'));
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Smooth Scroll
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    });

    // Text Slider
    const slider = document.querySelector('.text-slider span');
    const texts = [
        'Sanskrati Shukla',
        'Code Enthusiast',
        'Problem Solver',
        'Future Innovator'
    ];
    let index = 0;
    function updateSlider() {
        slider.style.opacity = 0;
        setTimeout(() => {
            slider.textContent = texts[index];
            slider.style.opacity = 1;
            index = (index + 1) % texts.length;
        }, 600);
    }
    updateSlider();
    setInterval(updateSlider, 3500);

    // Particle Background
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1
        });
    }

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
        const progress = (scrollTop / docHeight) * 100;
        document.querySelector('.scroll-progress').style.width = `${progress}%`;
    });

    // Scroll Reveal
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'scrollReveal 1s forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-progress');
                bar.style.width = `${width}%`;
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
        const cardWidth = projectCards[0].offsetWidth + 20;
        carouselInner.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (carouselIndex < projectCards.length - 1) {
            carouselIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (carouselIndex > 0) {
            carouselIndex--;
            updateCarousel();
        }
    });

    // Project Modal
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.modal-close');

    const projectDetails = {
        1: {
            title: 'Task Manager',
            description: 'A Python-based CLI tool for task management with automation features, including reminders and prioritization.'
        },
        2: {
            title: 'Portfolio Website',
            description: 'A responsive, single-page portfolio showcasing my skills and projects, built with HTML, CSS, and JavaScript.'
        },
        3: {
            title: 'Data Visualizer',
            description: 'A Python application for creating interactive data visualizations using matplotlib and pandas.'
        },
        4: {
            title: 'Algorithm Library',
            description: 'A C++ library of data structures and algorithms optimized for competitive programming.'
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            modalTitle.textContent = projectDetails[projectId].title;
            modalDescription.textContent = projectDetails[projectId].description;
            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact Form
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const message = form.querySelector('textarea[name="message"]').value;

        if (name.length < 3) {
            alert('Name must be at least 3 characters.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        if (message.length < 15) {
            alert('Message must be at least 15 characters.');
            return;
        }

        alert('Message sent to sanskratishukla8@gmail.com!');
        form.reset();
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
    });

    // Skill Card 3D Tilt
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (centerY - y) / 15;
            const tiltY = (x - centerX) / 15;
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
            for (let i = 0; i < 10; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${rect.left + Math.random() * rect.width}px`;
                confetti.style.top = `${rect.top}px`;
                confetti.style.background = '#DD88CF';
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 1000);
            }
        });
    });

    // Lazy Loading Images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = 1;
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    images.forEach(img => {
        img.style.opacity = 0;
        imageObserver.observe(img);
    });
});