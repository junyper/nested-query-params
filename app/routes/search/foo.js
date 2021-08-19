import Route from '@ember/routing/route';

export default class FooRoute extends Route {
  queryParams = {
    foo: { refreshModel: true, replace: true },
  };

  model({ q, bar }) {
    return { q, bar };
  }

  setupController(controller, model, transition) {
    controller.setup(model, transition);
  }

  resetController(controller, isExiting, transition) {
    controller.reset(isExiting, transition);
  }
}
