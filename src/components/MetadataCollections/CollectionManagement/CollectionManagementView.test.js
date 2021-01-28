import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/react';

import '../../../../test/jest/__mock__';
import renderWithIntl from '../../../../test/jest/helpers';
import CollectionManagementView from './CollectionManagementView';
import COLLECTION from '../../../../test/fixtures/metadatacollection';

const renderCollectionView = (metadataCollection = COLLECTION) => (
  renderWithIntl(
    <Router>
      <CollectionManagementView id="collectionManagement" metadataCollection={metadataCollection} />
    </Router>
  )
);

describe('CollectionManagementView', () => {
  it('should display LOD note', () => {
    renderCollectionView(COLLECTION);
    expect(screen.getByText('Note for test publication')).toBeInTheDocument();
  });

  it('should display metadata available', () => {
    renderCollectionView(COLLECTION);
    expect(screen.getByText('Metadata available')).toBeInTheDocument();
  });
});
