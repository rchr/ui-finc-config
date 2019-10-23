import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { stripesConnect } from '@folio/stripes/core';

import urls from '../components/DisplayUtils/urls';
import MetadataSourceView from '../components/MetadataSources/MetadataSourceView';

class SourceViewRoute extends React.Component {
  static manifest = Object.freeze({
    source: {
      type: 'okapi',
      path: 'finc-config/metadata-sources/:{id}',
    },
    query: {},
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      source: PropTypes.shape({
        hasLoaded: PropTypes.bool
      }),
      query: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  };

  handleClose = () => {
    const { location } = this.props;
    this.props.history.push(`${urls.sources()}${location.search}`);
  }

  handleEdit = () => {
    const { location, match } = this.props;
    this.props.history.push(`${urls.sourceEdit(match.params.id)}${location.search}`);
  }

  getRecord = (id) => {
    return _.get(this.props.resources, 'sources.records', [])
      .find(i => i.id === id);
  }

  isLoading = () => {
    const { match, resources } = this.props;

    return (
      match.params.id !== _.get(resources, 'source.records[0].id') &&
      _.get(resources, 'source.isPending', true)
    );
  }

  render() {
    const { handlers } = this.props;
    // const selectedRecord = this.getRecord(this.props.match.params.id);

    return (
      <MetadataSourceView
        record={_.get(this.props.resources, 'source.records', []).find(i => i.id === this.props.match.params.id)}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
          onEdit: this.handleEdit,
        }}
        isLoading={this.isLoading()}
      />
    );
  }
}

export default stripesConnect(SourceViewRoute);
