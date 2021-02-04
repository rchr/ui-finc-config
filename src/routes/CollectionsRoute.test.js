import { noop } from 'lodash';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import '@folio/stripes-erm-components/test/jest/__mock__';
// import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';

import renderWithIntl from '../../test/jest/helpers/renderWithIntl';
import translationsProperties from '../../test/jest/helpers';
import collections from '../../test/fixtures/metadatacollections';
import CollectionsRoute from './CollectionsRoute';

// jest.mock('@folio/stripes-erm-components', () => ({
//   ...jest.requireActual('@folio/stripes-erm-components'),
//   InternalContactSelection: () => <div>InternalContactSelection</div>,
// }));

// jest.mock('@folio/stripes-components', () => ({
//   ...jest.requireActual('@folio/stripes-components'),
//   Selection: () => <div>Selection</div>,
// }));

const routeProps = {
  history: {
    push: () => jest.fn()
  },
  match: {
    params: {
      id: '9a2427cd-4110-4bd9-b6f9-e3475631bbac',
    },
  },
  location: {},
  mutator: {
    query: { update: noop },
  },
  resources: { collections }
};

describe('CollectionsRoute', () => {
  describe('rendering the route with permissions', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <CollectionsRoute {...routeProps} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the collections component', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('collections')).toBeInTheDocument();
    });
  });

  describe('rendering with no permissions', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <CollectionsRoute
            {...routeProps}
            stripes={{ hasPerm: () => false }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('displays the permission error', () => {
      const { getByText } = renderComponent;
      expect(getByText('Permission error')).toBeInTheDocument();
    });
  });
});
