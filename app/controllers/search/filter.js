import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const DEFAULTS = {
  f: '',
  type: 'foo',
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
  f = DEFAULTS.f;
  name = 'f';

  @service router;

  reset() {
    // TODO: I don't know how to do this
    // how do I reset to the defaults here?
    console.log('reset filter', this.type, this.f);
  }

  get type() {
    return this.router.currentRoute.params.type ?? DEFAULTS.type;
  }

  get options() {
    return OPTIONS[this.type] ?? [];
  }

  get selections() {
    let { f } = this.router.currentRoute.queryParams;
    let selections = f?.split(',').filter((value) => value.trim() !== '');
    return selections ?? [];
  }

  @action
  handleFilterChange(value) {
    let selections = this.selections;
    if (selections.includes(value)) {
      selections = selections.filter((v) => v !== value);
    } else {
      selections.push(value);
    }

    let f = selections.join(',');

    this.router.replaceWith(this.router.currentRouteName, this.type, {
      queryParams: {
        ...this.router.currentRoute.queryParams, // keep q param from search
        f,
      },
    });
  }
}
