import {
  clickable,
  interactor,
  is,
  isPresent,
  value,
} from '@bigtest/interactor';

@interactor class ButtonInteractor {
  isButton = is('button');
}

@interactor class ImplementationStatusSelect {
  static defaultScope = 'select[name="status"]';
  value = value();
}

@interactor class DeleteSourceConfirmation {
  static defaultScope = '#delete-source-confirmation';
}

export default @interactor class EditSourcePage {
  static defaultScope = '[data-test-source-form-page]';
  isLoaded = isPresent('[class*=paneTitleLabel---]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  implementationStatusSelect = new ImplementationStatusSelect();
  deleteSourceConfirmation = new DeleteSourceConfirmation();
  clickDeleteSource = clickable('#clickable-delete-source');
  closePaneBtn = new ButtonInteractor('[icon=times]');
}
