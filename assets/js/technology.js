// Technology Section JavaScript
class TechSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        if (!this.slider) return;

        this.slides = this.slider.querySelectorAll('img');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;

        this.init();
    }

    init() {
        // Create navigation dots
        this.createNavigation();
        
        // Set initial state
        this.showSlide(0);
        
        // Start autoplay
        this.startAutoPlay();
        
        // Add hover listeners
        this.addHoverListeners();
        
        // Add intersection observer
        this.addIntersectionObserver();
    }

    createNavigation() {
        const nav = document.createElement('div');
        nav.className = 'slider-nav';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.showSlide(index));
            nav.appendChild(dot);
        });
        
        this.slider.appendChild(nav);
        this.dots = nav.querySelectorAll('.slider-dot');
    }

    showSlide(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');

        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    addHoverListeners() {
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    addIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAutoPlay();
                } else {
                    this.stopAutoPlay();
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(this.slider);
    }
}

// Technology Features Animation
class TechFeatures {
    constructor() {
        this.features = document.querySelectorAll('.tech-features li');
        this.init();
    }

    init() {
        // Add hover animations
        this.features.forEach(feature => {
            feature.addEventListener('mouseenter', () => this.animateFeature(feature));
            feature.addEventListener('mouseleave', () => this.resetFeature(feature));
        });

        // Add intersection observer for scroll animations
        this.addIntersectionObserver();
    }

    animateFeature(feature) {
        const icon = feature.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }

    resetFeature(feature) {
        const icon = feature.querySelector('i');
        icon.style.transform = '';
    }

    addIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, {
            threshold: 0.2
        });

        this.features.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
            feature.style.transition = 'all 0.6s ease-out';
            observer.observe(feature);
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    const techSlider = new TechSlider('.tech-visual .slider');
    
    // Initialize features
    const techFeatures = new TechFeatures();
});