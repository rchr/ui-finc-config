import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import compose from 'compose-function';

import { withTags } from '@folio/stripes/smart-components';
import { Tags } from '@folio/stripes-erm-components';
import {
  Layout,
  Pane
} from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes-core';

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
    handlers: PropTypes.object,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
    tagsEnabled: PropTypes.bool,
    record: PropTypes.object,
  };

  // constructor(props) {
  //   super(props);
  // }

  // static propTypes = {
  //   handlers: PropTypes.object,
  //   history: PropTypes.shape({
  //     push: PropTypes.func.isRequired,
  //   }).isRequired,
  //   location: PropTypes.shape({
  //     pathname: PropTypes.string.isRequired,
  //     search: PropTypes.string.isRequired,
  //   }).isRequired,
  //   resources: PropTypes.shape({
  //     interfaces: PropTypes.object,
  //     linkedAgreements: PropTypes.object,
  //     license: PropTypes.object,
  //     terms: PropTypes.object,
  //     users: PropTypes.object,
  //   }).isRequired,
  //   tagsEnabled: PropTypes.bool,
  // }

  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }

  // componentDidMount() {}

  // componentDidUpdate(prevProps) {
  //   const prevSource = _.get(prevProps.resources, 'license.records[0]', {});
  //   const currSource = _.get(this.props.resources, 'license.records[0]', {});
  // }

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
    const { handlers, resources } = this.props;
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
        // urls={this.urls}
      />
    );
  }
}

export default stripesConnect(SourceViewRoute);
