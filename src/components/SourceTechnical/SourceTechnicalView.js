import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Col,
  Headline,
  KeyValue,
  List,
  Row
} from '@folio/stripes/components';

class SourceTechnicalView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataSource: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };


  render() {
    const { metadataSource, id } = this.props;
    // set values for deliveryMethods
    const deliveryMethodsItem = metadataSource.deliveryMethods;
    const deliveryMethodsFormatter = (deliveryMethodsItem) => (<li>{deliveryMethodsItem}</li>);
    const isEmptyMessage = 'No items to show';

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.lastProcessed" />}
              value={_.get(metadataSource, 'lastProcessed', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.ticket" />}
              value={_.get(metadataSource, 'ticket', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.accessUrl" />}
              value={_.get(metadataSource, 'accessUrl', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.sourceId" />}
              value={_.get(metadataSource, 'sourceId', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.solrShard" />}
              value={_.get(metadataSource, 'solrShard', '-')}
            />
          </Row>
          <Row>
            {/*
              TODO: is there a better way to pass css instructions for className="kvLabel---3pCya"
              TODO: is there a better way make a new line instead of new <Row>
            */}
            <div className="kvLabel---3pCya"><FormattedMessage id="ui-finc-config.sourceTechnical.deliveryMethods" /></div>
          </Row>
          <Row>
            <List
              items={deliveryMethodsItem}
              itemFormatter={deliveryMethodsFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.format" />}
              value={_.get(metadataSource, 'format', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.updateRhythm" />}
              value={_.get(metadataSource, 'updateRhythm', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.inferiorTo" />}
              value={_.get(metadataSource, 'inferiorTo', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceTechnicalView;
