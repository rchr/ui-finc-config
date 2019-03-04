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
import Tabs from '../Tabs/Tabs';

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
      records: 'metadataSources',
      recordsRequired: '%{resultCount}',
      perRequest: 30,
      path: 'metadata-sources',
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(label="%{query.query}*")',
            {
              'Source Name': 'label'
            },
            filterConfig,
            2,
          ),
        },
        staticFallback: { params: {} },
      },
    }
  });

  // static manifest = Object.freeze({
  //   xxx: {
  //     type: 'okapi',
  //     records: 'metadataSources',
  //     path: 'metadata-sources',
  //   },
  //   label: { value: null },
  // });


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
    onSelectRow: PropTypes.func,
    onComponentWillUnmount: PropTypes.func,
    showSingleResult: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    browseOnly: PropTypes.bool,
    intl: intlShape.isRequired,

    // resources: PropTypes.shape({
    //   xxx: PropTypes.shape(),
    // }),
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

  render() {
    // const { xxx } = this.props.resources;
    // if (!xxx || !xxx.hasLoaded || xxx.records.length < 1) {
    //   return <div>huhu</div>;
    // } else {
    //   /* 1. get label of record[0] */
    //   const rawLabel = xxx.records[1].label;
    //   return <div>{rawLabel}</div>;
    // }

    const packageInfoReWrite = () => {
      const path = '/fincconfig/metadatasources';
      packageInfo.stripes.route = path;
      packageInfo.stripes.home = path;
      return packageInfo;
    };

    const { onSelectRow, onComponentWillUnmount, showSingleResult, browseOnly, stripes, intl } = this.props;

    const resultsFormatter = {
      label: source => source.label,
      id: source => source.id,
    };

    return (
      <div>
        <Tabs
          tabID="metadatasources"
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
        />
        <SearchAndSort
          // packageInfo={packageInfo}
          packageInfo={packageInfoReWrite()}
          objectName="metadataSource"
          filterConfig={filterConfig}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          viewRecordComponent={MetadataSourceView}
          editRecordComponent={MetadataSourceForm}
          newRecordInitialValues={{}}
          visibleColumns={['label', 'id', 'status', 'solrShard', 'lastProcessed']}
          resultsFormatter={resultsFormatter}
          onSelectRow={onSelectRow}
          onCreate={this.create}
          onComponentWillUnmount={onComponentWillUnmount}
          viewRecordPerms="metadatasources.item.get"
          newRecordPerms="metadatasources.item.post"
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
          showSingleResult={showSingleResult}
          columnMapping={{
            label: intl.formatMessage({ id: 'ui-finc-config.information.sourceLabel' }),
            id: intl.formatMessage({ id: 'ui-finc-config.information.sourceId' }),
            status: intl.formatMessage({ id: 'ui-finc-config.information.status' }),
            solrShard: intl.formatMessage({ id: 'ui-finc-config.information.solrShard' }),
            lastProcessed: intl.formatMessage({ id: 'ui-finc-config.information.lastProcessed' }),
          }}
          browseOnly={browseOnly}
          stripes={stripes}
        />
      </div>
    );
  }
}

export default injectIntl(MetadataSources);
