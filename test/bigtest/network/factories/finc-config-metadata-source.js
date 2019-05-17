import { faker } from '@bigtest/mirage';
import Factory from './application';

export default Factory.extend({
  id: () => faker.random.uuid(),
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
