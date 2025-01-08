import EyeIcon from 'assets/icons/EyeIcon';
import EyeSlashIcon from 'assets/icons/EyeSlashIcon';
import { useEffect, useRef } from 'react';

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
  passwordInput?: boolean;
  iconState?: boolean;
  handleInputType?: (e: any) => void;
  disabled?: boolean;
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
  passwordInput = false,
  iconState,
  handleInputType = () => {},
  disabled,
}: CustomInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyExceptions = (event: KeyboardEvent) => {
      if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
        event.preventDefault();
      }
    };

    const inputElement = inputRef.current;
    console.log('inputElement', inputElement);
    if (inputElement && inputElement.querySelector('input[type="number"]')) {
      const numberInput = inputElement.querySelector('input[type="number"]') as HTMLInputElement;

      if (numberInput) {
        numberInput.addEventListener('keydown', handleKeyExceptions);
      }

      return () => {
        if (numberInput) {
          numberInput.removeEventListener('keydown', handleKeyExceptions);
        }
      };
    }
  }, []);

  return (
    <div
      ref={inputRef}
      className={`relative ${verticalMargin && 'mb-4 mt-6'} flex h-auto flex-col gap-2`}
    >
      <label htmlFor={labelFor} className="absolute bottom-16 font-semibold">
        {label}
      </label>

      {passwordInput ? (
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
            className={`${inputStyles} ${!inputStyles && defaultInputStyles} `}
            placeholder={placeholder}
            name={labelFor}
            id={labelFor}
            onChange={formik?.handleChange}
            value={formik?.values[labelFor]}
            onBlur={() => formik?.handleBlur}
          />
          <div onClick={handleInputType} className="cursor-pointer pr-1">
            {!iconState ? <EyeIcon /> : <EyeSlashIcon />}
          </div>
        </div>
      ) : (
        <div
          className={`relative ${!formik?.errors[labelFor] && 'hover:border-black'} ${containerStyles} ${!containerStyles && `${defaultContainerStyles} ${maxW} `} ${
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
            className={`${inputStyles} ${!inputStyles && defaultInputStyles} `}
            placeholder={placeholder}
            name={labelFor}
            id={labelFor}
            onChange={formik?.handleChange}
            value={formik?.values[labelFor]}
            onBlur={() => formik?.handleBlur}
            disabled={disabled}
          />
          {icon}
          {disabled && (
            <span className={`absolute inset-0 h-full w-full rounded-lg bg-gray-400 opacity-30`} />
          )}
        </div>
      )}

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
