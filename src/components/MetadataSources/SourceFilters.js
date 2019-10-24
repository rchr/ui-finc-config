import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion, AccordionSet, FilterAccordionHeader } from '@folio/stripes/components';
import { CheckboxFilter } from '@folio/stripes/smart-components';
// import filterConfig from './filterConfigData';

const FILTERS = [
  'status',
  'solrShard'
];

// const filterConfig = [
//   {
//     label: 'Implementaion Status',
//     name: 'status',
//     cql: 'status',
//     statusValues: [
//       { label: 'Active', cql: 'active' },
//       { label: 'Wish', cql: 'wish' },
//       { label: 'Negotiation', cql: 'negotiation' },
//       { label: 'Technical implementation', cql: 'technical implementation' },
//       { label: 'Deactivated', cql: 'deactivated' },
//       { label: 'Terminated', cql: 'terminated' }
//     ],
//   },
//   {
//     label: 'Solr Shard',
//     name: 'solrShard',
//     cql: 'solrShard',
//     solrShardValues: [
//       { label: 'UBL main', cql: 'UBL main' },
//       { label: 'UBL ai', cql: 'UBL ai' },
//       { label: 'SLUB main', cql: 'SLUB main' },
//       { label: 'SLUB DBoD', cql: 'SLUB DBoD' }
//     ],
//   }
// ];

const filterConfig = {
  // statusValues: ['active', 'wish', 'negotiation', 'technical implementation', 'deactivated', 'terminated'],
  statusValues: [
    { label: 'Active', value: 'active' },
    { label: 'Wish', value: 'wish' },
    { label: 'Negotiation', value: 'negotiation' },
    { label: 'Technical implementation', value: 'technical implementation' },
    { label: 'Deactivated', value: 'deactivated' },
    { label: 'Terminated', value: 'terminated' }
  ],
  // solrShardValues: ['UBL main', 'UBL ai', 'SLUB main', 'SLUB DBoD']
  solrShardValues: [
    { label: 'UBL main', value: 'UBL main' },
    { label: 'UBL ai', value: 'UBL ai' },
    { label: 'SLUB main', value: 'SLUB main' },
    { label: 'SLUB DBoD', value: 'SLUB DBoD' }
  ]
};

class SourceFilters extends React.Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    filterHandlers: PropTypes.object,
  };

  static defaultProps = {
    activeFilters: {
      status: [],
      solrShard: [],
    }
  };

  state = {
    status: [],
    solrShard: [],
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};

    FILTERS.forEach(filter => {
      const values = filterConfig[`${filter}Values`];

      if (values.length !== state[filter].length) {
        newState[filter] = values;
      }
    });

    if (Object.keys(newState).length) return newState;

    return null;
  }

  renderCheckboxFilter = (name, props) => {
    const { activeFilters } = this.props;
    const groupFilters = activeFilters[name] || [];

    return (
      <Accordion
        displayClearButton={groupFilters.length > 0}
        header={FilterAccordionHeader}
        id={`filter-accordion-${name}`}
        label={<FormattedMessage id={`${name}`} />}
        onClearFilter={() => { this.props.filterHandlers.clearGroup(name); }}
        separator={false}
        {...props}
      >
        <CheckboxFilter
          dataOptions={this.state[name]}
          name={name}
          onChange={(group) => { this.props.filterHandlers.state({ ...activeFilters, [group.name]: group.values }); }}
          selectedValues={groupFilters}
        />
      </Accordion>
    );
  }

  render() {
    return (
      <AccordionSet>
        {this.renderCheckboxFilter('status')}
        {this.renderCheckboxFilter('solrShard')}
      </AccordionSet>
    );
  }
}

export default SourceFilters;
