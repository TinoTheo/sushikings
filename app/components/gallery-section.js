import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import config from '../config/environment'; 

export default class GallerySectionComponent extends Component {
  @service galleryData;
  @tracked lightboxIndex = null;
  
  get rootURL() {
    return config.rootURL;
  }


  constructor() {
    super(...arguments);
    console.log('Root URL:', this.rootURL); // Add this
    this.galleryData.load();
  }
  
  @action
  retryLoad() {
    this.galleryData.load();
  }

  @action
  handleImageClick(index) {
    this.lightboxIndex = index;
  }
}
