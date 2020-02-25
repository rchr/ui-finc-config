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

class DisplayContact extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    ariaLabel: PropTypes.string,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
  };

  render() {
    const { fields, ariaLabel } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {fields.map((elem, index) => (
            <Row key={index}>
              <Col xs={4}>
                <Field
                  ariaLabel={`${ariaLabel} name #${parseInt(index + 1, 10)}`}
                  component={TextField}
                  fullWidth
                  id={elem}
                  name={`${elem}.name`}
                  placeholder="Enter a name for the contact"
                  validate={Required}
                />
              </Col>
              <Col xs={4}>
                <Field
                  ariaLabel={`${ariaLabel} role #${parseInt(index + 1, 10)}`}
                  component={TextField}
                  fullWidth
                  id={elem}
                  name={`${elem}.role`}
                  placeholder="Enter a role for the contact"
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
          <Button onClick={() => fields.push('')}>+ Add Contact</Button>
        </Col>
      </Row>
    );
  }
}

export default DisplayContact;
