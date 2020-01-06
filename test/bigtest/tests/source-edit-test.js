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
    expect(editSourcePage.implementationStatusSelect.value).to.be.equal('');
  });

  describe('implementationStatus "Active" can be selected', () => {
    beforeEach(async () => {
      await editSourcePage.implementationStatusSelect.select('Active');
    });

    it('implementationStatus is changed to "Active"', () => {
      expect(editSourcePage.implementationStatusSelect.value).to.be.equal('active');
    });
  });

  describe('implementationStatus can be changed', () => {
    beforeEach(async () => {
      await editSourcePage.implementationStatusSelect.select('Active');
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
    beforeEach(async function () {
      await editSourcePage.implementationStatusSelect.select('Active');
      await editSourcePage.updateSourceBtn.click();
    });

    // TODO ERROR Mirage: Your app tried to PUT but there was no route defined to handle this request.
    // it('source form is still presented, since validation errors xxx', () => {
    //   expect(editSourcePage.isPresent).to.be.true;
    // });
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
