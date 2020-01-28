import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import {
  FormattedMessage,
  injectIntl,
  intlShape
} from 'react-intl';

import {
  SearchAndSortQuery,
  SearchAndSortSearchButton as FilterPaneToggle,
} from '@folio/stripes/smart-components';
import {
  Button,
  Icon,
  MultiColumnList,
  Pane,
  PaneMenu,
  Paneset,
  SearchField,
} from '@folio/stripes/components';
import {
  AppIcon,
  IfPermission
} from '@folio/stripes/core';

import urls from '../DisplayUtils/urls';
import CollectionFilters from './CollectionFilters';
import FincNavigation from '../Navigation/FincNavigation';

const defaultFilter = { state: { metadataAvailable: ['yes'] }, string: 'metadataAvailable.yes' };
const defaultSearchString = { query: '' };

class MetadataCollections extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    collection: PropTypes.object,
    contentData: PropTypes.arrayOf(PropTypes.object),
    disableRecordCreation: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
    onNeedMoreData: PropTypes.func,
    onSelectRow: PropTypes.func,
    packageInfo: PropTypes.shape({ // values pulled from the provider's package.json config object
      initialFilters: PropTypes.string, // default filters
      moduleName: PropTypes.string, // machine-readable, for HTML ids and translation keys
      stripes: PropTypes.shape({
        route: PropTypes.string, // base route; used to construct URLs
      }).isRequired,
    }),
    queryGetter: PropTypes.func,
    querySetter: PropTypes.func,
    searchString: PropTypes.string,
    selectedRecordId: PropTypes.string,
  };

  static defaultProps = {
    contentData: {},
    searchString: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      filterPaneIsVisible: true,
      storedFilter: localStorage.getItem('fincConfigCollectionFilters') ? JSON.parse(localStorage.getItem('fincConfigCollectionFilters')) : defaultFilter,
      storedSearchString: localStorage.getItem('fincConfigCollectionSearchString') ? JSON.parse(localStorage.getItem('fincConfigCollectionSearchString')) : defaultSearchString,
    };
  }

  getArrayElementsCommaSeparated = (array) => {
    let formatted = '';

    if (array && array.length) {
      for (let i = 0; i < array.length; i += 1) {
        formatted += (i > 0 ? '; ' : '') + array[i];
      }
    }
    return formatted;
  }

  resultsFormatter = {
    label: collection => collection.label,
    mdSource: collection => _.get(collection, 'mdSource.name', '-'),
    metadataAvailable: collection => collection.metadataAvailable,
    usageRestricted: collection => collection.usageRestricted,
    permittedFor: collection => this.getArrayElementsCommaSeparated(collection.permittedFor),
    freeContent: collection => collection.freeContent,
  };

  rowFormatter = (row) => {
    const { rowClass, rowData, rowIndex, rowProps = {}, cells } = row;
    let RowComponent;

    if (this.props.onSelectRow) {
      RowComponent = 'div';
    } else {
      RowComponent = Link;
      rowProps.to = this.rowURL(rowData.id);
    }

    return (
      <RowComponent
        aria-rowindex={rowIndex + 2}
        className={rowClass}
        data-label={[
          rowData.name,
        ]}
        key={`row-${rowIndex}`}
        role="row"
        {...rowProps}
      >
        {cells}
      </RowComponent>
    );
  }

  // generate url for record-details
  rowURL = (id) => {
    return `${urls.collectionView(id)}${this.props.searchString}`;
  }

  // fade in/out of filter-pane
  toggleFilterPane = () => {
    this.setState(curState => ({
      filterPaneIsVisible: !curState.filterPaneIsVisible,
    }));
  }

  // fade in / out the filter menu
  renderResultsFirstMenu = (filters) => {
    const { filterPaneIsVisible } = this.state;
    const filterCount = filters.string !== '' ? filters.string.split(',').length : 0;
    const hideOrShowMessageId = filterPaneIsVisible ?
      'stripes-smart-components.hideSearchPane' : 'stripes-smart-components.showSearchPane';

    return (
      <PaneMenu>
        <FormattedMessage id="stripes-smart-components.numberOfFilters" values={{ count: filterCount }}>
          {appliedFiltersMessage => (
            <FormattedMessage id={hideOrShowMessageId}>
              {hideOrShowMessage => (
                <FilterPaneToggle
                  aria-label={`${hideOrShowMessage}...${appliedFiltersMessage}`}
                  onClick={this.toggleFilterPane}
                  visible={filterPaneIsVisible}
                />
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  // counting records of result list
  renderResultsPaneSubtitle = (collection) => {
    if (collection) {
      const count = collection ? collection.totalCount() : 0;
      return <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count }} />;
    }

    return <FormattedMessage id="stripes-smart-components.searchCriteria" />;
  }

  // button for creating a new record
  renderResultsLastMenu() {
    if (this.props.disableRecordCreation) {
      return null;
    }

    return (
      <IfPermission perm="finc-config.metadata-collections.item.post">
        <PaneMenu>
          <FormattedMessage id="ui-finc-config.collection.form.createCollection">
            {ariaLabel => (
              <Button
                aria-label={ariaLabel}
                buttonStyle="primary"
                id="clickable-new-collection"
                marginBottom0
                to={`${urls.collectionCreate()}${this.props.searchString}`}
              >
                <FormattedMessage id="stripes-smart-components.new" />
              </Button>
            )}
          </FormattedMessage>
        </PaneMenu>
      </IfPermission>
    );
  }

  renderNavigation = (id) => (
    <FincNavigation
      id={id}
    />
  );

  cacheFilter(activeFilters, searchValue) {
    localStorage.setItem('fincConfigCollectionFilters', JSON.stringify(activeFilters));
    localStorage.setItem('fincConfigCollectionSearchString', JSON.stringify(searchValue));
  }

  resetAll(getFilterHandlers, getSearchHandlers) {
    localStorage.removeItem('fincConfigCollectionFilters');
    localStorage.removeItem('fincConfigCollectionSearchString');

    // reset the filter state to default filters
    getFilterHandlers.state(defaultFilter.state);

    // reset the search query
    getSearchHandlers.state(defaultSearchString);

    this.setState({
      storedFilter: defaultFilter,
      storedSearchString: defaultSearchString,
    });

    return (this.props.history.push(`${urls.collections()}?filters=${defaultFilter.string}`));
  }

  // function is handling click on delete Search-buttton
  handleClearSearch(getSearchHandlers, onSubmitSearch, searchValue) {
    localStorage.removeItem('fincConfigCollectionSearchString');
    localStorage.removeItem('fincConfigCollectionSearchIndex');

    searchValue.query = '';

    getSearchHandlers.state({
      query: '',
    });

    return onSubmitSearch;
  }

  getDisableReset(activeFilters, searchValue) {
    if (_.isEqual(activeFilters.state, defaultFilter.state) && searchValue.query === defaultSearchString.query) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { intl, queryGetter, querySetter, onNeedMoreData, onSelectRow, selectedRecordId, collection } = this.props;
    const count = collection ? collection.totalCount() : 0;

    return (
      <div data-test-collections>
        <SearchAndSortQuery
          initialFilterState={this.state.storedFilter.state}
          initialSearchState={this.state.storedSearchString}
          initialSortState={{ sort: 'label' }}
          queryGetter={queryGetter}
          querySetter={querySetter}
        >
          {
            ({
              activeFilters,
              filterChanged,
              getFilterHandlers,
              getSearchHandlers,
              onSort,
              onSubmitSearch,
              searchChanged,
              searchValue,
            }) => {
              const disableReset = this.getDisableReset(activeFilters, searchValue);
              const disableSearch = () => (searchValue.query === defaultSearchString.query);
              if (filterChanged || searchChanged) {
                this.cacheFilter(activeFilters, searchValue);
              }

              return (
                <Paneset>
                  {this.state.filterPaneIsVisible &&
                    <Pane
                      data-test-collection-pane-filter
                      defaultWidth="18%"
                      id="pane-collectionfilter"
                      onClose={this.toggleFilterPane}
                      paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                    >
                      <form onSubmit={onSubmitSearch}>
                        {this.renderNavigation('collection')}
                        <div>
                          <SearchField
                            autoFocus
                            id="collectionSearchField"
                            inputRef={this.searchField}
                            name="query"
                            onChange={getSearchHandlers().query}
                            onClear={() => this.handleClearSearch(getSearchHandlers(), onSubmitSearch(), searchValue)}
                            value={searchValue.query}
                          />
                          <Button
                            buttonStyle="primary"
                            disabled={disableSearch()}
                            fullWidth
                            id="collectionSubmitSearch"
                            type="submit"
                          >
                            <FormattedMessage id="stripes-smart-components.search" />
                          </Button>
                        </div>
                        <Button
                          buttonStyle="none"
                          disabled={disableReset}
                          id="clickable-reset-all"
                          onClick={() => this.resetAll(getFilterHandlers(), getSearchHandlers())}
                        >
                          <Icon icon="times-circle-solid">
                            <FormattedMessage id="stripes-smart-components.resetAll" />
                          </Icon>
                        </Button>
                        <CollectionFilters
                          activeFilters={activeFilters.state}
                          filterHandlers={getFilterHandlers()}
                        />
                      </form>
                    </Pane>
                  }
                  <Pane
                    appIcon={<AppIcon app="finc-config" />}
                    data-test-collection-pane-results
                    defaultWidth="fill"
                    firstMenu={this.renderResultsFirstMenu(activeFilters)}
                    id="pane-collectionresults"
                    lastMenu={this.renderResultsLastMenu()}
                    padContent={false}
                    paneTitle="Finc Config"
                    paneSub={this.renderResultsPaneSubtitle(collection)}
                  >
                    <MultiColumnList
                      autosize
                      columnMapping={{
                        label: intl.formatMessage({ id: 'ui-finc-config.collection.label' }),
                        mdSource: intl.formatMessage({ id: 'ui-finc-config.collection.mdSource' }),
                        metadataAvailable: intl.formatMessage({ id: 'ui-finc-config.collection.metadataAvailable' }),
                        usageRestricted: intl.formatMessage({ id: 'ui-finc-config.collection.usageRestricted' }),
                        permittedFor: intl.formatMessage({ id: 'ui-finc-config.collection.permittedFor' }),
                        freeContent: intl.formatMessage({ id: 'ui-finc-config.collection.freeContent' })
                      }}
                      contentData={this.props.contentData}
                      formatter={this.resultsFormatter}
                      id="list-collections"
                      isEmptyMessage="no results"
                      isSelected={({ item }) => item.id === selectedRecordId}
                      onHeaderClick={onSort}
                      onNeedMoreData={onNeedMoreData}
                      onRowClick={onSelectRow}
                      rowFormatter={this.rowFormatter}
                      totalCount={count}
                      virtualize
                      visibleColumns={['label', 'mdSource', 'metadataAvailable', 'usageRestricted', 'permittedFor', 'freeContent']}
                    />
                  </Pane>
                  {this.props.children}
                </Paneset>
              );
            }
          }
        </SearchAndSortQuery>
      </div>
    );
  }
}

export default withRouter(injectIntl(MetadataCollections));
