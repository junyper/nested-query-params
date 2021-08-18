import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULTS = {
  bar: '',
};

const OPTIONS = [
  {
    value: 'c',
    label: 'Filter C',
  },
  {
    value: 'd',
    label: 'Filter D',
  },
];
export default class SearchBarController extends Controller {
  name = 'bar';
  queryParams = ['bar'];
  defaults = DEFAULTS;
  options = OPTIONS;

  @tracked bar = DEFAULTS.bar;
  @tracked q;

  setup({ q }) {
    console.log('setup bar', q);
    this.q = q;
  }

  reset() {
    this.bar = DEFAULTS.bar;
    console.log('reset bar', this.bar);
  }

  get selections() {
    let selections = this.bar
      ?.split(',')
      .filter((value) => value.trim() !== '');
    return selections ?? [];
  }

  set selections(values = []) {
    let selections = values.filter((value) => value.trim() !== '');
    this.bar = selections.join(',');
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
