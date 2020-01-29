import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';

import MetadataCollectionForm from '../components/MetadataCollections/MetadataCollectionForm';
import urls from '../components/DisplayUtils/urls';

class CollectionCreateRoute extends React.Component {
  static manifest = Object.freeze({
    collections: {
      type: 'okapi',
      path: 'finc-config/metadata-collections',
      fetch: false,
      shouldRefresh: () => false,
    },
    sources: {
      type: 'okapi',
      records: 'fincConfigMetadataSources',
      // TODO: show all sources
      perRequest: 1000,
      path: 'finc-config/metadata-sources',
      resourceShouldRefresh: true
    },
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      collections: PropTypes.shape({
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      collection: PropTypes.object,
      sources: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    handlers: {},
  }

  handleClose = () => {
    const { location } = this.props;
    this.props.history.push(`${urls.collections()}${location.search}`);
  }

  handleSubmit = (collection) => {
    const { history, location, mutator } = this.props;

    mutator.collections
      .POST(collection)
      .then(({ id }) => {
        history.push(`${urls.collectionView(id)}${location.search}`);
      });
  }

  render() {
    const { handlers, resources } = this.props;

    return (
      <MetadataCollectionForm
        contentData={resources}
        handlers={{
          onClose: this.handleClose,
          ...handlers,
        }}
        onSubmit={this.handleSubmit}
        sources={_.get(this.props.resources, 'sources.records', [])}
      />
    );
  }
}

export default stripesConnect(CollectionCreateRoute);
