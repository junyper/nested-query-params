import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const DEFAULTS = {
  q: '',
};

export default class SearchController extends Controller {
  queryParams = ['q'];
  q = DEFAULTS.q;
  defaults = DEFAULTS;

  @service router;

  @action
  handleSearch(q) {
    this.router.replaceWith(this.router.currentRouteName, {
      queryParams: {
        q,
      },
    });
  }
}
