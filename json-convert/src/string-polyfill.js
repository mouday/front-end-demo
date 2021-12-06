String.prototype.replaceAll = function (pattern, replaceValue) {
  return this.replace(new RegExp(pattern, 'g'), replaceValue);
};
