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
import BasicCss from '../BasicStyle.css';

// import ContactView from '../Contact/ContactView';

class SourceManagementView extends React.Component {
  static propTypes = {
    metadataSource: PropTypes.object.isRequired,
    stripes: PropTypes
      .shape({
        connect: PropTypes.func.isRequired,
      })
      .isRequired,
  };

  // constructor(props) {
  //   super(props);
  //   this.connectedContactView = this.props.stripes.connect(ContactView);
  // }

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
              label={<FormattedMessage id="ui-finc-config.sourceManagement.organization" />}
              value={_.get(metadataSource, 'vendor.name', '-')}
            />
          </Row>
          <Row className={css.addMarginForContacts}>
            {/* <Row style={{ margin: '1em 0 2em 0' }}> */}
            <Col xs={6}>
              {/* <this.connectedContactView
                stripes={this.props.stripes}
                metadataSource={metadataSource}
              /> */}
              <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceManagement.contacts.internal" /></Headline>
              <MultiColumnList
                // contentData={metadataSource.contacts.internal}
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
              <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceManagement.contacts.external" /></Headline>
              <MultiColumnList
                // contentData={metadataSource.contacts.external}
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
              label={<FormattedMessage id="ui-finc-config.sourceManagement.indexingLevel" />}
              value={_.get(metadataSource, 'indexingLevel', '-')}
            />
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceManagement.licensingNote" />}
              value={_.get(metadataSource, 'licensingNote', '-')}
            />
          </Row>
          <Row>
            <Headline size="medium" className={BasicCss.styleForHeadline}><FormattedMessage id="ui-finc-config.sourceManagement.contracts" /></Headline>
          </Row>
          <Row>
            <List
              items={contractsItems}
              itemFormatter={contractsFormatter}
              isEmptyMessage={isEmptyMessage}
            />
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default SourceManagementView;
