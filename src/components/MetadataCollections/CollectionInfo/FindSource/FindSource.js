import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Label,
  Row,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

class FindSource extends React.Component {
  render() {
    const pluggable =
      <Pluggable
        aria-haspopup="true"
        searchButtonStyle="default"
        searchLabel="Metadata Source look-up xxx"
        type="find-finc-metadata-source"
      >
        <div style={{ background: 'red' }}>Plugin not found</div>
      </Pluggable>;

    return (
      <React.Fragment>
        <Row>
          <Col xs={4}>
            { pluggable }
          </Col>
          <Col xs={4}>
            {/* { sourceName } */}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default FindSource;
