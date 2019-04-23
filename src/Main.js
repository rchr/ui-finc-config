import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Layout
} from '@folio/stripes/components';
import MetadataSources from './components/MetadataSources/MetadataSources';
import MetadataCollections from './components/MetadataCollections/MetadataCollections';
import css from './components/BasicStyle.css';

class Main extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    stripes: PropTypes.object,
    mutator: PropTypes.object,
    resources: PropTypes.object,
    parentMutator: PropTypes.object,
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  constructor(props) {
    super(props);
    this.connectedSource = props.stripes.connect(MetadataSources);
    this.connectedCollection = props.stripes.connect(MetadataCollections);
  }

  state = {
    tab: 'metadatasources',
  };

  navigateToSources = () => {
    this.props.history.push('/fincconfig/metadatasources');
    this.setState({ tab: 'metadatasources' });
  }

  navigateToCollections = () => {
    this.props.history.push('/fincconfig/metadatacollections');
    this.setState({ tab: 'metadatacollections' });
  }

  render() {
    const { resources, mutator, match, stripes } = this.props;
    const { tab } = this.state;

    return (
      <div className={css.container}>
        <Layout className={css.header}>
          <ButtonGroup tagName="nav">
            <Button
              id="metadatasources"
              buttonStyle={tab === 'metadatasources' ? 'primary' : undefined}
              fullWidth
              onClick={this.navigateToSources}
            >
              Sources
            </Button>
            <Button
              id="metadatacollections"
              buttonStyle={tab === 'metadatacollections' ? 'primary' : undefined}
              fullWidth
              onClick={this.navigateToCollections}
            >
              Collections
            </Button>
          </ButtonGroup>
        </Layout>

        <div className={css.body}>
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
      </div>
    );
  }
}

export default Main;
