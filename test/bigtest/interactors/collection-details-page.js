import {
  interactor,
  is,
  isPresent,
  text,
} from '@bigtest/interactor';

@interactor class ButtonInteractor {
  isButton = is('button');
}

@interactor class ManagementAccordion {
  static defaultScope = '#managementAccordion';
}

@interactor class TechnicalAccordion {
  static defaultScope = '#technicalAccordion';
}

export default @interactor class CollectionDetailsPage {
  static defaultScope = '#pane-collectiondetails';

  collectionTitle = text('[data-test-collection-header-title]');
  managementAccordion = new ManagementAccordion();
  technicalAccordion = new TechnicalAccordion();
  closePaneBtn = new ButtonInteractor('[icon=times]');
  clickEditButton = new ButtonInteractor('#clickable-edit-collection');
  editButtonPresent = isPresent('#clickable-edit-collection');
}
