import Route from '@ember/routing/route';

export default class FooRoute extends Route {
  queryParams = {
    f: { refreshModel: true, replace: true },
  };

  setupController(controller) {
    let { foo } = this.paramsFor(this.routeName);
    controller.setup({ foo });
  }

  resetController(controller, _isExiting, transition) {
    // clear query params when the parent 'q' param changes
    let from = transition?.from?.queryParams?.q;
    let to = transition?.to?.queryParams?.q;
    if (transition && from !== to) {
      controller.reset();
    }
  }
}
