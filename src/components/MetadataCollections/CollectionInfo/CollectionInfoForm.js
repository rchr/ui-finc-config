import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
  TextField
} from '@folio/stripes/components';

import SelectSource from './SelectSource';
import { Required } from '../../DisplayUtils/Validate';

class CollectionInfoForm extends React.Component {
  static propTypes = {
    sourceData: PropTypes.arrayOf({
      source: PropTypes.object,
    }),
  };

  formatSourceData(sources) {
    if (!sources || sources.length === 0) return null;
    const newArr = [];

    // add an empty object
    // let preObj = {};
    // preObj = { label: '-- Select a Source --', value: '' };
    // newArr.push(preObj);

    // Loop through records
    Object.keys(sources).map((key) => {
      const obj = {
        label: _.toString(sources[key].label),
        value: _.toString(sources[key].id)
      };

      newArr.push(obj);
      if (Number(key) === (sources.length - 1)) {
        return newArr;
      }
      return newArr;
    });
    return newArr;
  }

  render() {
    const { expanded, onToggle, accordionId } = this.props;
    const sourceDataFormatted = this.formatSourceData(this.props.sourceData);

    if (!sourceDataFormatted || sourceDataFormatted.length === 0) return null;

    return (
      <Accordion
        id={accordionId}
        label={<FormattedMessage id="ui-finc-config.collection.generalAccordion" />}
        onToggle={onToggle}
        open={expanded}
      >
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              fullWidth
              id="addcollection_label"
              label={
                <FormattedMessage id="ui-finc-config.collection.label">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              name="label"
              placeholder="Enter a name to identify the metadata collection"
              validate={[Required]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              fullWidth
              id="addcollection_description"
              label={
                <FormattedMessage id="ui-finc-config.collection.description">
                  {(msg) => msg}
                </FormattedMessage>}
              name="description"
              placeholder="Enter a description for the metadata collection"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              component={SelectSource}
              dataOptions={sourceDataFormatted}
              fullWidth
              id="addcollection_source"
              label="Source*"
              name="mdSource"
              placeholder="Select a source for the metadata collection"
              validate={[Required]}
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

CollectionInfoForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default CollectionInfoForm;
