import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  FormattedMessage
} from 'react-intl';
import {
  Button,
  Col,
  ExpandAllButton,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
  Row
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import SourceInfoForm from '../MetadataSourceInfo/SourceInfoForm';
import SourceManagementForm from '../SourceManagement/SourceManagementForm';
import SourceTechnicalForm from '../SourceTechnical/SourceTechnicalForm';

function validate(values) {
  const errors = {};
  errors.udp = {};

  if (!values.label) {
    errors.label = 'Please fill this in to continue';
  }

  if (!values.id) {
    errors.id = 'Please fill this in to continue';
  }
}

class MetadataSourceForm extends React.Component {
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
      sections: {
        editSourceInfo: true,
        editSourceManagement: true,
        editSourceTechnical: true
      },
    };

    this.handleExpandAll = this.handleExpandAll.bind(this);
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-finc-config.source.form.close">
          { ariaLabel => (
            <IconButton
              id="clickable-closesourcedialog"
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
    const { pristine, submitting } = this.props;

    return (
      <PaneMenu>
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
    const { sections } = this.state;
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ? initialValues.label : <FormattedMessage id="ui-finc-config.source.form.createSource" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-createnewsource', <FormattedMessage id="ui-finc-config.source.form.updateSource" />) :
      this.getLastMenu('clickable-createnewsource', <FormattedMessage id="ui-finc-config.source.form.createSource" />);

    return (
      <form className="" id="form-source" onSubmit={handleSubmit}>
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            firstMenu={firstMenu}
            lastMenu={lastMenu}
            paneTitle={paneTitle}
          >
            <div className="SourceFormTest">
              <Row end="xs">
                <Col xs>
                  <ExpandAllButton
                    id="clickable-expand-all"
                    accordionStatus={sections}
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
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
              <SourceTechnicalForm
                accordionId="editSourceTechnical"
                expanded={sections.editSourceTechnical}
                onToggle={this.handleSectionToggle}
                {...this.props}
              />
            </div>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesForm({
  form: 'form-source',
  navigationCheck: true,
  enableReinitialize: true,
  validate
})(MetadataSourceForm);
