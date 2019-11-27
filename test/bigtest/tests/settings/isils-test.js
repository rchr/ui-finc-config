import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import IsilInteractor from '../../interactors/settings/isil';

const ISIL_COUNT = 5;

describe('Setting', () => {
  setupApplication();

  const isilSetting = new IsilInteractor();

  beforeEach(async function () {
    this.server.createList('isil', ISIL_COUNT);

    this.visit('/settings/finc-config/isils');
    await isilSetting.whenLoaded();
  });

  it('render settings', () => {
    expect(isilSetting.isPresent).to.be.true;
  });

  it('shows the list of isil items', () => {
    expect(isilSetting.isVisible).to.equal(true);
  });

  it('renders each isil-instance', () => {
    expect(isilSetting.isils().length).to.be.equal(ISIL_COUNT);
  });

  it('button for create isil exists', () => {
    expect(isilSetting.buttonAddIsil).to.exist;
  });
});
