import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CollectionsList from '../interactors/collections-list';

const COLLECTION_COUNT = 25;

describe('Collections List', () => {
  setupApplication();

  const collectionsList = new CollectionsList();

  beforeEach(async function () {
    this.server.createList('finc-config-metadata-collection', COLLECTION_COUNT);
    this.visit('/finc-config/metadata-collections?filters=metadataAvailable.Yes');
    await collectionsList.whenLoaded();
  });

  it('shows the list of collection items', () => {
    expect(collectionsList.isVisible).to.equal(true);
  });

  it('renders each collection-instance', () => {
    expect(collectionsList.instances().length).to.be.equal(COLLECTION_COUNT);
  });

  describe('check the collection filter elements', function () {
    it('metadataAvailable filter should be present', () => {
      expect(collectionsList.metadataAvailableFilterIsPresent).to.be.true;
    });

    it('usageRestricted filter should be present', () => {
      expect(collectionsList.usageRestrictedFilterIsPresent).to.be.true;
    });

    it('freeContent filter should be present', () => {
      expect(collectionsList.freeContentFilterIsPresent).to.be.true;
    });

    it('reset all button should be present', () => {
      expect(collectionsList.resetAllBtnIsPresent).to.be.true;
    });

    it('submit button should be present', () => {
      expect(collectionsList.submitBtnIsPresent).to.be.true;
    });

    it('search field should be present', () => {
      expect(collectionsList.searchFieldIsPresent).to.be.true;
    });
  });
});
