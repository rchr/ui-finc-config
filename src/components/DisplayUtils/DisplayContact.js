import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  Row,
  TextField
} from '@folio/stripes/components';

class DisplayContact extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
  };

  constructor(props) {
    super(props);

    this.renderSubContact = this.renderSubContact.bind(this);
  }

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
          />
        </Col>
        <Col xs={4}>
          <Field
            component={TextField}
            fullWidth
            id={elem}
            name={`${elem}.role`}
            placeholder="Enter a role for the contact"
          />
        </Col>
        <Col
          style={{ textAlign: 'right' }}
          xs={2}
        >
          <Button
            buttonStyle="danger"
            onClick={() => fields.remove(index)}
          >
            Remove
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { fields } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {fields.map(this.renderSubContact)}
        </Col>
        <Col
          style={{ paddingTop: '10px' }}
          xs={12}
        >
          <Button onClick={() => fields.push('')}>+ Add Contact</Button>
        </Col>
      </Row>
    );
  }
}

export default DisplayContact;
