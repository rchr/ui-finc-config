import React from 'react';
import { FormattedMessage } from 'react-intl';

const filterConfig = [
  {
    name: 'metadataAvailable',
    cql: 'metadataAvailable',
    values: [
      { name: <FormattedMessage id="ui-finc-config.collection.yes" />, cql: 'yes' },
      { name: <FormattedMessage id="ui-finc-config.collection.no" />, cql: 'no' },
      { name: <FormattedMessage id="ui-finc-config.collection.undetermined" />, cql: 'undetermined' }
    ],
  },
  {
    name: 'usageRestricted',
    cql: 'usageRestricted',
    values: [
      { name: <FormattedMessage id="ui-finc-config.collection.yes" />, cql: 'yes' },
      { name: <FormattedMessage id="ui-finc-config.collection.no" />, cql: 'no' }
    ],
  },
  {
    name: 'freeContent',
    cql: 'freeContent',
    values: [
      { name: <FormattedMessage id="ui-finc-config.collection.yes" />, cql: 'yes' },
      { name: <FormattedMessage id="ui-finc-config.collection.no" />, cql: 'no' },
      { name: <FormattedMessage id="ui-finc-config.collection.undetermined" />, cql: 'undetermined' }
    ],
  },
  {
    name: 'mdSource',
    cql: 'mdSource.id',
    operator: '==',
    values: [],
  }
];

export default filterConfig;
