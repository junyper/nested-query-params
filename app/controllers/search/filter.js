import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const FILTERS = {
  bar: [
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
  ],
  foo: [
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
  ],
};

function objectToQueryString(obj) {
  let s = [];
  Object.keys(obj).forEach((key) => {
    s.push(`${key}=${obj[key]}`);
  });
  return s.join('&');
}

function queryStringToObject(str) {
  let obj = {};
  let params = str?.split('&') ?? [];

  params
    .filter((value) => value.trim() !== '')
    .forEach((param) => {
      let [name, value] = param.split('=');
      obj[name] = value.split(',').filter((value) => value.trim() !== '');
    });

  return obj;
}

export default class FilterController extends Controller {
  @service router;

  @tracked q;
  @tracked f;
  @tracked type;

  setup({ q, f, type }) {
    this.q = q;
    this.f = f;
    this.type = type;
  }

  reset() {
    this.type = undefined;
  }

  get filters() {
    let filters = FILTERS[this.type] ?? [];
    let selections = queryStringToObject(this.f);

    return filters.map((filter) => {
      return {
        ...filter,
        selections: selections[filter.name] ?? [],
      };
    });
  }

  get defaults() {
    let filters = FILTERS[this.type] ?? [];
    let defaults = queryStringToObject(this.f);

    filters.forEach((filter) => {
      delete defaults[filter.name];
    });

    return {
      f: objectToQueryString(defaults),
    };
  }

  @action
  handleFilterChange(name, value) {
    let selections = queryStringToObject(this.f);

    selections[name] = value;

    this.router.replaceWith({
      queryParams: {
        f: objectToQueryString(selections),
      },
    });
  }
}
