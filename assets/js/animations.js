// Animations and interactive elements for Kobra Ionizers

class AnimationController {
    constructor() {
        // Animation settings
        this.settings = {
            threshold: 0.2,
            rootMargin: '0px',
            animationDelay: 100
        };

        this.init();
    }

    init() {
        // Initialize all animations
        this.initScrollAnimations();
        this.initCounters();
        this.initParallax();
        this.initTechnologyVisuals();
        this.initWaterFlowAnimation();
    }

    // Scroll-based animations using Intersection Observer
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animate;
                    const delay = element.dataset.delay || 0;

                    setTimeout(() => {
                        element.classList.add('animated', animation);
                        element.classList.remove('invisible');
                    }, delay);

                    observer.unobserve(element);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: this.settings.threshold,
            rootMargin: this.settings.rootMargin
        });

        animatedElements.forEach(element => {
            element.classList.add('invisible');
            observer.observe(element);
        });
    }

    // Animated counters for statistics
    initCounters() {
        const counters = document.querySelectorAll('.stat-item h3');
        
        const countUp = (element, target) => {
            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;
            let currentNumber = 0;
            
            const updateCounter = () => {
                const increment = target / steps;
                currentNumber += increment;
                
                if (currentNumber < target) {
                    element.textContent = Math.round(currentNumber);
                    setTimeout(updateCounter, stepTime);
                } else {
                    element.textContent = target;
                }
            };

            updateCounter();
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.target);
                    countUp(element, target);
                    observer.unobserve(element);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            const value = parseInt(counter.textContent);
            counter.textContent = '0';
            counter.dataset.target = value;
            observer.observe(counter);
        });
    }

    // Parallax effect for background images
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        const handleScroll = () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const offset = scrolled * speed;
                element.style.transform = `translateY(${offset}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
    }

    // Interactive technology visualization
    initTechnologyVisuals() {
        const techSection = document.querySelector('.tech-visual');
        if (!techSection) return;

        // Create interactive water molecule visualization
        this.createWaterMoleculeAnimation(techSection);
        
        // Add hover effects for tech features
        const features = document.querySelectorAll('.tech-features li');
        features.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                this.highlightTechnologyFeature(feature);
            });
            
            feature.addEventListener('mouseleave', () => {
                this.resetTechnologyFeature(feature);
            });
        });
    }

    // Animated water flow visualization
    initWaterFlowAnimation() {
        const canvas = document.createElement('canvas');
        const container = document.querySelector('.tech-visual');
        if (!container) return;

        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resize = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        
        resize();
        window.addEventListener('resize', resize);

        // Particle system for water flow
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.speed = Math.random() * 2 + 1;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.5;
            }

            update() {
                this.y += this.speed;
                this.opacity -= 0.005;

                if (this.y > canvas.height || this.opacity <= 0) {
                    this.y = 0;
                    this.opacity = Math.random() * 0.5 + 0.5;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 119, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particle array
        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // Helper method for technology feature highlighting
    highlightTechnologyFeature(feature) {
        feature.classList.add('active');
        const icon = feature.querySelector('i');
        const text = feature.querySelector('span');
        
        // Animate icon
        icon.style.transform = 'scale(1.2)';
        icon.style.color = 'var(--primary-color)';
        
        // Animate text
        text.style.fontWeight = '600';
        text.style.color = 'var(--primary-color)';
    }

    // Helper method to reset technology feature
    resetTechnologyFeature(feature) {
        feature.classList.remove('active');
        const icon = feature.querySelector('i');
        const text = feature.querySelector('span');
        
        // Reset icon
        icon.style.transform = '';
        icon.style.color = '';
        
        // Reset text
        text.style.fontWeight = '';
        text.style.color = '';
    }

    // Water molecule animation
    createWaterMoleculeAnimation(container) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.classList.add("water-molecule");

        // Create molecules
        const molecule = `
            <g class="molecule">
                <circle cx="50" cy="40" r="8" fill="#0077ff" class="oxygen"/>
                <circle cx="35" cy="55" r="6" fill="#fff" class="hydrogen"/>
                <circle cx="65" cy="55" r="6" fill="#fff" class="hydrogen"/>
                <line x1="42" y1="45" x2="38" y2="52" stroke="#0077ff" stroke-width="2"/>
                <line x1="58" y1="45" x2="62" y2="52" stroke="#0077ff" stroke-width="2"/>
            </g>
        `;

        svg.innerHTML = molecule;
        container.appendChild(svg);

        // Add animation
        const keyframes = `
            @keyframes float {
                0% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
            }
        `;

        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        const moleculeEl = svg.querySelector('.molecule');
        moleculeEl.style.animation = 'float 3s ease-in-out infinite';
    }
}

// Create and export animation controller
const animationController = new AnimationController();
export default animationController;

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start animations
    animationController.init();

    // Add scroll-triggered animations for elements
    const elementsToAnimate = [
        { selector: '.hero-content h1', animation: 'fadeInDown', delay: 0 },
        { selector: '.hero-content p', animation: 'fadeInUp', delay: 200 },
        { selector: '.hero-content .cta-button', animation: 'fadeInUp', delay: 400 },
        { selector: '.stat-item', animation: 'fadeIn', delay: 100 },
        { selector: '.product-card', animation: 'fadeInUp', delay: 200 },
        { selector: '.benefit-card', animation: 'fadeInUp', delay: 200 },
        { selector: '.testimonial-slide', animation: 'fadeIn', delay: 0 }
    ];

    elementsToAnimate.forEach(({selector, animation, delay}) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.setAttribute('data-animate', animation);
            element.setAttribute('data-delay', delay);
        });
    });
});

// Add smooth scrolling behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});