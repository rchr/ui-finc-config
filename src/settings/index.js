import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import IsilSettings from './IsilSettings';

/*
  STRIPES-NEW-APP
  Your app's settings pages are defined here.
  The pages "general" and "some feature" are examples. Name them however you like.
*/

export default class FincConfigSettings extends React.Component {
  pages = [
    {
      route: 'isils',
      label: <FormattedMessage id="ui-finc-config.settings.isils.label" />,
      component: IsilSettings,
    }
  ];

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle="Finc Config" />
    );
  }
}
