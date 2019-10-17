import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import compose from 'compose-function';

import { withTags } from '@folio/stripes/smart-components';
import { Tags } from '@folio/stripes-erm-components';
import Pane from '@folio/stripes/components';
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
        sourceId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      source: PropTypes.object,
      query: PropTypes.object,
    }).isRequired,
    handlers: PropTypes.object,
    tagsEnabled: PropTypes.bool,
  };

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

  // getRecord = (id, resourceType) => {
  //   return _.get(this.props.resources, `${resourceType}.records`, [])
  //     .find(i => i.id === id);
  // }

  // handleClose = () => {
  //   this.props.history.push(`${urls.sources}${this.props.location.search}`);
  // }

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

  getRecord = (id, resourceType) => {
    return _.get(this.props.resources, `${resourceType}.records`, [])
      .find(i => i.id === id);
  }

  getSource = () => {
    const { resources } = this.props;
    const source = _.get(resources, 'source');
    const test = source;


    // const contacts = agreement.contacts.map(c => ({
    //   ...c,
    //   user: this.getRecord(c.user, 'users') || c.user,
    // }));

    // const interfacesCredentials = uniqBy(get(resources, 'interfacesCredentials.records', []), 'id');

    // const orgs = agreement.orgs.map(o => ({
    //   ...o,
    //   interfaces: get(o, 'org.orgsUuid_object.interfaces', [])
    //     .map(id => ({
    //       ...this.getRecord(id, 'interfaces') || {},
    //       credentials: interfacesCredentials.find(cred => cred.interfaceId === id)
    //     })),
    // }));

    return {
      ...source
    };
  }

  isLoading = () => {
    const { match, resources } = this.props;

    return (
      match.params.id !== _.get(resources, 'sources.records[0].id') &&
      _.get(resources, 'sources.isPending', true)
    );
  }

  render() {
    const { handlers, resources, tagsEnabled } = this.props;

    return (
      <MetadataSourceView
        contentData={{
          source: this.getSource()
        }}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
          onFetchCredentials: this.handleFetchCredentials,
          onToggleHelper: this.handleToggleHelper,
          onToggleTags: tagsEnabled ? this.handleToggleTags : undefined,
        }}
        // helperApp={this.getHelperApp()}
        isLoading={this.isLoading()}
        urls={this.urls}
      />
    );
  }
}

export default SourceViewRoute;
