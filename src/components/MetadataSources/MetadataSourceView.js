import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Col,
  Accordion,
  ExpandAllButton,
  Icon,
  IconButton,
  KeyValue,
  Layer,
  Pane,
  PaneMenu,
  Row
} from '@folio/stripes/components';
import {
  IfPermission,
  TitleManager
} from '@folio/stripes/core';

import MetadataSourceForm from './MetadataSourceForm';
import SourceInfoView from '../MetadataSourceInfo/SourceInfoView';

class MetadataSourceView extends React.Component {
  static manifest = Object.freeze({
    query: {},
  });

  static propTypes = {
    stripes: PropTypes
      .shape({
        hasPerm: PropTypes.func.isRequired,
        connect: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired,
        logger: PropTypes
          .shape({ log: PropTypes.func.isRequired })
          .isRequired,
        intl: PropTypes.object.isRequired
      })
      .isRequired,
    // paneWidth: PropTypes.string,
    resources: PropTypes.shape({
      metadataSource: PropTypes.shape(),
      query: PropTypes.object,
    }),
    mutator: PropTypes.shape({
      query: PropTypes.object.isRequired,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    parentResources: PropTypes.shape(),
    parentMutator: PropTypes.shape().isRequired,
    onClose: PropTypes.func,
    onEdit: PropTypes.func,
    editLink: PropTypes.string,
    onCloseEdit: PropTypes.func,
    // notesToggle: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const logger = props.stripes.logger;
    this.log = logger.log.bind(logger);
    this.connectedMetadataSourceForm = this.props.stripes.connect(MetadataSourceForm);

    this.state = {
      accordions: {
        testAccordion: false
      },
    };
  }

  getData = () => {
    const { parentResources, match: { params: { id } } } = this.props;
    const source = (parentResources.records || {}).records || [];
    if (!source || source.length === 0 || !id) return null;
    return source.find(u => u.id === id);
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

  update = (source) => {
    this.props.parentMutator.records.PUT(source).then(() => {
      this.props.onCloseEdit();
    });
  }

  getSourceFormData = (source) => {
    const sourceFormData = source ? _.cloneDeep(source) : source;
    return sourceFormData;
  }

  deleteSource = (source) => {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: source.id })
      .then(() => {
        parentMutator.query.update({
          _path: '/fincconfig',
          layer: null
        });
      });
  }

  render() {
    const { resources, stripes } = this.props;
    const query = resources.query;
    const initialValues = this.getData();

    if (_.isEmpty(initialValues)) {
      return <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>;
    } else {
      const sourceFormData = this.getSourceFormData(initialValues);
      const detailMenu = (
        <PaneMenu>
          <IfPermission perm="metadatasources.item.delete">
            <IconButton
              icon="trash"
              id="clickable-delete-source"
              style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
              onClick={() => this.deleteSource(initialValues)}
              title="Delete Metadata Source"
            />
          </IfPermission>
          {/* <IconButton
            icon="comment"
            id="clickable-show-notes"
            style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
            onClick={this.props.notesToggle}
            aria-label="Notes"
          /> */}
          <IfPermission perm="metadatasources.item.put">
            <IconButton
              icon="edit"
              id="clickable-edit-source"
              style={{
                visibility: !initialValues
                  ? 'hidden'
                  : 'visible'
              }}
              onClick={this.props.onEdit}
              href={this.props.editLink}
              title="Edit Metadata Source"
            />
          </IfPermission>
        </PaneMenu>
      );

      const label = _.get(initialValues, 'label', 'No LABEL');

      return (
        <Pane
          id="pane-sourcedetails"
          paneTitle={label}
          lastMenu={detailMenu}
          dismissible
          onClose={this.props.onClose}
        >
          <TitleManager record={label} />
          <SourceInfoView
            id="sourceInfo"
            metadataSource={initialValues}
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
            open={this.state.accordions.testAccordion}
            onToggle={this.handleAccordionToggle}
            label={<FormattedMessage id="ui-finc-config.source.testAccordion" />}
            id="testAccordion"
          >
            {
              <Row>
                <Col xs={3}>
                  <KeyValue
                    label="TODO"
                    value="TODO"
                  />
                </Col>
              </Row>
            }
          </Accordion>
          <Layer
            isOpen={query.layer ? query.layer === 'edit' : false}
            contentLabel="Edit Metadata Source Dialog"
          >
            <this.connectedMetadataSourceForm
              stripes={stripes}
              initialValues={sourceFormData}
              onSubmit={(record) => { this.update(record); }}
              onCancel={this.props.onCloseEdit}
              parentResources={{
                ...this.props.resources,
                ...this.props.parentResources,
              }}
              parentMutator={this.props.parentMutator}
            />
          </Layer>
        </Pane>
      );
    }
  }
}

export default MetadataSourceView;
