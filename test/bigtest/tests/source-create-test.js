import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import SourcesList from '../interactors/sources-list';
import EditSourcePage from '../interactors/source-edit-page';

import setupApplication from '../helpers/setup-application';

describe('Create Source', () => {
  setupApplication();
  const sourcesList = new SourcesList();
  const editSourcePage = new EditSourcePage();

  beforeEach(function () {
    return this.visit('/finc-config/metadata-sources/create?filters=status.Active', () => {
      expect(sourcesList.$root).to.exist;
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

  describe('implementationStatus can be changed', () => {
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
      await editSourcePage.closePaneBtn.click();
    });

    it('closes source form', () => {
      expect(editSourcePage.isPresent).to.be.false;
      expect(sourcesList.isPresent).to.be.true;
    });
  });
});
