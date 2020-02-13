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
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
  };

  renderSubContact = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={4}>
          <Field
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
    );
  }

  render() {
    const { fields } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {fields.map((elem, index) => (
            <Row key={index}>
              <Col xs={4}>
                <Field
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
