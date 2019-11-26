import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import IsilSettings from './IsilSettings';

export default class FincConfigSettings extends React.Component {
  pages = [
    {
      component: IsilSettings,
      label: <FormattedMessage id="ui-finc-config.settings.isils.label" />,
      route: 'isils',
    }
  ];

  render() {
    return (
      <Settings
        data-test-settings-finc-config
        pages={this.pages}
        paneTitle="Finc config"
        {...this.props}
      />
    );
  }
}
