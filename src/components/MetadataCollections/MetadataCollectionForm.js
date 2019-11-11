import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  Icon,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
  Row
} from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';

import CollectionInfoForm from './CollectionInfo/CollectionInfoForm';
import CollectionManagementForm from './CollectionManagement/CollectionManagementForm';
import CollectionTechnicalForm from './CollectionTechnical/CollectionTechnicalForm';

class MetadataCollectionForm extends React.Component {
  static propTypes = {
    handlers: PropTypes.PropTypes.shape({
      onClose: PropTypes.func.isRequired,
    }),
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    isLoading: PropTypes.bool,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    sources: PropTypes.shape({
      source: PropTypes.object,
    }),
    submitting: PropTypes.bool,
  };

  static defaultProps = {
    initialValues: {},
  }

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

  getAddFirstMenu() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-finc-config.collection.form.close">
          { ariaLabel => (
            <IconButton
              ariaLabel={ariaLabel}
              icon="times"
              id="clickable-closecollectiondialog"
              onClick={this.props.handlers.onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  getLastMenu(id, label) {
    const { pristine, submitting, initialValues, handleSubmit } = this.props;
    const { confirmDelete } = this.state;
    const isEditing = initialValues && initialValues.id;

    return (
      // set button to save changes
      <PaneMenu>
        {isEditing &&
          <IfPermission perm="finc-config.metadata-collections.item.delete">
            <Button
              buttonStyle="danger"
              disabled={confirmDelete}
              id="clickable-delete-udp"
              marginBottom0
              onClick={this.beginDelete}
              title="delete"
            >
              <FormattedMessage id="ui-finc-config.collection.form.deleteCollection" />
            </Button>
          </IfPermission>
        }
        <Button
          buttonStyle="primary paneHeaderNewButton"
          disabled={pristine || submitting}
          id={id}
          marginBottom0
          onClick={handleSubmit}
          title={label}
          type="submit"
        >
          {label}
        </Button>
      </PaneMenu>
    );
  }

  handleExpandAll(sections) {
    this.setState({ sections });
  }

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const newState = _.cloneDeep(state);

      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  render() {
    const { initialValues, isLoading, onDelete } = this.props;
    const { confirmDelete, sections } = this.state;
    const paneTitle = initialValues.id ? initialValues.label : <FormattedMessage id="ui-finc-config.collection.form.createCollection" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-createnewcollection', <FormattedMessage id="ui-finc-config.collection.form.updateCollection" />) :
      this.getLastMenu('clickable-createnewcollection', <FormattedMessage id="ui-finc-config.collection.form.createCollection" />);

    if (isLoading) return <Icon icon="spinner-ellipsis" width="10px" />;

    return (
      <form id="form-collection">
        <Paneset style={{ position: 'relative' }}>
          <Pane
            defaultWidth="100%"
            firstMenu={this.getAddFirstMenu()}
            lastMenu={lastMenu}
            paneTitle={paneTitle}
          >
            {/* add padding behind last Row; otherwise content is cutted of */}
            {/* <div className="CollectionForm" style={{ paddingBottom: '100px' }}> */}
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
              sourceData={this.props.sources}
              {...this.props}
            />
            <CollectionManagementForm
              accordionId="editCollectionManagement"
              expanded={sections.editCollectionManagement}
              onToggle={this.handleSectionToggle}
              {...this.props}

              id="collectionManagement"
              metadataCollection={initialValues}
              // stripes={this.props.stripes}
            />
            <CollectionTechnicalForm
              accordionId="editCollectionTechnical"
              expanded={sections.editCollectionTechnical}
              onToggle={this.handleSectionToggle}
              {...this.props}
            />
            <ConfirmationModal
              heading={<FormattedMessage id="ui-finc-config.collection.form.deleteCollection" />}
              id="delete-collection-confirmation"
              message={`Do you really want to delete ${initialValues.label}?`}
              onCancel={() => { this.confirmDelete(false); }}
              onConfirm={onDelete}
              open={confirmDelete}
            />
            {/* </div> */}
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  // the form will reinitialize every time the initialValues prop changes
  enableReinitialize: true,
  form: 'form-metadataCollection',
  // set navigationCheck true for confirming changes
  navigationCheck: true,
})(MetadataCollectionForm);
