const Required = (value) => {
  if (value) return undefined;
  return 'Required!';
};

const IntRequired = (value) => {
  const valueInt = parseInt(value, 10);

  if (valueInt === 0 || valueInt > 0) return undefined;
  return 'Integer Required!';
};

const ArrayRequired = (value) => {
  if (!value || !value.length) {
    return 'Required!';
  }

  return undefined;
};

const Mail = (value) => {
  const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (value && !mailRegex.test(value)) {
    return 'No valid Email address!';
  }

  return undefined;
};

export { IntRequired, ArrayRequired, Required, Mail };
