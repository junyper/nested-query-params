import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const DEFAULTS = {
  q: '',
};

export default class SearchController extends Controller {
  queryParams = ['q'];
  defaults = DEFAULTS;
  q = DEFAULTS.q;

  @service router;

  reset(isExiting) {
    if (isExiting) {
      this.router.replaceWith({ queryParams: { q: DEFAULTS.q } });
    }
  }

  @action
  handleSearch(q) {
    this.router.replaceWith({
      queryParams: {
        q: q ?? DEFAULTS.q,
      },
    });
  }
}
