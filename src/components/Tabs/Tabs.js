import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup
} from '@folio/stripes/components';
import css from './Tabs.css';

class Tabs extends Component {
  static propTypes = {
    tabID: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    parentMutator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.setTabID = this.setTabID.bind(this);
  }

  componentDidMount() {
    this.setTabID();
  }

  setTabID() {
    const { tabID } = this.props;
    if (!tabID) return null;
    this.setState({
      activeTab: tabID,
    });
    return false;
  }

  handleClick(id) {
    const { parentMutator } = this.props;
    // reset parameters in url by adding filters: ''
    parentMutator.query.update({ _path: `/fincconfig/${id}`, filters: '' });
  }

  handleActive(id) {
    const isActive = this.state.activeTab === id ? 'primary' : 'default';
    return isActive;
  }

  render() {
    return (
      <div className={css.SegControl}>
        <ButtonGroup>
          <Button
            id="metadatasources"
            onClick={() => this.handleClick('metadatasources')}
            buttonStyle={this.handleActive('metadatasources')}
          >
            Sources
          </Button>
          <Button
            id="metadatacollections"
            onClick={() => this.handleClick('metadatacollections')}
            buttonStyle={this.handleActive('metadatacollections')}
          >
            Collections
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Tabs;
