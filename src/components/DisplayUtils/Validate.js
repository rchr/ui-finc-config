const Required = value => {
  if (value) return undefined;
  return 'Required!';
};

const MdSourceRequired = value => {
  if (value) return undefined;
  return 'Metadata source required!';
};

const IntRequired = value => {
  const valueInt = parseInt(value, 10);

  if (valueInt === 0 || valueInt > 0) return undefined;
  return 'Integer Required!';
};

export { IntRequired, Required, MdSourceRequired };
