const filterConfig = [
  {
    label: 'Implementation Status',
    name: 'status',
    cql: 'status',
    values: [
      { name: 'Active', cql: 'active' },
      { name: 'Wish', cql: 'wish' },
      { name: 'Impossible', cql: 'impossible' },
      { name: 'Negotiation', cql: 'negotiation' },
      { name: 'Technical implementation', cql: 'technical implementation' },
      { name: 'Trial', cql: 'trial' },
      { name: 'Terminated', cql: 'terminated' }
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
  }
];

export default filterConfig;
