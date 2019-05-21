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

  render() {
    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            {...this.props}
            baseUrl="finc-config/isils"
            records="isils"
            label={<FormattedMessage id="ui-finc-config.settings.isils.label" />}
            labelSingular={<FormattedMessage id="ui-finc-config.settings.isils.labelSingular" />}
            objectLabel={<FormattedMessage id="ui-finc-config.settings.isils.labelSingular" />}
            visibleFields={['library', 'isil', 'tenant']}
            columnMapping={{
              library: intl.formatMessage({ id: 'ui-finc-config.settings.isils.library' }),
              isil: intl.formatMessage({ id: 'ui-finc-config.settings.isils.labelSingular' }),
              tenant: intl.formatMessage({ id: 'ui-finc-config.settings.isils.tenant' }),
            }}
            hiddenFields={['description', 'numberOfObjects']}
            nameKey="name"
            id="isils"
            sortby="name"
          />
        )}
      </IntlConsumer>
    );
  }
}

export default IsilSettings;
