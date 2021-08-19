import Route from '@ember/routing/route';

export default class SearchRoute extends Route {
  queryParams = {
    q: { refreshModel: true, replace: true },
    f: { refreshModel: true, replace: true },
  };

  model({ q, f }) {
    return { q, f };
  }

  setupController(controller, { q, f }) {
    controller.setup({ q, f });
  }

  resetController(controller, isExiting, transition) {
    let from = transition?.from?.queryParams?.q;
    let to = transition?.to?.queryParams?.q;

    if (isExiting) {
      controller.reset();
    } else if (transition && from !== to) {
      controller.clearFilters();
    }
  }
}
