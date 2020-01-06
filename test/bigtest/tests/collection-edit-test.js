import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditCollectionPage from '../interactors/collection-edit-page';
import CollectionsList from '../interactors/collections-list';
import CollectionsDetailsPage from '../interactors/collection-details-page';

describe('Edit Collection', () => {
  setupApplication();
  const collectionsList = new CollectionsList();
  const collectionDetailsPage = new CollectionsDetailsPage();
  const editCollectionPage = new EditCollectionPage();

  beforeEach(async function () {
    const collection = this.server.create('finc-config-metadata-collection');

    this.visit(`/finc-config/metadata-collections/${collection.id}?filters=metadataAvailable.yes`);
    await collectionsList.whenLoaded();
    await collectionDetailsPage.editCollectionBtn.click();
    await editCollectionPage.whenLoaded();
  });

  it('collection edit form should be open', () => {
    expect(editCollectionPage.isPresent).to.be.true;
  });

  it('usageRestrict select is available', () => {
    expect(editCollectionPage.usageRestrictedSelect.value).to.be.equal('');
  });

  describe('usageRestrict "Yes" can be selected', () => {
    beforeEach(async () => {
      await editCollectionPage.usageRestrictedSelect.select('Yes');
    });

    it('usageRestrict is changed to "Yes"', () => {
      expect(editCollectionPage.usageRestrictedSelect.value).to.be.equal('yes');
    });
  });

  describe('close collection form', () => {
    beforeEach(async function () {
      await editCollectionPage.closePaneBtn.click();
    });

    it('collections list should be visible and edit collection form should be closed', () => {
      expect(editCollectionPage.isPresent).to.be.false;
      expect(collectionsList.isPresent).to.be.true;
    });
  });

  describe('change and save collection edit form', () => {
    beforeEach(async function () {
      await editCollectionPage.usageRestrictedSelect.select('Yes');
      await editCollectionPage.updateCollectionBtn.click();
    });

    it('collection form is still presented, since validation errors', () => {
      expect(editCollectionPage.isPresent).to.be.true;
    });
  });

  describe('change, close pane and cancel changes', () => {
    beforeEach(async function () {
      await editCollectionPage.usageRestrictedSelect.select('Yes');
      await editCollectionPage.closePaneBtn.click();
      await editCollectionPage.closeWithoutSaving.click();
    });

    it('collection form should be closed', () => {
      expect(editCollectionPage.isPresent).to.be.false;
    });
  });
});
