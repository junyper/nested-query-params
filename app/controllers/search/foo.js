import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { toQueryString } from '../../helpers/to-query-string';
import { fromQueryString } from '../../helpers/from-query-string';

const FILTERS = [
  {
    name: 'qux',
    label: 'Qux',
    options: [
      {
        value: 'a',
        label: 'Filter A',
      },
      {
        value: 'b',
        label: 'Filter B',
      },
    ],
  },
  {
    name: 'quuz',
    label: 'Quuz',
    options: [
      {
        value: '3',
        label: 'Filter 3',
      },
      {
        value: '4',
        label: 'Filter 4',
      },
    ],
  },
];

export default class FooController extends Controller {
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
