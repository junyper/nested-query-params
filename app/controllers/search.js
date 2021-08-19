import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULTS = {
  q: '',
  f: '',
};

export default class SearchController extends Controller {
  queryParams = ['q', 'f'];
  defaults = {
    q: null,
    f: null,
  };

  @tracked q = DEFAULTS.q;
  @tracked f = DEFAULTS.f;

  setup({ q, f }) {
    this.q = q;
    this.f = f;
  }

  reset() {
    this.q = DEFAULTS.q;
    this.f = DEFAULTS.f;
  }

  clearFilters() {
    this.f = DEFAULTS.f;
  }

  @action
  handleSearch(q) {
    this.q = q;
    this.f = DEFAULTS.f;
  }
}
