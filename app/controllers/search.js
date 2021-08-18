import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULTS = {
  q: '',
};

export default class SearchController extends Controller {
  queryParams = ['q'];
  defaults = DEFAULTS;

  @tracked q = DEFAULTS.q;

  setup({ q }) {
    console.log('setup search', q);
    this.q = q;
  }

  reset() {
    this.q = '';
    console.log('reset search', this.q);
  }

  @action
  handleSearch(q) {
    this.q = q.trim();
  }
}
