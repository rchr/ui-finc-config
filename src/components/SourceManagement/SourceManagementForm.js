import React from 'react';
import PropTypes from 'prop-types';
import { 
  Field, 
  FieldArray 
} from 'redux-form';
import {
  FormattedMessage
} from 'react-intl';
import {
  Accordion,
  Col,
  Headline,
  Row,
  TextField
} from '@folio/stripes/components';

import RepeatableField from '../DisplayUtils/RepeatableField';
import DisplayContact from '../DisplayUtils/DisplayContact';
import BasicCss from '../BasicStyle.css';

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
            {/* TODO: add link to vendor from vendor app */}
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceManagement.vendor">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Select a vendor of the vendor app"
              name="vendor.id"
              id="addsource_vendorid"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        {/* CONTACTS INTERNAL is repeatable */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceManagement.contacts.internal" /></Headline>
        </Row>
        <Row>
          <Col xs={2}>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.contact.name" /></Headline>
          </Col>
          <Col xs={2}>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.contact.role" /></Headline>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={DisplayContact}
              // add name to the array-field, which should be changed
              name="contacts.internal"
              label="Displaycontactinternal"
              id="display_contact_internal"
              {...this.props}
            />
          </Col>
        </Row>
        {/* CONTACTS EXTERNAL is repeatable */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceManagement.contacts.external" /></Headline>
        </Row>
        <Row>
          <Col xs={2}>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.contact.name" /></Headline>
          </Col>
          <Col xs={2}>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.contact.role" /></Headline>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={DisplayContact}
              // add name to the array-field, which should be changed
              name="contacts.external"
              label="Displaycontactexternal"
              id="display_contact_external"
              {...this.props}
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
              placeholder="Enter a indexing level for the metadata source"
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
              placeholder="Enter a licensing note for the metadata source"
              name="licensingNote"
              id="addsource_licensingNote"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        {/* CONTRACTS is repeatable */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceManagement.contracts" /></Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              // add name to the array-field, which should be changed
              name="contracts"
              label="Displaycontract"
              id="display_contract"
              {...this.props}
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
