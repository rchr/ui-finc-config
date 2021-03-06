import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape
} from 'react-intl';
import {
  makeQueryFunction,
  SearchAndSort
} from '@folio/stripes/smart-components';
import packageInfo from '../../../package';

import MetadataSourceView from './MetadataSourceView';
import MetadataSourceForm from './MetadataSourceForm';

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
      { name: 'Technical implementation', cql: 'technical implementation' },
      { name: 'Negotiation', cql: 'negotiation' },
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
        filters: '',
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
    stripes: PropTypes.object,
    intl: intlShape.isRequired
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
    const packageInfoReWrite = () => {
      const path = '/finc-config/metadata-sources';
      packageInfo.stripes.route = path;
      packageInfo.stripes.home = path;
      return packageInfo;
    };

    const { stripes, intl } = this.props;

    return (
      <div data-test-source-instances>
        <SearchAndSort
          // change packageInfo to prevent ERROR:Cannot read property 'cql' of undefined if switching tab
          // packageInfo={packageInfo}
          packageInfo={packageInfoReWrite()}
          objectName="metadataSource"
          filterConfig={filterConfig}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          viewRecordComponent={MetadataSourceView}
          editRecordComponent={MetadataSourceForm}
          newRecordInitialValues={{}}
          visibleColumns={['label', 'sourceId', 'status', 'solrShard', 'lastProcessed']}
          onCreate={this.create}
          viewRecordPerms="metadatasources.item.get"
          newRecordPerms="metadatasources.item.post"
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
          columnMapping={{
            label: intl.formatMessage({ id: 'ui-finc-config.source.label' }),
            sourceId: intl.formatMessage({ id: 'ui-finc-config.source.id' }),
            status: intl.formatMessage({ id: 'ui-finc-config.source.status' }),
            solrShard: intl.formatMessage({ id: 'ui-finc-config.source.solrShard' }),
            lastProcessed: intl.formatMessage({ id: 'ui-finc-config.source.lastProcessed' }),
          }}
          stripes={stripes}
          // add values for search-selectbox
          searchableIndexes={searchableIndexes}
          selectedIndex={_.get(this.props.resources, 'qindex')}
          searchableIndexesPlaceholder={null}
          onChangeIndex={this.onChangeIndex}
        />
      </div>
    );
  }
}

export default injectIntl(MetadataSources);
