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
import {
  ArrayRequired
} from '../DisplayUtils/Validate';
import RepeatableField from '../DisplayUtils/RepeatableField';
import RequiredRepeatableField from '../DisplayUtils/RequiredRepeatableField';
import BasicCss from '../BasicStyle.css';

class CollectionTechnicalForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-config.collection.technicalAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collectionTechnical.collectionId">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter collection ID for the metadata collection"
              name="collectionId"
              id="addcollection_collectionId"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collectionTechnical.facetLabel">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter facet label for the metadata collection"
              name="facetLabel"
              id="addcollection_facetLabel"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collectionTechnical.productIsil">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter product ISIL for the metadata collection"
              name="productIsil"
              id="addcollection_productIsil"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        {/* TICKETS (is repeatable) ... */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.collectionTechnical.tickets" /></Headline>
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
        {/* CONTENT FILES (is repeatable) ... */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.collectionTechnical.contentFiles" /></Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              // add name to the array-field, which should be changed
              name="contentFiles"
              label="DisplaycontentFiles"
              id="display_contentFiles"
              {...this.props}
            />
          </Col>
        </Row>
        {/* SOLR MEGA COLLECTION (is repeatable and required) ... */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}>
            <FormattedMessage id="ui-finc-config.collectionTechnical.solrMegaCollections">
              {(msg) => msg + ' *'}
            </FormattedMessage>
          </Headline>
        </Row>
        {/* add padding behind last Row; otherwise content is cutted of */}
        <Row style={{ paddingBottom: '80px' }}>
          <Col xs={6}>
            <FieldArray
              // get component, which is rendering the validation-error
              component={RequiredRepeatableField}
              // add name to the array-field, which should be changed
              name="solrMegaCollections"
              label="DisplaysolrMegaCollections"
              id="display_solrMegaCollections"
              validate={ArrayRequired}
              {...this.props}
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

CollectionTechnicalForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};

export default CollectionTechnicalForm;
