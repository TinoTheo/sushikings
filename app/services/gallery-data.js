import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class GalleryDataService extends Service {
  @tracked items = [];

  async load() {
    try {
      let response = await fetch('/data/gallery.json');
      if (!response.ok) {
        throw new Error(`Failed to load gallery data: ${response.statusText}`);
      }
      let data = await response.json();
      this.items = data.items;
    } catch (error) {
      console.error('Error loading gallery data:', error);
    }
  }
}
