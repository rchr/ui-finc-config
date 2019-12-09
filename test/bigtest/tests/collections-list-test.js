import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CollectionInteractor from '../interactors/collection';

const COLLECTION_COUNT = 25;

describe('Metadata Collection', () => {
  setupApplication();

  const collectionInteractor = new CollectionInteractor();

  beforeEach(async function () {
    this.server.createList('finc-config-metadata-collection', COLLECTION_COUNT);
    this.visit('/finc-config/metadata-collections?filters=metadataAvailable.Yes');
    await collectionInteractor.whenLoaded();

    // click checkbox not working always
    // await collectionInteractor.clickMetadataAvailableCOLLECTIONsCheckbox();
  });

  it('shows the list of collection items', () => {
    expect(collectionInteractor.isVisible).to.equal(true);
  });

  it('renders each collection-instance', () => {
    expect(collectionInteractor.instances().length).to.be.equal(COLLECTION_COUNT);
  });

  describe('check the collection filter elements', function () {
    it('metadataAvailable filter should be present', () => {
      expect(collectionInteractor.metadataAvailableFilterIsPresent).to.be.true;
    });

    it('usageRestricted filter should be present', () => {
      expect(collectionInteractor.usageRestrictedFilterIsPresent).to.be.true;
    });

    it('freeContent filter should be present', () => {
      expect(collectionInteractor.freeContentFilterIsPresent).to.be.true;
    });

    it('reset all button should be present', () => {
      expect(collectionInteractor.resetAllBtnIsPresent).to.be.true;
    });

    it('submit button should be present', () => {
      expect(collectionInteractor.submitBtnIsPresent).to.be.true;
    });

    it('search field should be present', () => {
      expect(collectionInteractor.searchFieldIsPresent).to.be.true;
    });
  });
});
