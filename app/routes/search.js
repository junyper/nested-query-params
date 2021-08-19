import Route from '@ember/routing/route';

export default class SearchRoute extends Route {
  queryParams = {
    q: { refreshModel: true, replace: true },
  };

  model({ q }) {
    return { q };
  }

  resetController(controller, isExiting, transition) {
    controller.reset(isExiting, transition);
  }
}
