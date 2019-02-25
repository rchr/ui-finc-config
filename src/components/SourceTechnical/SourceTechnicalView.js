import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Col,
  KeyValue,
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
            <Col>
              {/*
                TODO: deliveryMethods (is repeatable, is array)
              */}
            </Col>
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
