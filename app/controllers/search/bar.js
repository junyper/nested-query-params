import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const QUERY_DEFAULTS = {
  bar: '',
};

export default class SearchBarController extends Controller {
  queryParams = ['bar'];
  queryDefaults = QUERY_DEFAULTS;

  @tracked bar = QUERY_DEFAULTS.bar;
  @tracked q;

  setup({ q }) {
    this.q = q;
  }

  reset() {
    this.bar = QUERY_DEFAULTS.bar;
  }

  get filters() {
    let filters = this.bar?.split(',').filter((value) => value.trim() !== '');
    return filters ?? [];
  }

  set filters(values = []) {
    let filters = values.filter((value) => value.trim() !== '');
    this.bar = filters.join(',');
  }

  @action
  handleFilterChange(event) {
    let value = event.target.value;
    let filters = this.filters;

    if (filters.includes(value)) {
      filters = filters.filter((v) => v !== value);
    } else {
      filters.push(value);
    }

    this.filters = filters;
  }
}
