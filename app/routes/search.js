import Route from '@ember/routing/route';

export default class SearchRoute extends Route {
  queryParams = {
    q: { refreshModel: true, replace: true },
  };

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.reset();
    }
  }

  setupController(controller) {
    let { q } = this.paramsFor(this.routeName);
    controller.setup({ q });
  }
}
