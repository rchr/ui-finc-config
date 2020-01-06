import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import SourcesList from '../interactors/sources-list';
import EditSourcePage from '../interactors/source-edit-page';
import SourceDetailsPage from '../interactors/source-details-page';

import setupApplication from '../helpers/setup-application';

describe('Create Source', () => {
  setupApplication();
  const sourcesList = new SourcesList();
  const sourceDetailsPage = new SourceDetailsPage();
  const editSourcePage = new EditSourcePage();

  beforeEach(async function () {
    this.visit('/finc-config/metadata-sources?filters=status.Active');
    await sourcesList.whenLoaded();
  });

  it('shows sources list', () => {
    expect(sourcesList.isPresent).to.be.true;
  });

  describe('click on add new source button', () => {
    beforeEach(async function () {
      await sourcesList.addNewSourceBtn.click();
    });

    it('add new source modal should be visible', () => {
      expect(editSourcePage.isPresent).to.be.true;
    });

    // TODO:
    // describe('update create collection form', () => {
    //   const TEST_NAME = 'Source test name';
    //   const TEST_STATUS = 'Active';

    //   beforeEach(async function () {
    //     await editSourcePage.sourceName.fill(TEST_NAME);
    //     await editSourcePage.implementationStatusSelect.select(TEST_STATUS);
    //     await editSourcePage.createSourceBtn.click();
    //   });

    //   it('source details view should be open and create source form should be closed', () => {
    //     expect(sourceDetailsPage.isPresent).to.be.true;
    //     expect(editSourcePage.isPresent).to.be.false;
    //   });
    // });

    describe('click cancel in create new source form', () => {
      beforeEach(async function () {
        await editSourcePage.closeEditPaneBtn.click();
      });

      it('source edit form should be closed', () => {
        expect(editSourcePage.isPresent).to.be.false;
      });
    });
  });
});
