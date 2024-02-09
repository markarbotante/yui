const uuidV4 = require('uuid/v4');

module.exports = {
  maskString: function (obj, mask, start, end) {
    if (!mask) mask = '*';
    if (!start) start = 0;
    if (!end) end = 0;

    return obj.split('').map((value, index) => (index < start || index >= obj.length - end) ? value : mask).join('');
  }
}