// Form Validation and Handling for Kobra Ionizers

class FormValidator {
    constructor(formId, options = {}) {
        this.form = document.getElementById(formId);
        this.options = {
            validateOnInput: true,
            validateOnBlur: true,
            showSuccessState: true,
            ...options
        };
        
        if (!this.form) {
            console.error(`Form with ID "${formId}" not found`);
            return;
        }

        this.init();
    }

    init() {
        // Initialize event listeners
        if (this.options.validateOnInput) {
            this.form.querySelectorAll('input, select, textarea').forEach(input => {
                input.addEventListener('input', () => this.validateField(input));
            });
        }

        if (this.options.validateOnBlur) {
            this.form.querySelectorAll('input, select, textarea').forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
            });
        }

        // Handle form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        const rules = this.getValidationRules(field);
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (rules.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (rules.email && !this.isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Phone validation
        if (rules.phone && !this.isValidPhone(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }

        // Min length validation
        if (rules.minLength && field.value.length < rules.minLength) {
            isValid = false;
            errorMessage = `Minimum ${rules.minLength} characters required`;
        }

        // Update field state
        this.updateFieldState(field, isValid, errorMessage);
        return isValid;
    }

    getValidationRules(field) {
        return {
            required: field.hasAttribute('required'),
            email: field.type === 'email',
            phone: field.dataset.validatePhone === 'true',
            minLength: parseInt(field.dataset.minLength) || 0
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
    }

    updateFieldState(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Remove existing states
        field.classList.remove('error', 'success');
        formGroup.querySelectorAll('.error-message').forEach(el => el.remove());

        if (!isValid) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            formGroup.appendChild(errorElement);
        } else if (this.options.showSuccessState) {
            field.classList.add('success');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
        }

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());

            // Submit form data
            const response = await this.submitForm(data);
            
            if (response.success) {
                this.showSuccess();
                this.form.reset();
            } else {
                this.showError(response.message);
            }
        } catch (error) {
            this.showError('An error occurred. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        }
    }

    async submitForm(data) {
        // Implement your form submission logic here
        // This is a placeholder implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Form submitted successfully'
                });
            }, 1000);
        });
    }

    showSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = 'Form submitted successfully!';
        
        this.form.insertBefore(successMessage, this.form.firstChild);
        setTimeout(() => successMessage.remove(), 5000);
    }

    showError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-error';
        errorMessage.textContent = message;
        
        this.form.insertBefore(errorMessage, this.form.firstChild);
        setTimeout(() => errorMessage.remove(), 5000);
    }
}

// Initialize form validation for contact form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = new FormValidator('contactForm', {
        validateOnInput: true,
        showSuccessState: true
    });

    const demoForm = new FormValidator('demoForm', {
        validateOnInput: true,
        showSuccessState: true
    });
});

// Export the FormValidator class
export default FormValidator;
