import faker from 'faker';
import { trait } from 'miragejs';

import Factory from './application';

export default Factory.extend({
  id: () => faker.random.uuid(),
  label: (i) => 'SOURCE ' + i,
  description: (i) => 'description' + i,
  status: 'active',
  organization: {
    id: '',
    name: ''
  },
  contacts: [],
  indexingLevel: '',
  generalNotes: '',
  lastProcessed: '',
  tickets: [],
  accessUrl: '',
  sourceId: 1,
  solrShard: '',
  deliveryMethods: [],
  formats: [],
  updateRhythm: '',
  inferiorTo: [],
  selectedBy: [],

  withContact: trait({
    afterCreate(contact, server) {
      server.createList('contact', 9, { contact });
    }
  }),
});
