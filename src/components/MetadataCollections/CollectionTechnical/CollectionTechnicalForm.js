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
  Headline,
  Row,
  TextField
} from '@folio/stripes/components';

import { ArrayRequired } from '../../DisplayUtils/Validate';
import RepeatableField from '../../DisplayUtils/RepeatableField';
import RequiredRepeatableField from '../../DisplayUtils/RequiredRepeatableField';

import BasicCss from '../../BasicStyle.css';

class CollectionTechnicalForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        id={accordionId}
        label={<FormattedMessage id="ui-finc-config.collection.technicalAccordion" />}
        onToggle={onToggle}
        open={expanded}
      >
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addcollection_collectionId"
              label={
                <FormattedMessage id="ui-finc-config.collection.collectionId">
                  {(msg) => msg}
                </FormattedMessage>}
              name="collectionId"
              placeholder="Enter collection ID for the metadata collection"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addcollection_facetLabel"
              label={
                <FormattedMessage id="ui-finc-config.collection.facetLabel">
                  {(msg) => msg}
                </FormattedMessage>}
              name="facetLabel"
              placeholder="Enter facet label for the metadata collection"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addcollection_productIsil"
              label={
                <FormattedMessage id="ui-finc-config.collection.productIsil">
                  {(msg) => msg}
                </FormattedMessage>}
              name="productIsil"
              placeholder="Enter product ISIL for the metadata collection"
            />
          </Col>
        </Row>
        {/* TICKETS (is repeatable) ... */}
        <section className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.collection.tickets" />
            </Headline>
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
        {/* CONTENT FILES (is repeatable) ... */}
        <section className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.collection.contentFiles" />
            </Headline>
          </Row>
          <Row>
            <Col xs={8}>
              <FieldArray
                component={RepeatableField}
                id="display_contentFiles"
                label="DisplaycontentFiles"
                // add name to the array-field, which should be changed
                name="contentFiles"
                {...this.props}
              />
            </Col>
          </Row>
        </section>
        {/* SOLR MEGA COLLECTION (is repeatable and required) ... */}
        <section className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.collection.solrMegaCollections">
                {(msg) => msg + ' *'}
              </FormattedMessage>
            </Headline>
          </Row>
          <Row>
            <Col xs={12}>
              <FieldArray
                // get component, which is rendering the validation-error
                component={RequiredRepeatableField}
                id="display_solrMegaCollections"
                label="DisplaysolrMegaCollections"
                // add name to the array-field, which should be changed
                name="solrMegaCollections"
                validate={ArrayRequired}
                {...this.props}
              />
            </Col>
          </Row>
        </section>
      </Accordion>
    );
  }
}

CollectionTechnicalForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default CollectionTechnicalForm;
