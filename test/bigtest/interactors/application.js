import {
  interactor,
  scoped
} from '@bigtest/interactor';

// https://bigtestjs.io/guides/interactors/introduction/
export default @interactor class ApplicationInteractor {
  // fincHeader = text('[data-test-layout]');
  static defaultScope = '#ModuleContainer';
  // static defaultScope = '#finc-config-module-display';
  button = scoped('[class*=buttonGroup---] button');
  buttonSources = 'button[id="metadatasources"]';
  buttonCollection = 'button[id="metadatacollections"]';

  // static defaultScope = '#pane-results';
  // appTitle = text('[class*=paneTitleLabel---]');

  // guideLink = property('[data-test-application-guide] a', 'href');
}
