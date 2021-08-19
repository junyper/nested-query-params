import Route from '@ember/routing/route';

export default class SearchIndexRoute extends Route {
  redirect() {
    this.replaceWith('search.filter', 'foo');
  }
}
