import Route from '@ember/routing/route';

export default class FooRoute extends Route {
  model() {
    let { q, f } = this.paramsFor('search');
    return { q, f };
  }
}
