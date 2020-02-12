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

import css from './FindSource.css';
import BasicCss from '../../../BasicStyle.css';

class FindSource extends React.Component {
  constructor(props) {
    super(props);

    const s = props.intialSource || {};

    this.state = {
      source: {
        id: s.id,
        name: s.name,
      },
    };
    this.inputSourceId = s.id;
    this.inputSourceName = s.name;
  }

  selectSource = (s) => {
    this.props.change('mdSource.name', s.label);
    this.props.change('mdSource.id', s.id);

    this.setState(() => {
      return { source: {
        id: s.id,
        name: s.label
      } };
    });
  }

  renderSourceName = (source) => {
    if (_.isEmpty(source.id)) {
      return null;
    }

    const name = _.isEmpty(source.name) ?
      '-' :
      <div>{source.name}</div>;

    return (
      <div
        className={`${css.section} ${css.active}`}
        name="sourceName"
      >
        <div>{name}</div>
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
            sort: 'name',
          });
        }}
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
          <Label className={BasicCss.styleForFormLabel}>
            <FormattedMessage id="ui-finc-config.collection.mdSource" />
          </Label>
        </Row>
        <Row>
          <Col xs={4}>
            { pluggable }
          </Col>
          <Col xs={4}>
            { sourceName }
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
