// app/components/main-navbar.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  @tracked isMenuOpen = false;

  @action
  handleScroll(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      this.isMenuOpen = false;
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Update URL without refreshing
      if (history.pushState) {
        history.pushState(null, null, targetId);
      }
    }
  }

  @action
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action
  closeMenu() {
    this.isMenuOpen = false;
  }

  // In navbar component JS
  constructor() {
    super(...arguments);
    this.observer = new IntersectionObserver(this.handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });
  }

willDestroy() {
  super.willDestroy();
  this.observer.disconnect();
}

@action
handleIntersect(entries) {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.main-nav__link[href="#${id}"]`);
    if (entry.isIntersecting) {
      link?.classList.add('active');
    } else {
      link?.classList.remove('active');
    }
  });
}

@action
setupObserver() {
  document.querySelectorAll('section[id]').forEach((section) => {
    this.observer.observe(section);
  });
}
}