import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Col,
  Row,
  Headline
} from '@folio/stripes/components';
import {
  Pluggable
} from '@folio/stripes/core';
import BasicCss from '../BasicStyle.css';

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
        name="organizationName"
        className={`${css.section} ${css.active}`}
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
        type="find-organization"
        id="clickable-find-organization"
        buttonProps={buttonProps}
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
          <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.source.organization" /></Headline>
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
  intialVendor: PropTypes.object,
  change: PropTypes.func,
};

export default FindOrganization;
