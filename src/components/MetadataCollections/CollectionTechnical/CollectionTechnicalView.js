import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Headline,
  KeyValue,
  List,
  Row
} from '@folio/stripes/components';

import BasicCss from '../../BasicStyle.css';

class CollectionTechnicalView extends React.Component {
  static propTypes = {
    metadataCollection: PropTypes.object.isRequired
  };

  renderList = (values) => {
    const { metadataCollection } = this.props;

    if (!metadataCollection) {
      return 'no values';
    } else {
      const valueItems = metadataCollection[values];
      const valueFormatter = (valueItem) => (<li key={valueItem}>{valueItem}</li>);
      const isEmptyMessage = 'No items to show';

      return (
        <List
          items={valueItems}
          itemFormatter={valueFormatter}
          isEmptyMessage={isEmptyMessage}
        />
      );
    }
  }

  render() {
    const { metadataCollection } = this.props;

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.collectionId" />}
              value={_.get(metadataCollection, 'collectionId', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.facetLabel" />}
              value={_.get(metadataCollection, 'facetLabel', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.collection.productIsil" />}
              value={_.get(metadataCollection, 'productIsil', '-')}
            />
          </Row>
          <Row>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.collection.tickets" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('tickets') }
          </Row>
          <Row>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.collection.contentFiles" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('contentFiles') }
          </Row>
          <Row>
            <Headline
              className={BasicCss.styleForHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.collection.solrMegaCollections" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('solrMegaCollections') }
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionTechnicalView;
