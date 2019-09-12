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

import RepeatableField from '../../DisplayUtils/RepeatableField';
import DisplayContact from '../../DisplayUtils/DisplayContact';
import BasicCss from '../../BasicStyle.css';

import FindOrganization from '../../FindOrganization/FindOrganization';

class SourceManagementForm extends React.Component {
  constructor(props) {
    super(props);
    this.columnMapping =
    {
      name: 'Name',
      code: 'Code',
      description: 'description',
    };
    this.selectVendor = this.selectVendor.bind(this);

    const intialVendor = props.initialValues.organization || '';
    this.state = {
      organization: intialVendor,
    };
  }

  selectVendor(o) {
    this.props.change('organization', o);
    this.setState({ organization: o });
  }

  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-config.source.managementAccordion" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        {/* add link to organization app */}
        <div>
          <FindOrganization
            intialVendor={this.state.organization}
            change={this.props.change}
            stripes={this.props.stripes}
          />
        </div>
        {/* CONTACTS INTERNAL is repeatable */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.source.contacts.internal" /></Headline>
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
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.source.contacts.external" /></Headline>
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
                <FormattedMessage id="ui-finc-config.source.indexingLevel">
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
        {/* CONTRACTS is repeatable */}
        <Row>
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.source.contracts" /></Headline>
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
        <Row>
          <Col xs={4}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.source.generalNotes">
                  {(msg) => msg}
                </FormattedMessage>}
              placeholder="Enter a general note for the metadata source"
              name="generalNotes"
              id="addsource_generalNotes"
              component={TextField}
              fullWidth
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
  initialValues: PropTypes.shape({
    organization: PropTypes.string
  }),
  change: PropTypes.func,
  stripes: PropTypes.object,
};

export default SourceManagementForm;
