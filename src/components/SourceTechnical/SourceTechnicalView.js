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
    const isEmptyMessage = 'No items to show';
    // set values for deliveryMethods
    const deliveryMethodsItem = metadataSource.deliveryMethods;
    const deliveryMethodsFormatter = (deliveryMethodsItem) => (<li>{deliveryMethodsItem}</li>);
    // set values for tickets
    const ticketsItem = metadataSource.tickets;
    const ticketsFormatter = (ticketsItem) => (<li>{ticketsItem}</li>);
    // set values for formats
    const formatsItem = metadataSource.tickets;
    const formatsFormatter = (formatsItem) => (<li>{formatsItem}</li>);
    // set values for inferiorTo
    const inferiorToItem = metadataSource.tickets;
    const inferiorToFormatter = (inferiorToItem) => (<li>{inferiorToItem}</li>);

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.lastProcessed" />}
              value={_.get(metadataSource, 'lastProcessed', '-')}
            />
          </Row>
          {/* ticket is repeatable */}
          <Row>
            <div className="kvLabel---3pCya"><FormattedMessage id="ui-finc-config.sourceTechnical.tickets" /></div>
          </Row>
          <Row>
            <List
              items={ticketsItem}
              itemFormatter={ticketsFormatter}
              isEmptyMessage={isEmptyMessage}
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
          {/*
            TODO: is there a better way to pass css instructions for className="kvLabel---3pCya"
            TODO: is there a better way make a new line instead of new <Row>
          */}
          {/* deliveryMethods is repeatable */}
          <Row>
            <div className="kvLabel---3pCya"><FormattedMessage id="ui-finc-config.sourceTechnical.deliveryMethods" /></div>
          </Row>
          <Row>
            <List
              items={deliveryMethodsItem}
              itemFormatter={deliveryMethodsFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
          {/* format is repeatable */}
          <Row>
            <div className="kvLabel---3pCya"><FormattedMessage id="ui-finc-config.sourceTechnical.formats" /></div>
          </Row>
          <Row>
            <List
              items={formatsItem}
              itemFormatter={formatsFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceTechnical.updateRhythm" />}
              value={_.get(metadataSource, 'updateRhythm', '-')}
            />
          </Row>
          {/* inferiorTo is repeatable */}
          <Row>
            <div className="kvLabel---3pCya"><FormattedMessage id="ui-finc-config.sourceTechnical.inferiorTo" /></div>
          </Row>
          <Row>
            <List
              items={inferiorToItem}
              itemFormatter={inferiorToFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceTechnicalView;
