import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ControlledVocab } from '@folio/stripes/smart-components';
import { IntlConsumer } from '@folio/stripes/core';

class IsilSettings extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  suppressEdit = term => term.source === 'rdacarrier';
  suppressDelete = term => term.source === 'rdacarrier';

  render() {
    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            {...this.props}
            baseUrl="/finc-config/isils"
            records="isils"
            label={<FormattedMessage id="ui-finc-config.label" />}
            labelSingular={<FormattedMessage id="ui-finc-config.labelSingular" />}
            objectLabel={<FormattedMessage id="ui-finc-config.objectLabel" />}
            visibleFields={['library', 'isil', 'tenant']}
            columnMapping={{
              library: intl.formatMessage({ id: 'ui-finc-config.library' }),
              isil: intl.formatMessage({ id: 'ui-finc-config.isil' }),
              tenant: intl.formatMessage({ id: 'ui-finc-config.tenant' }),
            }}
            itemTemplate={{ source: 'local' }}
            hiddenFields={['description', 'numberOfObjects']}
            nameKey="name"
            actionSuppressor={{ edit: this.suppressEdit, delete: this.suppressDelete }}
            id="isils"
            sortby="name"
          />
        )}
      </IntlConsumer>
    );
  }
}

export default IsilSettings;
