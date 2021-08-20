import Helper from '@ember/component/helper';

export function fromQueryString(qs) {
  let obj = {};
  let params = qs?.split('&') ?? [];

  params
    .filter((value) => value.trim() !== '')
    .forEach((param) => {
      let [name, value] = param.split('=');
      obj[name] = value.split(',').filter((value) => value.trim() !== '');
    });

  return obj;
}

export default class FromQueryStringHelper extends Helper {
  compute(qs) {
    return fromQueryString(qs);
  }
}
