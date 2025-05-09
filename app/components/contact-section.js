import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ContactSectionComponent extends Component {
  @tracked formData = {
    name: '',
    email: '',
    message: ''
  };

  @tracked isLoading = false;
  @tracked showSuccess = false;
  @tracked showError = false;

  get isSubmitDisabled() {
    return this.isLoading || !this.formData.name || !this.formData.email || !this.formData.message;
  }

  get submitButtonText() {
    return this.isLoading ? 'Sending...' : 'Request Consultation';
  }
  

  @action
  updateFormData(event) {
    const { name, value } = event.target;
    this.formData = { ...this.formData, [name]: value };
  }

  @action
  async handleSubmit(event) {
    event.preventDefault();
    console.log("Submitting form...");

    this.isLoading = true;
    this.showSuccess = false;
    this.showError = false;

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      this.showSuccess = true;
      this.formData = { name: '', email: '', message: '' };
    } catch (error) {
      console.error('Submission error:', error);
      this.showError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
