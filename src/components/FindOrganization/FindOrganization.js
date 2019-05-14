import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  FormattedMessage
} from 'react-intl';
import {
  Button,
  Col,
  Row,
  TextField
} from '@folio/stripes/components';
import {
  Pluggable
} from '@folio/stripes/core';
import OrganizationName from './OrganizationName';

import css from './OrganizationView.css';

class FindOrganization extends React.Component {
  constructor(props) {
    super(props);
    const o = props.intialOrganization || '';
    this.state = {
      organization: {
        id: o.id,
        name: o.name,
      },
    };
    this.inputOrganizationId = o.id;
    this.inputOrganizationName = o.name;
  }

  selectVendor = (o) => {
    this.props.change('vendor.name', o.name);
    this.props.change('vendor.id', o.id);

    this.setState(() => {
      return { organization: {
        id: o.id,
        name: o.name
      } };
    });
  }

  updateOrganizationId = () => {
    this.props.change('vendor.id', this.inputOrganizationId);
    this.setState(() => {
      return { organization: {
        id: this.inputOrganizationId,
        name: null
      } };
    });
  }

  changeInputOrganizationId = (e) => {
    this.inputOrganizationId = e.target.value;
  }

  renderOrganizationName = (organization) => {
    if (_.isEmpty(organization.id)) {
      return null;
    }

    const name = _.isEmpty(organization.name) ?
      <OrganizationName
        organizationId={organization.id}
        stripes={this.props.stripes}
      /> :
      <div>{organization.name}</div>;

    return (
      <div
        name="organizationName"
        className={`${css.section} ${css.active}`}
      >
        <b>
          {<FormattedMessage id="ui-finc-config.sourceManagement.organization" />}
        </b>
        <div>{name}</div>
      </div>);
  }

  render() {
    const disableRecordCreation = true;
    const organizationName = this.renderOrganizationName(this.state.organization);

    const enterOrganizationIdButton =
      <Button
        id="clickable-find-organization-by-id"
        onClick={this.updateOrganizationId}
      >
        {<FormattedMessage id="ui-finc-config.findOrganization.findOrganizationByIdButton" />}
      </Button>;

    const pluggable =
      <Pluggable
        aria-haspopup="true"
        type="find-organization"
        id="clickable-find-organization"
        {...this.props}
        searchLabel="Organization look-up"
        marginTop0
        searchButtonStyle="default"
        dataKey="vendor"
        selectVendor={this.selectVendor}
        onCloseModal={(modalProps) => {
          modalProps.parentMutator.query.update({
            query: '',
            filters: '',
            sort: 'Name',
          });
        }}
        visibleColumns={['name', 'code', 'description']}
        columnMapping={this.columnMapping}
        disableRecordCreation={disableRecordCreation}
      >
        <div style={{ background: 'red' }}>Plugin not found</div>
      </Pluggable>;

    return (
      <React.Fragment>
        <Row>
          <Col xs={3}>
            <Field
              label={
                <FormattedMessage id="ui-finc-config.findOrganization.contenOrganizationId">
                  { (msg) => msg }
                </FormattedMessage>
              }
              placeholder="Enter organization-id"
              id="organization-id"
              name="organization.id"
              component={TextField}
              onChange={this.changeInputOrganizationId}
            />
          </Col>
          <Col xs={1} style={{ marginTop: '20px' }}>
            { enterOrganizationIdButton }
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            { pluggable }
          </Col>
          <Col xs={2}>
            { organizationName }
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

FindOrganization.propTypes = {
  stripes: PropTypes.object,
  intialOrganizationId: PropTypes.string,
  change: PropTypes.func,
};

export default FindOrganization;
