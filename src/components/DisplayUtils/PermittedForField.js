import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import {
  Button,
  Col,
  IconButton,
  Row,
  TextField,
} from '@folio/stripes/components';

import { Required } from './Validate';

class PermittedForField extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    ariaLabel: PropTypes.string,
    disable: PropTypes.bool,
    addPermittedForField: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    // add first required permitted-for-field, if usageRestricted changed to 'yes'
    if (this.props.addPermittedForField !== prevProps.addPermittedForField) {
      if (this.props.addPermittedForField) {
        this.props.fields.push('');
      }
    }
  }

  render() {
    const { fields, ariaLabel, disable } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {fields.map((elem, index) => (
            <Row key={index}>
              <Col xs={8}>
                <Field
                  ariaLabel={`${ariaLabel} #${parseInt(index + 1, 10)}`}
                  name={elem}
                  id={elem}
                  component={TextField}
                  fullWidth
                  // first field is required
                  validate={index === 0 ? Required : undefined}
                />
              </Col>
              <Col xs={1}>
                {/* no trash icon for first required field */}
                {index !== 0 ?
                  <IconButton
                    icon="trash"
                    onClick={index !== 0 ? () => fields.remove(index) : undefined}
                  /> : ''}
              </Col>
            </Row>
          ))}
        </Col>
        <Col xs={4}>
          <Button onClick={() => fields.push('')} disabled={disable}>+ Add</Button>
        </Col>
      </Row>
    );
  }
}

export default PermittedForField;
