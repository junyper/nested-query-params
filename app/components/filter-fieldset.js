import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FilterFieldsetComponent extends Component {
  @action
  handleChange(value) {
    let selections = [...(this.args.selections ?? [])];

    if (selections.includes(value)) {
      selections = selections.filter((v) => v !== value);
    } else {
      selections.push(value);
    }

    this.args.onChange?.(selections);
  }
}
