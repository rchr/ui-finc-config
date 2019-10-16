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
} from '@folio/stripes-core';

import packageInfo from '../../../package';
import urls from '../DisplayUtils/urls';
import MetadataSourceView from './MetadataSourceView';
import MetadataSourceForm from './MetadataSourceForm';
import SourceFilters from './SourceFilters';

const searchableIndexes = [
  { label: 'All', value: '', makeQuery: term => `(label="${term}*" or sourceId="${term}*")` },
  { label: 'Source Name', value: 'label', makeQuery: term => `(label="${term}*")` },
  { label: 'Source ID', value: 'sourceId', makeQuery: term => `(sourceId="${term}*")` }
];

class MetadataSources extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    contentData: PropTypes.object,
    disableRecordCreation: PropTypes.bool,
    intl: intlShape.isRequired,
    mutator: PropTypes.shape({
      metadataSources: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
      query: PropTypes.shape({
        update: PropTypes.func,
      }).isRequired,
    }).isRequired,
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
    source: PropTypes.object,
    // add values for search-selectbox
    onChangeIndex: PropTypes.func,
    selectedIndex: PropTypes.object,
  };

  static defaultProps = {
    contentData: {},
    searchString: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: '',
      filterPaneIsVisible: true,
    };
  }

  closeNewInstance = (e) => {
    if (e) e.preventDefault();
    this.props.mutator.query.update({ layer: null });
  }

  create = (metadataSource) => {
    const { mutator } = this.props;

    mutator.records.POST(metadataSource)
      .then(() => {
        this.closeNewInstance();
      });
  }

  resultsFormatter = {
    label: source => source.label,
    sourceId: source => source.sourceId,
    status: source => source.status,
    solrShard: source => source.solrShard,
    lastProcessed: source => source.lastProcessed,
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
        // data-label={[
        //   rowData.name,
        //   this.formatter.type(rowData),
        //   this.formatter.status(rowData),
        // ].join('...')}
        data-label={[
          rowData.name,
        //   this.formatter.type(rowData),
        //   this.formatter.status(rowData),
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
    return `${urls.sourceView(id)}${this.props.searchString}`;
  }

  // fade in/out of filter-pane
  toggleFilterPane = () => {
    this.setState(curState => ({
      filterPaneIsVisible: !curState.filterPaneIsVisible,
    }));
  }

  // if selecting a row, get record-details
  onSelectRow = (e, meta) => {
    const { onSelectRow } = this.props;

    if (onSelectRow) {
      const shouldFallBackToRegularRecordDisplay = onSelectRow(e, meta);

      if (!shouldFallBackToRegularRecordDisplay) {
        return;
      }
    }

    this.log('action', `clicked ${meta.id}, selected record =`, meta);
    this.setState({ selectedItem: meta });
    this.transitionToParams({ _path: `${packageInfo.stripes.route}/${meta.id}` });
  };

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
                  visible={filterPaneIsVisible}
                  aria-label={`${hideOrShowMessage}...${appliedFiltersMessage}`}
                  onClick={this.toggleFilterPane}
                />
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  // counting records of result list
  renderResultsPaneSubtitle = (source) => {
    if (source) {
      const count = source ? source.totalCount() : 0;
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
          <FormattedMessage id="ui-finc-config.source.form.createSource">
            {ariaLabel => (
              <Button
                aria-label={ariaLabel}
                buttonStyle="primary"
                id="clickable-new-source"
                marginBottom0
                to={`${urls.sourceCreate()}${this.props.searchString}`}
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
    const { children, intl, onSelectRow, queryGetter, querySetter, onChangeIndex, source } = this.props;
    const count = source ? source.totalCount() : 0;

    return (
      <SearchAndSortQuery
        initialFilterState={{ status: ['active', 'technical implementation'] }}
        initialSortState={{ sort: 'label' }}
        initialSearchState={{ query: '' }}
        querySetter={querySetter}
        queryGetter={queryGetter}
        onChangeIndex={onChangeIndex}
        // onComponentWillUnmount={onComponentWillUnmount}
      >
        {
          ({
            searchValue,
            getSearchHandlers,
            onSubmitSearch,
            onSort,
            getFilterHandlers,
            activeFilters,
            filterChanged,
            searchChanged,
            resetAll,
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
                          id="metadata-sources"
                          buttonStyle="primary"
                        >
                          Sources
                        </Button>
                        <Button
                          id="metadata-collections"
                          to={urls.collections()}
                          buttonStyle="default"
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
                          // add values for search-selectbox
                          onChangeIndex={onChangeIndex}
                          searchableIndexes={searchableIndexes}
                          selectedIndex={_.get(this.props.contentData, 'qindex')}
                          searchableIndexesPlaceholder={null}
                        />
                        <Button
                          buttonStyle="primary"
                          disabled={!searchValue.query || searchValue.query === ''}
                          // onClick={onSubmitSearch}
                          fullWidth
                          type="submit"
                        >
                          <FormattedMessage id="stripes-smart-components.search" />
                        </Button>
                      </div>
                      <Button
                        buttonStyle="none"
                        id="clickable-reset-all"
                        disabled={disableReset()}
                        onClick={resetAll}
                      >
                        <Icon icon="times-circle-solid">
                          <FormattedMessage id="stripes-smart-components.resetAll" />
                        </Icon>
                      </Button>
                      <SourceFilters
                        // onChangeHandlers={getFilterHandlers()}
                        activeFilters={activeFilters.state}
                        filterHandlers={getFilterHandlers()}
                        // config={filterConfig}
                        // patronGroups={patronGroups}
                      />
                    </form>
                  </Pane>
                }
                <Pane
                  id="pane-results"
                  defaultWidth="fill"
                  firstMenu={this.renderResultsFirstMenu(activeFilters)}
                  lastMenu={this.renderResultsLastMenu()}
                  paneTitle="Finc Config"
                  appIcon={<AppIcon app="finc-config" />}
                  // paneSub={this.renderResultsPaneSubtitle(_.get(this.props.resources, 'records.records', []))}
                >
                  <MultiColumnList
                    columnMapping={{
                      label: intl.formatMessage({ id: 'ui-finc-config.source.label' }),
                      sourceId: intl.formatMessage({ id: 'ui-finc-config.source.id' }),
                      status: intl.formatMessage({ id: 'ui-finc-config.source.status' }),
                      solrShard: intl.formatMessage({ id: 'ui-finc-config.source.solrShard' }),
                      lastProcessed: intl.formatMessage({ id: 'ui-finc-config.source.lastProcessed' }),
                    }}
                    contentData={this.props.contentData}
                    formatter={this.resultsFormatter}
                    onRowClick={onSelectRow}
                    onNeedMore={this.onNeedMore}
                    onHeaderClick={onSort}
                    rowFormatter={this.rowFormatter}
                    selectedRow={this.state.selectedItem}
                    totalCount={count}
                    visibleColumns={['label', 'sourceId', 'status', 'solrShard', 'lastProcessed']}
                  />
                </Pane>
                {children}
              </Paneset>
            );
          }
        }
      </SearchAndSortQuery>

      // <div data-test-source-instances>
      //   <SearchAndSort
      //     // change packageInfo to prevent ERROR:Cannot read property 'cql' of undefined if switching tab
      //     // packageInfo={packageInfo}
      //     packageInfo={packageInfoReWrite()}
      //     objectName="metadataSource"
      //     filterConfig={filterConfig}
      //     initialResultCount={INITIAL_RESULT_COUNT}
      //     resultCountIncrement={RESULT_COUNT_INCREMENT}
      //     viewRecordComponent={MetadataSourceView}
      //     editRecordComponent={MetadataSourceForm}
      //     newRecordInitialValues={{}}
      //     visibleColumns={['label', 'sourceId', 'status', 'solrShard', 'lastProcessed']}
      //     onCreate={this.create}
      //     viewRecordPerms="finc-config.metadata-sources.item.get"
      //     newRecordPerms="finc-config.metadata-sources.item.post"
      //     parentResources={this.props.resources}
      //     parentMutator={this.props.mutator}
      //     columnMapping={{
      //       label: intl.formatMessage({ id: 'ui-finc-config.source.label' }),
      //       sourceId: intl.formatMessage({ id: 'ui-finc-config.source.id' }),
      //       status: intl.formatMessage({ id: 'ui-finc-config.source.status' }),
      //       solrShard: intl.formatMessage({ id: 'ui-finc-config.source.solrShard' }),
      //       lastProcessed: intl.formatMessage({ id: 'ui-finc-config.source.lastProcessed' }),
      //     }}
      //     stripes={stripes}
      //     // add values for search-selectbox
      //     searchableIndexes={searchableIndexes}
      //     selectedIndex={_.get(this.props.resources, 'qindex')}
      //     searchableIndexesPlaceholder={null}
      //     onChangeIndex={this.onChangeIndex}
      //   />
      // </div>
    );
  }
}

export default injectIntl(MetadataSources);
