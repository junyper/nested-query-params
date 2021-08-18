import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default class RouteNameHelper extends Helper {
  @service router;
  compute() {
    return this.router.currentRouteName;
  }
}
