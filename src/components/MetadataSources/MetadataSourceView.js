import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  ExpandAllButton,
  Icon,
  IconButton,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import {
  // AppIcon,
  IfPermission
} from '@folio/stripes/core';

import SourceInfoView from './SourceInfo/SourceInfoView';
import SourceManagementView from './SourceManagement/SourceManagementView';
import SourceTechnicalView from './SourceTechnical/SourceTechnicalView';

class MetadataSourceView extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
      onEdit: PropTypes.func,
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    record: PropTypes.object.isRequired,
  };

  static manifest = Object.freeze({
    query: {},
  });

  constructor(props) {
    super(props);

    this.state = {
      accordions: {
        managementAccordion: false,
        technicalAccordion: false
      },
    };
  }

  handleExpandAll = (obj) => {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);

      newState.accordions = obj;
      return newState;
    });
  }

  handleAccordionToggle = ({ id }) => {
    this.setState((state) => {
      const newState = _.cloneDeep(state);

      if (!_.has(newState.accordions, id)) newState.accordions[id] = true;
      newState.accordions[id] = !newState.accordions[id];
      return newState;
    });
  }

  renderEditPaneMenu = () => {
    const { record, handlers } = this.props;

    return (
      <IfPermission perm="finc-config.metadata-sources.item.put">
        <PaneMenu>
          <IconButton
            icon="edit"
            id="clickable-edit-source"
            style={{
              visibility: !record
                ? 'hidden'
                : 'visible'
            }}
            onClick={handlers.onEdit}
            title="Edit Metadata Source"
          />
        </PaneMenu>
      </IfPermission>
    );
  }

  render() {
    const { record, isLoading } = this.props;
    const label = _.get(record, 'label', '-');

    if (isLoading) return <Icon icon="spinner-ellipsis" width="10px" />;

    return (
      <Pane
        defaultWidth="40%"
        dismissible
        id="pane-sourcedetails"
        lastMenu={this.renderEditPaneMenu()}
        onClose={this.props.handlers.onClose}
        paneTitle={<span data-test-source-header-title>{label}</span>}
      >
        {/* <TitleManager record={label} /> */}
        <SourceInfoView
          id="sourceInfo"
          metadataSource={record}
          stripes={this.props.stripes}
        />
        <Row end="xs">
          <Col xs>
            <ExpandAllButton
              accordionStatus={this.state.accordions}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <Accordion
          open={this.state.accordions.managementAccordion}
          onToggle={this.handleAccordionToggle}
          label={<FormattedMessage id="ui-finc-config.source.managementAccordion" />}
          id="managementAccordion"
        >
          <SourceManagementView
            id="sourceManagement"
            metadataSource={record}
            stripes={this.props.stripes}
          />
        </Accordion>
        <Accordion
          open={this.state.accordions.technicalAccordion}
          onToggle={this.handleAccordionToggle}
          label={<FormattedMessage id="ui-finc-config.source.technicalAccordion" />}
          id="technicalAccordion"
        >
          <SourceTechnicalView
            id="sourceTechnical"
            metadataSource={record}
            stripes={this.props.stripes}
          />
        </Accordion>
      </Pane>
    );
  }
}


export default MetadataSourceView;
