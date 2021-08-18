import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULTS = {
  foo: '',
};

const OPTIONS = [
  {
    value: 'a',
    label: 'Filter A',
  },
  {
    value: 'b',
    label: 'Filter B',
  },
];

export default class SearchFooController extends Controller {
  name = 'foo';
  queryParams = ['foo'];
  defaults = DEFAULTS;
  options = OPTIONS;

  @tracked foo = DEFAULTS.foo;

  setup({ q }) {
    console.log('setup foo', q);
    this.q = q;
  }

  reset() {
    this.foo = DEFAULTS.foo;
    console.log('reset foo', this.foo);
  }

  get selections() {
    let selections = this.foo
      ?.split(',')
      .filter((value) => value.trim() !== '');
    return selections ?? [];
  }

  set selections(values = []) {
    let selections = values.filter((value) => value.trim() !== '');
    this.foo = selections.join(',');
  }

  @action
  handleFilterChange(value) {
    let selections = this.selections;

    if (selections.includes(value)) {
      selections = selections.filter((v) => v !== value);
    } else {
      selections.push(value);
    }

    this.selections = selections;
  }
}
