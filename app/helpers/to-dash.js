import Ember from 'ember';

export default Ember.Helper.extend({
  compute(params) {
    if (params[0]) {
      let label = this._stream.params[0].label;
      let pos = label.lastIndexOf('.');

      if (pos !== -1) {
        label = label.substr(pos + 1);
      }

      return label.dasherize();
    }
  }
});