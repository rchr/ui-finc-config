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
import Link from 'react-router-dom/Link';

class CollectionInfoView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataCollection: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
    parentResources: PropTypes.object
  };

  getData(resourceName) {
    const { parentResources } = this.props;
    const records = (parentResources[`${resourceName}`] || {}).records || [];
    if (!records || records.length === 0) return null;
    return records;
  }

  getSourceElement = (id, data) => {
    if (!data || data.length === 0 || !id) return null;
    return data.find((element) => {
      return element.id === id;
    });
  }

  render() {
    const { metadataCollection, id } = this.props;
    // get all available sources
    const sourceData = this.getData('source');
    // get the source-ID, which is saved in the collection
    const sourceId = metadataCollection.mdSource.id;
    // get the one source and all its information (which has the source ID saved in the collection)
    const sourceElement = this.getSourceElement(sourceId, sourceData);
    // get the name of the source
    const sourceName = _.get(sourceElement, 'label', '-');
    // get the status of the source for setting filter in url
    const sourceStatus = _.get(sourceElement, 'status', '-');
    // set the complete source link with name and status
    const sourceLink = (
      <React.Fragment>
        <Link to={{
          pathname: `/finc-config/metadata-sources/view/${sourceId}`,
          search: `?filters=status.${sourceStatus}`
        }}
        >
          {sourceName}
        </Link>
      </React.Fragment>
    );

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
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionInfo.mdSource" />}
              value={sourceLink}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionInfoView;
