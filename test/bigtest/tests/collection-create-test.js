import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditCollectionPage from '../interactors/collection-edit-page';
import CollectionDetailsPage from '../interactors/collection-details-page';
import CollectionsList from '../interactors/collections-list';


describe('Create Collection', () => {
  setupApplication();
  const collectionsList = new CollectionsList();
  const collectionDetailsPage = new CollectionDetailsPage();
  const editCollectionPage = new EditCollectionPage();

  beforeEach(async function () {
    this.visit('/finc-config/metadata-collections?filters=metadataAvailable.yes');
    await collectionsList.whenLoaded();
  });

  it('shows collections list', () => {
    expect(collectionsList.isPresent).to.be.true;
  });

  describe('click on add new collection button', () => {
    beforeEach(async function () {
      await collectionsList.addNewCollectionBtn.click();
    });

    it('add new collection modal should be visible', () => {
      expect(editCollectionPage.isPresent).to.be.true;
    });

    // TODO:
    // describe('update create collection form', () => {
    //   const TEST_NAME = 'Collection test name';
    //   const TEST_USAGE_RESTRICTED = 'Yes';

    //   beforeEach(async function () {
    //     // await editCollectionPage.collectionName.fill(TEST_NAME);
    //     await editCollectionPage.usageRestrictedSelect.select(TEST_USAGE_RESTRICTED);
    //     await editCollectionPage.createNewCollectionBtn.click();
    //   });

    //   it('collection details view should be open and create collection form should be closed', () => {
    //     expect(collectionDetailsPage.isPresent).to.be.true;
    //     expect(editCollectionPage.isPresent).to.be.false;
    //   });
    // });


    describe('click cancel in create new collection form', () => {
      beforeEach(async function () {
        await editCollectionPage.closeEditPaneBtn.click();
      });

      it('collection edit form should be closed', () => {
        expect(editCollectionPage.isPresent).to.be.false;
      });
    });
  });
});
