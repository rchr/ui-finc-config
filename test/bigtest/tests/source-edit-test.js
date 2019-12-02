import {
  beforeEach,
  describe,
  it
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import EditSourcePage from '../interactors/source-edit-page';
import SourceInteractor from '../interactors/source';

describe('Edit Source', () => {
  setupApplication();
  const sourceInteractor = new SourceInteractor();
  const sourceEditPage = new EditSourcePage();

  let source = null;

  beforeEach(async function () {
    source = this.server.create('finc-config-metadata-source');
    return this.visit('/finc-config/metadata-sources?filters=status.Active', () => {
      expect(sourceInteractor.$root).to.exist;
    });
  });

  describe('source edit form is displayed', () => {
    beforeEach(async function () {
      await this.visit('/finc-config/metadata-sources?filters=status.Active');
      return this.visit(`/finc-config/metadata-sources/${source.id}/edit?filters=status.Active`);
    });

    it('displays Edit source form', () => {
      expect(sourceEditPage.$root).to.exist;
    });

    describe('Confirm delete source is displayed', () => {
      beforeEach(async function () {
        await sourceEditPage.clickDeleteSource();
      });
      it('displays confirm delete source', () => {
        expect(sourceEditPage.deleteSourceConfirmation).to.exist;
      });
    });
  });
});
