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
  formik?: any;
  useTouched?: boolean;
  verticalMargin?: boolean;
};

const CustomInput = ({
  labelFor,
  label,
  containerStyles,
  inputStyles,
  inputType,
  icon,
  placeholder,
  defaultContainerStyles = 'flex h-auto items-center justify-between rounded-lg border border-gray-300 px-1 ',
  maxW = 'md:w-[327px]',
  defaultInputStyles = 'h-[3rem] w-full px-2 focus:outline-none focus:ring-0',
  formik,
  useTouched = true,
  verticalMargin = true,
}: CustomInputProps) => {
  return (
    <div className={`relative ${verticalMargin && 'mb-4 mt-6'} flex h-auto flex-col gap-2`}>
      <label htmlFor={labelFor} className="absolute bottom-16 font-semibold">
        {label}
      </label>
      <div
        className={`${!formik?.errors[labelFor] && 'hover:border-black'} ${containerStyles} ${!containerStyles && `${defaultContainerStyles} ${maxW} `} ${
          useTouched && formik?.touched[labelFor] && formik?.errors[labelFor]
            ? 'border-red-400'
            : ''
        } ${
          useTouched && !formik?.touched[labelFor] && formik?.errors[labelFor]
            ? 'hover:border-black'
            : ''
        } ${!useTouched && formik?.errors[labelFor] ? 'border-red-400' : ''} `}
      >
        <input
          type={inputType}
          className={`${inputStyles} ${!inputStyles && defaultInputStyles}`}
          placeholder={placeholder}
          name={labelFor}
          id={labelFor}
          onChange={formik?.handleChange}
          value={formik?.values.labelFor}
          onBlur={() => formik?.handleBlur}
        />
        {icon}
      </div>

      {useTouched
        ? formik?.touched[labelFor] &&
          formik?.errors[labelFor] && (
            <p className={`absolute top-14 text-xs italic text-red-400`}>
              {formik?.errors[labelFor]}
            </p>
          )
        : formik?.errors[labelFor] && (
            <p className={`absolute top-14 text-xs italic text-red-400`}>
              {formik?.errors[labelFor]}
            </p>
          )}
    </div>
  );
};

export default CustomInput;
