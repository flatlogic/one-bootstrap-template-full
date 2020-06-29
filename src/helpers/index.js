var util = require('handlebars-utils');

module.exports = {
  activeClass: function(currentPartialName, partialNamesStr, options) {
    return partialNamesStr.split(' ').indexOf(currentPartialName) !== -1 ? options.fn(this) : '';
  },

  is: function(a, b, options) {
    if (arguments.length === 2) {
      options = b;
      b = options.hash.compare;
    }
    return util.value(a == b, this, options);
  }
  // Other helpers goes here

};
