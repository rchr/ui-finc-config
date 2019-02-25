import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  FormattedMessage
} from 'react-intl';
import {
  Accordion,
  Col,
  Dropdown,
  Headline,
  Row,
  Select,
  TextField
} from '@folio/stripes/components';

class SourceManagementForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-config.source.managementAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={4}>
            {/* TODO VENDOR is a object ... */}
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceManagement.vendor">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the vendor"
              name="vendor"
              id="addsource_vendor"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Headline size="medium"><FormattedMessage id="ui-finc-config.sourceManagement.contacts.internal" /></Headline>
            {/* TODO CONTACT internal (is repeatable) ... */}
          </Col>
          <Col xs={4}>
            <Headline size="medium"><FormattedMessage id="ui-finc-config.sourceManagement.contacts.external" /></Headline>
            {/* TODO CONTACT external (is repeatable) ... */}
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceManagement.contacts.external.name">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Contacts"
              name="contacts.external.name"
              id="addsource_contacts.external.name"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceManagement.indexingLevel">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Indexing Level"
              name="indexingLevel"
              id="addsource_indexingLevel"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceManagement.licensingNote">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Licensing Note"
              name="licensingNote"
              id="addsource_licensingNote"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            {/* TODO CONTRACT (is repeatable) ... */}
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceManagement.contracts">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Contracts"
              name="contracts"
              id="addsource_contracts"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

SourceManagementForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};

export default SourceManagementForm;
