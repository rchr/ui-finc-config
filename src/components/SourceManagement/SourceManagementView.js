import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Col,
  KeyValue,
  Row
} from '@folio/stripes/components';

class SourceManagementView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataSource: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };


  render() {
    const { metadataSource, id } = this.props;

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceManagement.vendor" />}
              value={_.get(metadataSource, 'vendor.name', '-')}
            />
          </Row>
          <Row>
            <Col>
              {/*
                TODO: contact external (is repeatable, is array)
                TODO: contact role (is repeatable, is array)
              */}
              <KeyValue
                label={<FormattedMessage id="ui-finc-config.sourceManagement.contacts.external" />}
                value={_.get(metadataSource, 'contacts.external.name', '-')}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {/*
                TODO: contact internal (is repeatable, is array)
                TODO: contact role (is repeatable, is array)
              */}
            </Col>
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceManagement.indexingLevel" />}
              value={_.get(metadataSource, 'indexingLevel', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceManagement.licensingNote" />}
              value={_.get(metadataSource, 'licensingNote', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceManagementView;
