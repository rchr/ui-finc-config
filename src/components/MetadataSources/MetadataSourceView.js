import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  ExpandAllButton,
  Icon,
  IconButton,
  Layer,
  Layout,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import {
  IfPermission,
  TitleManager
} from '@folio/stripes/core';
import {
  AppIcon
} from '@folio/stripes-core';

import MetadataSourceForm from './MetadataSourceForm';
import SourceInfoView from './SourceInfo/SourceInfoView';
import SourceManagementView from './SourceManagement/SourceManagementView';
import SourceTechnicalView from './SourceTechnical/SourceTechnicalView';

class MetadataSourceView extends React.Component {
  // static propTypes = {
  //   mutator: PropTypes.shape({
  //     query: PropTypes.object.isRequired,
  //   }),
  //   parentMutator: PropTypes.shape().isRequired,
  //   stripes: PropTypes
  //     .shape({
  //       connect: PropTypes.func.isRequired,
  //       hasPerm: PropTypes.func,
  //     }).isRequired,
  //   paneWidth: PropTypes.string,
  //   resources: PropTypes.shape({
  //     metadataSource: PropTypes.shape(),
  //     query: PropTypes.object,
  //   }),
  //   contentData: PropTypes.object,
  //   match: ReactRouterPropTypes.match,
  //   parentResources: PropTypes.shape(),
  //   onClose: PropTypes.func,
  //   onEdit: PropTypes.func,
  //   editLink: PropTypes.string,
  //   onCloseEdit: PropTypes.func,
  // };

  static propTypes = {
    // contentData: PropTypes.shape({
    //   source: PropTypes.object,
    // }),
    urls: PropTypes.shape({
      edit: PropTypes.func,
    }).isRequired,
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

    // this.connectedMetadataSourceForm = this.props.stripes.connect(MetadataSourceForm);

    this.state = {
      accordions: {
        managementAccordion: false,
        technicalAccordion: false
      },
    };
  }

  // getData = () => {
  //   const { parentResources, match: { params: { id } } } = this.props;
  //   const source = (parentResources.records || {}).records || [];

  //   if (!source || source.length === 0 || !id) return null;
  //   return source.find(u => u.id === id);
  // }

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

  // update = (source) => {
  //   this.props.parentMutator.records.PUT(source).then(() => {
  //     this.props.onCloseEdit();
  //   });
  // }

  // getSourceFormData = (source) => {
  //   const sourceFormData = source ? _.cloneDeep(source) : source;

  //   return sourceFormData;
  // }

  // deleteSource = (source) => {
  //   const { parentMutator } = this.props;

  //   parentMutator.records.DELETE({ id: source.id })
  //     .then(() => {
  //       parentMutator.query.update({
  //         _path: '/finc-config/metadata-sources',
  //         layer: null
  //       });
  //     });
  // }

  getSectionProps = (id) => {
    const { handlers } = this.props;

    return {
      // source: contentData.source,
      // contentData,
      id,
      handlers,
      onToggle: this.handleSectionToggle,
      // open: this.state.sections[id],
    };
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
            // href={this.props.editLink}
            title="Edit Metadata Source"
          />
        </PaneMenu>
      </IfPermission>
    );
  }

  render() {
    const { handlers, record, isLoading } = this.props;

    // const query = resources.query;
    // const initialValues = this.getData();
    const detailMenu = (
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
            // onClick={this.props.onEdit}
            // href={this.props.editLink}
            title="Edit Metadata Source"
          />
        </PaneMenu>
      </IfPermission>
    );

    const label = _.get(record, 'label', '-');

    if (isLoading) return <Icon icon="spinner-ellipsis" width="10px" />;

    return (
      <Pane
        // actionMenu={this.getActionMenu}
        // appIcon={<AppIcon app="finc-config" />}
        defaultWidth="40%"
        dismissible
        id="pane-sourcedetails"
        // lastMenu={detailMenu}
        lastMenu={this.renderEditPaneMenu()}
        onClose={this.props.handlers.onClose}
        paneTitle={<span data-test-source-header-title>{label}</span>}
      >
        {/* <TitleManager record={label} /> */}
        <SourceInfoView
          id="sourceInfo"
          metadataSource={record}
          // metadataSource={initialValues}
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
            // metadataSource={initialValues}
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
            // metadataSource={initialValues}
            stripes={this.props.stripes}
          />
        </Accordion>
        {/* <Layer
          // isOpen={query.layer ? query.layer === 'edit' : false}
          contentLabel="Edit Metadata Source Dialog"
        > */}
          {/* <this.connectedMetadataSourceForm
            stripes={stripes}
            initialValues={sourceFormData}
            onSubmit={(record) => { this.update(record); }}
            onCancel={this.props.onCloseEdit}
            parentResources={{
              ...this.props.resources,
              ...this.props.parentResources,
            }}
            parentMutator={this.props.parentMutator}
          /> */}
        {/* </Layer> */}
      </Pane>
    );
  }
}


export default MetadataSourceView;
