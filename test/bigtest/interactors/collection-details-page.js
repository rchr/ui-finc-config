import {
  interactor,
  is,
  text
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

  title = text('[data-test-collection-header-title]');
  managementAccordion = new ManagementAccordion();
  technicalAccordion = new TechnicalAccordion();
  closePane = new ButtonInteractor('[icon=times]');
}
