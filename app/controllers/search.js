import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const DEFAULTS = {
  q: '',
  f: '',
};

export default class SearchController extends Controller {
  queryParams = ['q', 'f'];
  defaults = DEFAULTS;
  q = DEFAULTS.q;
  f = DEFAULTS.f;

  @service router;

  reset() {
    this.q = DEFAULTS.q;
    this.f = DEFAULTS.f;
  }

  @action
  handleSearch(q) {
    this.router.replaceWith({
      queryParams: {
        q,
        f: DEFAULTS.f,
      },
    });
  }
}
