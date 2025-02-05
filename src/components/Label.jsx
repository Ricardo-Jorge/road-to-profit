/* eslint-disable react/prop-types */
const Label = ({ title, ...rest }) => {
  return <label {...rest}>{title}</label>;
};

export default Label;
