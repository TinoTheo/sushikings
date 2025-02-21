import EmberRouter from '@ember/routing/router';
import config from 'sushikings/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('about');
  this.route('experience');
  this.route('index', { path: '/' });
  this.route('gallery');  
  this.route('Book Consultation');
  this.route('contact');
  this.route('menu');
});
