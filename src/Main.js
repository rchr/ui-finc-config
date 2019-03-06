import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import MetadataSources from './components/MetadataSources/MetadataSources';
import MetadataCollections from './components/MetadataCollections/MetadataCollections';

class Main extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    stripes: PropTypes.object,
    mutator: PropTypes.object,
    resources: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.connectedSource = props.stripes.connect(MetadataSources);
    this.connectedCollection = props.stripes.connect(MetadataCollections);
  }

  render() {
    const { resources, mutator, match, stripes } = this.props;
    return (
      <div>
        <Switch>
          <Route
            path={`${match.path}/metadatasources`}
            render={props => <this.connectedSource
              stripes={stripes}
              mutator={mutator}
              resources={resources}
              {...props}
            />
            }
          />
          <Route
            path={`${match.path}/metadatacollections`}
            render={props => <this.connectedCollection
              stripes={stripes}
              mutator={mutator}
              resources={resources}
              {...props}
            />
            }
          />
          <Redirect exact from={`${match.path}`} to={`${match.path}/metadatasources`} />
        </Switch>
      </div>
    );
  }
}

export default Main;
