type CustomInputProps = {
  labelFor: string;
  label: string;
  containerStyles?: string;
  inputStyles?: string;
  inputType: string;
  placeholder?: string;
  icon?: any;
};

const CustomInput = ({
  labelFor,
  label,
  containerStyles,
  inputStyles,
  inputType,
  icon,
  placeholder,
}: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={labelFor} className="font-semibold">
        {label}
      </label>
      <div className={containerStyles}>
        <input type={inputType} className={inputStyles} placeholder={placeholder} />
        {icon && icon}
      </div>
    </div>
  );
};

export default CustomInput;
