import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
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

export default class FooController extends Controller {
  queryParams = ['foo'];
  defaults = DEFAULTS;
  options = OPTIONS;

  @tracked foo = DEFAULTS.foo;

  @service router;

  setup({ foo }) {
    this.foo = foo;
  }

  reset() {
    this.foo = DEFAULTS.foo;
  }

  get q() {
    return this.router.currentRoute.queryParams?.q;
  }

  get selections() {
    let { foo } = this.router.currentRoute.queryParams;
    let selections = foo?.split(',').filter((value) => value.trim() !== '');
    return selections ?? [];
  }

  @action
  handleFilterChange(selections) {
    this.foo = selections.join(',');
  }
}
