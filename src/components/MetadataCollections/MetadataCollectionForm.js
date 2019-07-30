import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
  Row
} from '@folio/stripes/components';
import {
  IfPermission
} from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';

import CollectionInfoForm from './CollectionInfo/CollectionInfoForm';
import CollectionManagementForm from './CollectionManagement/CollectionManagementForm';
import CollectionTechnicalForm from './CollectionTechnical/CollectionTechnicalForm';

class MetadataCollectionForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape().isRequired,
    parentMutator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      sections: {
        editCollectionInfo: true,
        editCollectionManagement: true,
        editCollectionTechnical: true
      },
    };

    this.handleExpandAll = this.handleExpandAll.bind(this);
  }

  beginDelete = () => {
    this.setState({
      confirmDelete: true,
    });
  }

  confirmDelete = (confirmation) => {
    if (confirmation) {
      this.deleteCollection();
    } else {
      this.setState({ confirmDelete: false });
    }
  }

  deleteCollection = () => {
    const { parentMutator, initialValues: { id } } = this.props;
    parentMutator.records.DELETE({ id }).then(() => {
      parentMutator.query.update({
        _path: 'finc-config/metadata-collections',
        layer: null
      });
    });
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-finc-config.collection.form.close">
          { ariaLabel => (
            <IconButton
              id="clickable-closecollectiondialog"
              onClick={onCancel}
              ariaLabel={ariaLabel}
              icon="times"
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  getLastMenu(id, label) {
    const { pristine, submitting, initialValues } = this.props;
    const { confirmDelete } = this.state;
    const isEditing = initialValues && initialValues.id;

    return (
      // set button to save changes
      <PaneMenu>
        {isEditing &&
          <IfPermission perm="metadatacollections.item.delete">
            <Button
              id="clickable-delete-udp"
              title="delete"
              buttonStyle="danger"
              onClick={this.beginDelete}
              disabled={confirmDelete}
              marginBottom0
            >
              delete
            </Button>
          </IfPermission>
        }
        <Button
          id={id}
          type="submit"
          title={label}
          disabled={pristine || submitting}
          buttonStyle="primary paneHeaderNewButton"
          marginBottom0
        >
          {label}
        </Button>
      </PaneMenu>
    );
  }

  handleExpandAll(sections) {
    this.setState({ sections });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const newState = _.cloneDeep(state);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  render() {
    const { initialValues, handleSubmit } = this.props;
    const { confirmDelete, sections } = this.state;
    const paneTitle = initialValues.id ? initialValues.label : <FormattedMessage id="ui-finc-config.collection.form.createCollection" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-createnewcollection', <FormattedMessage id="ui-finc-config.collection.form.updateCollection" />) :
      this.getLastMenu('clickable-createnewcollection', <FormattedMessage id="ui-finc-config.collection.form.createCollection" />);

    return (
      <form id="form-collection" onSubmit={handleSubmit}>
        <Paneset style={{ position: 'relative' }}>
          <Pane
            defaultWidth="100%"
            firstMenu={this.getAddFirstMenu()}
            lastMenu={lastMenu}
            paneTitle={paneTitle}
          >
            {/* add padding behind last Row; otherwise content is cutted of */}
            <div className="CollectionForm" style={{ paddingBottom: '100px' }}>
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton
                    id="clickable-expand-all"
                    accordionStatus={sections}
                    onToggle={this.handleExpandAll}
                  />
                </Col>
              </Row>
              <CollectionInfoForm
                accordionId="editCollectionInfo"
                expanded={sections.editCollectionInfo}
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
              <CollectionManagementForm
                accordionId="editCollectionManagement"
                expanded={sections.editCollectionManagement}
                onToggle={this.handleSectionToggle}
                {...this.props}

                id="collectionManagement"
                metadataCollection={initialValues}
                stripes={this.props.stripes}
              />
              <CollectionTechnicalForm
                accordionId="editCollectionTechnical"
                expanded={sections.editCollectionTechnical}
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
              <ConfirmationModal
                id="delete-collection-confirmation"
                heading="Delete Metadata Collection"
                message={`Do you really want to delete ${initialValues.label}?`}
                open={confirmDelete}
                onConfirm={() => { this.confirmDelete(true); }}
                onCancel={() => { this.confirmDelete(false); }}
              />
            </div>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'form-metadataCollection',
  // set navigationCheck true for confirming changes
  navigationCheck: true,
  // the form will reinitialize every time the initialValues prop changes
  enableReinitialize: true,
})(MetadataCollectionForm);
