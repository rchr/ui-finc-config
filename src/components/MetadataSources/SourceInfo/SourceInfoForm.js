import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
  Select,
  TextField
} from '@folio/stripes/components';

import { Required } from '../../DisplayUtils/Validate';

class SourceInfoForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;

    const dataOptionsStatus = [
      { value: 'active', label: 'Active' },
      { value: 'wish', label: 'Wish' },
      { value: 'negotiation', label: 'Negotiation' },
      { value: 'technical implementation', label: 'Technical Implementation' },
      { value: 'deactivated', label: 'Deactivated' },
      { value: 'terminated', label: 'Terminated' }
    ];

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-config.source.generalAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addsource_label"
              label={
                <FormattedMessage id="ui-finc-config.source.label">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              name="label"
              placeholder="Enter a name to identify the metadata source"
              validate={[Required]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addsource_description"
              label={
                <FormattedMessage id="ui-finc-config.source.description">
                  {(msg) => msg}
                </FormattedMessage>}
              name="description"
              placeholder="Enter a description for the metadata source"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={Select}
              dataOptions={dataOptionsStatus}
              fullWidth
              id="addsource_status"
              label={
                <FormattedMessage id="ui-finc-config.source.status">
                  {(msg) => msg + ' *'}
                </FormattedMessage>
              }
              name="status"
              placeholder="Select a status for the metadata source"
              validate={[Required]}
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

SourceInfoForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default SourceInfoForm;
