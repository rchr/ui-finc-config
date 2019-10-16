import React from 'react';
import PropTypes from 'prop-types';

import { stripesConnect } from '@folio/stripes-core';

class SourceEditRoute extends React.Component {
  static manifest = Object.freeze({});
  static propTypes = {}
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    return (null);
  }
}

export default stripesConnect(SourceEditRoute);
