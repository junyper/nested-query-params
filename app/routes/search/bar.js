import Route from '@ember/routing/route';

export default class BarRoute extends Route {
  model() {
    let { q, f } = this.paramsFor('search');
    return { q, f };
  }
}
