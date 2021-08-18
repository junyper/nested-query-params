import Route from '@ember/routing/route';

export default class FilterRoute extends Route {
  queryParams = {
    f: { refreshModel: true, replace: true },
  };

  resetController(controller, isExiting, transition) {
    // clear query params when the parent 'q' param changes
    let from = transition?.from?.queryParams?.q;
    let to = transition?.to?.queryParams?.q;
    if (transition && from !== to) {
      controller.reset();
    }
  }

  setupController(controller) {
    let { q } = this.paramsFor('search');
    let { type } = this.paramsFor(this.routeName);
    controller.setup({ q, type });
  }
}
