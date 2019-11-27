import {
  interactor,
  isPresent,
  collection,
} from '@bigtest/interactor';

export default @interactor class IsilInteractor {
  static defaultScope = '[data-test-settings-finc-config-isils]';

  buttonAddIsil = 'button[id="clickable-add-isil"]';
  isils = collection('[class^="editListRow---"]');

  isLoaded = isPresent('#editList-isils');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
}
