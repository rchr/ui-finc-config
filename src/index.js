import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import SourcesRoute from './routes/SourcesRoute';
import SourceViewRoute from './routes/SourceViewRoute';
import SourceEditRoute from './routes/SourceEditRoute';
import SourceCreateRoute from './routes/SourceCreateRoute';

import Settings from './settings';
// import Main from './Main';

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
*/

class FincConfig extends React.Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    showSettings: PropTypes.bool,
    stripes: PropTypes.object.isRequired,
  }

  // constructor(props, context) {
  //   super(props, context);

  //   this.connectedApp = props.stripes.connect(Main);
  // }

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }

    const { match: { path } } = this.props;

    return (
      <Switch>
        <Route path={`${path}/create`} component={SourceCreateRoute} />
        <Route path={`${path}/:id/edit`} component={SourceEditRoute} />
        <Route path={path} component={SourcesRoute}>
          <Switch>
            <Route path={`${path}/:id`} exact component={SourceViewRoute} />
          </Switch>
        </Route>
      </Switch>
    );
  }
}

export default FincConfig;
