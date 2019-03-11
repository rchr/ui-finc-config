import React from 'react';
import PropTypes from 'prop-types';
import { 
  Field 
} from 'redux-form';
import {
  FormattedMessage
} from 'react-intl';
import {
  Accordion,
  Col,
  Row,
  TextField
} from '@folio/stripes/components';
import {
  Required
} from '../DisplayUtils/Validate';

class CollectionInfoForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-config.collection.generalAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collectionInfo.label">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              placeholder="Enter a name to identify the metadata collection"
              name="label"
              id="addcollection_label"
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
                <FormattedMessage id="ui-finc-config.collectionInfo.description">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a description for the metadata collection"
              name="description"
              id="addcollection_description"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        {/* <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collectionInfo.mdSource">
                  {(msg) => msg + ' *'}
                </FormattedMessage>
              }
              name="mdSource"
              id="addcollection_mdSource"
              placeholder="Select a mdSource for the metadata collection"
              validate={[Required]}
              fullWidth
            />
          </Col>
        </Row> */}
      </Accordion>
    );
  }
}

CollectionInfoForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};

export default CollectionInfoForm;
