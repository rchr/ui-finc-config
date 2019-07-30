import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Col,
  Headline,
  KeyValue,
  List,
  MultiColumnList,
  Row
} from '@folio/stripes/components';
import css from './SourceManagement.css';
import BasicCss from '../../BasicStyle.css';

class SourceManagementView extends React.Component {
  static propTypes = {
    metadataSource: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };

  render() {
    const { metadataSource } = this.props;
    // set values for contracts
    const contractsItems = metadataSource.contracts;
    const contractsFormatter = (contractsItem) => (<li key={contractsItem}>{contractsItem}</li>);
    const isEmptyMessage = 'No items to show';

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.organization" />}
              value={_.get(metadataSource, 'organization.name', '-')}
            />
          </Row>
          <Row className={css.addMarginForContacts}>
            <Col xs={6}>
              <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.source.contacts.internal" /></Headline>
              <MultiColumnList
                contentData={_.get(metadataSource.contacts, 'internal', [])}
                isEmptyMessage="no internal contact"
                visibleColumns={['name', 'role']}
                columnMapping={{
                  name: <FormattedMessage id="ui-finc-config.contact.name" />,
                  role: <FormattedMessage id="ui-finc-config.contact.role" />
                }}
              />
            </Col>
            <Col xs={6}>
              <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.source.contacts.external" /></Headline>
              <MultiColumnList
                contentData={_.get(metadataSource.contacts, 'external', [])}
                isEmptyMessage="no external contact"
                visibleColumns={['name', 'role']}
                columnMapping={{
                  name: <FormattedMessage id="ui-finc-config.contact.name" />,
                  role: <FormattedMessage id="ui-finc-config.contact.role" />
                }}
              />
            </Col>
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.indexingLevel" />}
              value={_.get(metadataSource, 'indexingLevel', '-')}
            />
          </Row>
          <Row>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.source.contracts" /></Headline>
          </Row>
          <Row>
            <List
              items={contractsItems}
              itemFormatter={contractsFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.generalNotes" />}
              value={_.get(metadataSource, 'generalNotes', '-')}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceManagementView;
