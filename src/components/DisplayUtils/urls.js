const urls = {
  sources: () => '/finc-config/metadata-sources',
  sourceView: id => `/finc-config/metadata-sources/${id}`,
  sourceEdit: id => `/finc-config/metadata-sources/${id}/edit`,
  sourceCreate: () => '/finc-config/metadata-sources/create',

  collections: () => '/finc-config/metadata-collections',
  collectionView: id => `/finc-config/metadata-collections/${id}`,
  collectionEdit: id => `/finc-config/metadata-collections/${id}/edit`,
  collectionCreate: () => '/finc-config/metadata-collections/create',
};

export default urls;
