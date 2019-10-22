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
import { Spinner } from '@folio/stripes-erm-components';

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

  // getHelperApp = () => {
  //   const { match, resources } = this.props;
  //   const helper = resources.query.helper;
  //   if (!helper) return null;

  //   let HelperComponent = null;

  //   if (helper === 'tags') HelperComponent = Tags;

  //   if (!HelperComponent) return null;

  //   return (
  //     <HelperComponent
  //       link={`erm/sas/${match.params.id}`}
  //       onToggle={() => this.handleToggleHelper(helper)}
  //     />
  //   );
  // }

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
    const { handlers, resources, tagsEnabled } = this.props;

    // const data = _.get(this.props.resources, 'sources.records', []);
    // console.log(`data ${data}`);

    // const testId = this.props.match.params.id;
    // console.log(`id ${testId}`);

    const selectedRecord = this.getRecord(this.props.match.params.id);
    console.log(`selected rec ${selectedRecord}`);

    // if (this.props.resources.source.hasLoaded === false) return this.renderLoadingPane();

    return (
      <MetadataSourceView
        // record={selectedRecord}
        rec={_.get(this.props.resources, 'source.records', []).find(i => i.id === this.props.match.params.id)}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
          // onFetchCredentials: this.handleFetchCredentials,
          // onToggleHelper: this.handleToggleHelper,
          // onToggleTags: tagsEnabled ? this.handleToggleTags : undefined,
        }}
        // // helperApp={this.getHelperApp()}
        // isLoading={this.isLoading()}
        // key={_.get(resources, 'sources.loadedAt', 'loading')}
        // urls={this.urls}
      />
    );
  }
}

export default stripesConnect(SourceViewRoute);
