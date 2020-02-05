import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

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
      error: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);

    this.renderSubContract = this.renderSubContract.bind(this);
  }

  renderSubContract = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={8}>
          <Field
            component={TextField}
            fullWidth
            id={elem}
            name={elem}
            validate={[Required]}
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
    // add META-ERROR to props
    const { fields, meta: { error } } = this.props;

    return (
      <Row>
        <Col xs={12}>
          {fields.map(this.renderSubContract)}
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
