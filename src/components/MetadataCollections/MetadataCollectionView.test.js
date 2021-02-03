import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, render } from '@testing-library/react';

import { noop } from 'lodash';

import '../../../test/jest/__mock__';

import { StripesContext } from '@folio/stripes-core/src/StripesContext';
import { ViewMetaData, StripesConnectedSource } from '@folio/stripes/smart-components';

import renderWithIntl from '../../../test/jest/helpers';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import MetadataCollectionView from './MetadataCollectionView';
import COLLECTION from '../../../test/fixtures/metadatacollection';
import mdSources from '../../../test/fixtures/tinyMetadataSources';

const stripes = {
  clone: () => ({ ...stripes }),
  connect: Component => <Component />,
  config: {},
  hasInterface: () => true,
  hasPerm: jest.fn().mockReturnValue(true),
  logger: { log: noop },
  locale: 'en-US',
  okapi: {
    tenant: 'diku',
    url: 'https://folio-testing-okapi.dev.folio.org',
  },
  plugins: {},
  user: {
    perms: {},
    user: {
      id: 'b1add99d-530b-5912-94f3-4091b4d87e2c',
      username: 'diku_admin',
    },
  },
  withOkapi: true,
};

const handler = {
  onClose: jest.fn(),
  onEdit: jest.fn(),
};

const metadata = {
  createdDate: '2020-12-22T14:00:17.823+00:00',
  updatedDate: '2021-01-27T12:18:13.641+00:00',
  updatedByUserId: '01d830e9-3308-56e2-9f94-e9e7bd186307'
};

const connectedViewMetaData = <ViewMetaData metadata={metadata} />;

const collectionView = () => (
  renderWithIntl(
  // render(
    <Router>
      <StripesContext.Provider value={stripes}>
        <MetadataCollectionView
          canEdit
          handlers={handler}
          isLoading={false}
          record={COLLECTION}
          stripes={stripes}
          tinyMetadataSources={mdSources}
          connectedViewMetaData={connectedViewMetaData}
        />
      </StripesContext.Provider>
    </Router>,
    translationsProperties
  )
);

describe('MetadataCollection View', () => {
  let renderCollectionView;
  beforeEach(() => {
    renderCollectionView = collectionView(true, handler, false, COLLECTION, stripes);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

//   it('collection details should be visible', () => {
//     expect(document.querySelector('#root')).toBeInTheDocument();
//     expect(document.querySelector('#pane-collectiondetails')).toBeInTheDocument();
//   });

//   it('should exist CollectionInfoView', () => {
//     expect(document.find('#collectionInfo').exists()).toBeTruthy();
//   });
});
