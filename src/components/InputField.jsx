/* eslint-disable react/prop-types */
import style from "./Form.module.css";

const InputField = ({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <div className={style.form}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      ></input>
    </div>
  );
};

export default InputField;
