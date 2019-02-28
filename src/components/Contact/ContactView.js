import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  KeyValue,
  Row
} from '@folio/stripes/components';

// THIS CLASS IS ACTUALLY NOT USED
// EXAMPLE FOR ACCESS VIA STRIPES.CONNESCT

class ContactView extends React.Component {
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
    // const test = metadataSource.contacts.internal[0].name;

    const contactInfosInternal = metadataSource.contacts.internal.map(
      (c) => (
        <li key={c.id}>
          { c.name }
          { c.role }
        </li>
      )
    );
    const contactInfosExternal = metadataSource.contacts.external.map(
      (c) => (
        <li key={c.id}>
          { c.name }
          { c.role }
        </li>
      )
    );

    //   const contactInfosInternalArray = metadataSource.contacts.internal.map((c) => {
    //     const name = c.name;
    //     const role = c.role;
    //  });

    // const contactInfosInternalArray = metadataSource.contacts.internal.map((c) => <li key={c.id}>{c.name} {c.role}</li>);
    // const bspArray = [
    //   { name:'Hanns Honig', role:'technic' },
    //   { name:'Kuddel Muddel', role:'management' },
    // ];

    return (
      <React.Fragment>
        <div id="contactInfosInternal">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.contact.internal" />}
              value={contactInfosInternal}
            />
          </Row>
        </div>
        <div id="contactInfosExternal">
          <Row>
            <KeyValue
              label={<FormattedMessage id="ui-finc-config.contact.external" />}
              value={contactInfosExternal}
            />
          </Row>
        </div>
        {/* <MultiColumnList
          contentData={bspArray}
          visibleColumns={['name', 'role']}
          columnMapping={{
            name: <FormattedMessage id="ui-finc-config.contact.name" />,
            role: <FormattedMessage id="ui-finc-config.contact.role" />
          }}
        /> */}
      </React.Fragment>
    );
  }
}

export default ContactView;
