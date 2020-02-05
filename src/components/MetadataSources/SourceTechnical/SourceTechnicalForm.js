import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray
} from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Label,
  Row,
  Select,
  TextField
} from '@folio/stripes/components';

import { IntRequired } from '../../DisplayUtils/Validate';
import RepeatableField from '../../DisplayUtils/RepeatableField';

import BasicCss from '../../BasicStyle.css';

class SourceTechnicalForm extends React.Component {
  render() {
    const { accordionId, expanded, onToggle } = this.props;
    const dataOptionsSolrShard = [
      { value: 'UBL main', label: 'UBL main' },
      { value: 'UBL ai', label: 'UBL ai' },
      { value: 'SLUB main', label: 'SLUB main' },
      { value: 'SLUB DBoD', label: 'SLUB DBoD' }
    ];

    return (
      <Accordion
        id={accordionId}
        label={<FormattedMessage id="ui-finc-config.source.technicalAccordion" />}
        onToggle={onToggle}
        open={expanded}
      >
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addsource_lastProcessed"
              label={
                <FormattedMessage id="ui-finc-config.source.lastProcessed">
                  {(msg) => msg}
                </FormattedMessage>}
              name="lastProcessed"
              placeholder="Enter date and time for the metadata source"
            />
          </Col>
        </Row>
        {/* TICKETS (is repeatable) ... */}
        <section className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Label className={BasicCss.styleForFormLabel}>
              <FormattedMessage id="ui-finc-config.source.tickets" />
            </Label>
          </Row>
          <Row>
            <Col xs={12}>
              <FieldArray
                component={RepeatableField}
                id="display_tickets"
                label="Displaytickets"
                // add name to the array-field, which should be changed
                name="tickets"
                {...this.props}
              />
            </Col>
          </Row>
        </section>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addsource_accessUrl"
              label={
                <FormattedMessage id="ui-finc-config.source.accessUrl">
                  {(msg) => msg}
                </FormattedMessage>}
              name="accessUrl"
              placeholder="Enter an access url for the metadata source"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addsource_sourceId"
              label={
                <FormattedMessage id="ui-finc-config.source.id">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              name="sourceId"
              placeholder="Enter a source id for the metadata source"
              validate={[IntRequired]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={Select}
              dataOptions={dataOptionsSolrShard}
              fullWidth
              id="addsource_solrShard"
              label={
                <FormattedMessage id="ui-finc-config.source.solrShard">
                  {(msg) => msg}
                </FormattedMessage>
              }
              name="solrShard"
              placeholder="Select a solr shard for the metadata source"
            />
          </Col>
        </Row>
        {/* TODO: deliveryMethods (is repeatable; is value list ???) ... */}
        <section className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Label className={BasicCss.styleForFormLabel}>
              <FormattedMessage id="ui-finc-config.source.deliveryMethods" />
            </Label>
          </Row>
          <Row>
            <Col xs={12}>
              <FieldArray
                component={RepeatableField}
                id="display_delivery_methods"
                label="Displaydeliverymethods"
                // add name to the array-field, which should be changed
                name="deliveryMethods"
                {...this.props}
              />
            </Col>
          </Row>
        </section>
        {/* formats (is repeatable) ... */}
        <section className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Label className={BasicCss.styleForFormLabel}>
              <FormattedMessage id="ui-finc-config.source.formats" />
            </Label>
          </Row>
          <Row>
            <Col xs={12}>
              <FieldArray
                component={RepeatableField}
                id="display_formats"
                label="Displayformats"
                // add name to the array-field, which should be changed
                name="formats"
                {...this.props}
              />
            </Col>
          </Row>
        </section>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addsource_updateRhythm"
              label={
                <FormattedMessage id="ui-finc-config.source.updateRhythm">
                  {(msg) => msg}
                </FormattedMessage>}
              name="updateRhythm"
              placeholder="Enter a update rhythm for the metadata source"
            />
          </Col>
        </Row>
        {/* inferiorTo (is repeatable) ... */}
        <section className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Label className={BasicCss.styleForFormLabel}>
              <FormattedMessage id="ui-finc-config.source.inferiorTo" />
            </Label>
          </Row>
          <Row>
            <Col xs={12}>
              <FieldArray
                component={RepeatableField}
                id="display_inferior_to"
                label="Displayinferiorto"
                // add name to the array-field, which should be changed
                name="inferiorTo"
                {...this.props}
              />
            </Col>
          </Row>
        </section>
      </Accordion>
    );
  }
}

SourceTechnicalForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default SourceTechnicalForm;
