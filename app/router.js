import EmberRouter from '@ember/routing/router';
import config from 'nested-query-params/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('search', { path: '/' }, function () {
    this.route('foo');
    this.route('bar');
  });
});
