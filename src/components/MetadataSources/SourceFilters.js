import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion, AccordionSet, FilterAccordionHeader } from '@folio/stripes/components';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import filterConfig from './filterConfigData';

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
    const arr = [];

    filterConfig.forEach(filter => {
      const newValues = [];
      const name = filter.name;

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

      arr[name] = newValues;

      if (state[filter.name] && arr[name].length !== state[filter.name].length) {
        newState[filter.name] = arr[name];
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
