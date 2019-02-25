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
  Row,
  Select,
  TextField
} from '@folio/stripes/components';

class SourceTechnicalForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;
    const dataOptionsSolrShard = [
      { value: 'UBL main', label: 'UBL main' },
      { value: 'UBL ai', label: 'UBL ai' },
      { value: 'SLUB main', label: 'SLUB main' },
      { value: 'SLUB DBoD', label: 'SLUB DBoD' }
    ];

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-config.source.technicalAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.lastProcessed">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a date-time to identify the last Processed"
              name="lastProcessed"
              id="addsource_lastProcessed"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>

        {/* TODO TICKETS (is repeatable) ... */}
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.tickets">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the tickets"
              name="tickets"
              id="addsource_tickets"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.accessUrl">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the access Url"
              name="accessUrl"
              id="addsource_accessUrl"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.sourceId">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              placeholder="Enter a name to identify the source Id"
              name="sourceId"
              id="addsource_sourceId"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.solrShard">
                  {(msg) => msg}
                </FormattedMessage>
              }
              name="solrShard"
              id="addsource_solrShard"
              placeholder="Enter a name to identify the SolrShard of a metadata source"
              component={Select}
              dataOptions={dataOptionsSolrShard}
              fullWidth
            />
          </Col>
        </Row>
        {/* TODO deliveryMethods (is repeatable) ... */}
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.deliveryMethods">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Delivery Methods"
              name="deliveryMethods"
              id="addsource_deliveryMethods"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        {/* TODO formats (is repeatable) ... */}
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.formats">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Formats"
              name="formats"
              id="addsource_formats"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.updateRhythm">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Update Rhythm"
              name="updateRhythm"
              id="addsource_updateRhythm"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        {/* TODO inferiorTo (is repeatable) ... */}
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceTechnical.inferiorTo">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Inferior To"
              name="inferiorTo"
              id="addsource_inferiorTo"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

SourceTechnicalForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};

export default SourceTechnicalForm;
