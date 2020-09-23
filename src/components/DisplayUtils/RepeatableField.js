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

class RepeatableField extends React.Component {
  static propTypes = {
    ariaLabel: PropTypes.string,
    fields: PropTypes.object,
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
                  component={TextField}
                  fullWidth
                  id={elem}
                  name={elem}
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

export default RepeatableField;
