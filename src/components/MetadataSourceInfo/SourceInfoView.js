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
// import MetadataSourceView from '../MetadataSources/MetadataSourceView';

class SourceInfoView extends React.Component {
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
    // const initialValues = MetadataSourceView.getData();
    // const vendorId = _.get(initialValues, 'vendor.id', '');

    return (
      <React.Fragment>
        <div id={id}>
          {/* <Row end="xs">
            <Col xs={12}>
              <KeyValue
                label={<FormattedMessage id="ui-finc-config.sourceInfo.id" />}
                value={_.get(metadataSource, 'id', '-')}
              />
            </Col>
          </Row> */}
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceInfo.label" />}
              value={_.get(metadataSource, 'label', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceInfo.description" />}
              value={_.get(metadataSource, 'description', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceInfo.status" />}
              value={_.get(metadataSource, 'status', '-')}
            />
            {/* <Col xs={4}>
              <KeyValue
                label={<FormattedMessage id="ui-finc-config.sourceInfo.ticket" />}
                value={_.get(metadataSource, 'ticket', '-')}
              />
            </Col> */}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceInfoView;
