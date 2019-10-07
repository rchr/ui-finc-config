import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Settings from './settings';
import Main from './Main';

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
*/

class FincConfig extends React.Component {
  static propTypes = {
    stripes: PropTypes
      .shape({ connect: PropTypes.func.isRequired }).isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    showSettings: PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);

    this.connectedApp = props.stripes.connect(Main);
  }

  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}`}
          render={() => <this.connectedApp {...this.props} />}
        />
        <Route component={() => { this.NoMatch(); }} />
      </Switch>
    );
  }
}

export default FincConfig;
