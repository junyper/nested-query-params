import Component from '@glimmer/component';
import { action } from '@ember/object';
import { restartableTask, timeout } from 'ember-concurrency';

export default class SearchInputComponent extends Component {
  @action
  inputRef(element) {
    this.inputEl = element;
  }

  @action
  handleKeyup(event) {
    if (event.keyCode === 27) {
      this.handleClear();
    }
  }

  @action
  handleInput(event) {
    this.handleChange.perform(event.target.value, 500);
  }

  @action
  handleClear() {
    if (this.inputEl) {
      this.inputEl.value = '';
      this.inputEl.focus();
    }

    this.handleChange.perform('', 0);
  }

  @restartableTask
  *handleChange(value, waitFor = 0) {
    yield timeout(waitFor);
    this.args.onChange?.(value.trim());
  }
}
