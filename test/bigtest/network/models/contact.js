import {
  belongsTo,
  Model,
} from 'miragejs';

export default Model.extend({
  contact: belongsTo('finc-config-metadata-source'),
});
