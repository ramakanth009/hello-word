// Products Page JavaScript
class ProductsPage {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.productGrid = document.querySelector('.product-grid');
        this.productCards = document.querySelectorAll('.product-card');
        this.currentFilter = 'all';
        
        // Product data from your files
        this.products = {
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
                    image: 'images/WhatsApp Image 2024-11-11 at 00.46.31_3cc45e72.jpg',
                    price: '₹1,15,000'
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
                    image: 'images/WhatsApp Image 2024-11-11 at 00.46.31_9b758398.jpg',
                    price: '₹1,35,000'
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
                    image: 'images/WhatsApp Image 2024-11-11 at 00.46.31_b55009ed.jpg',
                    price: '₹1,55,000'
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
                    image: 'images/WhatsApp Image 2024-11-11 at 00.46.32_b374e12e.jpg',
                    price: '₹7,00,000 (Plus GST)'
                }
            ],
            bottles: [
                {
                    id: 'smart-bottle',
                    name: 'Smart Alkaline Bottle',
                    category: 'smart',
                    image: 'images/kobra water bottles9.jpg',
                    features: [
                        'pH Tracking Technology',
                        'Temperature Monitoring', 
                        'Bluetooth Connectivity'
                    ],
                    description: 'Advanced smart bottle for tech-savvy hydration enthusiasts'
                }
            ]
        };

        this.init();
    }

    init() {
        // Initialize event listeners
        this.initializeFilters();
        this.initializeCards();
        this.initializeSearch();
        this.initializeSort();

        // Initialize animations
        this.initializeAnimations();
    }

    initializeFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.filterProducts(filter);
                
                // Update active state
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterProducts(filter) {
        this.currentFilter = filter;
        const products = filter === 'all' ? 
            [...this.products.residential, ...this.products.industrial, ...this.products.bottles] :
            this.products[filter] || [];

        this.renderProducts(products);
    }

    renderProducts(products) {
        // Clear existing products
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = products.map((product, index) => this.createProductCard(product, index)).join('');
        
        // Reinitialize animations for new cards
        this.initializeAnimations();
    }

    createProductCard(product, index) {
        return `
            <div class="product-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    
                    ${this.createSpecsHTML(product.specs)}
                    ${this.createFeaturesHTML(product.features)}

                    <div class="product-price">
                        <span class="price-amount">${product.price || 'Contact for Price'}</span>
                        <button class="product-btn primary-btn" onclick="bookDemo('${product.id}')">
                            ${product.price ? 'Book Demo' : 'Request Quote'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    createSpecsHTML(specs) {
        if (!specs) return '';
        
        return `
            <div class="product-specs">
                ${Object.entries(specs).map(([key, value]) => `
                    <div class="spec-item">
                        <span class="spec-label">${this.formatSpecLabel(key)}</span>
                        <span class="spec-value">${value}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createFeaturesHTML(features) {
        if (!features) return '';

        return `
            <div class="product-features">
                <h4>Key Features</h4>
                <ul>
                    ${features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    formatSpecLabel(label) {
        return label.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    initializeCards() {
        this.productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card);
            });
        });
    }

    animateCard(card) {
        const image = card.querySelector('.product-image img');
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    }

    initializeSearch() {
        const searchInput = document.querySelector('.product-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.searchProducts(searchTerm);
            }, 300));
        }
    }

    searchProducts(term) {
        const products = this.currentFilter === 'all' ?
            [...this.products.residential, ...this.products.industrial, ...this.products.bottles] :
            this.products[this.currentFilter] || [];

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );

        this.renderProducts(filteredProducts);
    }

    initializeSort() {
        const sortSelect = document.querySelector('.product-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }
    }

    sortProducts(sortBy) {
        const products = [...document.querySelectorAll('.product-card')];
        
        products.sort((a, b) => {
            const priceA = this.extractPrice(a.querySelector('.price-amount').textContent);
            const priceB = this.extractPrice(b.querySelector('.price-amount').textContent);
            
            return sortBy === 'asc' ? priceA - priceB : priceB - priceA;
        });

        const productGrid = document.querySelector('.product-grid');
        products.forEach(product => productGrid.appendChild(product));
    }

    extractPrice(priceString) {
        const match = priceString.match(/₹([\d,]+)/);
        return match ? parseInt(match[1].replace(/,/g, '')) : 0;
    }

    initializeAnimations() {
        const cards = document.querySelectorAll('.product-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize products page
document.addEventListener('DOMContentLoaded', () => {
    const productsPage = new ProductsPage();
});

// Demo booking function
function bookDemo(productId) {
    // Scroll to contact form
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill product information if available
        const productSelect = contactForm.querySelector('[name="product"]');
        if (productSelect) {
            productSelect.value = productId;
        }
    }
}