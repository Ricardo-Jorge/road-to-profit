/* eslint-disable react/prop-types */
const InputField = ({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    ></input>
  );
};

export default InputField;
