import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';
import setupApplication from '../helpers/setup-application';
import SourceDetailsPage from '../interactors/source-details-page';
import SourceInteractor from '../interactors/source';

describe('SourceDetailsPage', () => {
  setupApplication();
  const sourceDetailsPage = new SourceDetailsPage();
  const sourceInteractor = new SourceInteractor();

  let source = null;
  beforeEach(async function () {
    source = this.server.create('metadata-source');
    this.visit('/fincconfig/metadatasources?filters=status.Active');

    await sourceInteractor.clickActiveSOURCEsCheckbox();
  });

  it('shows the list of source items', () => {
    expect(sourceInteractor.isVisible).to.equal(true);
  });

  it('renders each instance', () => {
    expect(sourceInteractor.instances().length).to.be.gte(1);
  });

  describe('clicking on the first item', function () {
    beforeEach(async function () {
      await sourceInteractor.instances(0).click();
    });

    it('displays source label in the pane header', function () {
      expect(sourceDetailsPage.title).to.include(source.label);
    });

    it('all accordions are present', function () {
      expect(sourceDetailsPage.managementAccordion.isPresent).to.equal(true);
      expect(sourceDetailsPage.technicalAccordion.isPresent).to.equal(true);
    });
  });
});
