import { faker } from '@bigtest/mirage';

import Factory from './application';

export default Factory.extend({
  id: () => faker.random.uuid(),
  library: (i) => 'diku ' + i,
  isil: (i) => 'DIKU-01' + i,
  tenant: (i) => 'tenant' + i
});
