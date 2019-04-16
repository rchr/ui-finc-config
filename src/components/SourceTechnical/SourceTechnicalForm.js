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
  Select,
  TextField
} from '@folio/stripes/components';
import {
  Required
} from '../DisplayUtils/Validate';
import RepeatableField from '../DisplayUtils/RepeatableField';
import BasicCss from '../BasicStyle.css';

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
              placeholder="Enter date and time for the metadata source"
              name="lastProcessed"
              id="addsource_lastProcessed"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        {/* TICKETS (is repeatable) ... */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceTechnical.tickets" /></Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              // add name to the array-field, which should be changed
              name="tickets"
              label="Displaytickets"
              id="display_tickets"
              {...this.props}
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
              placeholder="Enter an access url for the metadata source"
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
              placeholder="Enter a source id for the metadata source"
              name="sourceId"
              id="addsource_sourceId"
              component={TextField}
              validate={[Required]}
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
              placeholder="Select a solr shard for the metadata source"
              component={Select}
              dataOptions={dataOptionsSolrShard}
              fullWidth
            />
          </Col>
        </Row>
        {/* TODO: deliveryMethods (is repeatable; is value list ???) ... */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceTechnical.deliveryMethods" /></Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              // add name to the array-field, which should be changed
              name="deliveryMethods"
              label="Displaydeliverymethods"
              id="display_delivery_methods"
              {...this.props}
            />
          </Col>
        </Row>
        {/* formats (is repeatable) ... */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceTechnical.formats" /></Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              // add name to the array-field, which should be changed
              name="formats"
              label="Displayformats"
              id="display_formats"
              {...this.props}
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
              placeholder="Enter a update rhythm for the metadata source"
              name="updateRhythm"
              id="addsource_updateRhythm"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        {/* inferiorTo (is repeatable) ... */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceTechnical.inferiorTo" /></Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              // add name to the array-field, which should be changed
              name="inferiorTo"
              label="Displayinferiorto"
              id="display_inferior_to"
              {...this.props}
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
