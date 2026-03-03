/* ========================================================
   ZAKARIA ELASS — Architecte — JavaScript
   Moroccan geometric canvas + interactions
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const intro = document.getElementById('intro');
    const site = document.getElementById('site');
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const hero = document.getElementById('hero');
    const contactForm = document.getElementById('contactForm');

    // ========================================================
    // CUSTOM CURSOR
    // ========================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
        });

        function animateRing() {
            ringX += (cursorX - ringX) * 0.12;
            ringY += (cursorY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover state for interactive elements
        document.querySelectorAll('a, button, [data-hover]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovering');
                cursorRing.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovering');
                cursorRing.classList.remove('hovering');
            });
        });
    }

    // ========================================================
    // ANIMATED MOROCCAN GEOMETRIC BACKGROUND (Canvas)
    // ========================================================
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let animId;
    let mouseCanvasX = -1000;
    let mouseCanvasY = -1000;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouseCanvasX = e.clientX;
        mouseCanvasY = e.clientY;
    });

    // --- Draw Moroccan 8-Pointed Star ---
    function drawStar8(cx, cy, radius, rotation, lineWidth, opacity) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = '#c8956c';
        ctx.lineWidth = lineWidth;

        const side = radius * Math.SQRT2;
        const half = side / 2;

        // Square 1
        ctx.strokeRect(-half, -half, side, side);

        // Square 2 (rotated 45°)
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-half, -half, side, side);

        ctx.restore();
    }

    // --- Floating Stars ---
    class FloatingStar {
        constructor() {
            this.reset(true);
        }

        reset(initial) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * (canvas.height * 4) : -(50 + Math.random() * 200);
            this.radius = 15 + Math.random() * 50;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.001;
            this.speedY = 0.08 + Math.random() * 0.15;
            this.speedX = (Math.random() - 0.5) * 0.08;
            this.baseOpacity = 0.02 + Math.random() * 0.05;
            this.phase = Math.random() * Math.PI * 2;
            this.lineWidth = 0.3 + Math.random() * 0.5;
        }

        update(time) {
            this.x += this.speedX + Math.sin(time * 0.0003 + this.phase) * 0.08;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            if (this.y - window.scrollY * 0.08 > canvas.height + 100) {
                this.reset(false);
            }
        }

        draw(time) {
            const screenY = this.y - window.scrollY * 0.08;
            if (screenY < -80 || screenY > canvas.height + 80) return;

            // Mouse proximity glow
            const dx = this.x - mouseCanvasX;
            const dy = screenY - mouseCanvasY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const glow = dist < 250 ? (250 - dist) / 250 * 0.06 : 0;

            const pulse = Math.sin(time * 0.001 + this.phase) * 0.015;
            const opacity = this.baseOpacity + pulse + glow;

            drawStar8(this.x, screenY, this.radius, this.rotation, this.lineWidth, opacity);
        }
    }

    // --- Tessellation Grid (very subtle) ---
    class TessellationGrid {
        constructor() {
            this.spacing = 180;
            this.starRadius = 12;
            this.rotation = 0;
        }

        draw(time) {
            this.rotation = time * 0.00003;
            const scrollOffset = window.scrollY * 0.04;
            const cols = Math.ceil(canvas.width / this.spacing) + 2;
            const rows = Math.ceil(canvas.height / this.spacing) + 4;
            const offsetY = scrollOffset % this.spacing;

            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    const x = col * this.spacing + (row % 2 ? this.spacing / 2 : 0);
                    const y = row * this.spacing - offsetY;

                    if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) continue;

                    // Mouse proximity
                    const dx = x - mouseCanvasX;
                    const dy = y - mouseCanvasY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const glow = dist < 300 ? (300 - dist) / 300 * 0.03 : 0;

                    drawStar8(x, y, this.starRadius, this.rotation, 0.3, 0.015 + glow);

                    // Connection lines to neighbors
                    if (col < cols - 1) {
                        const nx = (col + 1) * this.spacing + (row % 2 ? this.spacing / 2 : 0);
                        ctx.save();
                        ctx.globalAlpha = 0.012 + glow * 0.3;
                        ctx.strokeStyle = '#c8956c';
                        ctx.lineWidth = 0.3;
                        ctx.setLineDash([2, 8]);
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(nx, y);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.restore();
                    }
                }
            }
        }
    }

    // --- Particles (gold dust) ---
    class GoldParticle {
        constructor() {
            this.reset(true);
        }

        reset(initial) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height * 4 : -10;
            this.radius = 0.5 + Math.random() * 1.5;
            this.opacity = 0.03 + Math.random() * 0.06;
            this.speedY = 0.05 + Math.random() * 0.12;
            this.speedX = (Math.random() - 0.5) * 0.05;
            this.pulse = Math.random() * Math.PI * 2;
        }

        update(time) {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += 0.008;

            if (this.y - window.scrollY * 0.06 > canvas.height + 30) {
                this.reset(false);
            }
        }

        draw() {
            const screenY = this.y - window.scrollY * 0.06;
            if (screenY < -10 || screenY > canvas.height + 10) return;

            const o = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
            ctx.save();
            ctx.globalAlpha = o;
            ctx.fillStyle = '#c8956c';
            ctx.beginPath();
            ctx.arc(this.x, screenY, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // --- Arch Elements (Moroccan arches) ---
    class FloatingArch {
        constructor() {
            this.reset(true);
        }

        reset(initial) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height * 3 : -150;
            this.width = 30 + Math.random() * 50;
            this.height = this.width * (1.2 + Math.random() * 0.6);
            this.opacity = 0.015 + Math.random() * 0.03;
            this.speedY = 0.06 + Math.random() * 0.1;
            this.speedX = (Math.random() - 0.5) * 0.04;
            this.phase = Math.random() * Math.PI * 2;
        }

        update(time) {
            this.x += this.speedX + Math.sin(time * 0.0004 + this.phase) * 0.05;
            this.y += this.speedY;

            if (this.y - window.scrollY * 0.07 > canvas.height + 200) {
                this.reset(false);
            }
        }

        draw() {
            const screenY = this.y - window.scrollY * 0.07;
            if (screenY < -200 || screenY > canvas.height + 100) return;

            const dx = this.x - mouseCanvasX;
            const dy = screenY - mouseCanvasY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const glow = dist < 200 ? (200 - dist) / 200 * 0.03 : 0;

            ctx.save();
            ctx.translate(this.x, screenY);
            ctx.globalAlpha = this.opacity + glow;
            ctx.strokeStyle = '#c8956c';
            ctx.lineWidth = 0.4;

            // Moroccan pointed arch (horseshoe arch)
            const w = this.width;
            const h = this.height;
            ctx.beginPath();
            ctx.moveTo(-w / 2, h / 2);
            ctx.lineTo(-w / 2, 0);
            // Horseshoe arch curve
            ctx.bezierCurveTo(-w / 2, -h * 0.6, 0, -h * 0.8, 0, -h / 2);
            ctx.bezierCurveTo(0, -h * 0.8, w / 2, -h * 0.6, w / 2, 0);
            ctx.lineTo(w / 2, h / 2);
            ctx.stroke();

            // Base line
            ctx.beginPath();
            ctx.moveTo(-w / 2 - 5, h / 2);
            ctx.lineTo(w / 2 + 5, h / 2);
            ctx.stroke();

            ctx.restore();
        }
    }

    // --- Create All Elements ---
    const tessellation = new TessellationGrid();
    const stars = [];
    const particles = [];
    const arches = [];

    for (let i = 0; i < 14; i++) stars.push(new FloatingStar());
    for (let i = 0; i < 35; i++) particles.push(new GoldParticle());
    for (let i = 0; i < 6; i++) arches.push(new FloatingArch());

    // --- Main Animation Loop ---
    function animateBg(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Layer 1: Tessellation grid
        tessellation.draw(time);

        // Layer 2: Floating arches
        arches.forEach(a => {
            a.update(time);
            a.draw();
        });

        // Layer 3: Floating stars
        stars.forEach(s => {
            s.update(time);
            s.draw(time);
        });

        // Layer 4: Gold dust particles
        particles.forEach(p => {
            p.update(time);
            p.draw();
        });

        animId = requestAnimationFrame(animateBg);
    }

    animId = requestAnimationFrame(animateBg);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(animId);
        else animId = requestAnimationFrame(animateBg);
    });

    // ========================================================
    // INTRO ANIMATION
    // ========================================================
    function runIntro() {
        site.classList.add('site--visible');

        requestAnimationFrame(() => {
            intro.classList.add('intro--animate');
        });

        setTimeout(() => {
            intro.classList.add('intro--exit');
            document.body.style.overflow = '';

            setTimeout(() => {
                intro.remove();
                hero.classList.add('in-view');
                revealOnScroll();
            }, 1000);
        }, 4000);
    }

    if (intro) {
        document.body.style.overflow = 'hidden';
        runIntro();
    } else {
        site.classList.add('site--visible');
        requestAnimationFrame(() => requestAnimationFrame(revealOnScroll));
        window.addEventListener('load', revealOnScroll, { once: true });
    }

    // ========================================================
    // NAVIGATION
    // ========================================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) nav.classList.add('nav--scrolled');
        else nav.classList.remove('nav--scrolled');
    }, { passive: true });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================================
    // SCROLL REVEAL
    // ========================================================
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-up');

    function revealOnScroll() {
        const triggerPoint = window.innerHeight * 0.87;

        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerPoint) {
                const parent = el.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children).filter(c =>
                        c.classList.contains('reveal-text') || c.classList.contains('reveal-up')
                    );
                    const idx = siblings.indexOf(el);
                    if (idx > 0) el.style.transitionDelay = `${idx * 0.12}s`;
                }
                el.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll, { passive: true });

    // ========================================================
    // COUNTER ANIMATION
    // ========================================================
    const statNumbers = document.querySelectorAll('.about-stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        if (aboutSection.getBoundingClientRect().top < window.innerHeight * 0.75) {
            countersAnimated = true;

            statNumbers.forEach(counter => {
                const target = parseInt(counter.dataset.target, 10);
                const duration = 2000;
                const start = performance.now();

                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
                    counter.textContent = Math.round(eased * target);
                    if (progress < 1) requestAnimationFrame(tick);
                }

                requestAnimationFrame(tick);
            });
        }
    }

    window.addEventListener('scroll', animateCounters, { passive: true });

    // ========================================================
    // SERVICES ACCORDION
    // ========================================================
    document.querySelectorAll('.service-item').forEach(item => {
        item.querySelector('.service-item-header').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.service-item').forEach(si => si.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ========================================================
    // PARALLAX HERO
    // ========================================================
    const heroImg = document.querySelector('.hero-bg-img');

    function parallaxHero() {
        if (!heroImg) return;
        const scrollY = window.scrollY;
        if (hero && scrollY <= hero.offsetHeight) {
            heroImg.style.transform = `scale(1.15) translateY(${scrollY * 0.25}px)`;
        }
    }

    window.addEventListener('scroll', parallaxHero, { passive: true });

    // ========================================================
    // SMOOTH SCROLL
    // ========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================================
    // CONTACT FORM
    // ========================================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn');
            const span = btn.querySelector('span');
            const originalText = span.textContent;

            span.textContent = 'Envoyé !';
            btn.style.background = 'var(--accent)';
            btn.style.borderColor = 'var(--accent)';
            btn.style.color = 'var(--bg)';

            setTimeout(() => {
                span.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                contactForm.reset();
            }, 2500);
        });
    }

    // ========================================================
    // PROJECT CARDS STAGGER
    // ========================================================
    const projectCards = document.querySelectorAll('.project-card');

    function staggerCards() {
        projectCards.forEach((card, i) => {
            const top = card.getBoundingClientRect().top;
            if (top < window.innerHeight * 0.88 && !card.classList.contains('revealed')) {
                card.style.transitionDelay = `${(i % 2) * 0.15}s`;
                card.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', staggerCards, { passive: true });
});
