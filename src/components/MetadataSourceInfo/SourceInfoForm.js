import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  FormattedMessage
} from 'react-intl';
import {
  Accordion,
  Col,
  Row,
  TextField
} from '@folio/stripes/components';

class SourceInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.columnMapping =
    {
      name: 'Name',
      code: 'Code',
      description: 'description',
    };
  }

  render() {
    const { expanded, onToggle, accordionId } = this.props;

    return (
      <Accordion
        label={<FormattedMessage id="ui-finc-config.source.form.sourceInfo.title" />}
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
      >
        <Row>
          <Col xs>
            <Row>
              <Col xs={4}>
                <Field
                  label={
                    <FormattedMessage id="ui-finc-config.information.sourceLabel">
                      {(msg) => msg + ' *'}
                    </FormattedMessage>}
                  placeholder="Enter a name to identify the metadata source"
                  name="label"
                  id="addsource_label"
                  component={TextField}
                  fullWidth
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Accordion>
    );
  }
}

SourceInfoForm.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
};

export default SourceInfoForm;
