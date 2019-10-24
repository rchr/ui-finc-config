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

import RepeatableField from '../../DisplayUtils/RepeatableField';
import DisplayContact from '../../DisplayUtils/DisplayContact';
import FindOrganization from '../../FindOrganization/FindOrganization';

import BasicCss from '../../BasicStyle.css';

class SourceManagementForm extends React.Component {
  constructor(props) {
    super(props);

    this.columnMapping =
    {
      code: 'Code',
      description: 'description',
      name: 'Name',
    };
    this.selectVendor = this.selectVendor.bind(this);

    const intialVendor = props.initialValues.organization || {};

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
        id={accordionId}
        label={<FormattedMessage id="ui-finc-config.source.managementAccordion" />}
        onToggle={onToggle}
        open={expanded}
      >
        {/* add link to organization app */}
        <div>
          <FindOrganization
            change={this.props.change}
            intialVendor={this.state.organization}
            stripes={this.props.stripes}
          />
        </div>
        {/* CONTACTS INTERNAL is repeatable */}
        <Row>
          <Headline
            className={BasicCss.styleForHeadline}
            size="medium"
          >
            <FormattedMessage id="ui-finc-config.source.contacts.internal" />
          </Headline>
        </Row>
        <Row>
          <Col xs={2}>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.contact.name" />
            </Headline>
          </Col>
          <Col xs={2}>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.contact.role" />
            </Headline>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={DisplayContact}
              id="display_contact_internal"
              label="Displaycontactinternal"
              // add name to the array-field, which should be changed
              name="contacts.internal"
              {...this.props}
            />
          </Col>
        </Row>
        {/* CONTACTS EXTERNAL is repeatable */}
        <Row>
          <Headline
            className={BasicCss.styleForHeadline}
            size="medium"
          >
            <FormattedMessage id="ui-finc-config.source.contacts.external" />
          </Headline>
        </Row>
        <Row>
          <Col xs={2}>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.contact.name" />
            </Headline>
          </Col>
          <Col xs={2}>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.contact.role" />
            </Headline>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={DisplayContact}
              id="display_contact_external"
              label="Displaycontactexternal"
              // add name to the array-field, which should be changed
              name="contacts.external"
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              fullWidth
              id="addsource_indexingLevel"
              label={
                <FormattedMessage id="ui-finc-config.source.indexingLevel">
                  {(msg) => msg}
                </FormattedMessage>}
              name="indexingLevel"
              placeholder="Enter a indexing level for the metadata source"
            />
          </Col>
        </Row>
        {/* CONTRACTS is repeatable */}
        <Row>
          <Headline
            className={BasicCss.styleForHeadline}
            size="medium"
          >
            <FormattedMessage id="ui-finc-config.source.contracts" />
          </Headline>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldArray
              component={RepeatableField}
              id="display_contract"
              label="Displaycontract"
              // add name to the array-field, which should be changed
              name="contracts"
              {...this.props}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              fullWidth
              id="addsource_generalNotes"
              label={
                <FormattedMessage id="ui-finc-config.source.generalNotes">
                  {(msg) => msg}
                </FormattedMessage>}
              name="generalNotes"
              placeholder="Enter a general note for the metadata source"
            />
          </Col>
        </Row>
      </Accordion>
    );
  }
}

SourceManagementForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  change: PropTypes.func,
  expanded: PropTypes.bool,
  initialValues: PropTypes.shape({
    organization: PropTypes.object
  }),
  onToggle: PropTypes.func,
  stripes: PropTypes.object,
};

export default SourceManagementForm;
