import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes/core';

import MetadataSourceForm from '../components/MetadataSources/MetadataSourceForm';
import urls from '../components/DisplayUtils/urls';

class SourceEditRoute extends React.Component {
  static manifest = Object.freeze({
    sources: {
      type: 'okapi',
      path: 'finc-config/metadata-sources/:{id}',
      shouldRefresh: () => false,
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
      sources: PropTypes.shape({
      }).isRequired,
    }).isRequired,
    resources: PropTypes.object,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    handlers: {},
  }

  getInitialValues = () => {
    const initialValues = _.get(this.props.resources, 'sources.records', []).find(i => i.id === this.props.match.params.id);

    return initialValues;
  }

  handleClose = () => {
    const { location, match } = this.props;
    this.props.history.push(`${urls.sourceView(match.params.id)}${location.search}`);
  }

  handleSubmit = (source) => {
    const { history, location, mutator } = this.props;

    mutator.sources
      .PUT(source)
      .then(({ id }) => {
        history.push(`${urls.sourceView(id)}${location.search}`);
      });
  }

  deleteSource = (source) => {
    const { history, location, mutator } = this.props;

    mutator.sources.DELETE({ source }).then(() => {
      history.push(`${urls.sources()}${location.search}`);
    });
  }

  isLoading = () => {
    const { match, resources } = this.props;

    return (
      match.params.id !== _.get(resources, 'source.records.id') &&
      _.get(resources, 'source.isPending', true)
    );
  }

  fetchIsPending = () => {
    return Object.values(this.props.resources)
      .filter(resource => resource)
      .some(resource => resource.isPending);
  }

  render() {
    const { handlers, resources } = this.props;

    if (this.fetchIsPending()) return 'loading';

    return (
      <MetadataSourceForm
        contentData={resources}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
        }}
        initialValues={this.getInitialValues()}
        isLoading={this.fetchIsPending()}
        onSubmit={this.handleSubmit}
        onDelete={this.deleteSource}
      />
    );
  }
}

export default stripesConnect(SourceEditRoute);
