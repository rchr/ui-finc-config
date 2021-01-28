import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/react';

import '../../../../test/jest/__mock__';
import renderWithIntl from '../../../../test/jest/helpers';
import CollectionInfoView from './CollectionInfoView';
import COLLECTION from '../../../../test/fixtures/metadatacollection';

// const COLLECTION = {
//   id: 'ccdbb4c7-9d58-4b59-96ef-7074c34e901b',
//   label: 'Test collection 1',
//   description: 'desc',
// };

const renderSourceView = (metadataCollection = COLLECTION) => (
  renderWithIntl(
    <Router>
      <CollectionInfoView id="collectionInfo" metadataCollection={metadataCollection} />
    </Router>
  )
);

describe('CollectionInfoView component', () => {
  it('should display description', () => {
    renderSourceView(COLLECTION);
    expect(screen.getByText('This is a test metadata collection 2')).toBeInTheDocument();
  });
  it('should display id', () => {
    renderSourceView(COLLECTION);
    expect(document.querySelector('#collectionInfo')).toBeInTheDocument();
  });
});

