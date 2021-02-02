import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { noop } from 'lodash';
import { screen } from '@testing-library/react';

import { StripesContext } from '@folio/stripes-core/src/StripesContext';
// import {
//   Layer,
//   Paneset,
//   MultiColumnList,
// } from '@folio/stripes/components';

// import {
//   SearchAndSortQuery,
// } from '@folio/stripes/smart-components';

import '../../../test/jest/__mock__';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import metadatacollections from '../../../test/fixtures/metadatacollections';
import mdSources from '../../../test/fixtures/tinyMetadataSources';
import DataContext from '../../contexts/DataContext';
import MetadataCollections from './MetadataCollections';

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

const tinySources = { mdSources };

const myTestView = () => (
  renderWithIntl(
    <Router>
      <StripesContext.Provider value={stripes}>
        <DataContext.Provider value={{
          filterData: tinySources,
          contentData: metadatacollections
        }}
        >
          <MetadataCollections
            contentData={metadatacollections}
            filterData={tinySources}
            queryGetter={jest.fn()}
          />
          {/* <SearchAndSortQuery contentData={metadatacollections} /> */}
          {/* </MetadataCollections> */}
        </DataContext.Provider>
      </StripesContext.Provider>
    </Router>,
    translationsProperties
  )
);

describe('Collections SASQ View', () => {
  let renderCollectionsViewResult;
  beforeEach(() => {
    renderCollectionsViewResult = myTestView(metadatacollections, tinySources, noop);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('pane collectionresults should be visible', () => {
    expect(document.querySelector('#pane-collectionresults-content')).toBeInTheDocument();
  });

  describe('check the collection filter elements', () => {
    it('mdSource filter should be present', () => {
      expect(document.querySelector('#filter-accordion-mdSource')).toBeInTheDocument();
    });

    it('metadataAvailable filter should be present', () => {
      expect(document.querySelector('#filter-accordion-metadataAvailable')).toBeInTheDocument();
    });

    it('usageRestricted filter should be present', () => {
      expect(document.querySelector('#filter-accordion-usageRestricted')).toBeInTheDocument();
    });

    it('freeContent filter should be present', () => {
      expect(document.querySelector('#filter-accordion-freeContent')).toBeInTheDocument();
    });

    it('reset all button should be present', () => {
      expect(document.querySelector('#clickable-reset-all')).toBeInTheDocument();
    });

    it('submit button should be present', () => {
      expect(document.querySelector('#collectionSubmitSearch')).toBeInTheDocument();
    });

    it('search field should be present', () => {
      expect(document.querySelector('#collectionSearchField')).toBeInTheDocument();
    });
  });

  // TODO: list of results will not rendered yet
  // it('should have proper list results size', () => {
  //   myTestView(metadatacollections, tinySources, noop, noop);
  //   // '#list-collections > [role=row]'
  //   // expect(document.querySelectorAll('#pane-collectionresults-content .mclRowContainer > [role=row]').length).toEqual(2);
  //   expect(screen.getAllByRole('row').length).toEqual(2);
  // });
});
