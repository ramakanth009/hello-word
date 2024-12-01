// Utility Functions for Kobra Ionizers

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function to ensure a function is called at most once in a specified time period
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit = 300) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Format currency values
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

/**
 * Format date to local string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-IN', { ...defaultOptions, ...options });
};

/**
 * Get viewport dimensions
 * @returns {Object} - Viewport width and height
 */
export const getViewportDimensions = () => {
    return {
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Offset from viewport edge
 * @returns {boolean} - Whether element is in viewport
 */
export const isInViewport = (element, offset = 0) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 - offset &&
        rect.left >= 0 - offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
    );
};

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 * @param {number} offset - Offset from top of element
 */
export const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
};

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} - Random ID
 */
export const generateId = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Get query parameters from URL
 * @returns {Object} - Query parameters
 */
export const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
};

/**
 * Local storage wrapper with error handling
 */
export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
};

/**
 * Send analytics event
 * @param {string} eventName - Name of the event
 * @param {Object} eventData - Event data
 */
export const sendAnalyticsEvent = (eventName, eventData = {}) => {
    // Implement your analytics logic here
    // This is a placeholder implementation
    console.log('Analytics Event:', eventName, eventData);
    // Example: if using Google Analytics
    // if (window.gtag) {
    //     gtag('event', eventName, eventData);
    // }
};

/**
 * Handle lazy loading of images
 * @param {string} selector - CSS selector for images
 */
export const initLazyLoading = (selector = 'img[data-src]') => {
    const images = document.querySelectorAll(selector);
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

/**
 * Browser detection utility
 * @returns {Object} - Browser information
 */
export const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let browser = "Unknown";
    let version = "Unknown";

    if (ua.indexOf("Firefox") > -1) {
        browser = "Firefox";
        version = ua.match(/Firefox\/([0-9.]+)/)[1];
    } else if (ua.indexOf("Chrome") > -1) {
        browser = "Chrome";
        version = ua.match(/Chrome\/([0-9.]+)/)[1];
    } else if (ua.indexOf("Safari") > -1) {
        browser = "Safari";
        version = ua.match(/Version\/([0-9.]+)/)[1];
    } else if (ua.indexOf("MSIE") > -1 || ua.indexOf("Trident/") > -1) {
        browser = "Internet Explorer";
        version = ua.match(/(?:MSIE |rv:)([0-9.]+)/)[1];
    }

    return { browser, version };
};

/**
 * Device detection utility
 * @returns {string} - Device type
 */
export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

// Export all utilities
export default {
    debounce,
    throttle,
    formatCurrency,
    formatDate,
    getViewportDimensions,
    isInViewport,
    scrollToElement,
    generateId,
    deepClone,
    getQueryParams,
    storage,
    sendAnalyticsEvent,
    initLazyLoading,
    getBrowserInfo,
    getDeviceType
};
