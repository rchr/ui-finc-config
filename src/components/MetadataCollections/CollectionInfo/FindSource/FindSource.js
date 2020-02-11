import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Label,
  Row,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

class FindSource extends React.Component {
  constructor(props) {
    super(props);

    const s = props.intialSource || {};

    this.state = {
      source: {
        id: s.id,
        label: s.label,
      },
    };
    this.inputSourceId = s.id;
    this.inputSourceName = s.label;
  }

  // componentDidMount() {
  //   if (!_.get(this.props, 'input.value') && _.get(this.triggerButton, 'current')) {
  //     this.triggerButton.current.focus();
  //   }
  // }

  selectSource = (s) => {
    this.props.change('mdSource.name', s.label);
    this.props.change('mdSource.id', s.id);

    this.setState(() => {
      return { source: {
        id: s.id,
        label: s.label
      } };
    });
  }

  renderSourceName = (source) => {
    if (_.isEmpty(source.id)) {
      return null;
    }

    const label = _.isEmpty(source.label) ?
      '-' :
      <div>{source.label}</div>;

    return (
      <div
        // className={`${css.section} ${css.active}`}
        label="sourceName"
      >
        <div>{label}</div>
      </div>);
  }

  render() {
    const disableRecordCreation = true;
    const sourceName = this.renderSourceName(this.state.source);
    const buttonProps = { 'marginBottom0': true };
    const pluggable =
      <Pluggable
        aria-haspopup="true"
        buttonProps={buttonProps}
        columnMapping={this.columnMapping}
        dataKey="source"
        disableRecordCreation={disableRecordCreation}
        id="clickable-find-source"
        marginTop0
        onCloseModal={(modalProps) => {
          modalProps.parentMutator.query.update({
            query: '',
            filters: '',
            sort: 'label',
          });
        }}
        // onSourceSelected={this.props.onSourceSelected}
        searchButtonStyle="default"
        searchLabel="Add metadata source"
        selectSource={this.selectSource}
        type="find-finc-metadata-source"
        visibleColumns={['label', 'sourceId', 'status', 'solrShard', 'lastProcessed']}
        {...this.props}
      >
        <div style={{ background: 'red' }}>Plugin not found</div>
      </Pluggable>;

    return (
      <React.Fragment>
        <Row>
          <Col xs={4}>
            { pluggable }
          </Col>
          <Col xs={4}>
            {/* { sourceName } */}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

FindSource.propTypes = {
  change: PropTypes.func,
  intialSourceId: PropTypes.string,
  intialSource: PropTypes.object,
  stripes: PropTypes.object,
};

export default FindSource;
