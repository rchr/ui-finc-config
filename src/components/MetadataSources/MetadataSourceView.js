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
  Spinner
} from '@folio/stripes/components';
import {
  IfPermission,
  TitleManager
} from '@folio/stripes/core';

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
    helperApp: PropTypes.node,
    isLoading: PropTypes.bool.isRequired,
    record: PropTypes.object,
    rec: PropTypes.object,
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

  // handleExpandAll = (obj) => {
  //   this.setState((curState) => {
  //     const newState = _.cloneDeep(curState);

  //     newState.accordions = obj;
  //     return newState;
  //   });
  // }

  // handleAccordionToggle = ({ id }) => {
  //   this.setState((state) => {
  //     const newState = _.cloneDeep(state);

  //     if (!_.has(newState.accordions, id)) newState.accordions[id] = true;
  //     newState.accordions[id] = !newState.accordions[id];
  //     return newState;
  //   });
  // }

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

  renderLoadingPane = () => {
    return (
      <Pane
        defaultWidth="40%"
        // dismissible
        id="pane-view-agreement"
        onClose={this.props.handlers.onClose}
        paneTitle="panetitle"
      >
        <Layout className="marginTop1">
          <Spinner />
        </Layout>
      </Pane>
    );
  }

  render() {
    const { handlers, record, rec, isLoading } = this.props;
    const test = rec;
    console.log(test);
    // const query = resources.query;
    // const initialValues = this.getData();
    // const test = contentData.source;
    // console.log(`huhu ${test}`);

    // if (_.isEmpty(initialValues)) {
    //   return <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>;
    // } else {
    //   const sourceFormData = this.getSourceFormData(initialValues);
    //   const detailMenu = (
    //     <PaneMenu>
    //       <IfPermission perm="finc-config.metadata-sources.item.put">
    //         <IconButton
    //           icon="edit"
    //           id="clickable-edit-source"
    //           style={{
    //             visibility: !initialValues
    //               ? 'hidden'
    //               : 'visible'
    //           }}
    //           // onClick={this.props.onEdit}
    //           // href={this.props.editLink}
    //           title="Edit Metadata Source"
    //         />
    //       </IfPermission>
    //     </PaneMenu>
    //   );

    //   const label = _.get(initialValues, 'label', '-');


    console.log(`source view ${rec}`);

    // if (this.props.isLoading) return this.renderLoadingPane();
    if (isLoading) return this.renderLoadingPane();

    return (
      // <React.Fragment>
      //   <Pane
      //     defaultWidth="60%"
      //     dismissible
      //     onClose={this.props.handlers.onClose}
      //     paneTitle="Pane View Source"
      //   >
      //     {/* <TitleManager record={contentData.source}> */}
      //       <Row>
      //         hallo hier spricht Welle Erdball
      //         {/* {...this.getSectionProps()} */}
      //       </Row>
      //     {/* </TitleManager> */}
      //   </Pane>
      //   {/* {helperApp} */}
      // </React.Fragment>
    
      <Pane
        // defaultWidth={this.props.paneWidth}
        defaultWidth="40%"
        id="pane-sourcedetails"
        // paneTitle={<span data-test-source-header-title>{label}</span>}
        // lastMenu={detailMenu}
        dismissible
        // onClose={this.props.onClose}
        onClose={this.props.handlers.onClose}
      >
        {/* <TitleManager record={label} /> */}
        <SourceInfoView
          id="sourceInfo"
          metadataSource={rec}
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
        {/* <Accordion
          open={this.state.accordions.managementAccordion}
          onToggle={this.handleAccordionToggle}
          label={<FormattedMessage id="ui-finc-config.source.managementAccordion" />}
          id="managementAccordion"
        >
          <SourceManagementView
            id="sourceManagement"
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
            // metadataSource={initialValues}
            stripes={this.props.stripes}
          />
        </Accordion> */}
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
