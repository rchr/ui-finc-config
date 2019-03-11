import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  KeyValue,
  Row
} from '@folio/stripes/components';

class CollectionInfoView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataCollection: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };

  render() {
    const { metadataCollection, id } = this.props;

    return (
      <React.Fragment>
        <div id={id}>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionInfo.label" />}
              value={_.get(metadataCollection, 'label', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionInfo.description" />}
              value={_.get(metadataCollection, 'description', '-')}
            />
          </Row>
          {/* <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionInfo.mdSource" />}
              value={_.get(metadataCollection, 'mdSource', '-')}
            />
          </Row> */}
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionInfoView;
