import { interactor } from '@bigtest/interactor';

import NavigationInteractor from './navigation';

// https://bigtestjs.io/guides/interactors/introduction/
export default @interactor class ApplicationInteractor {
  static defaultScope = '#ModuleContainer';

  buttonSources = 'button[id="metadata-sources"]';
  buttonCollection = 'button[id="metadata-collections"]';
  navigation = new NavigationInteractor();
}
