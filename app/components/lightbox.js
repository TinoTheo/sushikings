import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LightboxComponent extends Component {
  @tracked isVisible = false;
  @tracked currentIndex = 0;

  get currentItem() {
    return this.args.items?.[this.currentIndex];
  }

  @action
  open(index) {
    this.currentIndex = index;
    this.isVisible = true;
    document.addEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = 'hidden';
  }

  @action
  close() {
    this.isVisible = false;
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = '';
  }

  // Add swipe handling for mobile
  @action
  handleSwipe(event) {
    const deltaX = event.deltaX;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? this.prevImage() : this.nextImage();
    }
  }
}