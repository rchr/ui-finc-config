import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/react';

import '../../../../test/jest/__mock__';
import renderWithIntl from '../../../../test/jest/helpers';
import CollectionInfoView from './CollectionInfoView';
import COLLECTION from '../../../../test/fixtures/metadatacollection';

const renderCollectionView = (metadataCollection = COLLECTION) => (
  renderWithIntl(
    <Router>
      <CollectionInfoView id="collectionInfo" metadataCollection={metadataCollection} />
    </Router>
  )
);

describe('CollectionInfoView', () => {
  it('should display name', () => {
    renderCollectionView(COLLECTION);
    expect(screen.getByText('21st Century Political Science Association')).toBeInTheDocument();
  });
  it('should display description', () => {
    renderCollectionView(COLLECTION);
    expect(screen.getByText('This is a test metadata collection 2')).toBeInTheDocument();
  });
  it('should display metadata source', () => {
    renderCollectionView(COLLECTION);
    expect(screen.getByText('Early Music Online')).toBeInTheDocument();
  });
});
