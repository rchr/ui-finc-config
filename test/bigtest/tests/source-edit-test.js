import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditSourcePage from '../interactors/source-edit-page';
import SourcesList from '../interactors/sources-list';
import SourceDetailsPage from '../interactors/source-details-page';

describe('Edit Source', () => {
  setupApplication();
  const sourcesList = new SourcesList();
  const sourcesDetailsPage = new SourceDetailsPage();
  const editSourcePage = new EditSourcePage();

  beforeEach(async function () {
    const source = this.server.create('finc-config-metadata-source');

    this.visit(`/finc-config/metadata-sources/${source.id}`);
    // this.visit(`/finc-config/metadata-sources/${source.id}?filters=status.Active`);
    await sourcesList.whenLoaded();
    await sourcesDetailsPage.editSourceBtn.click();
    await editSourcePage.whenLoaded();
  });

  it('source edit form should be open', () => {
    expect(editSourcePage.isPresent).to.be.true;
  });

  it('implementationStatus select is available', () => {
    expect(editSourcePage.implementationStatusSelect.value).to.be.equal('active');
  });

  describe('implementationStatus "Negotiation" can be selected', () => {
    beforeEach(async () => {
      await editSourcePage.implementationStatusSelect.select('Negotiation');
    });

    it('implementationStatus is changed to "Negotiation"', () => {
      expect(editSourcePage.implementationStatusSelect.value).to.be.equal('negotiation');
    });
  });

  describe('implementationStatus can be changed', () => {
    beforeEach(async () => {
      await editSourcePage.implementationStatusSelect.select('Negotiation');
      await editSourcePage.implementationStatusSelect.select('Wish');
    });

    it('implementationStatus is changed to "Wish"', () => {
      expect(editSourcePage.implementationStatusSelect.value).to.be.equal('wish');
    });
  });

  describe('close source form', () => {
    beforeEach(async function () {
      await editSourcePage.closePaneBtn.click();
    });

    it('sources list should be visible and edit source form should be closed', () => {
      expect(editSourcePage.isPresent).to.be.false;
      expect(sourcesList.isPresent).to.be.true;
    });
  });

  describe('change and save source edit form', () => {
    const TEST_NAME = 'Source test name';

    beforeEach(async function () {
      await editSourcePage.sourceName.fill(TEST_NAME);
      await editSourcePage.implementationStatusSelect.select('Wish');
      await editSourcePage.updateSourceBtn.click();
    });

    it('source form is still presented, since validation errors', () => {
      expect(editSourcePage.isPresent).to.be.true;
    });
  });

  describe('change, close pane and cancel changes', () => {
    beforeEach(async function () {
      await editSourcePage.implementationStatusSelect.select('Active');
      await editSourcePage.closePaneBtn.click();
      await editSourcePage.closeWithoutSaving.click();
    });

    it('source form should be closed', () => {
      expect(editSourcePage.isPresent).to.be.false;
    });
  });
});
