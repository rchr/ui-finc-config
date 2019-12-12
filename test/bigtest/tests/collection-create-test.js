import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CollectionsList from '../interactors/collections-list';
import EditCollectionPage from '../interactors/collection-edit-page';

describe('Create Collection', () => {
  setupApplication();
  const collectionsList = new CollectionsList();
  const editCollectionPage = new EditCollectionPage();

  beforeEach(function () {
    return this.visit('/finc-config/metadata-collections/create?filters=metadataAvailable.yes', () => {
      expect(collectionsList.$root).to.exist;
    });
  });

  // usageRestricted
  it('usageRestricted select is available', () => {
    expect(editCollectionPage.usageRestrictedSelect.value).to.be.equal('');
  });

  describe('usageRestricted can be selected', () => {
    beforeEach(async () => {
      await editCollectionPage.usageRestrictedSelect.select('Yes');
    });

    it('usageRestricted is changed to "yes"', () => {
      expect(editCollectionPage.usageRestrictedSelect.value).to.be.equal('yes');
    });
  });

  describe('usageRestricted can be changed', () => {
    beforeEach(async () => {
      await editCollectionPage.usageRestrictedSelect.select('Yes');
      await editCollectionPage.usageRestrictedSelect.select('No');
    });

    it('usageRestricted is changed to "no"', () => {
      expect(editCollectionPage.usageRestrictedSelect.value).to.be.equal('no');
    });
  });


  // FreeContentSelect
  it('freeContent select is available', () => {
    expect(editCollectionPage.freeContentSelect.value).to.be.equal('');
  });

  describe('freeContent can be selected', () => {
    beforeEach(async () => {
      await editCollectionPage.freeContentSelect.select('Yes');
    });

    it('freeContent is changed to "yes"', () => {
      expect(editCollectionPage.freeContentSelect.value).to.be.equal('yes');
    });
  });

  describe('freeContent can be changed', () => {
    beforeEach(async () => {
      await editCollectionPage.freeContentSelect.select('Yes');
      await editCollectionPage.freeContentSelect.select('Undetermined');
    });

    it('freeContent is changed to "undetermined"', () => {
      expect(editCollectionPage.freeContentSelect.value).to.be.equal('undetermined');
    });
  });

  describe('close collection form', () => {
    beforeEach(async function () {
      await editCollectionPage.closePaneBtn.click();
    });

    it('closes collection form', () => {
      expect(editCollectionPage.isPresent).to.be.false;
      expect(collectionsList.isPresent).to.be.true;
    });
  });
});
