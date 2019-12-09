import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ApplicationInteractor from '../interactors/application';

describe('Application', () => {
  const app = new ApplicationInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/finc-config');
  });

  it('renders', () => {
    expect(app.isPresent).to.be.true;
  });

  it('displays source-tab', () => {
    expect(app.buttonSources).to.exist;
  });

  it('displays collection-tab', () => {
    expect(app.buttonCollection).to.exist;
  });
});
