// =================================
// LOADING SCREEN
// =================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 2000);
});

// =================================
// THREE.JS BACKGROUND SETUP
// =================================
let scene, camera, renderer, particles;

function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create floating hearts particles
    const geometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;

        // Pink gradient colors
        colors[i] = 1;
        colors[i + 1] = Math.random() * 0.5 + 0.4;
        colors[i + 2] = Math.random() * 0.4 + 0.6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    animateBackground();
}

function animateBackground() {
    requestAnimationFrame(animateBackground);

    if (particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        const positions = particles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.001;
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}

// =================================
// COFFEE 3D ANIMATION
// =================================
function initCoffee3D() {
    const container = document.getElementById('coffee-3d');
    if (!container) return;

    const coffeeScene = new THREE.Scene();
    const coffeeCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const coffeeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const size = Math.min(window.innerWidth * 0.5, 300);
    coffeeRenderer.setSize(size, size);
    container.appendChild(coffeeRenderer.domElement);

    // Create coffee cup (cylinder)
    const cupGeometry = new THREE.CylinderGeometry(1, 0.8, 1.5, 32);
    const cupMaterial = new THREE.MeshPhongMaterial({
        color: 0x8B4513,
        shininess: 100
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    coffeeScene.add(cup);

    // Coffee liquid
    const liquidGeometry = new THREE.CylinderGeometry(0.95, 0.75, 1.4, 32);
    const liquidMaterial = new THREE.MeshPhongMaterial({
        color: 0x3E2723,
        transparent: true,
        opacity: 0.8
    });
    const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquid.position.y = -0.05;
    coffeeScene.add(liquid);

    // Steam particles
    const steamGeometry = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(30 * 3);
    for (let i = 0; i < 30 * 3; i += 3) {
        steamPositions[i] = (Math.random() - 0.5) * 0.5;
        steamPositions[i + 1] = Math.random() * 2 + 1;
        steamPositions[i + 2] = (Math.random() - 0.5) * 0.5;
    }
    steamGeometry.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.3
    });
    const steam = new THREE.Points(steamGeometry, steamMaterial);
    coffeeScene.add(steam);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    coffeeScene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    coffeeScene.add(ambientLight);

    coffeeCamera.position.z = 4;

    function animateCoffee() {
        requestAnimationFrame(animateCoffee);

        cup.rotation.y += 0.01;
        liquid.rotation.y += 0.01;

        // Animate steam
        const steamPos = steam.geometry.attributes.position.array;
        for (let i = 1; i < steamPos.length; i += 3) {
            steamPos[i] += 0.02;
            if (steamPos[i] > 3) {
                steamPos[i] = 1;
            }
        }
        steam.geometry.attributes.position.needsUpdate = true;

        coffeeRenderer.render(coffeeScene, coffeeCamera);
    }

    animateCoffee();
}

// =================================
// GSAP SCROLL ANIMATIONS
// =================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections
    gsap.utils.toArray('.section').forEach((section, i) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                scrub: true
            }
        });
    });

    // 3D Cards hover effect
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Photo parallax effect
    gsap.utils.toArray('.photo-card').forEach(photo => {
        gsap.to(photo, {
            y: -30,
            scrollTrigger: {
                trigger: photo,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// =================================
// CAROUSEL
// =================================
function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!items.length) return;

    let currentIndex = 0;
    items[0].classList.add('active');

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    });

    // Auto-advance
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }, 5000);
}

// =================================
// EASTER EGG - PADARIA
// =================================
function initEasterEgg() {
    const easterEgg = document.getElementById('padaria-egg');
    const secret = document.getElementById('padaria-secret');

    if (easterEgg && secret) {
        easterEgg.addEventListener('click', () => {
            secret.classList.toggle('show');
        });
    }
}

// =================================
// HEART PARTICLES ANIMATION
// =================================
function initHeartParticles() {
    const container = document.querySelector('.heart-particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animation = `floatUp ${Math.random() * 3 + 3}s ease infinite`;
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(heart);
    }
}

// =================================
// SOCCER BALL 3D
// =================================
function initBall3D() {
    const container = document.getElementById('ball-3d');
    if (!container) return;

    const ballScene = new THREE.Scene();
    const ballCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const ballRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const size = Math.min(window.innerWidth * 0.4, 200);
    ballRenderer.setSize(size, size);
    container.appendChild(ballRenderer.domElement);

    // Soccer ball
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x222222
    });
    const ball = new THREE.Mesh(geometry, material);
    ballScene.add(ball);

    // Add black pentagons pattern (simplified)
    const patternGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const patternMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true
    });
    const pattern = new THREE.Mesh(patternGeometry, patternMaterial);
    ballScene.add(pattern);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    ballScene.add(light);

    ballCamera.position.z = 3;

    function animateBall() {
        requestAnimationFrame(animateBall);
        ball.rotation.x += 0.01;
        ball.rotation.y += 0.02;
        pattern.rotation.x += 0.01;
        pattern.rotation.y += 0.02;
        ballRenderer.render(ballScene, ballCamera);
    }

    animateBall();
}

// =================================
// MUSIC CHALLENGE & REVEAL
// =================================
function initMusicChallenge() {
    const inputs = document.querySelectorAll('.letter-input');
    const checkBtn = document.getElementById('check-answer');
    const presentReveal = document.getElementById('present-reveal');
    const correctAnswer = ['O', 'U', 'R', 'O'];

    // Auto-focus next input
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();

            if (e.target.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });

    checkBtn?.addEventListener('click', checkAnswer);

    function checkAnswer() {
        let isCorrect = true;

        inputs.forEach((input, index) => {
            const value = input.value.toUpperCase();
            if (value === correctAnswer[index]) {
                input.classList.remove('wrong');
                input.classList.add('correct');
            } else {
                input.classList.remove('correct');
                input.classList.add('wrong');
                isCorrect = false;
            }
        });

        if (isCorrect) {
            setTimeout(() => {
                revealPresent();
            }, 1000);
        } else {
            // Shake animation
            checkBtn.style.animation = 'wrongShake 0.5s ease';
            setTimeout(() => {
                checkBtn.style.animation = '';
            }, 500);
        }
    }

    function revealPresent() {
        // Hide challenge
        document.querySelector('.music-challenge').style.display = 'none';

        // Show present
        presentReveal.classList.remove('hidden');

        // Confetti effect
        createConfetti();

        // Scroll to reveal
        setTimeout(() => {
            presentReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
}

// =================================
// CONFETTI ANIMATION
// =================================
function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#ffd93d', '#6bcfff', '#a29bfe'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';

        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const endLeft = parseFloat(confetti.style.left) + (Math.random() - 0.5) * 100;

        confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, left: confetti.style.left },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 720}deg)`, left: endLeft + '%' }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// =================================
// PLANE 3D ANIMATION
// =================================
function initPlane3D() {
    const container = document.getElementById('plane-3d');
    if (!container) return;

    const planeScene = new THREE.Scene();
    const planeCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const planeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const size = Math.min(window.innerWidth * 0.5, 200);
    planeRenderer.setSize(size, size);
    planeRenderer.domElement.style.maxWidth = '100%';
    planeRenderer.domElement.style.height = 'auto';
    planeRenderer.domElement.style.margin = '0 auto';
    planeRenderer.domElement.style.display = 'block';
    container.appendChild(planeRenderer.domElement);

    // Simple plane shape
    const geometry = new THREE.ConeGeometry(0.3, 1.5, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0x4facfe });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    planeScene.add(plane);

    // Wings
    const wingGeometry = new THREE.BoxGeometry(2, 0.1, 0.5);
    const wing = new THREE.Mesh(wingGeometry, material);
    wing.position.z = -0.3;
    planeScene.add(wing);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    planeScene.add(light);

    planeCamera.position.set(2, 2, 3);
    planeCamera.lookAt(0, 0, 0);

    let progress = 0;
    function animatePlane() {
        requestAnimationFrame(animatePlane);

        progress += 0.01;
        plane.position.x = Math.sin(progress) * 2;
        plane.position.y = Math.cos(progress * 0.5) * 0.5;
        plane.rotation.z = Math.sin(progress) * 0.2;
        wing.position.x = Math.sin(progress) * 2;
        wing.position.y = Math.cos(progress * 0.5) * 0.5;

        planeRenderer.render(planeScene, planeCamera);
    }

    animatePlane();
}

// =================================
// MAP ANIMATION
// =================================
function initMapAnimation() {
    const container = document.getElementById('map-animation');
    if (!container) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 200');
    svg.style.width = '100%';
    svg.style.maxWidth = '400px';
    svg.style.height = 'auto';
    svg.style.margin = '2rem auto';
    svg.style.display = 'block';

    // Path from point A to B (representing flight path)
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 50 150 Q 200 50 350 150');
    path.setAttribute('stroke', '#6bcfff');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-dasharray', '1000');
    path.setAttribute('stroke-dashoffset', '1000');
    svg.appendChild(path);

    // Start point
    const startCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    startCircle.setAttribute('cx', '50');
    startCircle.setAttribute('cy', '150');
    startCircle.setAttribute('r', '5');
    startCircle.setAttribute('fill', '#ff6b9d');
    svg.appendChild(startCircle);

    // End point
    const endCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    endCircle.setAttribute('cx', '350');
    endCircle.setAttribute('cy', '150');
    endCircle.setAttribute('r', '5');
    endCircle.setAttribute('fill', '#ffd93d');
    svg.appendChild(endCircle);

    // Labels
    const startText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    startText.setAttribute('x', '50');
    startText.setAttribute('y', '170');
    startText.setAttribute('text-anchor', 'middle');
    startText.setAttribute('fill', 'white');
    startText.setAttribute('font-size', '12');
    startText.textContent = 'São Paulo';
    svg.appendChild(startText);

    const endText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    endText.setAttribute('x', '350');
    endText.setAttribute('y', '170');
    endText.setAttribute('text-anchor', 'middle');
    endText.setAttribute('fill', 'white');
    endText.setAttribute('font-size', '12');
    endText.textContent = 'Lençóis Maranhenses';
    svg.appendChild(endText);

    container.appendChild(svg);

    // Animate path drawing
    path.style.transition = 'stroke-dashoffset 2s ease';
    setTimeout(() => {
        path.style.strokeDashoffset = '0';
    }, 100);
}

// =================================
// DUNES 3D ANIMATION
// =================================
function initDunes3D() {
    const container = document.getElementById('dunes-3d');
    if (!container) return;

    const dunesScene = new THREE.Scene();
    const dunesCamera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    const dunesRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const width = Math.min(window.innerWidth * 0.9, 600);
    const height = window.innerWidth < 768 ? 200 : 300;
    dunesRenderer.setSize(width, height);
    dunesRenderer.domElement.style.maxWidth = '100%';
    dunesRenderer.domElement.style.height = 'auto';
    dunesRenderer.domElement.style.margin = '0 auto';
    dunesRenderer.domElement.style.display = 'block';
    container.appendChild(dunesRenderer.domElement);

    // Create dunes (hills)
    const geometry = new THREE.PlaneGeometry(20, 10, 50, 25);
    const material = new THREE.MeshPhongMaterial({
        color: 0xf4e4c1,
        side: THREE.DoubleSide,
        wireframe: false
    });

    // Modify geometry to create hills
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 2;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    const dunes = new THREE.Mesh(geometry, material);
    dunes.rotation.x = -Math.PI / 3;
    dunesScene.add(dunes);

    // Water lagoon (blue plane)
    const waterGeometry = new THREE.CircleGeometry(2, 32);
    const waterMaterial = new THREE.MeshPhongMaterial({
        color: 0x6bcfff,
        transparent: true,
        opacity: 0.7
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.5;
    dunesScene.add(water);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    dunesScene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    dunesScene.add(ambientLight);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffd93d });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-5, 5, -5);
    dunesScene.add(sun);

    dunesCamera.position.set(0, 5, 10);
    dunesCamera.lookAt(0, 0, 0);

    function animateDunes() {
        requestAnimationFrame(animateDunes);

        dunes.rotation.z += 0.001;
        water.rotation.z += 0.005;

        // Animate water opacity
        water.material.opacity = 0.7 + Math.sin(Date.now() * 0.001) * 0.1;

        dunesRenderer.render(dunesScene, dunesCamera);
    }

    animateDunes();
}

// =================================
// DAYS COUNTER
// =================================
function updateDaysCounter() {
    // Assuming relationship started 1 year ago from today
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);

    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const counter = document.getElementById('days-counter');
    if (counter) {
        // Animate counter
        let current = 0;
        const increment = diffDays / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= diffDays) {
                current = diffDays;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 30);
    }
}

// =================================
// RESIZE HANDLER
// =================================
window.addEventListener('resize', () => {
    if (renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// =================================
// INITIALIZE EVERYTHING
// =================================
document.addEventListener('DOMContentLoaded', () => {
    initThreeBackground();
    setTimeout(initCoffee3D, 100);
    setTimeout(initScrollAnimations, 200);
    initCarousel();
    initEasterEgg();
    initHeartParticles();
    setTimeout(initBall3D, 300);
    initMusicChallenge();
    updateDaysCounter();

    // Smooth scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll reveal animations to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.story-text, .photo-card, .tribute-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// =================================
// PARTICLE HEARTS ON TRIBUTO
// =================================
function initParticlesHeart() {
    const container = document.getElementById('particles-heart');
    if (!container) return;

    const particleScene = new THREE.Scene();
    const particleCamera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const particleRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const size = Math.min(window.innerWidth, 400);
    particleRenderer.setSize(size, 300);
    container.appendChild(particleRenderer.domElement);

    // Create heart shape with particles
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
    heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
    heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
    heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

    const points = heartShape.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.PointsMaterial({
        color: 0xff6b9d,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });

    const heartParticles = new THREE.Points(geometry, material);
    heartParticles.scale.set(2, 2, 2);
    particleScene.add(heartParticles);

    particleCamera.position.z = 3;

    function animateParticlesHeart() {
        requestAnimationFrame(animateParticlesHeart);
        heartParticles.rotation.z += 0.005;
        particleRenderer.render(particleScene, particleCamera);
    }

    setTimeout(animateParticlesHeart, 100);
}

// Add to DOMContentLoaded
setTimeout(initParticlesHeart, 400);
