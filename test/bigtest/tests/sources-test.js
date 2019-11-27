import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SourceInteractor from '../interactors/source';

const SOURCE_COUNT = 25;

describe('Metadata Source', () => {
  setupApplication();

  const sourceInteractor = new SourceInteractor();

  beforeEach(async function () {
    this.server.createList('finc-config-metadata-source', SOURCE_COUNT);
    this.visit('/finc-config/metadata-sources?filters=status.Active');
    await sourceInteractor.whenLoaded();

    // click checkbox not working always
    // await sourceInteractor.clickActiveSOURCEsCheckbox();
  });

  it('shows the list of source items', () => {
    expect(sourceInteractor.isVisible).to.equal(true);
  });

  it('renders each source-instance', () => {
    expect(sourceInteractor.instances().length).to.be.equal(SOURCE_COUNT);
  });

  describe('clicking on the first source', function () {
    beforeEach(async function () {
      await sourceInteractor.instances(0).click();
    });

    it('loads the source-instance details', function () {
      expect(sourceInteractor.instance.isVisible).to.equal(true);
    });
  });
});
