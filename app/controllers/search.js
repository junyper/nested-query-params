import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SearchController extends Controller {
  queryParams = ['q'];

  @tracked q = '';

  setup({ q }) {
    this.q = q;
  }

  reset() {
    this.q = '';
  }

  @action
  handleSearch(q) {
    this.q = q.trim();
  }
}
