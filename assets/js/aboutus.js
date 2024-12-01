// Gallery and Events JavaScript
class GalleryManager {
    constructor() {
        this.galleryGrid = document.querySelector('.gallery-grid');
        this.modal = null;
        this.currentIndex = 0;
        this.images = [
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.01.56_7050a088.jpg',
                alt: 'Chandigarh Exhibition - Product Display',
                caption: 'Our innovative water ionizers on display'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.01.56_904e633a.jpg',
                alt: 'Live Product Demo',
                caption: 'Our innovative water ionizers on display'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.01.56_fa221eac.jpg',
                alt: 'Customer Interaction',
                caption: 'Our innovative water ionizers on display'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.01.57_63a78d84.jpg',
                alt: 'Chandigarh Exhibition - Product Display',
                caption: 'Our innovative water ionizers on display'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.01.57_c6cb215b.jpg',
                alt: 'Live Product Demo',
                caption: 'Customers experiencing the benefits firsthand'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.01.57_eb777387.jpg',
                alt: 'Customer Interaction',
                caption: 'Expert demonstrating water ionization process'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.01.58_7cbf42ab.jpg',
                alt: 'Live Product Demo',
                caption: 'Expert demonstrating water ionization process'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.01.58_ba14b53f.jpg',
                alt: 'Customer Interaction',
                caption: 'Our innovative water ionizers on display'
            },
            
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.31.38_40664f35.jpg',
                alt: 'Live Product Demo',
                caption: 'Expert demonstrating water ionization process'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.31.38_5d1339e5.jpg',
                alt: 'Customer Interaction',
                caption: 'Customers experiencing the benefits firsthand'
            },
            {
                src: '../../images/exhibition/WhatsApp Image 2024-11-11 at 01.31.38_7f211758.jpg',
                alt: 'Chandigarh Exhibition - Product Display',
                caption: 'Customers experiencing the benefits firsthand'
            },

        ];

        this.init();
    }

    init() {
        this.createGallery();
        this.createModal();
        this.addEventListeners();
    }

    createGallery() {
        if (!this.galleryGrid) return;

        this.images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy" />
                <div class="gallery-item-overlay">
                    <span class="gallery-item-caption">${image.caption}</span>
                    <button class="gallery-view-btn" data-index="${index}">
                        View Larger
                    </button>
                </div>
            `;
            this.galleryGrid.appendChild(galleryItem);
        });
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <button class="modal-prev">&lt;</button>
                <button class="modal-next">&gt;</button>
                <div class="modal-image-container">
                    <img src="" alt="" />
                    <p class="modal-caption"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.modal = modal;
    }

    addEventListeners() {
        // Gallery item click
        this.galleryGrid.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('.gallery-view-btn');
            if (viewBtn) {
                const index = parseInt(viewBtn.dataset.index);
                this.openModal(index);
            }
        });

        // Modal controls
        this.modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                this.closeModal();
            } else if (e.target.classList.contains('modal-prev')) {
                this.showPrevImage();
            } else if (e.target.classList.contains('modal-next')) {
                this.showNextImage();
            } else if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.showPrevImage();
                    break;
                case 'ArrowRight':
                    this.showNextImage();
                    break;
            }
        });
    }

    openModal(index) {
        this.currentIndex = index;
        this.updateModalImage();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    updateModalImage() {
        const image = this.images[this.currentIndex];
        const modalImg = this.modal.querySelector('img');
        const modalCaption = this.modal.querySelector('.modal-caption');

        modalImg.src = image.src;
        modalImg.alt = image.alt;
        modalCaption.textContent = image.caption;
    }

    showPrevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateModalImage();
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateModalImage();
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new GalleryManager();
});