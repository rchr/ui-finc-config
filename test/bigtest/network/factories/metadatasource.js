import { trait } from '@bigtest/mirage';
import Factory from './application';

export default Factory.extend({
  label: (i) => 'SOURCE ' + i
});
