import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import SourcesRoute from './routes/SourcesRoute';
import SourceEditRoute from './routes/SourceEditRoute';
import SourceCreateRoute from './routes/SourceCreateRoute';

import Settings from './settings';

class FincConfig extends React.Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.object.isRequired,
  }

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }

    const { match: { path } } = this.props;

    return (
      <Switch>
        <Route path={`${path}/metadata-sources/create`} component={SourceCreateRoute} />
        <Route path={`${path}/metadata-sources/:sourceId/edit`} component={SourceEditRoute} />
        {/* child (view) wird ignoriert */}
        {/* <Route path={`${path}/metadata-sources/:sourceId?`} component={SourcesRoute}>
          <Route path={`${path}/metadata-sources/:sourceId`} exact component={SourceViewRoute} />
        </Route> */}
        {/* View wird aufgerufen */}
        {/* <Route path={`${path}/metadata-sources/:sourceId`} component={SourceViewRoute} /> */}
        <Route path={`${path}/metadata-sources`} component={SourcesRoute} />
      </Switch>
    );
  }
}

export default FincConfig;
// export { default as MetadataSources } from './components/MetadataSources/MetadataSources';
