import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditCollectionPage from '../interactors/collection-edit-page';
// import CollectionDetailsPage from '../interactors/collection-details-page';
import CollectionsList from '../interactors/collections-list';


describe('Create Collection', () => {
  setupApplication();
  const collectionsList = new CollectionsList();
  // const collectionDetailsPage = new CollectionDetailsPage();
  const editCollectionPage = new EditCollectionPage();

  beforeEach(async function () {
    this.visit('/finc-config/metadata-collections?filters=metadataAvailable.yes');
    await collectionsList.whenLoaded();
    await collectionsList.addNewCollectionBtn.click();
    await editCollectionPage.whenLoaded();
  });

  it('collection edit form should be open', () => {
    expect(editCollectionPage.isPresent).to.be.true;
  });

  describe('edit, try save and close collection edit form', () => {
    const TEST_NAME = 'Collection test name';
    const TEST_USAGE_RESTRICTED = 'Yes';

    beforeEach(async function () {
      await editCollectionPage.collectionInfoAccordion.isLoaded;
      await editCollectionPage.collectionName.fill(TEST_NAME);
      await editCollectionPage.usageRestrictedSelect.select(TEST_USAGE_RESTRICTED);
      await editCollectionPage.createCollectionBtn.click();
    });

    it('collection form is still presented, since validation errors', () => {
      expect(editCollectionPage.isPresent).to.be.true;
    });

    describe('click cancel in create new collection form', () => {
      beforeEach(async function () {
        await editCollectionPage.closeEditPaneBtn.click();
        await editCollectionPage.closeWithoutSaving.click();
      });

      it('collection edit form should be closed', () => {
        expect(editCollectionPage.isPresent).to.be.false;
      });
    });
  });
});
