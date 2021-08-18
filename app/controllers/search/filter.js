import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

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
    // how do I reset to the defaults for all types here?
    // it only resets for the current one
    this.router.replaceWith({
      queryParams: {
        ...this.router.currentRoute.queryParams, // keep q param from search
        f: DEFAULTS.f,
      },
    });
  }

  get type() {
    return this.router.currentRoute.params.type ?? DEFAULTS.type;
  }

  get options() {
    return OPTIONS[this.type] ?? [];
  }

  get q() {
    return this.router.currentRoute.queryParams?.q;
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
