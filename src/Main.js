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
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
    }),
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

    this.state = {
      activeTab: ''
    };
  }

  componentDidMount() {
    this.setTabID();
  }

  setTabID(tabInCurrentUrl) {
    this.setState({
      activeTab: tabInCurrentUrl,
    });
  }

  handleClick(id) {
    this.props.history.push(`/finc-config/${id}`);
  }

  render() {
    const { resources, mutator, match, stripes } = this.props;
    const currentUrl = this.props.location.pathname;
    const splitUrl = currentUrl.split('/');
    const tabInCurrentUrl = splitUrl[2];
    // set active tab always to the value in the current url
    this.state.activeTab = tabInCurrentUrl;

    return (
      <div className={css.container}>
        <Layout className={css.header}>
          <ButtonGroup tagName="nav">
            <Button
              id="metadata-sources"
              fullWidth
              onClick={() => this.handleClick('metadata-sources')}
              buttonStyle={this.state.activeTab === 'metadata-sources' ? 'primary' : 'default'}
            >
              Sources
            </Button>
            <Button
              id="metadata-collections"
              fullWidth
              onClick={() => this.handleClick('metadata-collections')}
              buttonStyle={this.state.activeTab === 'metadata-collections' ? 'primary' : 'default'}
            >
              Collections
            </Button>
          </ButtonGroup>
        </Layout>

        <div className={css.body}>
          <Switch>
            <Route
              path={`${match.path}/metadata-sources`}
              render={props => <this.connectedSource
                stripes={stripes}
                mutator={mutator}
                resources={resources}
                {...props}
              />
              }
            />
            <Route
              path={`${match.path}/metadata-collections`}
              render={props => <this.connectedCollection
                stripes={stripes}
                mutator={mutator}
                resources={resources}
                {...props}
              />
              }
            />
            <Redirect exact from={`${match.path}`} to={`${match.path}/metadata-sources`} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
