import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import DisplayContact from './DisplayContact';

class DisplayContactsArray extends React.Component {
  static propTypes = {
    metadataSource: PropTypes.object,
    stripes: PropTypes.shape({
      okapi: PropTypes.object
    }),
  };

  render() {
    const { metadataSource } = this.props;
    const contacts = _.get(metadataSource, 'contacts', []);
    const isEmptyMessage = <FormattedMessage id="ui-finc-config.renderList.isEmpty" />;

    if (contacts.length === 0) {
      return isEmptyMessage;
    } else {
      const fields = Array.from(metadataSource.contacts);

      return (
        <React.Fragment>
          {fields.map((elem, index) => (
            <DisplayContact
              contact={elem}
              contactIndex={index}
              contactId={elem.externalId}
              key={index}
            />
          ))}
        </React.Fragment>
      );
    }
  }
}

export default DisplayContactsArray;
