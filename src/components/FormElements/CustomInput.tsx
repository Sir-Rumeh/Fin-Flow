type CustomInputProps = {
  labelFor: string;
  label: string;
  containerStyles?: string;
  defaultContainerStyles?: string;
  inputStyles?: string;
  maxW?: string;
  defaultInputStyles?: string;
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
  defaultContainerStyles = 'flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 ',
  maxW = 'md:w-[327px]',
  defaultInputStyles = 'h-[40px] w-full px-2 focus:outline-none focus:ring-0',
}: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={labelFor} className="font-semibold">
        {label}
      </label>
      <div
        className={`${containerStyles} ${!containerStyles && `${defaultContainerStyles} ${maxW}`}`}
      >
        <input
          type={inputType}
          className={`${inputStyles} ${!inputStyles && defaultInputStyles}`}
          placeholder={placeholder}
        />
        {icon && icon}
      </div>
    </div>
  );
};

export default CustomInput;
