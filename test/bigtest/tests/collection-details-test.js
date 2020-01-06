import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CollectionDetailsPage from '../interactors/collection-details-page';
import CollectionsList from '../interactors/collections-list';

describe('CollectionDetailsPage', () => {
  setupApplication();
  const collectionDetailsPage = new CollectionDetailsPage();
  const collectionsList = new CollectionsList();

  let collection = null;

  beforeEach(async function () {
    collection = this.server.create('finc-config-metadata-collection');
    await this.visit('/finc-config/metadata-collections?filters=metadataAvailable.Yes');
  });

  it('shows the list of collection items', () => {
    expect(collectionsList.isVisible).to.equal(true);
  });

  it('renders each collection-instance', () => {
    expect(collectionsList.instances().length).to.be.gte(1);
  });

  describe('clicking on the first collection', function () {
    beforeEach(async function () {
      await collectionsList.instances(0).click();
    });

    it('collection details should be visible', function () {
      expect(collectionDetailsPage.isVisible).to.equal(true);
    });

    it('displays collection label in the pane header', function () {
      expect(collectionDetailsPage.collectionTitle).to.include(collection.label);
    });

    // it('edit button is present', () => {
    //   expect(collectionDetailsPage.editButtonPresent).to.be.true;
    // });

    it('all accordions in collection-instance are present', function () {
      expect(collectionDetailsPage.managementAccordion.isPresent).to.equal(true);
      expect(collectionDetailsPage.technicalAccordion.isPresent).to.equal(true);
    });
  });

  describe('close collection details pane', () => {
    beforeEach(async function () {
      await collectionDetailsPage.closePaneBtn.click();
    });

    it('collection details should not be visible', () => {
      expect(collectionDetailsPage.isPresent).to.be.false;
    });
  });
});
