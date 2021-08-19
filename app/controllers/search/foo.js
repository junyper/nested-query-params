import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const DEFAULTS = {
  foo: '',
};

export default class FooController extends Controller {
  queryParams = ['foo'];
  defaults = DEFAULTS;
  options = [
    {
      value: 'a',
      label: 'Filter A',
    },
    {
      value: 'b',
      label: 'Filter B',
    },
  ];
  foo = DEFAULTS.foo;

  @service router;

  setup(model, transition) {
    let from = transition?.from?.queryParams?.q ?? '';
    let to = transition?.to?.queryParams?.q ?? '';

    console.log('setup foo', `'${from}'`, `'${to}'`, `'${model.q}'`);
  }

  reset(_isExiting, transition) {
    let from = transition?.from?.queryParams?.q ?? '';
    let to = transition?.to?.queryParams?.q ?? '';

    console.log('reset foo', `'${from}'`, `'${to}'`);

    if (transition && from !== to) {
      this.router.replaceWith({
        queryParams: {
          q: to,
          foo: DEFAULTS.foo,
        },
      });
    }
  }

  get q() {
    return this.router.currentRoute.queryParams?.q;
  }

  get selections() {
    let foo = this.router.currentRoute.queryParams?.foo;
    let selections = foo?.split(',').filter((value) => value.trim() !== '');
    return selections ?? [];
  }

  @action
  handleFilterChange(selections) {
    this.router.replaceWith({
      queryParams: {
        foo: selections.join(','),
      },
    });
  }
}
