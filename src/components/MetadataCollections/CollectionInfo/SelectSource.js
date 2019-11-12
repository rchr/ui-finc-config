import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@folio/stripes/components';

class SelectSource extends React.Component {
  static propTypes = {
    dataOptions: PropTypes.arrayOf(PropTypes.object),
    input: PropTypes.object,
  };

  render() {
    const { input, dataOptions, ...rest } = this.props;
    const parse = event => {
      // This is what redux-form will hold:
      return JSON.parse(event.target.value);
    };

    return (
      <Select
        onBlur={event => input.onBlur(parse(event))}
        onChange={event => input.onChange(parse(event))}
        {...rest}
        // inputValue={`{"id":"${input.value}","name":"${input.label}"}`}
      >
        {dataOptions.map(option => (
          <option
            key={option.value}
            // need to transform sourceData: {label:"", value:""} to mdSource: {name:"", id:"" }
            value={`{"id":"${option.value}","name":"${option.label}"}`}
            defaultValue={input.value.id === option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    );
  }
}

export default SelectSource;
