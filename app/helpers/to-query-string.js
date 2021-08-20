import Helper from '@ember/component/helper';

export function toQueryString(obj) {
  let s = [];
  Object.keys(obj).forEach((key) => {
    s.push(`${key}=${obj[key]}`);
  });
  return s.join('&');
}

export default class ToQueryStringHelper extends Helper {
  compute(obj) {
    return toQueryString(obj);
  }
}
