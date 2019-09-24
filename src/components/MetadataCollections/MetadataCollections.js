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

import MetadataCollectionView from './MetadataCollectionView';
import MetadataCollectionForm from './MetadataCollectionForm';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;

const filterConfig = [
  {
    label: 'Metadata Available?',
    name: 'metadataAvailable',
    cql: 'metadataAvailable',
    values: [
      { name: 'Yes', cql: 'yes' },
      { name: 'No', cql: 'no' },
      { name: 'Undetermined', cql: 'undetermined' }
    ],
  },
  {
    label: 'Usage Restricted?',
    name: 'usageRestricted',
    cql: 'usageRestricted',
    values: [
      { name: 'Yes', cql: 'yes' },
      { name: 'No', cql: 'no' }
    ],
  },
  {
    label: 'Free Content?',
    name: 'freeContent',
    cql: 'freeContent',
    values: [
      { name: 'Yes', cql: 'yes' },
      { name: 'No', cql: 'no' },
      { name: 'Undetermined', cql: 'undetermined' }
    ],
  }
];

class MetadataCollections extends React.Component {
  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: {
      initialValue: {
        query: '',
        filters: 'metadataAvailable.Yes',
        sort: 'label',
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      records: 'fincConfigMetadataCollections',
      recordsRequired: '%{resultCount}',
      perRequest: 30,
      path: 'finc-config/metadata-collections',
      GET: {
        params: {
          query: makeQueryFunction(
            'cql.allRecords=1',
            '(label="%{query.query}*")',
            {
              'Collection Name': 'label'
            },
            filterConfig,
            2,
          ),
        },
        staticFallback: { params: {} },
      },
    },
    source: {
      type: 'okapi',
      records: 'fincConfigMetadataSources',
      path: 'finc-config/metadata-sources',
      resourceShouldRefresh: true
    },
  });

  static propTypes = {
    resources: PropTypes.shape({
      metadataCollections: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    mutator: PropTypes.shape({
      metadataCollections: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
      query: PropTypes.shape({
        update: PropTypes.func,
      }).isRequired,
    }).isRequired,
    stripes: PropTypes.object,
    intl: intlShape.isRequired,
  };

  closeNewInstance = (e) => {
    if (e) e.preventDefault();
    this.props.mutator.query.update({ layer: null });
  }

  create = (metadataCollection) => {
    const { mutator } = this.props;
    mutator.records.POST(metadataCollection)
      .then(() => {
        this.closeNewInstance();
      });
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

  render() {
    const packageInfoReWrite = () => {
      const path = '/finc-config/metadata-collections';
      packageInfo.stripes.route = path;
      packageInfo.stripes.home = path;
      return packageInfo;
    };

    const { stripes, intl } = this.props;

    const resultsFormatter = {
      label: collection => collection.label,
      mdSource: collection => _.get(collection, 'mdSource.name', '-'),
      metadataAvailable: collection => collection.metadataAvailable,
      usageRestricted: collection => collection.usageRestricted,
      permittedFor: collection => this.getArrayElementsCommaSeparated(collection.permittedFor),
      freeContent: collection => collection.freeContent,
    };

    return (
      <div data-test-collection-instances>
        <SearchAndSort
          // change packageInfo to prevent ERROR:Cannot read property 'cql' of undefined if switching tab
          // packageInfo={packageInfo}
          packageInfo={packageInfoReWrite()}
          objectName="metadataCollection"
          filterConfig={filterConfig}
          initialResultCount={INITIAL_RESULT_COUNT}
          resultCountIncrement={RESULT_COUNT_INCREMENT}
          viewRecordComponent={MetadataCollectionView}
          editRecordComponent={MetadataCollectionForm}
          newRecordInitialValues={{}}
          visibleColumns={['label', 'mdSource', 'metadataAvailable', 'usageRestricted', 'permittedFor', 'freeContent']}
          resultsFormatter={resultsFormatter}
          onCreate={this.create}
          viewRecordPerms="finc-config.metadata-collections.item.get"
          newRecordPerms="finc-config.metadata-collections.item.post"
          parentResources={this.props.resources}
          parentMutator={this.props.mutator}
          columnMapping={{
            label: intl.formatMessage({ id: 'ui-finc-config.collection.label' }),
            mdSource: intl.formatMessage({ id: 'ui-finc-config.collection.mdSource' }),
            metadataAvailable: intl.formatMessage({ id: 'ui-finc-config.collection.metadataAvailable' }),
            usageRestricted: intl.formatMessage({ id: 'ui-finc-config.collection.usageRestricted' }),
            permittedFor: intl.formatMessage({ id: 'ui-finc-config.collection.permittedFor' }),
            freeContent: intl.formatMessage({ id: 'ui-finc-config.collection.freeContent' })
          }}
          stripes={stripes}
        />
      </div>
    );
  }
}

export default injectIntl(MetadataCollections);
