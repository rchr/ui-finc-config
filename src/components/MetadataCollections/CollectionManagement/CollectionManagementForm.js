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
} from '../../DisplayUtils/Validate';

import RepeatableField from '../../DisplayUtils/RepeatableField';
import BasicCss from '../../BasicStyle.css';

class CollectionManagementForm extends React.Component {
  render() {
    const { expanded, onToggle, accordionId } = this.props;
    const dataOptionsMetadataAvailable = [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'undetermined', label: 'Undetermined' }
    ];
    const dataOptionsUsageRestricted = [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ];
    const dataOptionsFreeContent = [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'undetermined', label: 'Undetermined' }
    ];
    const dataOptionsLodPublication = [
      { value: 'permitted (interpreted)', label: 'Permitted (interpreted)' },
      { value: 'permitted (explicit)', label: 'Permitted (explicit)' },
      { value: 'permitted (explicit) under conditions', label: 'Permitted (explicit) under conditions' },
      { value: 'prohibited (interpreted)', label: 'Prohibited (interpreted)' },
      { value: 'prohibited (explicit)', label: 'Prohibited (explicit)' },
      { value: 'silent', label: 'Silent' }
    ];

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-config.collection.managementAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collection.metadataAvailable">
                  {(msg) => msg}
                </FormattedMessage>
              }
              name="metadataAvailable"
              id="addcollection_metadataAvailable"
              placeholder="Select if metadata is available for the metadata collection"
              component={Select}
              dataOptions={dataOptionsMetadataAvailable}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collection.usageRestricted">
                  {(msg) => msg + ' *'}
                </FormattedMessage>
              }
              name="usageRestricted"
              id="addcollection_usageRestricted"
              placeholder="Select if usage is restricted for the metadata collection"
              component={Select}
              dataOptions={dataOptionsUsageRestricted}
              validate={[Required]}
              fullWidth
            />
          </Col>
        </Row>
        {/* PERMITTED FOR is repeatable */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.collection.permittedFor" /></Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              // add name to the array-field, which should be changed
              name="permittedFor"
              label="Displaypermittedfor"
              id="display_permittedFor"
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collection.freeContent">
                  {(msg) => msg}
                </FormattedMessage>
              }
              name="freeContent"
              id="addcollection_freeContent"
              placeholder="Select if content is free for the metadata collection"
              component={Select}
              dataOptions={dataOptionsFreeContent}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collection.lod.publication">
                  {(msg) => msg}
                </FormattedMessage>
              }
              name="lod.publication"
              id="addcollection_lodpublication"
              placeholder="Select the LOD publication for the metadata collection"
              component={Select}
              dataOptions={dataOptionsLodPublication}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collection.lod.note">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a LOD note for the metadata collection"
              name="lod.note"
              id="addcollection_lodnote"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.collection.generalNote">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a general note for the metadata collection"
              name="generalNote"
              id="addcollection_generalNote"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

CollectionManagementForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};

export default CollectionManagementForm;
