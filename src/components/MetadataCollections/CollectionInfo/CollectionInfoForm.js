import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
  TextField,
} from '@folio/stripes/components';

import { Required } from '../../DisplayUtils/Validate';
import FindSource from './FindSource/FindSource';

class CollectionInfoForm extends React.Component {
  constructor(props) {
    super(props);

    this.columnMapping =
    {
      name: 'Label',
      id: 'SourceId',
    };
    // this.selectSource = this.selectSource.bind(this);

    const intialSource = props.metadataCollection.mdSource || {};

    this.state = {
      source: intialSource,
    };
  }

  // selectSource(s) {
  //   this.props.change('source', s);
  //   this.setState({ source: s });
  // }

  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        id={accordionId}
        label={<FormattedMessage id="ui-finc-config.collection.generalAccordion" />}
        onToggle={onToggle}
        open={expanded}
      >
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addcollection_label"
              label={
                <FormattedMessage id="ui-finc-config.collection.label">
                  {(msg) => msg + ' *'}
                </FormattedMessage>}
              name="label"
              placeholder="Enter a name to identify the metadata collection"
              validate={Required}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Field
              component={TextField}
              fullWidth
              id="addcollection_description"
              label={
                <FormattedMessage id="ui-finc-config.collection.description">
                  {(msg) => msg}
                </FormattedMessage>}
              name="description"
              placeholder="Enter a description for the metadata collection"
            />
          </Col>
        </Row>
        <FindSource
          change={() => this.props.change}
          intialSource={this.state.source}
          stripes={this.props.stripes}
        />
      </Accordion>
    );
  }
}

CollectionInfoForm.propTypes = {
  accordionId: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
  metadataCollection: PropTypes.shape({
    mdSource: PropTypes.object
  }),
  onToggle: PropTypes.func,
  stripes: PropTypes.object,
};

export default CollectionInfoForm;
