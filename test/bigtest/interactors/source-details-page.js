import {
  interactor,
  is,
  text,
  scoped,
} from '@bigtest/interactor';

@interactor class ButtonInteractor {
  isButton = is('button');
}

@interactor class TechnicalAccordion {
  static defaultScope = '#technicalAccordion';
}

export default @interactor class SourceDetailsPage {
  static defaultScope = '#pane-sourcedetails';

  sourceTitle = text('[data-test-source-header-title]');
  managementAccordion = new ButtonInteractor('#managementAccordion');
  technicalAccordion = new TechnicalAccordion();
  closePaneBtn = new ButtonInteractor('[icon=times]');
  editSourceBtn = new ButtonInteractor('#clickable-edit-source');
  showAllCollectionsBtn = new ButtonInteractor('#showAllCollections');
  contactCard = scoped('[data-test-contact-card]');
  contactType = scoped('[data-test-contact-type]');
  contactRole = scoped('[data-test-contact-role]');
  contactName = scoped('[data-test-contact-name]');
}
