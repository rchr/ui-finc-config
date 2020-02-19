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

class RequiredRepeatableField extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    // add META-ERROR to PropTypes
    meta: PropTypes.shape({
      error: PropTypes.node,
    }),
  };

  render() {
    // add META-ERROR to props
    const { fields, meta: { error } } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {fields.map((elem, index) => (
            <Row key={index}>
              <Col xs={8}>
                <Field
                  name={elem}
                  id={elem}
                  component={TextField}
                  fullWidth
                  validate={Required}
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
        {/* render ERROR, if validation is not successful */}
        <div style={{ color:'#900' }}>{error}</div>
      </Row>
    );
  }
}

export default RequiredRepeatableField;
