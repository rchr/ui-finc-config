import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Link from 'react-router-dom/Link';

import {
  KeyValue,
  Row
} from '@folio/stripes/components';

import urls from '../../DisplayUtils/urls';

class CollectionInfoView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataCollection: PropTypes.object,
    sourceElement: PropTypes.object,
  };

  render() {
    const { metadataCollection, id, sourceElement } = this.props;

    // // get the one source and all its information (which has the source ID saved in the collection)
    // const sourceElement = this.getSourceElement(sourceId, sourceData);
    const sourceId = _.get(sourceElement, 'id', '-');
    // // get the name of the source
    const sourceName = _.get(sourceElement, 'label', '-');
    // // get the status of the source for setting filter in url
    const sourceStatus = _.get(sourceElement, 'status', '-');
    // // set the complete source link with name and status
    const sourceLink = (
      <React.Fragment>
        <Link to={{
          pathname: `${urls.sourceView(sourceId)}`,
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
              label={<FormattedMessage id="ui-finc-config.collection.label" />}
              value={_.get(metadataCollection, 'label', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.description" />}
              value={_.get(metadataCollection, 'description', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.mdSource" />}
              value={sourceLink}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionInfoView;
