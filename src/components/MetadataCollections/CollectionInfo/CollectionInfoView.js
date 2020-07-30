import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  KeyValue,
  Row,
} from '@folio/stripes/components';

import urls from '../../DisplayUtils/urls';

class CollectionInfoView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataCollection: PropTypes.object,
    // sourceElement: PropTypes.object,
  };

  render() {
    const { metadataCollection, id } = this.props;

    // get id and name of the source out of the fields, saved in the current collection
    const sourceId = _.get(metadataCollection, 'mdSource.id', '-');
    const sourceName = _.get(metadataCollection, 'mdSource.name', '-');
    // get the status of the source for setting filter in url out of the associated source
    // const sourceStatus = _.get(this.props.sourceElement, 'mdSource.status', '-');
    // set the complete source link with name and status
    const sourceLink = (
      <React.Fragment>
        <Link to={{
          pathname: `${urls.sourceView(sourceId)}`,
          // search: `?filters=status.${_.get(sourceElement, 'status')}`
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
