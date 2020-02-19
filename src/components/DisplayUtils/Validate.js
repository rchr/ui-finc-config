const Required = value => {
  if (value) return undefined;
  return 'Required!';
};

const IntRequired = value => {
  const valueInt = parseInt(value, 10);

  if (valueInt === 0 || valueInt > 0) return undefined;
  return 'Integer Required!';
};

const ArrayRequired = value => {
  if (!value || !value.length) {
    return 'Required!';
  }

  return undefined;
};

export { IntRequired, ArrayRequired, Required };
