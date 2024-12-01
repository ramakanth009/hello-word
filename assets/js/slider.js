// Slider functionality for Kobra Ionizers

class Slider {
    constructor(sliderSelector, options = {}) {
        this.slider = document.querySelector(sliderSelector);
        if (!this.slider) return;

        this.options = {
            autoPlay: options.autoPlay || true,
            interval: options.interval || 5000,
            transition: options.transition || 500,
            ...options
        };

        this.slides = this.slider.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.isTransitioning = false;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        // Create slider structure
        this.createSliderStructure();
        
        // Add navigation if needed
        if (this.slides.length > 1) {
            this.createNavigation();
        }

        // Start autoplay if enabled
        if (this.options.autoPlay) {
            this.startAutoPlay();
            
            // Pause on hover if specified
            if (this.options.pauseOnHover) {
                this.addHoverListeners();
            }
        }

        // Add touch support for mobile
        this.addTouchSupport();
    }

    createSliderStructure() {
        // Create slider content
        const sliderContent = document.createElement('div');
        sliderContent.className = 'slider-content';
        
        // Add slides
        while (this.slider.firstChild) {
            sliderContent.appendChild(this.slider.firstChild);
        }
        
        this.slider.appendChild(sliderContent);
        this.sliderContent = sliderContent;

        // Set initial states
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
        });
    }

    createNavigation() {
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        this.slider.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.slider-dot');
        this.updateDots();

        // Create arrow navigation
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-arrow slider-arrow-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.setAttribute('aria-label', 'Previous slide');
        
        const nextButton = document.createElement('button');
        nextButton.className = 'slider-arrow slider-arrow-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.setAttribute('aria-label', 'Next slide');
        
        prevButton.addEventListener('click', () => this.prevSlide());
        nextButton.addEventListener('click', () => this.nextSlide());
        
        this.slider.appendChild(prevButton);
        this.slider.appendChild(nextButton);
    }

    updateDots() {
        if (!this.dots) return;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoPlay() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.options.interval);
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

    addTouchSupport() {
        let startX, moveX;
        const threshold = 50; // minimum distance for swipe

        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay();
        });

        this.slider.addEventListener('touchmove', (e) => {
            if (!startX) return;
            moveX = e.touches[0].clientX;
        });

        this.slider.addEventListener('touchend', () => {
            if (!startX || !moveX) return;
            
            const diff = startX - moveX;
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            startX = null;
            moveX = null;
            
            if (this.options.autoPlay) this.startAutoPlay();
        });
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        const direction = index > this.currentSlide ? 1 : -1;
        
        // Update slides position
        this.slides.forEach((slide, i) => {
            if (i === this.currentSlide || i === index) {
                slide.style.transition = `transform ${this.options.transition}ms ease-in-out`;
            } else {
                slide.style.transition = 'none';
            }
            
            const offset = (i - index) * 100;
            slide.style.transform = `translateX(${offset}%)`;
        });

        // Update current slide
        this.currentSlide = index;
        this.updateDots();

        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
            this.slides.forEach(slide => {
                slide.style.transition = 'none';
            });
        }, this.options.transition);
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    // Hero slider
    const heroSlider = new Slider('.hero-slider', {
        autoPlay: true,
        interval: 5000,
        transition: 800,
        pauseOnHover: true
    });

    // Testimonials slider
    const testimonialSlider = new Slider('.testimonials-slider', {
        autoPlay: true,
        interval: 4000,
        transition: 600,
        pauseOnHover: true
    });
});

// Hero Slider Content
// const heroSlides = [
//     {
//         image: 'assets/images/hero/slide1.jpg',
//         title: 'Revolutionary Water Purification',
//         subtitle: 'Experience the power of advanced ionization technology',
//         cta: 'Explore Products'
//     },
//     {
//         image: 'assets/images/hero/slide2.jpg',
//         title: 'Industrial Grade Solutions',
//         subtitle: 'Powerful purification systems for commercial needs',
//         cta: 'Learn More'
//     },
//     {
//         image: 'assets/images/hero/slide3.jpg',
//         title: 'Transform Your Water Quality',
//         subtitle: 'Advanced filtration for healthier living',
//         cta: 'Book Demo'
//     }
// ];

// Testimonial Slides
const testimonials = [
    {
        name: 'Rajesh Kumar',
        position: 'Business Owner',
        image: 'assets/images/testimonials/testimonial1.jpg',
        content: 'Kobra Ionizers have transformed our office water quality. The installation was smooth, and the after-sales service is exceptional.',
        rating: 5
    },
    {
        name: 'Priya Sharma',
        position: 'Homemaker',
        image: 'assets/images/testimonials/testimonial2.jpg',
        content: `We've noticed a significant improvement in water taste and quality. The auto-clean feature makes maintenance hassle-free.`,
        rating: 5
    },
    {
        name: 'Dr. Amit Patel',
        position: 'Medical Professional',
        image: 'assets/images/testimonials/testimonial3.jpg',
        content: `As a doctor, I appreciate the health benefits of ionized water. Kobra's technology is truly state-of-the-art.`,
        rating: 5
    }
];

// Function to create hero slides
function createHeroSlides() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;

    heroSlider.innerHTML = heroSlides.map((slide, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}"
             style="background-image: url('${slide.image}')">
            <div class="slide-content">
                <h2 data-aos="fade-up" data-aos-delay="200">${slide.title}</h2>
                <p data-aos="fade-up" data-aos-delay="400">${slide.subtitle}</p>
                <button class="cta-button" data-aos="fade-up" data-aos-delay="600">
                    ${slide.cta}
                </button>
            </div>
        </div>
    `).join('');
}

// Function to create testimonial slides
function createTestimonialSlides() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (!testimonialSlider) return;

    testimonialSlider.innerHTML = testimonials.map((testimonial, index) => `
        <div class="testimonial-slide ${index === 0 ? 'active' : ''}">
            <div class="testimonial-content">
                <div class="testimonial-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <div class="testimonial-text">
                    <p>${testimonial.content}</p>
                    <div class="testimonial-rating">
                        ${createRatingStars(testimonial.rating)}
                    </div>
                    <h4>${testimonial.name}</h4>
                    <span>${testimonial.position}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Helper function to create rating stars
function createRatingStars(rating) {
    return Array(5).fill().map((_, index) => `
        <i class="fas fa-star ${index < rating ? 'active' : ''}"></i>
    `).join('');
}

// Initialize slides on load
document.addEventListener('DOMContentLoaded', () => {
    createHeroSlides();
    createTestimonialSlides();
});