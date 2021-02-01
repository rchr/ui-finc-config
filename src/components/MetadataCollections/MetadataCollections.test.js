import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { noop } from 'lodash';

import { StripesContext } from '@folio/stripes-core/src/StripesContext';

import '../../../test/jest/__mock__';
import renderWithIntl from '../../../test/jest/helpers/renderWithIntl';
// import translationsProperties from '../../../test/jest/helpers/translationsProperties';
import metadatacollections from '../../../test/fixtures/metadatacollections';
import tinyMetadataSources from '../../../test/fixtures/tinyMetadataSources';
import DataContext from '../../contexts/DataContext';
import MetadataCollections from './MetadataCollections';

const stripesStub = {
  connect: Component => <Component />,
  hasPerm: () => true,
  logger: { log: noop },
  locale: 'en-US',
  plugins: {},
};

// const props = {
//   contentData: metadatacollections,
//   queryGetter: jest.fn(),
// };

const mdSources = { tinyMetadataSources };

const myTestView = () => (
  renderWithIntl(
    <Router>
      <StripesContext.Provider value={stripesStub}>
        <DataContext.Provider value={{
          filterData: mdSources
        }}
        >
          <MetadataCollections
            contentData={metadatacollections}
            // filterData={mdSources}
            queryGetter={jest.fn()}
            map={jest.fn()}
          />
        </DataContext.Provider>
      </StripesContext.Provider>
    </Router>
  )
);

describe('CollectionsRoute', () => {
  it('pane collectionresults should be rendered', () => {
    myTestView(metadatacollections, mdSources, noop, noop);
    expect(document.querySelector('#pane-collectionresults-content')).toBeInTheDocument();
  });

// TODO: list of results will not rendered yet
//   it('should have proper list results size', () => {
//     myTestView(metadatacollections, mdSources, noop, noop);
//     // '#list-collections > [role=row]'
//     // expect(document.querySelectorAll('#pane-collectionresults-content .mclRowContainer > [role=row]').length).toEqual(2);
//     expect(screen.getAllByRole('row').length).toEqual(2);
//   });
});
