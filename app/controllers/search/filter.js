import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULTS = {
  f: '',
};

const OPTIONS = {
  foo: [
    {
      value: 'a',
      label: 'Filter A',
    },
    {
      value: 'b',
      label: 'Filter B',
    },
  ],
  bar: [
    {
      value: 'c',
      label: 'Filter C',
    },
    {
      value: 'd',
      label: 'Filter D',
    },
  ],
};

export default class FilterController extends Controller {
  queryParams = ['f'];
  defaults = DEFAULTS;

  @tracked f = DEFAULTS.f;
  @tracked q;
  @tracked type;

  setup({ q, type }) {
    console.log('setup filter', q, type);
    this.q = q;
    this.type = type;
  }

  reset() {
    this.f = DEFAULTS.f;
    console.log('reset filter', this.type, this.f);
  }

  get options() {
    return OPTIONS[this.type] ?? [];
  }

  get selections() {
    let selections = this.f?.split(',').filter((value) => value.trim() !== '');
    return selections ?? [];
  }

  set selections(values = []) {
    let selections = values.filter((value) => value.trim() !== '');
    this.f = selections.join(',');
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
