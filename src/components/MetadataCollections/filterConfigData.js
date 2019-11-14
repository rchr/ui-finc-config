const filterConfig = [
  {
    label: 'Metadata Available?',
    name: 'metadataAvailable',
    cql: 'metadataAvailable',
    values: [
      { name: 'Yes', cql: 'yes' },
      { name: 'No', cql: 'no' },
      { name: 'Undetermined', cql: 'undetermined' }
    ],
  },
  {
    label: 'Usage Restricted?',
    name: 'usageRestricted',
    cql: 'usageRestricted',
    values: [
      { name: 'Yes', cql: 'yes' },
      { name: 'No', cql: 'no' }
    ],
  },
  {
    label: 'Free Content?',
    name: 'freeContent',
    cql: 'freeContent',
    values: [
      { name: 'Yes', cql: 'yes' },
      { name: 'No', cql: 'no' },
      { name: 'Undetermined', cql: 'undetermined' }
    ],
  }
];

export default filterConfig;
