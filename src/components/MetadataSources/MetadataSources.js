import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import {
  injectIntl,
  intlShape
} from 'react-intl';

import {
  makeQueryFunction,
  SearchAndSort,
  SearchAndSortQuery,
  SearchAndSortNoResultsMessage as NoResultsMessage,
  SearchAndSortSearchButton as FilterPaneToggle,
} from '@folio/stripes/smart-components';
import {
  MultiColumnList,
  SearchField,
  Pane,
  Icon,
  Button,
  PaneMenu,
  Paneset,
  TextField
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes-core';

import packageInfo from '../../../package';
import MetadataSourceView from './MetadataSourceView';
import MetadataSourceForm from './MetadataSourceForm';
import SourceFilters from './SourceFilters';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const filterConfig = [
  {
    label: 'Implementaion Status',
    name: 'status',
    cql: 'status',
    values: [
      { name: 'Active', cql: 'active' },
      { name: 'Wish', cql: 'wish' },
      { name: 'Negotiation', cql: 'negotiation' },
      { name: 'Technical implementation', cql: 'technical implementation' },
      { name: 'Deactivated', cql: 'deactivated' },
      { name: 'Terminated', cql: 'terminated' }
    ],
  },
  {
    label: 'Solr Shard',
    name: 'solrShard',
    cql: 'solrShard',
    values: [
      { name: 'UBL main', cql: 'UBL main' },
      { name: 'UBL ai', cql: 'UBL ai' },
      { name: 'SLUB main', cql: 'SLUB main' },
      { name: 'SLUB DBoD', cql: 'SLUB DBoD' }
    ],
  }
];

const searchableIndexes = [
  { label: 'All', value: '', makeQuery: term => `(label="${term}*" or sourceId="${term}*")` },
  { label: 'Source Name', value: 'label', makeQuery: term => `(label="${term}*")` },
  { label: 'Source ID', value: 'sourceId', makeQuery: term => `(sourceId="${term}*")` }
];

class MetadataSources extends React.Component {
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: {
      initialValue: {
        query: '',
        filters: 'status.Active,status.Technical implementation',
        sort: 'label',
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      records: 'fincConfigMetadataSources',
      recordsRequired: '%{resultCount}',
      perRequest: 30,
      path: 'finc-config/metadata-sources',
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(label="%{query.query}*" or sourceId="%{query.query}*")',
            {
              'Source Name': 'label',
              'Source ID': 'sourceId'
            },
            filterConfig,
            2,
          ),
        },
        staticFallback: { params: {} },
      },
    }
  });

  static propTypes = {
    intl: intlShape.isRequired,
    resources: PropTypes.shape({
      metadataSources: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    mutator: PropTypes.shape({
      metadataSources: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
      query: PropTypes.shape({
        update: PropTypes.func,
      }).isRequired,
    }).isRequired,
    onSelectRow: PropTypes.func,
    queryGetter: PropTypes.func,
    querySetter: PropTypes.func,
  };

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

  // add update if search-selectbox is changing
  onChangeIndex = (e) => {
    const qindex = e.target.value;

    this.props.mutator.query.update({ qindex });
  }

  render() {
    const resultsFormatter = {
      label: source => source.label,
      sourceId: source => source.sourceId,
      status: source => source.status,
      solrShard: source => source.solrShard,
      lastProcessed: source => source.lastProcessed,
    };

    const packageInfoReWrite = () => {
      const path = '/finc-config/metadata-sources';

      packageInfo.stripes.route = path;
      packageInfo.stripes.home = path;
      return packageInfo;
    };

    const { intl, onSelectRow, queryGetter, querySetter } = this.props;

    return (

      <SearchAndSortQuery
        // initialFilterState={{ status: ['active', 'technical implementation'] }}
        // initialSortState={{ sort: '' }}
        // initialSearchState={{ query: '' }}
        querySetter={this.querySetter}
        queryGetter={this.queryGetter}
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
          }) => (
            <Paneset>
              <Pane
                defaultWidth="320px"
                paneTitle="Search & filter"
              >
                <TextField
                  label="user search"
                  name="query"
                  onChange={getSearchHandlers().query}
                  value={searchValue.query}
                />
                <Button onClick={onSubmitSearch}>Search</Button>
                <SourceFilters
                  // onChangeHandlers={getFilterHandlers()}
                  activeFilters={activeFilters.state}
                  filterHandlers={getFilterHandlers()}
                  // config={filterConfig}
                  // patronGroups={patronGroups}
                />
              </Pane>
              <Pane
                id="pane-results"
                defaultWidth="fill"
                paneTitle="Finc Config"
                // appIcon={<AppIcon app={moduleName} />}
              >
                <MultiColumnList
                  visibleColumns={['label', 'sourceId', 'status', 'solrShard', 'lastProcessed']}
                  contentData={_.get(this.props.resources, 'records.records', [])}
                  columnMapping={{
                    label: intl.formatMessage({ id: 'ui-finc-config.source.label' }),
                    sourceId: intl.formatMessage({ id: 'ui-finc-config.source.id' }),
                    status: intl.formatMessage({ id: 'ui-finc-config.source.status' }),
                    solrShard: intl.formatMessage({ id: 'ui-finc-config.source.solrShard' }),
                    lastProcessed: intl.formatMessage({ id: 'ui-finc-config.source.lastProcessed' }),
                  }}
                  formatter={resultsFormatter}
                  rowFormatter={this.anchorRowFormatter}
                  onRowClick={onSelectRow}
                  onNeedMore={this.onNeedMore}
                  onHeaderClick={onSort}
                />
              </Pane>
            </Paneset>
          )
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
