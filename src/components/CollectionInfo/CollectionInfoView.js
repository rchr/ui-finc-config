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
    parentResources: PropTypes.arrayOf(PropTypes.object)
  };

  getData(resourceName) {
    const { parentResources } = this.props;
    const records = (parentResources[`${resourceName}`] || {}).records || [];
    if (!records || records.length === 0) return null;
    return records;
  }

  getSourceName = (id, data) => {
    if (!data || data.length === 0 || !id) return null;
    return data.find((element) => {
      return element.id === id;
    });
  }

  render() {
    const { metadataCollection, id } = this.props;
    // get all available sources
    const sourceData = this.getData('source');
    // get ID of source, which is saved in the collection
    const sourceId = metadataCollection.mdSource.id;
    const sourceName = this.getSourceName(sourceId, sourceData);

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
          <Row>
            {/* get the name of the source */}
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionInfo.mdSource" />}
              value={_.get(sourceName, 'label', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionInfoView;
