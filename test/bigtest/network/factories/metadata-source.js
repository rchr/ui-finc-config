import Factory from './application';

export default Factory.extend({
  label: (i) => 'SOURCE ' + i,
  description: (i) => 'description' + i,
  contacts: {
    internal: [],
    external: [],
  },
  contracts: [],
  tickets: [],
  deliveryMethods: [],
  formats: [],
  inferiorTo: []
});
