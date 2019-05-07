import { trait } from '@bigtest/mirage';
import Factory from './application';

export default Factory.extend({
  label: (i) => 'SOURCE ' + i,
  description: (i) => 'description' + i,
  management: (i) => ({
    indexingLevel: 'level' + i,
    licensingNote: 'note' + i
  }),
  technical: (i) => ({
    accessUrl: 'url' + i
  }),
});
