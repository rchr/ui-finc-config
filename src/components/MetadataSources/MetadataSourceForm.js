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

import SourceInfoForm from './SourceInfo/SourceInfoForm';
import SourceManagementForm from './SourceManagement/SourceManagementForm';
import SourceTechnicalForm from './SourceTechnical/SourceTechnicalForm';
import BasicStyle from '../BasicStyle.css';

class MetadataSourceForm extends React.Component {
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
        editSourceInfo: true,
        editSourceManagement: true,
        editSourceTechnical: true
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
    if (!confirmation) {
      this.setState({ confirmDelete: false });
    }
  }

  getAddFirstMenu() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-finc-config.source.form.close">
          { ariaLabel => (
            <IconButton
              ariaLabel={ariaLabel}
              icon="times"
              id="clickable-closesourcedialog"
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
          <IfPermission perm="finc-config.metadata-sources.item.delete">
            <Button
              buttonStyle="danger"
              disabled={confirmDelete}
              id="clickable-delete-source"
              marginBottom0
              onClick={this.beginDelete}
              title="delete"
            >
              <FormattedMessage id="ui-finc-config.source.form.deleteSource" />
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
    const paneTitle = initialValues.id ? initialValues.label : <FormattedMessage id="ui-finc-config.source.form.createSource" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-updatesource', <FormattedMessage id="ui-finc-config.source.form.updateSource" />) :
      this.getLastMenu('clickable-createsource', <FormattedMessage id="ui-finc-config.source.form.createSource" />);

    if (isLoading) return <Icon icon="spinner-ellipsis" width="10px" />;

    return (
      <form
        className={BasicStyle.styleForFormRoot}
        data-test-source-form-page
        id="form-source"
      >
        <Paneset>
          <Pane
            defaultWidth="100%"
            firstMenu={this.getAddFirstMenu()}
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
              <SourceInfoForm
                accordionId="editSourceInfo"
                expanded={sections.editSourceInfo}
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
              <SourceManagementForm
                accordionId="editSourceManagement"
                expanded={sections.editSourceManagement}
                id="sourceManagement"
                metadataSource={initialValues}
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
              <SourceTechnicalForm
                accordionId="editSourceTechnical"
                expanded={sections.editSourceTechnical}
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
              <ConfirmationModal
                heading={<FormattedMessage id="ui-finc-config.source.form.deleteSource" />}
                id="delete-source-confirmation"
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
  form: 'form-metadataSource',
  // set navigationCheck true for confirming changes
  navigationCheck: true,
})(MetadataSourceForm);
