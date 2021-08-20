import Route from '@ember/routing/route';

export default class FilterRoute extends Route {
  model({ type }) {
    let { q, f } = this.paramsFor('search');
    return { q, f, type };
  }

  setupController(controller, { type }) {
    controller.setup({ type });
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.reset();
    }
  }
}
