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

import { ValidateUrl } from './Validate';

class RepeatableFieldValidUrl extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    ariaLabel: PropTypes.string,
  };

  render() {
    const { fields, ariaLabel } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {fields.map((elem, index) => (
            <Row key={index}>
              <Col xs={8}>
                <Field
                  ariaLabel={`${ariaLabel} #${parseInt(index + 1, 10)}`}
                  autoFocus
                  name={elem}
                  id={elem}
                  component={TextField}
                  fullWidth
                  validate={ValidateUrl}
                />
              </Col>
              <Col xs={1}>
                <IconButton
                  icon="trash"
                  onClick={() => fields.remove(index)}
                />
              </Col>
            </Row>
          ))}
        </Col>
        <Col xs={4}>
          <Button onClick={() => fields.push('')}>+ Add</Button>
        </Col>
      </Row>
    );
  }
}

export default RepeatableFieldValidUrl;
