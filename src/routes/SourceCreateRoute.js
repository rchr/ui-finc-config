import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import MetadataSourceForm from '../components/MetadataSources/MetadataSourceForm';
import urls from '../components/DisplayUtils/urls';

class SourceCreateRoute extends React.Component {
  static manifest = Object.freeze({
    sources: {
      type: 'okapi',
      path: 'finc-config/metadata-sources',
      fetch: false,
      shouldRefresh: () => false,
    },
  });

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    resources: PropTypes.object,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      licenses: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    handlers: PropTypes.object,
  }

  static defaultProps = {
    handlers: {},
  }

  handleClose = () => {
    const { location } = this.props;
    this.props.history.push(`${urls.sources()}${location.search}`);
  }

  handleSubmit = (source) => {
    const { history, location, mutator } = this.props;

    mutator.sources
      .POST(source)
      .then(({ id }) => {
        history.push(`${urls.sourceView(id)}${location.search}`);
      });
  }

  render() {
    const { handlers, resources } = this.props;

    return (
      <MetadataSourceForm
        contentData={resources}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
        }}
        // initialValues={this.getInitialValues()}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default stripesConnect(SourceCreateRoute);
