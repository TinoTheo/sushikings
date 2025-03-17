import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import config from '../config/environment'; // Add this import

export default class GallerySectionComponent extends Component {
  @service galleryData;
  @tracked lightboxIndex = null;
  
  // Add rootURL accessor
  get rootURL() {
    return config.rootURL;
  }

  constructor() {
    super(...arguments);
    this.galleryData.load();
  }

  // Keep existing actions
  @action
  retryLoad() {
    this.galleryData.load();
  }

  @action
  handleImageClick(index) {
    this.lightboxIndex = index;
  }
}