import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Headline,
  KeyValue,
  List,
  Row
} from '@folio/stripes/components';
import BasicCss from '../BasicStyle.css';

class CollectionManagementView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataCollection: PropTypes.object.isRequired
  };

  render() {
    const { metadataCollection, id } = this.props;
    const isEmptyMessage = 'No items to show';
    // set values for permittedFor
    const permittedForItem = metadataCollection.permittedFor;
    const permittedForFormatter = (permittedForItem) => (<li>{permittedForItem}</li>);
    
    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionManagement.metadataAvailable" />}
              value={_.get(metadataCollection, 'metadataAvailable', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionManagement.usageRestricted" />}
              value={_.get(metadataCollection, 'usageRestricted', '-')}
            />
          </Row>
          <Row>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.collectionManagement.permittedFor" /></Headline>
          </Row>
          <Row>
            <List
              items={permittedForItem}
              itemFormatter={permittedForFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionManagement.freeContent" />}
              value={_.get(metadataCollection, 'freeContent', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionManagement.lod.publication" />}
              value={_.get(metadataCollection, 'lod.publication', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionManagement.lod.note" />}
              value={_.get(metadataCollection, 'lod.note', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionManagementView;
