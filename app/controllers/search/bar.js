import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
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

export default class BarController extends Controller {
  queryParams = ['bar'];
  defaults = DEFAULTS;
  options = OPTIONS;

  @tracked bar = DEFAULTS.bar;

  @service router;

  setup({ bar }) {
    this.bar = bar;
  }

  reset() {
    this.bar = DEFAULTS.bar;
  }

  get q() {
    return this.router.currentRoute.queryParams?.q;
  }

  get selections() {
    let { bar } = this.router.currentRoute.queryParams;
    let selections = bar?.split(',').filter((value) => value.trim() !== '');
    return selections ?? [];
  }

  @action
  handleFilterChange(selections) {
    this.bar = selections.join(',');
  }
}
