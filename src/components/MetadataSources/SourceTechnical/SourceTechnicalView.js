import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Headline,
  KeyValue,
  List,
  Row
} from '@folio/stripes/components';

import BasicCss from '../../BasicStyle.css';

class SourceTechnicalView extends React.Component {
  static propTypes = {
    metadataSource: PropTypes.object.isRequired,
  };

  renderList = (values) => {
    const { metadataSource } = this.props;

    if (!metadataSource) {
      return 'no values';
    } else {
      const valueItems = metadataSource[values];
      const valueFormatter = (valueItem) => (<li key={valueItem}>{valueItem}</li>);
      const isEmptyMessage = 'No items to show';

      return (
        <List
          items={valueItems}
          itemFormatter={valueFormatter}
          isEmptyMessage={isEmptyMessage}
        />
      );
    }
  }

  render() {
    const { metadataSource } = this.props;

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.lastProcessed" />}
              value={_.get(metadataSource, 'lastProcessed', '-')}
            />
          </Row>
          {/* TICKET is repeatable */}
          <Row>
            <Headline
              size="medium"
              className={BasicCss.styleForHeadline}
            >
              <FormattedMessage id="ui-finc-config.source.tickets" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('tickets') }
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.accessUrl" />}
              value={_.get(metadataSource, 'accessUrl', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.id" />}
              value={_.get(metadataSource, 'sourceId', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.solrShard" />}
              value={_.get(metadataSource, 'solrShard', '-')}
            />
          </Row>
          {/* DELIVERYMETHODS is repeatable */}
          <Row>
            <Headline
              size="medium"
              className={BasicCss.styleForHeadline}
            >
              <FormattedMessage id="ui-finc-config.source.deliveryMethods" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('deliveryMethods') }
          </Row>
          {/* FORMATS is repeatable */}
          <Row>
            <Headline
              size="medium"
              className={BasicCss.styleForHeadline}
            >
              <FormattedMessage id="ui-finc-config.source.formats" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('formats') }
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.updateRhythm" />}
              value={_.get(metadataSource, 'updateRhythm', '-')}
            />
          </Row>
          {/* INFERIORTO is repeatable */}
          <Row>
            <Headline
              size="medium"
              className={BasicCss.styleForHeadline}
            >
              <FormattedMessage id="ui-finc-config.source.inferiorTo" />
            </Headline>
          </Row>
          <Row>
            { this.renderList('inferiorTo') }
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceTechnicalView;
