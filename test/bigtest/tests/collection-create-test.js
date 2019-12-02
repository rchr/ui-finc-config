import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import CollectionInteractor from '../interactors/collection';
import EditCollectionPage from '../interactors/collection-edit-page';

import setupApplication from '../helpers/setup-application';

describe('Create Collection', () => {
  setupApplication();
  const collectionInteractor = new CollectionInteractor();
  const editCollectionPage = new EditCollectionPage();

  beforeEach(function () {
    return this.visit('/finc-config/metadata-collections/create?filters=metadataAvailable.yes', () => {
      expect(collectionInteractor.$root).to.exist;
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
      await editCollectionPage.closePane.click();
    });

    it('closes collection form', () => {
      expect(editCollectionPage.isPresent).to.be.false;
      expect(collectionInteractor.isPresent).to.be.true;
    });
  });
});
