import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Headline,
  KeyValue,
  List,
  Row
} from '@folio/stripes/components';
import BasicCss from '../BasicStyle.css';

class CollectionTechnicalView extends React.Component {
  static propTypes = {
    metadataCollection: PropTypes.object.isRequired
  };

  render() {
    const { metadataCollection } = this.props;
    const isEmptyMessage = 'No items to show';
    // set values for tickets
    const ticketsItems = metadataCollection.tickets;
    const ticketsFormatter = (ticketsItem) => (<li>{ticketsItem}</li>);
    // set values for contentFiles
    const contentFilesItems = metadataCollection.contentFiles;
    const contentFilesFormatter = (contentFilesItem) => (<li>{contentFilesItem}</li>);
    // set values for solrMegaCollections
    const solrMegaCollectionsItems = metadataCollection.solrMegaCollections;
    const solrMegaCollectionsFormatter = (solrMegaCollectionsItem) => (<li>{solrMegaCollectionsItem}</li>);

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionTechnical.collectionId" />}
              value={_.get(metadataCollection, 'collectionId', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionTechnical.facetLabel" />}
              value={_.get(metadataCollection, 'facetLabel', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collectionTechnical.productIsil" />}
              value={_.get(metadataCollection, 'productIsil', '-')}
            />
          </Row>
          <Row>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.collectionTechnical.tickets" /></Headline>
          </Row>
          <Row>
            <List
              items={ticketsItems}
              itemFormatter={ticketsFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
          <Row>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.collectionTechnical.contentFiles" /></Headline>
          </Row>
          <Row>
            <List
              items={contentFilesItems}
              itemFormatter={contentFilesFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
          <Row>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.collectionTechnical.solrMegaCollections" /></Headline>
          </Row>
          <Row>
            <List
              items={solrMegaCollectionsItems}
              itemFormatter={solrMegaCollectionsFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionTechnicalView;
