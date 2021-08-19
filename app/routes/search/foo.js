import Route from '@ember/routing/route';

export default class FooRoute extends Route {
  queryParams = {
    foo: { refreshModel: true, replace: true },
  };

  model({ foo }) {
    let { q } = this.paramsFor('search');
    return { q, foo };
  }

  resetController(controller, isExiting, transition) {
    controller.reset(isExiting, transition);
  }
}
