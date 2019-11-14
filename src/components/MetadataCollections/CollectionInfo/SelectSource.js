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
        // with this value, in edit-mode will be visible the right name of the source
        // but changing and saving is not possible anymore
        // value={input.value.name}

        // inputValue={`{"id":"${input.value}","name":"${input.label}"}`}
      >
        {dataOptions.map(option => (
          <option
            defaultValue={input.value.id === option.value}
            key={option.value}
            // need to transform sourceData: {label:"", value:""} to mdSource: {name:"", id:"" }
            value={`{"id":"${option.value}","name":"${option.label}"}`}
          >
            {option.label}
          </option>
        ))}
      </Select>
    );
  }
}

export default SelectSource;
