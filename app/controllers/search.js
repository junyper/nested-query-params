import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const DEFAULTS = {
  q: '',
  type: 'foo',
};

export default class SearchController extends Controller {
  queryParams = ['q'];
  q = DEFAULTS.q;
  defaults = DEFAULTS;

  @service router;

  get type() {
    return this.router.currentRoute.params.type ?? DEFAULTS.type;
  }

  @action
  handleSearch(q) {
    this.router.replaceWith(this.router.currentRouteName, this.type, {
      queryParams: {
        q,
      },
    });
  }
}
