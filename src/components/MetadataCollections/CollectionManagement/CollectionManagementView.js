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
import BasicCss from '../../BasicStyle.css';

class CollectionManagementView extends React.Component {
  static propTypes = {
    metadataCollection: PropTypes.object.isRequired
  };

  render() {
    const { metadataCollection } = this.props;
    const isEmptyMessage = 'No items to show';
    // set values for permittedFor
    const permittedForItems = metadataCollection.permittedFor;
    const permittedForFormatter = (permittedForItem) => (<li key={permittedForItem}>{permittedForItem}</li>);

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.metadataAvailable" />}
              value={_.get(metadataCollection, 'metadataAvailable', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.usageRestricted" />}
              value={_.get(metadataCollection, 'usageRestricted', '-')}
            />
          </Row>
          <Row>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.collection.permittedFor" /></Headline>
          </Row>
          <Row>
            <List
              items={permittedForItems}
              itemFormatter={permittedForFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.freeContent" />}
              value={_.get(metadataCollection, 'freeContent', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.lod.publication" />}
              value={_.get(metadataCollection, 'lod.publication', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.lod.note" />}
              value={_.get(metadataCollection, 'lod.note', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.generalNote" />}
              value={_.get(metadataCollection, 'generalNote', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionManagementView;
