import {
  interactor,
  text
} from '@bigtest/interactor';

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
}
