import { useEffect, useRef, useState } from 'react';
import { DarkArrowDown } from 'assets/icons';

export interface DropdownOption {
  id?: string | number;
  value: string;
  label: string;
}

type CustomInputProps = {
  labelFor: string;
  label: string;
  formik: any;
  useTouched?: boolean;
  height?: string;
  options: DropdownOption[];
  scrollableOptions?: boolean;
  scrollableHeight?: string;
  labelFontWeight?: string;
};

const FormSelect = ({
  labelFor,
  label,
  height,
  formik,
  useTouched = false,
  options,
  scrollableOptions = false,
  scrollableHeight = 'h-[10rem]',
  labelFontWeight,
}: CustomInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const getTextToDisplay = (stringValue: string) => {
    const object = options.find((option) => option.value === stringValue);
    return object?.label;
  };

  useEffect(() => {
    const selectedOptionLabel = getTextToDisplay(formik.values[labelFor]);
    if (!formik.values[labelFor]) {
      setSelectedOption('Select here');
    } else if (selectedOptionLabel) {
      setSelectedOption(selectedOptionLabel);
    }
  }, [formik.values[labelFor]]);

  const formSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formSelectRef.current && !formSelectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formSelectRef]);

  const handleChange = (option: DropdownOption) => {
    setSelectedOption(option.label);
    formik.setFieldValue(labelFor, option.value);
    setIsOpen(false);
  };

  return (
    <>
      <div ref={formSelectRef} className="relative mb-4 mt-6 h-auto w-full">
        <label
          htmlFor={labelFor}
          className={`${labelFontWeight ? labelFontWeight : 'font-semibold'} absolute bottom-16`}
        >
          {label}
        </label>

        <div
          className={`flex w-full ${height ? height : 'h-[50px]'} items-center justify-between rounded-lg border border-gray-300 px-1 ${
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
            <p
              className={`text-base ${selectedOption ? 'font-[400]' : scrollableOptions ? 'text-blackInput' : 'text-gray-400'} `}
            >
              {selectedOption ? selectedOption : 'Select here'}
            </p>
            <i className="scale-125">
              <DarkArrowDown />
            </i>
          </button>
        </div>

        {isOpen && (
          <div
            className={`${scrollableOptions ? `custom-scrollbar overflow-y-scroll pb-10 ${scrollableHeight}` : ''} slide-downward absolute z-[999] mt-1 flex w-full flex-col rounded-sm bg-white text-sm shadow-lg`}
          >
            {options.map((option, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleChange(option)}
                  type="button"
                  className={`${option.label ? 'py-3' : 'h-10'} w-full border-b px-3 text-start text-[16px] hover:bg-lilacPurple`}
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
