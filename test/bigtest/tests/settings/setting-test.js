import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingInteractor from '../../interactors/settings/setting';

describe('Setting', () => {
  setupApplication();

  const setting = new SettingInteractor();

  beforeEach(async function () {
    this.server.createList('isil', 5);
    await this.visit('/settings/finc-config/isils');
  });

  it('render settings', () => {
    expect(setting.isPresent).to.be.true;
  });

  it('shows the list of isil items', () => {
    expect(setting.isVisible).to.equal(true);
  });

  it('renders each isil-instance', () => {
    expect(setting.instances().length).to.be.gte(4);
  });

  it('button for create isil exists', () => {
    expect(setting.buttonAddIsil).to.exist;
  });
});
