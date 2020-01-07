import ApplicationSerializer from './application';

const { isArray } = Array;
const { assign } = Object;

export default ApplicationSerializer.extend({

  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.isils)) {
      return assign({}, json, {
        totalRecords: json.isils.length
      });
    } else {
      return json.isils;
    }
  }
});
