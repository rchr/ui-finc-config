const Required = (value) => {
  if (value) return undefined;
  return 'Required!';
};

const ArrayRequired = (value) => {
  const errors = [];
  if (!value || !value.length) {
    return 'At least one element must be entered!';
  }
};

const Mail = (value) => {
  const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (value && !mailRegex.test(value)) {
    return 'No valid Email address!';
  }

  return undefined;
};

export { ArrayRequired, Required, Mail };
