import Route from '@ember/routing/route';

export default class BarRoute extends Route {
  queryParams = {
    bar: { refreshModel: true, replace: true },
  };

  model({ bar }) {
    let { q } = this.paramsFor('search');
    return { q, bar };
  }

  resetController(controller, isExiting, transition) {
    controller.reset(isExiting, transition);
  }
}
