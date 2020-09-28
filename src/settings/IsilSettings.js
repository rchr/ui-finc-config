import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ControlledVocab } from '@folio/stripes/smart-components';

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

  setRequiredValidation = (values) => {
    const errors = {};

    if (!values.isil) {
      errors.isil = <FormattedMessage id="ui-finc-config.settings.isils.isilIsEmpty" />;
    }
    if (!values.tenant) {
      errors.tenant = <FormattedMessage id="ui-finc-config.settings.isils.tenantIsEmpty" />;
    }
    return errors;
  }

  render() {
    return (
      <this.connectedControlledVocab
        baseUrl="finc-config/isils"
        columnMapping={{
          library: <FormattedMessage id="ui-finc-config.settings.isils.library" />,
          isil: <FormattedMessage id="ui-finc-config.settings.isils.labelSingular" />,
          tenant: <FormattedMessage id="ui-finc-config.settings.isils.tenant" />,
        }}
        data-test-settings-finc-config-isils
        hiddenFields={['description', 'numberOfObjects']}
        id="isils"
        label={<FormattedMessage id="ui-finc-config.settings.isils.label" />}
        labelSingular={<FormattedMessage id="ui-finc-config.settings.isils.labelSingular" />}
        nameKey="name"
        objectLabel={<FormattedMessage id="ui-finc-config.settings.isils.labelSingular" />}
        records="isils"
        sortby="name"
        validate={this.setRequiredValidation}
        visibleFields={['library', 'isil', 'tenant']}
        {...this.props}
      />
    );
  }
}

export default IsilSettings;
