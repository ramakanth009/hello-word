// Main JavaScript for Kobra Ionizers

// DOM Elements
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const productGrid = document.querySelector('.product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Product Data
const products = {
    residential: [
        {
            id: 'k5',
            name: 'Kobra K5',
            plates: 5,
            description: 'Perfect for small households',
            specs: {
                power: '0-400W',
                flow: '40-50 LPH',
                ph: '7.5/8.5/9.5',
                orp: '-100 TO -500'
            },
            image: '../../images/WhatsApp Image 2024-11-11 at 00.46.31_3cc45e72.jpg',
            price: '₹1,35,000'
        },
        {
            id: 'k7',
            name: 'Kobra K7',
            plates: 7,
            description: 'Ideal for medium-sized families',
            specs: {
                power: '0-400W',
                flow: '50-60 LPH',
                ph: '7.5/8.5/9.5',
                orp: '-100 TO -600'
            },
            image: '../../images/WhatsApp Image 2024-11-11 at 00.46.31_9b758398.jpg',
            price: '₹1,55,000'
        },
        {
            id: 'k9',
            name: 'Kobra K9',
            plates: 9,
            description: 'Advanced purification for large families',
            specs: {
                power: '0-450W',
                flow: '60-70 LPH',
                ph: '7.5/8.5/9.5/10.5',
                orp: '-150 TO -700'
            },
            image: '../../images/WhatsApp Image 2024-11-11 at 00.46.31_b55009ed.jpg',
            price: '₹1,75,000'
        }
    ],
    industrial: [
        {
            id: 'k500',
            name: 'Kobra K500',
            description: 'Industrial grade purification system',
            specs: {
                capacity: '500 LPH',
                power: 'High Performance',
                features: ['Auto Cleaning', 'Digital Controls']
            },
            image: '../../images/WhatsApp Image 2024-11-11 at 00.46.32_b374e12e.jpg',
            price: '₹7,00,000'
        }
    ],
    bottles: [
        {
            id: 'smart-bottle',
            name: 'Smart Alkaline Bottle',
            category: 'smart',
            image: '../../images/kobra water bottles9.jpg',
            features: [
                'pH Tracking Technology',
                'Temperature Monitoring', 
                'Bluetooth Connectivity'
            ],
            description: 'Advanced smart bottle for tech-savvy hydration enthusiasts'
        },
        {
            id: 'classic-bottle',
            name: 'Classic Ionizer Bottle',
            category: 'classic',
            image: '../../images/kobra water bottles6.jpg',
            features: [
                'Stainless Steel Design',
                'Advanced Filtration',
                'Leak-Proof Mechanism'
            ],
            description: 'Elegant and durable bottle for everyday use'
        },
        {
            id: 'portable-bottle',
            name: 'Portable Ionizer Bottle',
            category: 'portable',
            image: '../../images/kobra water bottles2.jpg',
            features: [
                'Compact Design',
                'Quick Ionization',
                'Travel-Friendly'
            ],
            description: 'Perfect companion for active lifestyles'
        }
    ]
};

// Benefits Data
const benefits = [
    {
        icon: 'fas fa-weight-scale',
        title: 'Weight Loss',
        description: 'Support natural weight management through improved hydration'
    },
    {
        icon: 'fas fa-droplet',
        title: 'Better Hydration',
        description: 'Enhanced water absorption at cellular level'
    },
    {
        icon: 'fas fa-bolt',
        title: 'Increased Energy',
        description: 'Natural energy boost through optimal hydration'
    },
    {
        icon: 'fas fa-heart-pulse',
        title: 'Heart Health',
        description: 'Support cardiovascular health with ionized water'
    },
    {
        icon: 'fas fa-brain',
        title: 'Mental Clarity',
        description: 'Improve cognitive function through better hydration'
    },
    {
        icon: 'fas fa-bone',
        title: 'Bone Health',
        description: 'Support bone density with mineral-rich water'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    loadProducts('all');
    loadBenefits();
    initializeAOS();
});

// Navigation Functions
function initializeNavigation() {
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for header
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update last scroll position
        lastScroll = currentScroll;
    });
}

// Product Functions
function loadProducts(filter) {
    if (!productGrid) return;

    let productsToShow = [];
    if (filter === 'all') {
        productsToShow = [...products.residential, ...products.industrial];
    } else {
        productsToShow = products[filter] || [];
    }

    productGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-specs">
                    ${generateSpecsList(product.specs)}
                </div>
                <div class="product-price">
                    <span>${product.price}</span>
                    <button class="btn primary-btn" onclick="bookDemo('${product.id}')">Book Demo</button>
                </div>
            </div>
        </div>
    `).join('');
}

function generateSpecsList(specs) {
    return Object.entries(specs)
        .map(([key, value]) => `
            <div class="spec-item">
                <span class="spec-label">${key}:</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');
}

// Filter Products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadProducts(filter);
    });
});

// Benefits Functions
function loadBenefits() {
    const benefitsGrid = document.querySelector('.benefits-grid');
    if (!benefitsGrid) return;

    benefitsGrid.innerHTML = benefits.map((benefit, index) => `
        <div class="benefit-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="benefit-icon">
                <i class="${benefit.icon}"></i>
            </div>
            <h3>${benefit.title}</h3>
            <p>${benefit.description}</p>
        </div>
    `).join('');
}

// Demo Booking Function
function bookDemo(productId) {
    // Implement demo booking logic
    console.log(`Booking demo for product: ${productId}`);
    // Could open a modal, scroll to contact form, etc.
}

// Initialize AOS (Animate on Scroll)
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const name = form.querySelector('input[name="name"]');
    const phone = form.querySelector('input[name="phone"]');
    const email = form.querySelector('input[name="email"]');

    let isValid = true;

    if (name && !name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }

    if (phone && !validatePhone(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    if (email && !validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    return isValid;
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    input.classList.add('error');
}
function loadProducts(filter) {
    if (!productGrid) return;

    let productsToShow = [];
    if (filter === 'all') {
        productsToShow = [...products.residential, ...products.industrial, ...products.bottles];
    } else if (filter === 'bottles') {
        productsToShow = products.bottles; // Show only bottles
    } else {
        productsToShow = products[filter] || [];
    }

    productGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                ${product.specs ? `<div class="product-specs">${generateSpecsList(product.specs)}</div>` : ''}
                ${filter !== 'bottles' ? `<div class="product-price"><span>${product.price}</span><button class="btn primary-btn" onclick="bookDemo('${product.id}')">Book Demo</button></div>` : ''}
            </div>
        </div>
    `).join('');
}
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animation triggers
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });
});

function animateValue(card) {
    const valueDisplay = card.querySelector('.stat-value');
    const targetValue = parseFloat(card.dataset.value);
    const suffix = card.dataset.suffix || '';
    const duration = 2000; // Animation duration in milliseconds
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentValue = 0;
    let currentStep = 0;

    const timer = setInterval(() => {
        currentStep++;
        currentValue = (targetValue * currentStep) / steps;
        
        // Handle decimal places for percentage values
        const displayValue = Number.isInteger(targetValue) ? 
            Math.floor(currentValue) : 
            currentValue.toFixed(1);
        
        valueDisplay.textContent = displayValue;
        valueDisplay.setAttribute('data-suffix', suffix);

        if (currentStep >= steps) {
            clearInterval(timer);
            valueDisplay.textContent = targetValue;
            valueDisplay.setAttribute('data-suffix', suffix);
        }
    }, stepTime);

    // Add animation class
    card.classList.add('animated');
}

// Optional: Add scroll-triggered animations
function addScrollAnimations() {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
    });
}

// Initialize scroll animations
addScrollAnimations();

// class HeroSlider {
//     constructor() {
//         this.slider = document.querySelector('.hero-slider');
//         this.slides = this.slider.querySelectorAll('.slide');
//         this.currentSlide = 0;
//         this.slideCount = this.slides.length;
//         this.autoPlayDelay = 5000; // 5 seconds
//         this.autoPlayTimer = null;

//         this.init();
//     }

//     init() {
//         // Create dots
//         this.createDots();
        
//         // Set initial slide
//         this.showSlide(0);
        
//         // Add event listeners
//         this.addEventListeners();
        
//         // Start autoplay
//         this.startAutoPlay();
//     }

//     createDots() {
//         const dotsContainer = this.slider.querySelector('.slider-dots');
        
//         for (let i = 0; i < this.slideCount; i++) {
//             const dot = document.createElement('div');
//             dot.classList.add('slider-dot');
//             dot.addEventListener('click', () => this.showSlide(i));
//             dotsContainer.appendChild(dot);
//         }
        
//         this.dots = dotsContainer.querySelectorAll('.slider-dot');
//     }

//     showSlide(index) {
//         // Remove active class from current slide
//         this.slides[this.currentSlide].classList.remove('active');
//         this.dots[this.currentSlide].classList.remove('active');
        
//         // Update current slide
//         this.currentSlide = index;
        
//         // Handle wrap-around
//         if (this.currentSlide >= this.slideCount) {
//             this.currentSlide = 0;
//         } else if (this.currentSlide < 0) {
//             this.currentSlide = this.slideCount - 1;
//         }
        
//         // Add active class to new slide
//         this.slides[this.currentSlide].classList.add('active');
//         this.dots[this.currentSlide].classList.add('active');
//     }

//     nextSlide() {
//         this.showSlide(this.currentSlide + 1);
//     }

//     prevSlide() {
//         this.showSlide(this.currentSlide - 1);
//     }

//     startAutoPlay() {
//         this.stopAutoPlay();
//         this.autoPlayTimer = setInterval(() => this.nextSlide(), this.autoPlayDelay);
//     }

//     stopAutoPlay() {
//         if (this.autoPlayTimer) {
//             clearInterval(this.autoPlayTimer);
//             this.autoPlayTimer = null;
//         }
//     }

//     addEventListeners() {
//         // Arrow navigation
//         const prevButton = this.slider.querySelector('.slider-arrow.prev');
//         const nextButton = this.slider.querySelector('.slider-arrow.next');
        
//         prevButton.addEventListener('click', () => {
//             this.prevSlide();
//             this.startAutoPlay(); // Reset autoplay timer
//         });
        
//         nextButton.addEventListener('click', () => {
//             this.nextSlide();
//             this.startAutoPlay(); // Reset autoplay timer
//         });

//         // Pause autoplay on hover
//         this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
//         this.slider.addEventListener('mouseleave', () => this.startAutoPlay());

//         // Touch support
//         let touchStartX = 0;
//         let touchEndX = 0;

//         this.slider.addEventListener('touchstart', (e) => {
//             touchStartX = e.touches[0].clientX;
//         });

//         this.slider.addEventListener('touchend', (e) => {
//             touchEndX = e.changedTouches[0].clientX;
            
//             // Calculate swipe distance
//             const swipeDistance = touchEndX - touchStartX;
            
//             // Minimum swipe distance threshold
//             if (Math.abs(swipeDistance) > 50) {
//                 if (swipeDistance > 0) {
//                     this.prevSlide();
//                 } else {
//                     this.nextSlide();
//                 }
//                 this.startAutoPlay(); // Reset autoplay timer
//             }
//         });

//         // Keyboard navigation
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'ArrowLeft') {
//                 this.prevSlide();
//                 this.startAutoPlay();
//             } else if (e.key === 'ArrowRight') {
//                 this.nextSlide();
//                 this.startAutoPlay();
//             }
//         });
//     }
// }

// Initialize slider when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new HeroSlider();
// });

// Features Section Interactivity
document.addEventListener('DOMContentLoaded', () => {
    initializeFeaturesAnimation();
    initializePhLevels();
    initializeElements();
    initializeBenefits();
});

// Initialize animations for feature cards
function initializeFeaturesAnimation() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// Initialize pH levels interaction
function initializePhLevels() {
    const phItems = document.querySelectorAll('.ph-item');

    phItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            highlightPhLevel(item);
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            resetPhLevel(item);
        });
    });
}

function highlightPhLevel(item) {
    const value = item.querySelector('.ph-value');
    const use = item.querySelector('.ph-use');
    
    value.style.color = 'var(--primary-color)';
    use.style.color = 'var(--primary-color)';
    
    if (item.classList.contains('alkaline')) {
        item.style.background = 'rgba(var(--primary-color-rgb), 0.2)';
    } else if (item.classList.contains('neutral')) {
        item.style.background = 'rgba(var(--success-color-rgb), 0.2)';
    } else {
        item.style.background = 'rgba(var(--warning-color-rgb), 0.2)';
    }
}

function resetPhLevel(item) {
    const value = item.querySelector('.ph-value');
    const use = item.querySelector('.ph-use');
    
    value.style.color = '';
    use.style.color = '';
    
    if (item.classList.contains('alkaline')) {
        item.style.background = 'rgba(var(--primary-color-rgb), 0.1)';
    } else if (item.classList.contains('neutral')) {
        item.style.background = 'rgba(var(--success-color-rgb), 0.1)';
    } else {
        item.style.background = 'rgba(var(--warning-color-rgb), 0.1)';
    }
}

// Initialize elements interaction
function initializeElements() {
    const elementItems = document.querySelectorAll('.element-item');

    elementItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.element-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.boxShadow = 'var(--shadow-lg)';
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.element-icon');
            icon.style.transform = '';
            icon.style.boxShadow = '';
        });
    });
}

// Initialize benefits interaction
function initializeBenefits() {
    const benefitItems = document.querySelectorAll('.benefit-item');

    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.benefit-icon');
            icon.style.transform = '';
        });
    });
}

// Quote animation
const expertQuote = document.querySelector('.expert-quote');
if (expertQuote) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    expertQuote.style.opacity = '0';
    expertQuote.style.transform = 'translateY(20px)';
    expertQuote.style.transition = 'all 0.8s ease-out';
    observer.observe(expertQuote);
}

// Utility function for touch devices
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Add touch support
if (isTouchDevice()) {
    document.querySelectorAll('.feature-card, .ph-item, .element-item, .benefit-item').forEach(item => {
        item.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        });
    });
}

// Add accessibility improvements
document.querySelectorAll('.feature-card, .ph-item, .element-item, .benefit-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Awards Section Interactivity
document.addEventListener('DOMContentLoaded', () => {
    initializeAchievementCounter();
    initializeAwardCards();
    initializeCertifications();
    initializeScrollAnimations();
});

// Achievement Counter Animation
function initializeAchievementCounter() {
    const achievementItems = document.querySelectorAll('.achievement-content h3');
    
    const startCounting = (element) => {
        // Get the target number from a data attribute instead of the text content
        const target = parseInt(element.getAttribute('data-target') || element.textContent);
        if (isNaN(target)) return; // Skip if target is not a valid number
        
        let count = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;

        const updateCounter = () => {
            count += increment;
            if (count < target) {
                element.textContent = Math.round(count);
                setTimeout(updateCounter, stepTime);
            } else {
                element.textContent = target;
            }
        };

        // Set initial value to 0
        element.textContent = '0';
        updateCounter();
    };

    // Intersection Observer for starting counter when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    achievementItems.forEach(item => {
        // Store the target number in a data attribute
        const targetNumber = item.textContent;
        item.setAttribute('data-target', targetNumber);
        observer.observe(item);
    });
}

// Award Cards Animation
function initializeAwardCards() {
    const awardCards = document.querySelectorAll('.award-card');

    awardCards.forEach(card => {
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = '';
            }
        });

        // Add click handler for mobile
        card.addEventListener('click', () => {
            // Toggle active state for mobile
            card.classList.toggle('active');
        });
    });
}

// Certifications Animation
function initializeCertifications() {
    const certItems = document.querySelectorAll('.cert-item');

    certItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
            item.style.background = 'rgba(var(--primary-color-rgb), 0.1)';
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
            item.style.background = '';
        });
    });

    // Stagger animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    certItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    // Elements to animate
    const elements = [
        '.section-header',
        '.achievement-item',
        '.award-card',
        '.recognition-banner'
    ].join(',');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    document.querySelectorAll(elements).forEach(el => {
        el.setAttribute('data-aos', 'fade-up');
        observer.observe(el);
    });
}

// Utility function for touch devices
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Add touch support
if (isTouchDevice()) {
    document.querySelectorAll('.award-card, .cert-item').forEach(item => {
        item.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        });
    });
}

// Recognition Banner Animation
const banner = document.querySelector('.recognition-banner');
if (banner) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                banner.style.opacity = '1';
                banner.style.transform = 'translateY(0)';
                
                // Add shine effect
                const shine = document.createElement('div');
                shine.className = 'shine-effect';
                banner.appendChild(shine);
                
                setTimeout(() => {
                    shine.remove();
                }, 1000);
            }
        });
    }, {
        threshold: 0.5
    });

    banner.style.opacity = '0';
    banner.style.transform = 'translateY(20px)';
    banner.style.transition = 'all 0.8s ease-out';
    observer.observe(banner);
}

// Add accessibility improvements
document.querySelectorAll('.award-card, .cert-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Add smooth scrolling for award links
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