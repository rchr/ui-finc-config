import {
  clickable,
  interactor,
  Interactor,
  is,
  isPresent,
  value,
  scoped,
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

@interactor class ContactRoleSelect {
  static defaultScope = 'select[id=contact-role-0]';
  value = value();
}

export default @interactor class EditSourcePage {
  static defaultScope = '[data-test-source-form-page]';

  implementationStatusSelect = new ImplementationStatusSelect();
  deleteSourceConfirmation = new DeleteSourceConfirmation();
  clickDeleteSource = clickable('#clickable-delete-source');
  closePaneBtn = new ButtonInteractor('[icon=times]');
  closeWithoutSaving = new ButtonInteractor('#clickable-cancel-editing-confirmation-cancel');
  saveSourceBtn = new ButtonInteractor('#clickable-savesource');
  closeEditPaneBtn = new ButtonInteractor('#clickable-closesourcedialog');
  sourceName = new Interactor('input[name=label]');
  sourceID = new Interactor('input[name=sourceId]');
  addContactButton = new ButtonInteractor('#add-contact-button');
  contactInstance = scoped('[data-test-source-contact-number]');
  findContactField = scoped('#find-contact-field');
  findContactRow = scoped('[data-test-find-contact-row]');
  contactNameField = new Interactor('input[id=contact-name-0]');
  contactRoleSelect = new ContactRoleSelect();

  isLoaded = isPresent('[class*=paneTitleLabel---]');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }
}
