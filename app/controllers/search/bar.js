import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const DEFAULTS = {
  bar: '',
};

export default class BarController extends Controller {
  queryParams = ['bar'];
  defaults = DEFAULTS;
  bar = DEFAULTS.bar;
  options = [
    {
      value: 'c',
      label: 'Filter C',
    },
    {
      value: 'd',
      label: 'Filter D',
    },
  ];

  @service router;

  reset(isExiting, transition) {
    let from = transition?.from?.queryParams?.q ?? '';
    let to = transition?.to?.queryParams?.q ?? '';

    if (isExiting || (transition && from !== to)) {
      this.router.replaceWith({
        queryParams: {
          q: to,
          bar: DEFAULTS.bar,
        },
      });
    }
  }

  get q() {
    return this.router.currentRoute.queryParams?.q;
  }

  get selections() {
    let bar = this.router.currentRoute.queryParams?.bar;
    let selections = bar?.split(',').filter((value) => value.trim() !== '');
    return selections ?? [];
  }

  @action
  handleFilterChange(selections) {
    this.router.replaceWith({
      queryParams: {
        bar: selections.join(','),
      },
    });
  }
}
