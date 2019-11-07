import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader
} from '@folio/stripes/components';
import { CheckboxFilter } from '@folio/stripes/smart-components';

import filterConfig from './filterConfigData';

class CollectionFilters extends React.Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    filterHandlers: PropTypes.object,
  };

  static defaultProps = {
    activeFilters: {
      metadataAvailable: [],
      usageRestricted: [],
      freeContent: [],
    }
  };

  state = {
    metadataAvailable: [],
    usageRestricted: [],
    freeContent: [],
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const arr = [];

    filterConfig.forEach(filter => {
      const newValues = [];
      let values = {};
      values = filter.values;

      values.forEach((key) => {
        let newValue = {};
        newValue = {
          'value': key.cql,
          'label': key.name,
        };
        newValues.push(newValue);
      });

      arr[filter.name] = newValues;

      if (state[filter.name] && arr[filter.name].length !== state[filter.name].length) {
        newState[filter.name] = arr[filter.name];
      }
    });

    if (Object.keys(newState).length) return newState;

    return null;
  }

  renderCheckboxFilter = (key, name, props) => {
    const { activeFilters } = this.props;
    const groupFilters = activeFilters[key] || [];

    return (
      <Accordion
        displayClearButton={groupFilters.length > 0}
        header={FilterAccordionHeader}
        id={`filter-accordion-${key}`}
        label={<FormattedMessage id={`${name}`} />}
        onClearFilter={() => { this.props.filterHandlers.clearGroup(key); }}
        separator={false}
        {...props}
      >
        <CheckboxFilter
          dataOptions={this.state[key]}
          name={key}
          onChange={(group) => { this.props.filterHandlers.state({ ...activeFilters, [group.name]: group.values }); }}
          selectedValues={groupFilters}
        />
      </Accordion>
    );
  }

  render() {
    return (
      <AccordionSet>
        {this.renderCheckboxFilter('metadataAvailable', 'Metadata Available?')}
        {this.renderCheckboxFilter('usageRestricted', 'Usage Restricted?')}
        {this.renderCheckboxFilter('freeContent', 'Free Content?')}
      </AccordionSet>
    );
  }
}

export default CollectionFilters;
