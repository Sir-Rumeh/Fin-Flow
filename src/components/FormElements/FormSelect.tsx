import { useState } from 'react';
import { DarkArrowDown } from 'assets/icons';

interface Option {
  value: string;
  label: string;
}

type CustomInputProps = {
  labelFor: string;
  label: string;
  formik: any;
  useTouched?: boolean;
  height?: string;
  options: Option[];
};

const FormSelect = ({
  labelFor,
  label,
  height,
  formik,
  useTouched = true,
  options,
}: CustomInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (option: Option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    formik.setFieldValue(labelFor, option.value);
  };
  return (
    <>
      <div className="relative mb-4 mt-6 h-auto w-full">
        <label htmlFor={labelFor} className="absolute bottom-16 font-semibold">
          {label}
        </label>

        <div
          className={`relative flex w-full ${height ? height : 'h-[50px]'} items-center justify-between rounded-lg border border-gray-300 px-1 ${
            useTouched && formik?.touched[labelFor] && formik?.errors[labelFor]
              ? 'border-red-400'
              : ''
          } ${!useTouched && formik?.errors[labelFor] ? 'border-red-400' : ''} `}
        >
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="flex h-full w-full items-center justify-between px-2"
          >
            <p className={`${selectedOption ? 'font-[400]' : 'text-gray-400'} `}>
              {' '}
              {selectedOption || 'Select Here'}{' '}
            </p>
            <i className="scale-125">
              <DarkArrowDown />
            </i>
          </button>
        </div>

        {isOpen && (
          <div className="slide-downward absolute z-50 mt-1 flex w-full flex-col rounded-md bg-white text-sm shadow">
            {options.map((option) => {
              return (
                <button
                  key={option.label}
                  onClick={() => handleChange(option)}
                  type="button"
                  className="w-full border-b px-3 py-3 text-start text-[16px] hover:bg-purpleSecondary"
                >
                  {option.label}
                </button>
              );
            })}
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
    </>
  );
};

export default FormSelect;
