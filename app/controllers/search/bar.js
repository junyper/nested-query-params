import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { toQueryString } from '../../helpers/to-query-string';
import { fromQueryString } from '../../helpers/from-query-string';

const FILTERS = [
  {
    name: 'baz',
    label: 'Baz',
    options: [
      {
        value: 'c',
        label: 'Filter C',
      },
      {
        value: 'd',
        label: 'Filter D',
      },
    ],
  },
  {
    name: 'quux',
    label: 'Quux',
    options: [
      {
        value: '1',
        label: 'Filter 1',
      },
      {
        value: '2',
        label: 'Filter 2',
      },
    ],
  },
];

export default class FilterController extends Controller {
  @service router;

  get params() {
    return this.router.currentRoute.queryParams;
  }

  get q() {
    return this.params?.q;
  }

  get f() {
    return this.params?.f;
  }

  get filters() {
    let filters = FILTERS;
    let selections = fromQueryString(this.f);

    return filters.map((filter) => {
      return {
        ...filter,
        selections: selections[filter.name] ?? [],
      };
    });
  }

  get defaults() {
    let filters = FILTERS;
    let defaults = fromQueryString(this.f);

    filters.forEach((filter) => {
      delete defaults[filter.name];
    });

    return {
      f: toQueryString(defaults),
    };
  }

  @action
  handleFilterChange(name, value) {
    let selections = fromQueryString(this.f);

    selections[name] = value;

    this.router.replaceWith({
      queryParams: {
        f: toQueryString(selections),
      },
    });
  }
}
