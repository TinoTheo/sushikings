import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

const sampleNames = [
  'Sakura Symphony',
  'Tsukiji Market Special',
  'Edomae Legacy',
  'Neo Tokyo',
  'Jomon Inspiration',
  'Yamamoto Original'
];

const sampleIngredients = [
  'Tuna, Shari, Wasabi, Shiso',
  'Salmon, Rice, Nori, Sesame',
  'Eel, Sauce, Sansho, Spring Onion',
  'Scallop, Lemon, Sea Salt, Chives',
  'Sea Urchin, Quail Egg, Gold Leaf',
  'Octopus, Ginger, Ponzu, Daikon'
];

export default class GalleryDataService extends Service {
  @tracked items = [];
  @tracked isLoading = false;
  @tracked error = null;

  async load() {
    try {
      this.isLoading = true;
      this.error = null;
      
      const response = await fetch('https://picsum.photos/v2/list?page=1&limit=8');
      if (!response.ok) throw new Error('Failed to load gallery');
      
      const data = await response.json();
      this.items = data.map((item, index) => ({
        image: `https://picsum.photos/id/${item.id}/800/800`,
        alt: `Sushi Artistry by Chef ${item.author}`,
        name: sampleNames[index % sampleNames.length],
        ingredients: sampleIngredients[index % sampleIngredients.length]
      }));
    } catch (err) {
      this.error = err;
      this.items = [];
    } finally {
      this.isLoading = false;
    }
  }
}