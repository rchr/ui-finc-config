import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Label,
  Row,
  TextField,
} from '@folio/stripes/components';

import { Required } from '../../DisplayUtils/Validate';
import RequiredRepeatableField from '../../DisplayUtils/RequiredRepeatableField';
import RepeatableFieldValidUrl from '../../DisplayUtils/RepeatableFieldValidUrl';

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
              label={<FormattedMessage id="ui-finc-config.collection.id" />}
              name="collectionId"
              placeholder="Enter collection ID for the metadata collection"
              required
              validate={Required}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addcollection_productIsil"
              label={<FormattedMessage id="ui-finc-config.collection.productIsil" />}
              name="productIsil"
              placeholder="Enter product ISIL for the metadata collection"
            />
          </Col>
        </Row>
        {/* TICKETS (is repeatable) ... */}
        <div className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Label className={BasicCss.styleForFormLabel}>
              <FormattedMessage id="ui-finc-config.collection.tickets" />
            </Label>
          </Row>
          <Row>
            <Col xs={12}>
              <FormattedMessage id="ui-finc-config.collection.tickets">
                {ariaLabel => (
                  <FieldArray
                    ariaLabel={ariaLabel}
                    component={RepeatableFieldValidUrl}
                    id="display_tickets"
                    name="tickets"
                  />
                )}
              </FormattedMessage>
            </Col>
          </Row>
        </div>
        {/* CONTENT FILES (is repeatable) ... */}
        <div className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Label className={BasicCss.styleForFormLabel}>
              <FormattedMessage id="ui-finc-config.collection.contentFiles" />
            </Label>
          </Row>
          <Row>
            <Col xs={12}>
              <FormattedMessage id="ui-finc-config.collection.contentFiles">
                {ariaLabel => (
                  <FieldArray
                    ariaLabel={ariaLabel}
                    component={RepeatableFieldValidUrl}
                    id="display_contentFiles"
                    name="contentFiles"
                  />
                )}
              </FormattedMessage>
            </Col>
          </Row>
        </div>
        {/* SOLR MEGA COLLECTION (is repeatable and required) ... */}
        <div className={BasicCss.addMarginBottomAndTop}>
          <Row>
            <Label className={BasicCss.styleForFormLabel} required>
              <FormattedMessage id="ui-finc-config.collection.solrMegaCollections" />
            </Label>
          </Row>
          <Row>
            <Col xs={12}>
              <FormattedMessage id="ui-finc-config.collection.solrMegaCollections">
                {ariaLabel => (
                  <FieldArray
                    ariaLabel={ariaLabel}
                    component={RequiredRepeatableField}
                    id="display_solrMegaCollections"
                    name="solrMegaCollections"
                  />
                )}
              </FormattedMessage>
            </Col>
          </Row>
        </div>
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
