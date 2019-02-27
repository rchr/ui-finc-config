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

import stripesForm from '@folio/stripes/form';
import DisplayContract from '../DisplayUtils/DisplayContract';
import DisplayContact from '../DisplayUtils/DisplayContact';

import css from './SourceManagement.css';

class SourceManagementForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataSource: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape().isRequired,
    parentMutator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        editArrayElement: true
      },
    };
  }

  render() {
    const { expanded, onToggle, accordionId } = this.props;
    const { metadataSource, id } = this.props;
    const { sections } = this.state;
    const listItems = metadataSource.contracts.map((element) => (<Field name={element} id="addsource_contracts" component={TextField} />));

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
              placeholder="Enter a name to identify the vendor"
              name="vendor.id"
              id="addsource_vendorid"
              component={TextField}
              fullWidth
            />
          </Col>
        </Row>


        {/* TODO: get and edit all elements of Array with CONTACT (is repeatable) */}
        <Row>
          <Col xs={1}>
            <Headline size="medium" className={css.reduceMarginForHeadling}><FormattedMessage id="ui-finc-config.sourceManagement.contacts.internal" /></Headline>
          </Col>
          <Col xs={3}>
            <FieldArray
              placeholder="Enter a name to identify the Contacts"
              component={DisplayContact}
              // add name to the array-field, which should be changed
              name="contacts.internal"
              label="Displaycontact"
              id="display_contact"
              {...this.props}
            />
          </Col>
        </Row>


        <Row>
          <Col xs={4}>
            <div><FormattedMessage id="ui-finc-config.sourceManagement.contacts.external" /></div>
            {/* TODO CONTACT external (is repeatable) ... */}
            {/* <Field
              label={
                <FormattedMessage id="ui-finc-config.sourceManagement.contacts.external.name">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a name to identify the Contacts"
              name="contacts.external.name"
              id="addsource_contacts.external.name"
              component={TextField}
              fullWidth
            /> */}
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
        {/* get and edit all elements of Array with CONTRACT (is repeatable) */}
        <Row>
          <Col xs={1}>
            <div>
              <FormattedMessage id="ui-finc-config.sourceManagement.contracts" />
            </div>
          </Col>
          <Col xs={3}>
            <FieldArray
              placeholder="Enter a name to identify the Contracts"
              component={DisplayContract}
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
  initialValues: PropTypes.object,
};

export default stripesForm({
  form: 'form-source',
  navigationCheck: true,
  enableReinitialize: true,
})(SourceManagementForm);
