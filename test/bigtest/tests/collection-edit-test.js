import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditCollectionPage from '../interactors/collection-edit-page';
import CollectionInteractor from '../interactors/collection';

describe('Edit Collection', () => {
  setupApplication();
  const collectionInteractor = new CollectionInteractor();
  const editCollectionPage = new EditCollectionPage();

  let collection = null;

  beforeEach(async function () {
    collection = this.server.create('finc-config-metadata-collection');
    return this.visit('/finc-config/metadata-collections?filters=metadataAvailable.yes', () => {
      expect(collectionInteractor.$root).to.exist;
    });
  });

  describe('collection edit form is displayed', () => {
    beforeEach(async function () {
      await this.visit('/finc-config/metadata-collections?filters=metadataAvailable.yes');
      return this.visit(`/finc-config/metadata-collections/${collection.id}/edit?filters=metadataAvailable.yes`);
    });

    it('displays Edit collection form', () => {
      expect(editCollectionPage.$root).to.exist;
    });

    describe('Confirm delete collection is displayed', () => {
      beforeEach(async function () {
        await editCollectionPage.clickDeleteCollection();
      });
      it('displays confirm delete collection', () => {
        expect(editCollectionPage.deleteCollectionConfirmation).to.exist;
      });
    });
  });
});
