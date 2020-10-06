import React from 'react';
import { FormattedMessage } from 'react-intl';

const filterConfig = [
  {
    label: 'Implementation Status',
    name: 'status',
    cql: 'status',
    values: [
      { name: <FormattedMessage id="ui-finc-config.source.active" />, cql: 'active' },
      { name: <FormattedMessage id="ui-finc-config.source.request" />, cql: 'request' },
      { name: <FormattedMessage id="ui-finc-config.source.implementation" />, cql: 'implementation' },
      { name: <FormattedMessage id="ui-finc-config.source.closed" />, cql: 'closed' },
      { name: <FormattedMessage id="ui-finc-config.source.impossible" />, cql: 'impossible' }
    ],
  },
  {
    label: 'Solr Shard',
    name: 'solrShard',
    cql: 'solrShard',
    values: [
      { name: 'UBL main', cql: 'UBL main' },
      { name: 'UBL ai', cql: 'UBL ai' },
      { name: 'UBL DNB', cql: 'UBL DNB' },
      { name: 'SLUB dswarm', cql: 'SLUB dswarm' },
      { name: 'SLUB DBoD', cql: 'SLUB DBoD' }
    ],
  },
  {
    label: 'Contact',
    name: 'contact',
    cql: 'contacts=/@externalId',
    operator: ' ',
    values: [],
  }
];

export default filterConfig;
