import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const QUERY_DEFAULTS = {
  foo: '',
};

export default class SearchFooController extends Controller {
  queryParams = ['foo'];
  queryDefaults = QUERY_DEFAULTS;

  @tracked foo = QUERY_DEFAULTS.foo;

  setup({ q }) {
    this.q = q;
  }

  reset() {
    this.foo = QUERY_DEFAULTS.foo;
  }

  get filters() {
    let filters = this.foo?.split(',').filter((value) => value.trim() !== '');
    return filters ?? [];
  }

  set filters(values = []) {
    let filters = values.filter((value) => value.trim() !== '');
    this.foo = filters.join(',');
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
