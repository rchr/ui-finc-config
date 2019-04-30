import { beforeEach, describe, it } from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SourceInteractor from '../interactors/source';

describe('Metadata Source', () => {
  setupApplication();

  const source = new SourceInteractor();

  beforeEach(async function () {
    this.server.createList('metadatasource', 25);
    this.visit('/fincconfig/metadatasources?filters=status.Active');

    await source.clickActiveSOURCEsCheckbox();
  });

  it('shows the list of source items', () => {
    expect(source.isVisible).to.equal(true);
  });

  // it('renders each instance', () => {
  //   expect(source.instances().length).to.be.gte(1);
  // });

  // describe('clicking on the first item', function () {
  //   beforeEach(async function () {
  //     await source.instances(0).click();
  //   });

  //   it('loads the instance details', function () {
  //     expect(source.instance.isVisible).to.equal(true);
  //   });
  // });
});
