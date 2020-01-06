import {
  clickable,
  interactor,
  Interactor,
  is,
  isPresent,
  value,
} from '@bigtest/interactor';

@interactor class ButtonInteractor {
  isButton = is('button');
}

@interactor class UsageRestrictedSelect {
  static defaultScope = 'select[name="usageRestricted"]';
  value = value();
}

@interactor class FreeContentSelect {
  static defaultScope = 'select[name="freeContent"]';
  value = value();
}

@interactor class DeleteCollectionConfirmation {
  static defaultScope = '#delete-collection-confirmation';
}

export default @interactor class EditCollectionPage {
  static defaultScope = '[data-test-collection-form-page]';

  usageRestrictedSelect = new UsageRestrictedSelect();
  freeContentSelect = new FreeContentSelect();
  deleteCollectionConfirmation = new DeleteCollectionConfirmation();
  clickDeleteCollection = clickable('#clickable-delete-collection');
  closePaneBtn = new ButtonInteractor('[icon=times]');
  closeWithoutSaving = new ButtonInteractor('#clickable-cancel-editing-confirmation-cancel');
  createCollectionBtn = new ButtonInteractor('#clickable-createcollection');
  updateCollectionBtn = new ButtonInteractor('#clickable-updatecollection');
  closeEditPaneBtn = new ButtonInteractor('#clickable-closecollectiondialog');
  keepEditingBtn = new ButtonInteractor('#clickable-cancel-editing-confirmation-confirm');
  collectionName = new Interactor('input[name=label]');
  collectionInfoAccordion = new ButtonInteractor('#editCollectionInfo');

  isLoaded = isPresent('[class*=paneTitleLabel---]');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }
}
