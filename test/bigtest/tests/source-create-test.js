import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SourcesList from '../interactors/sources-list';
import EditSourcePage from '../interactors/source-edit-page';
import SourceDetailsPage from '../interactors/source-details-page';

describe('Create Source', () => {
  setupApplication();
  const sourcesList = new SourcesList();
  const sourceDetailsPage = new SourceDetailsPage();
  const editSourcePage = new EditSourcePage();

  beforeEach(async function () {
    this.visit('/finc-config/metadata-sources?filters=status.active');
    await sourcesList.whenLoaded();
    await sourcesList.addNewSourceBtn.click();
    await editSourcePage.whenLoaded();
  });

  it('source edit form should be open', () => {
    expect(editSourcePage.isPresent).to.be.true;
  });

  describe('edit, try save and close source edit form', () => {
    const TEST_NAME = 'Source test name';
    const TEST_STATUS = 'Active';
    const TEST_SOURCEID = 1;

    beforeEach(async function () {
      await editSourcePage.sourceName.fill(TEST_NAME);
      await editSourcePage.implementationStatusSelect.select(TEST_STATUS);
      await editSourcePage.saveSourceBtn.click();

      it('source form is still presented, since validation errors', () => {
        expect(editSourcePage.isPresent).to.be.true;

        describe('fill all required fields and save', () => {
          beforeEach(async function () {
            await editSourcePage.sourceID.fill(TEST_SOURCEID);
            await editSourcePage.saveSourceBtn.click();
          });

          it('source edit form should be closed and source details should be open', () => {
            expect(editSourcePage.isPresent).to.be.false;
            expect(sourceDetailsPage.isPresent).to.be.true;
          });
        });
      });
    });

    describe('click cancel in create new source form', () => {
      beforeEach(async function () {
        await editSourcePage.closeEditPaneBtn.click();
        await editSourcePage.closeWithoutSaving.click();
      });

      it('source edit form should be closed', () => {
        expect(editSourcePage.isPresent).to.be.false;
      });
    });
  });
});
