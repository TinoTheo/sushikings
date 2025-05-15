import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import config from '../config/environment';

export default class GallerySectionComponent extends Component {
  @tracked items = [];
  @tracked lightboxIndex = null;

  get rootURL() {
    return config.rootURL;
  }

  constructor() {
    super(...arguments);
    this.loadImages();
  }

  async loadImages() {
    try {
      let response = await fetch('/data/gallery.json');
      let data = await response.json();
      this.items = data.items;
    } catch (error) {
      console.error('Failed to load gallery images:', error);
    }
  }

  @action
  retryLoad() {
    this.loadImages();
  }

  @action
  handleImageClick(index) {
    this.lightboxIndex = index;
  }
}


