import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';
import MetadataCollectionForm from '../components/MetadataCollections/MetadataCollectionForm';
import urls from '../components/DisplayUtils/urls';

class CollectionEditRoute extends React.Component {
  static manifest = Object.freeze({
    collections: {
      type: 'okapi',
      path: 'finc-config/metadata-collections/:{id}',
      shouldRefresh: () => false,
    },
    sources: {
      type: 'okapi',
      records: 'fincConfigMetadataSources',
      // TODO: show all sources
      perRequest: 1000,
      path: 'finc-config/metadata-sources',
      params: {
        query: 'cql.allRecords=1 sortby label',
        // TODO: show all sources
        // limit: '1000',
      },
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
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
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

  getInitialValues = () => {
    const initialValues = _.get(this.props.resources, 'collections.records', []).find(i => i.id === this.props.match.params.id);

    return initialValues;
  }

  handleClose = () => {
    const { location, match } = this.props;
    this.props.history.push(`${urls.collectionView(match.params.id)}${location.search}`);
  }

  handleSubmit = (collection) => {
    const { history, location, mutator } = this.props;

    mutator.collections
      .PUT(collection)
      .then(({ id }) => {
        history.push(`${urls.collectionView(id)}${location.search}`);
      });
  }

  deleteCollection = (collection) => {
    const { history, location, mutator } = this.props;

    mutator.collections.DELETE({ collection }).then(() => {
      history.push(`${urls.collections()}${location.search}`);
    });
  }

  fetchIsPending = () => {
    return Object.values(this.props.resources)
      .filter(resource => resource)
      .some(resource => resource.isPending);
  }

  render() {
    const { handlers, resources } = this.props;

    // console.log(_.get(this.props.resources, 'sources.records', []));

    if (this.fetchIsPending()) return 'loading';

    return (
      <MetadataCollectionForm
        contentData={resources}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
        }}
        initialValues={this.getInitialValues()}
        isLoading={this.fetchIsPending()}
        onDelete={this.deleteCollection}
        onSubmit={this.handleSubmit}
        sources={_.get(this.props.resources, 'sources.records', [])}
      />
    );
  }
}

export default stripesConnect(CollectionEditRoute);
