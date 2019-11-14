import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  Headline
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

import BasicCss from '../BasicStyle.css';
import css from './OrganizationView.css';

class FindOrganization extends React.Component {
  constructor(props) {
    super(props);

    const o = props.intialVendor || {};

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
    this.props.change('organization.name', o.name);
    this.props.change('organization.id', o.id);

    this.setState(() => {
      return { vendor: {
        id: o.id,
        name: o.name
      } };
    });
  }

  updateVendorId = () => {
    this.props.change('organization.id', this.inputVendorId);
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
      '-' :
      <div>{vendor.name}</div>;

    return (
      <div
        className={`${css.section} ${css.active}`}
        name="organizationName"
      >
        <div>{name}</div>
      </div>);
  }

  render() {
    const disableRecordCreation = true;
    const vendorName = this.renderVendorName(this.state.vendor);
    const buttonProps = { 'marginBottom0': true };
    const pluggable =
      <Pluggable
        aria-haspopup="true"
        buttonProps={buttonProps}
        columnMapping={this.columnMapping}
        dataKey="vendor"
        disableRecordCreation={disableRecordCreation}
        id="clickable-find-organization"
        marginTop0
        onCloseModal={(modalProps) => {
          modalProps.parentMutator.query.update({
            query: '',
            filters: '',
            sort: 'Name',
          });
        }}
        searchButtonStyle="default"
        searchLabel="Organization look-up"
        selectVendor={this.selectVendor}
        type="find-organization"
        visibleColumns={['name', 'code', 'description']}
        {...this.props}
      >
        <div style={{ background: 'red' }}>Plugin not found</div>
      </Pluggable>;

    return (
      <React.Fragment>
        <Row>
          <Headline
            className={BasicCss.styleForHeadline}
            size="medium"
          >
            <FormattedMessage id="ui-finc-config.source.organization" />
          </Headline>
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
  change: PropTypes.func,
  intialVendorId: PropTypes.string,
  intialVendor: PropTypes.object,
  stripes: PropTypes.object,
};

export default FindOrganization;
