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
    source = this.server.create('finc-config-metadata-source');
    await this.visit('/finc-config/metadata-sources?filters=status.Active');

    // click checkbox not working always
    // await sourceInteractor.clickActiveSOURCEsCheckbox();
  });

  it('shows the list of source items', () => {
    expect(sourceInteractor.isVisible).to.equal(true);
  });

  it('renders each source-instance', () => {
    expect(sourceInteractor.instances().length).to.be.gte(1);
  });

  describe('clicking on the first source', function () {
    beforeEach(async function () {
      await sourceInteractor.instances(0).click();
    });

    it('shows source details pane', () => {
      expect(sourceDetailsPage.isPresent).to.be.true;
    });

    it('displays source label in the pane header', function () {
      expect(sourceDetailsPage.title).to.include(source.label);
    });

    it('all accordions in source-instance are present', function () {
      expect(sourceDetailsPage.managementAccordion.isPresent).to.equal(true);
      expect(sourceDetailsPage.technicalAccordion.isPresent).to.equal(true);
    });
  });

  describe('close source details pane', () => {
    beforeEach(async function () {
      await sourceDetailsPage.closePane.click();
    });

    it('source details pane is not presented', () => {
      expect(sourceDetailsPage.isPresent).to.be.false;
    });
  });
});
