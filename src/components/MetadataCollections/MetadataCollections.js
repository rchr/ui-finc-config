import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
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
  ButtonGroup,
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

class MetadataCollections extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    collection: PropTypes.object,
    contentData: PropTypes.arrayOf(PropTypes.object),
    disableRecordCreation: PropTypes.bool,
    intl: intlShape.isRequired,
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
      <IfPermission perm="ui-licenses.licenses.edit">
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

  render() {
    const { intl, queryGetter, querySetter, onSelectRow, selectedRecordId, collection } = this.props;
    const count = collection ? collection.totalCount() : 0;

    return (
      <div data-test-collection-instances>
        <SearchAndSortQuery
          initialFilterState={{ metadataAvailable: ['yes'] }}
          initialSearchState={{ query: '' }}
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
              resetAll,
              searchChanged,
              searchValue,
            }) => {
              const disableReset = () => (!filterChanged && !searchChanged);

              return (
                <Paneset>
                  {this.state.filterPaneIsVisible &&
                    <Pane
                      defaultWidth="18%"
                      onClose={this.toggleFilterPane}
                      paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                    >
                      <form onSubmit={onSubmitSearch}>
                        <ButtonGroup tagName="nav" fullWidth>
                          <Button
                            buttonStyle="default"
                            id="metadata-sources"
                            to={urls.sources()}
                          >
                            Sources
                          </Button>
                          <Button
                            buttonStyle="primary"
                            id="metadata-collections"
                          >
                            Collections
                          </Button>
                        </ButtonGroup>
                        <div>
                          <SearchField
                            autoFocus
                            inputRef={this.searchField}
                            name="query"
                            onChange={getSearchHandlers().query}
                            onClear={getSearchHandlers().reset}
                            value={searchValue.query}
                          />
                          <Button
                            buttonStyle="primary"
                            disabled={!searchValue.query || searchValue.query === ''}
                            fullWidth
                            type="submit"
                          >
                            <FormattedMessage id="stripes-smart-components.search" />
                          </Button>
                        </div>
                        <Button
                          buttonStyle="none"
                          disabled={disableReset()}
                          id="clickable-reset-all"
                          onClick={resetAll}
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
                    defaultWidth="fill"
                    firstMenu={this.renderResultsFirstMenu(activeFilters)}
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
                      onRowClick={onSelectRow}
                      rowFormatter={this.rowFormatter}
                      // selectedRow={this.state.selectedItem}
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

export default injectIntl(MetadataCollections);
