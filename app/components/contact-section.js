// app/components/contact-section.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContactSectionComponent extends Component {
  @tracked formData = {
    name: '',
    email: '',
    message: ''
  };

  @tracked isLoading = false;
  @tracked showSuccess = false;
  @tracked showError = false;

  // Form validation
  get isFormValid() {
    return (
      this.formData.name.trim().length > 0 &&
      this.isValidEmail(this.formData.email) &&
      this.formData.message.trim().length > 0
    );
  }

  // Email validation helper
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Handle form input updates
  @action
  updateFormData(event) {
    const { name, value } = event.target;
    this.formData = { ...this.formData, [name]: value };
  }

  // Handle form submission
  @action
  async handleSubmit(event) {
    event.preventDefault();
    
    if (!this.isFormValid) return;

    this.isLoading = true;
    this.showSuccess = false;
    this.showError = false;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form on success
      this.formData = { name: '', email: '', message: '' };
      this.showSuccess = true;
    } catch (error) {
      console.error('Submission error:', error);
      this.showError = true;
    } finally {
      this.isLoading = false;
    }
  }

  // Submit button state
  get submitButtonText() {
    return this.isLoading ? 'Sending...' : 'Request Consultation';
  }

  get isSubmitDisabled() {
    return !this.isFormValid || this.isLoading;
  }
}