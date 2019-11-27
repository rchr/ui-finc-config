import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import SourceInteractor from '../interactors/source';
import EditSourcePage from '../interactors/source-edit-page';

import setupApplication from '../helpers/setup-application';

describe('Create Source', () => {
  setupApplication();
  const sourceInteractor = new SourceInteractor();
  const editSourcePage = new EditSourcePage();

  beforeEach(function () {
    return this.visit('/finc-config/metadata-sources/create?filters=status.Active', () => {
      expect(sourceInteractor.$root).to.exist;
    });
  });

  it('implementationStatus select is available', () => {
    expect(editSourcePage.implementationStatusSelect.value).to.be.equal('');
  });

  describe('implementationStatus can be selected', () => {
    beforeEach(async () => {
      await editSourcePage.implementationStatusSelect.select('Active');
    });

    it('implementationStatus is changed to "active"', () => {
      expect(editSourcePage.implementationStatusSelect.value).to.be.equal('active');
    });
  });

  describe('implementationStatus can be changed to wish', () => {
    beforeEach(async () => {
      await editSourcePage.implementationStatusSelect.select('Active');
      await editSourcePage.implementationStatusSelect.select('Wish');
    });

    it('implementationStatus is changed to wish', () => {
      expect(editSourcePage.implementationStatusSelect.value).to.be.equal('wish');
    });
  });

  describe('close source form', () => {
    beforeEach(async function () {
      await editSourcePage.closePane.click();
    });

    it('closes source form', () => {
      expect(editSourcePage.isPresent).to.be.false;
      expect(sourceInteractor.isPresent).to.be.true;
    });
  });
});
