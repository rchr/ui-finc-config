import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  Headline,
  KeyValue,
  List,
  MultiColumnList,
  Row,
} from '@folio/stripes/components';
import Link from 'react-router-dom/Link';

import BasicCss from '../../BasicStyle.css';
import css from './SourceManagement.css';
import urls from '../../DisplayUtils/urls';

class SourceManagementView extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    metadataSource: PropTypes.object,
    stripes: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.okapiUrl = props.stripes.okapi.url;
    this.httpHeaders = Object.assign({}, {
      'Accept': 'text/html'
    });

    this.state = {
      organizationValue: '',
    };
  }

  componentDidMount() {
    const organization = _.get(this.props.metadataSource, 'organization', '-');

    // organization is empty
    if (organization === '-') {
      this.setState(
        {
          organizationValue: organization
        }
      );
    } else {
      fetch(`${urls.organizationView(organization.id)}`, { headers: this.httpHeaders })
        .then(response => {
          if (response.ok) {
            // success http request
            // show organization name with link
            const organizationLink = (
              <React.Fragment>
                <Link to={{
                  pathname: `${urls.organizationView(organization.id)}`,
                }}
                >
                  {organization.name}
                </Link>
              </React.Fragment>
            );
            this.setState(
              {
                organizationValue: organizationLink
              }
            );
          } else {
            // error http request
            // show organization name
            this.setState(
              {
                organizationValue: organization.name
              }
            );
          }
        });
    }
  }

  renderContacts = (type) => {
    const { metadataSource } = this.props;

    if (!metadataSource) {
      return 'no values';
    } else {
      return (
        <MultiColumnList
          columnWidths={{
            name: '46%',
            role: '46%'
          }}
          columnMapping={{
            name: <FormattedMessage id="ui-finc-config.contact.name" />,
            role: <FormattedMessage id="ui-finc-config.contact.role" />
          }}
          contentData={_.get(metadataSource.contacts, type, [])}
          interactive={false}
          isEmptyMessage={`no ${type} contact`}
          visibleColumns={['name', 'role']}
        />
      );
    }
  }

  renderContracts = () => {
    const { metadataSource } = this.props;

    if (!metadataSource) {
      return 'no values';
    } else {
      const contractsItems = metadataSource.contracts;
      const contractsFormatter = (contractsItem) => (<li key={contractsItem}>{contractsItem}</li>);
      const isEmptyMessage = 'No items to show';

      return (
        <List
          items={contractsItems}
          itemFormatter={contractsFormatter}
          isEmptyMessage={isEmptyMessage}
        />
      );
    }
  }

  render() {
    const { metadataSource, id } = this.props;
    const sourceId = _.get(metadataSource, 'id', '-');

    return (
      <React.Fragment>
        <div id={id}>
          <Row>
            <Col xs={6}>
              <Button
                buttonStyle="primary"
                id="showAllCollections"
                to={urls.showAllCollections(sourceId)}
              >
                <FormattedMessage id="ui-finc-config.source.button.showAllCollections" />
              </Button>
            </Col>
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.organization" />}
              value={this.state.organizationValue}
            />
          </Row>
          <Row className={css.addMarginForContacts}>
            <Col xs={6}>
              <Headline
                className={BasicCss.styleForViewHeadline}
                size="medium"
              >
                <FormattedMessage id="ui-finc-config.source.contacts.internal" />
              </Headline>
              { this.renderContacts('internal') }
            </Col>
            <Col xs={6}>
              <Headline
                className={BasicCss.styleForViewHeadline}
                size="medium"
              >
                <FormattedMessage id="ui-finc-config.source.contacts.external" />
              </Headline>
              { this.renderContacts('external') }
            </Col>
          </Row>
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.source.indexingLevel" />}
              value={_.get(metadataSource, 'indexingLevel', '-')}
            />
          </Row>
          <Row>
            <Headline
              className={BasicCss.styleForViewHeadline}
              size="medium"
            >
              <FormattedMessage id="ui-finc-config.source.contracts" />
            </Headline>
          </Row>
          <Row>
            { this.renderContracts() }
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
