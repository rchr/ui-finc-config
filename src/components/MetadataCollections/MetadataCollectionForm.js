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
  PaneFooter,
  PaneMenu,
  Paneset,
  Row,
} from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';

import CollectionInfoForm from './CollectionInfo/CollectionInfoForm';
import CollectionManagementForm from './CollectionManagement/CollectionManagementForm';
import CollectionTechnicalForm from './CollectionTechnical/CollectionTechnicalForm';
import BasicStyle from '../BasicStyle.css';

class MetadataCollectionForm extends React.Component {
  static propTypes = {
    handlers: PropTypes.PropTypes.shape({
      onClose: PropTypes.func.isRequired,
    }),
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    invalid: PropTypes.bool,
    isLoading: PropTypes.bool,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    sources: PropTypes.arrayOf(PropTypes.object),
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

  getFirstMenu() {
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

  getLastMenu() {
    const { initialValues } = this.props;
    const { confirmDelete } = this.state;
    const isEditing = initialValues && initialValues.id;

    return (
      <PaneMenu>
        {isEditing && (
          <IfPermission perm="finc-config.metadata-collections.item.delete">
            <Button
              buttonStyle="danger"
              disabled={confirmDelete}
              id="clickable-delete-collection"
              marginBottom0
              onClick={this.beginDelete}
              title="delete"
            >
              <FormattedMessage id="ui-finc-config.collection.form.deleteCollection" />
            </Button>
          </IfPermission>
        )}
      </PaneMenu>
    );
  }

  getPaneFooter() {
    const {
      handlers: { onClose },
      handleSubmit,
      invalid,
      pristine,
      submitting
    } = this.props;

    const disabled = pristine || submitting || invalid;

    const startButton = (
      <Button
        data-test-collection-form-cancel-button
        marginBottom0
        id="clickable-close-collection-form"
        buttonStyle="default mega"
        onClick={onClose}
      >
        <FormattedMessage id="ui-finc-config.collection.form.cancel" />
      </Button>
    );

    const endButton = (
      <Button
        data-test-collection-form-submit-button
        marginBottom0
        id="clickable-savecollection"
        buttonStyle="primary mega"
        type="submit"
        onClick={handleSubmit}
        disabled={disabled}
      >
        <FormattedMessage id="ui-finc-config.collection.form.saveAndClose" />
      </Button>
    );

    return <PaneFooter renderStart={startButton} renderEnd={endButton} />;
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

    const firstMenu = this.getFirstMenu();
    const lastMenu = this.getLastMenu();
    const footer = this.getPaneFooter();

    if (isLoading) return <Icon icon="spinner-ellipsis" width="10px" />;

    return (
      <form
        className={BasicStyle.styleForFormRoot}
        data-test-collection-form-page
        id="form-collection"
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            firstMenu={firstMenu}
            footer={footer}
            lastMenu={lastMenu}
            paneTitle={paneTitle}
          >
            <div className={BasicStyle.styleForFormContent}>
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton
                    accordionStatus={sections}
                    id="clickable-expand-all"
                    onToggle={this.handleExpandAll}
                  />
                </Col>
              </Row>
              <CollectionInfoForm
                accordionId="editCollectionInfo"
                expanded={sections.editCollectionInfo}
                // initialValues={initialValues}
                onToggle={this.handleSectionToggle}
                sourceData={this.props.sources}
                {...this.props}
              />
              <CollectionManagementForm
                accordionId="editCollectionManagement"
                expanded={sections.editCollectionManagement}
                id="collectionManagement"
                metadataCollection={initialValues}
                onToggle={this.handleSectionToggle}
                {...this.props}
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
            </div>
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
