import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class GallerySectionComponent extends Component {
  @service galleryData;
  @tracked lightboxIndex = null;

  constructor() {
    super(...arguments);
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