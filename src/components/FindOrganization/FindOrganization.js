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
    const o = props.intialVendor || '';
    this.state = {
      vendor: {
        id: o.id,
        name: o.name,
      },
    };
    this.inputVendorId = o.id;
    this.inputVendorName = o.name;
  }

  selectVendor = (o) => {
    this.props.change('vendor.name', o.name);
    this.props.change('vendor.id', o.id);

    this.setState(() => {
      return { vendor: {
        id: o.id,
        name: o.name
      } };
    });
  }

  updateVendorId = () => {
    this.props.change('vendor.id', this.inputVendorId);
    this.setState(() => {
      return { vendor: {
        id: this.inputVendorId,
        name: null
      } };
    });
  }

  changeInputVendorId = (e) => {
    this.inputVendorId = e.target.value;
  }

  renderVendorName = (vendor) => {
    if (_.isEmpty(vendor.id)) {
      return null;
    }

    const name = _.isEmpty(vendor.name) ?
      <OrganizationName
        vendorId={vendor.id}
        stripes={this.props.stripes}
      /> :
      <div>{vendor.name}</div>;

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
    const vendorName = this.renderVendorName(this.state.vendor);

    const enterVendorIdButton =
      <Button
        id="clickable-find-vendor-by-id"
        onClick={this.updateVendorId}
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
              name="vendor.id"
              component={TextField}
              onChange={this.changeInputVendorId}
            />
          </Col>
          <Col xs={1} style={{ marginTop: '20px' }}>
            { enterVendorIdButton }
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            { pluggable }
          </Col>
          <Col xs={2}>
            { vendorName }
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

FindOrganization.propTypes = {
  stripes: PropTypes.object,
  intialVendorId: PropTypes.string,
  change: PropTypes.func,
};

export default FindOrganization;
