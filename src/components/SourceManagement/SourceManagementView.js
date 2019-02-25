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
  Label,
  List,
  MultiColumnList,
  Row
} from '@folio/stripes/components';

// import ContactView from '../Contact/ContactView';

class SourceManagementView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
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
    const { metadataSource, id } = this.props;
    // set values for contracts
    const contractsItem = metadataSource.contracts;
    const contractsFormatter = (contractsItem) => (<li>{contractsItem}</li>);
    const isEmptyMessage = 'No items to show';
    // const contactExternal = _.get(metadataSource, 'contact.external', '-');

    return (
      <React.Fragment>
        <div id="id">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.sourceManagement.vendor" />}
              value={_.get(metadataSource, 'vendor.name', '-')}
            />
          </Row>
          <Row>
            <Col xs={6}>
              {/* <this.connectedContactView
                stripes={this.props.stripes}
                metadataSource={metadataSource}
              /> */}
              <Headline size="medium"><FormattedMessage id="ui-finc-config.sourceManagement.contacts.internal" /></Headline>
              <MultiColumnList
                contentData={metadataSource.contacts.internal}
                visibleColumns={['name', 'role']}
                columnMapping={{
                  name: <FormattedMessage id="ui-finc-config.contact.name" />,
                  role: <FormattedMessage id="ui-finc-config.contact.role" />
                }}
              />
            </Col>
            <Col xs={6}>
              <Headline size="medium"><FormattedMessage id="ui-finc-config.sourceManagement.contacts.external" /></Headline>
              <MultiColumnList
                contentData={metadataSource.contacts.external}
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
          {/*
            TODO: is there a better way to pass css instructions for className="kvLabel---3pCya"
            TODO: is there a better way make a new line instead of new <Row>
          */}
          <Row>
            <div className="kvLabel---3pCya"><FormattedMessage id="ui-finc-config.sourceManagement.contracts" /></div>
          </Row>
          <Row>
            <List
              items={contractsItem}
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
