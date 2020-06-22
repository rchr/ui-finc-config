import {
  interactor,
  is,
  isPresent,
  scoped,
  collection,
  clickable
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

@interactor class ButtonInteractor {
  isButton = is('button');
}

export default @interactor class SourcesList {
  static defaultScope = '[data-test-sources]';

  clickActiveSOURCEsCheckbox = clickable('#clickable-filter-status-active');
  instances = collection('[role="rowgroup"] div[role="row"]');
  instance = scoped('#pane-sourcedetails');

  navigation = new NavigationInteractor();
  statusFilterIsPresent = isPresent('section[id="filter-accordion-status"]');
  solrShardFilterIsPresent = isPresent('section[id="filter-accordion-solrShard"]');
  resetAllBtnIsPresent = isPresent('button[id="clickable-reset-all"]');
  submitBtnIsPresent = isPresent('button[id="sourceSubmitSearch"]');
  searchFieldIsPresent = isPresent('input[id="sourceSearchField"]');
  addNewSourceBtn = new ButtonInteractor('#clickable-new-source');

  isLoaded = isPresent('#pane-sourceresults');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
