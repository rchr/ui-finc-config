import {
  interactor,
  scoped,
  collection,
  clickable
} from '@bigtest/interactor';

export default @interactor class CollectionInteractor {
  static defaultScope = '[data-test-collection-instances]';
  clickMetadataAvailableCOLLECTIONsCheckbox = clickable('#clickable-filter-metadata-available-yes');

  instances = collection('[role=row] a');

  instance = scoped('#pane-collectiondetails');
}
