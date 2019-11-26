import {
  interactor,
  collection,
} from '@bigtest/interactor';

export default @interactor class SettingInteractor {
  static defaultScope = '[data-test-settings-finc-config-isils]';
  buttonAddIsil = 'button[id="clickable-add-isil"]';

  instances = collection('[role=group] div div');
}
