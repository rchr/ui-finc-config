import {
  interactor,
  isPresent,
  scoped,
  collection,
  clickable
} from '@bigtest/interactor';

import NavigationInteractor from './navigation';

export default @interactor class CollectionsList {
  static defaultScope = '[data-test-collections]';

  clickMetadataAvailableCOLLECTIONsCheckbox = clickable('#clickable-filter-metadata-available-yes');
  instances = collection('[role=group] div a');
  instance = scoped('#pane-collectiondetails');
  navigation = new NavigationInteractor();
  metadataAvailableFilterIsPresent = isPresent('section[id="filter-accordion-metadataAvailable"]');
  usageRestrictedFilterIsPresent = isPresent('section[id="filter-accordion-usageRestricted"]');
  freeContentFilterIsPresent = isPresent('section[id="filter-accordion-freeContent"]');
  resetAllBtnIsPresent = isPresent('button[id="clickable-reset-all"]');
  submitBtnIsPresent = isPresent('button[id="collectionSubmitSearch"]');
  searchFieldIsPresent = isPresent('input[id="collectionSearchField"]');

  isLoaded = isPresent('#pane-collectionresults');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
