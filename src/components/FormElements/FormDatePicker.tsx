/* eslint-disable @typescript-eslint/no-explicit-any */

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface Props {
  name: string;
  formik: any;
  width?: string;
  label?: string;
  placeholder?: string;
  initialDate?: string;
  useTouched?: boolean;
  showLabel?: boolean;
}

const FormDatePicker = (props: Props) => {
  const {
    formik,
    name,
    width,
    label,
    initialDate,
    useTouched = true,
    placeholder,
    showLabel = true,
  } = props;

  const getPickerBorder = () => {
    if (
      (useTouched && formik?.touched[name] && formik?.errors[name]) ||
      (!useTouched && formik?.errors[name])
    ) {
      return 'border-red-400';
    } else return '';
  };
  return (
    <>
      <div className="relative mb-4 mt-6 flex flex-col gap-2">
        {showLabel && <label className="absolute bottom-16 font-semibold">{label}</label>}
        <DatePicker
          sx={{
            width: width ? width : '100%',
            '& .MuiOutlinedInput-root': {
              border: getPickerBorder(),
              height: '3.1rem',
              borderRadius: '10px',
              '&.Mui-focused fieldset': {
                border: '1px solid gray',
              },
              '&.Mui-focused': {
                color: 'black',
              },
              '&:focus-within': {
                color: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                legend: {
                  width: 0,
                },
              },
            },
            '& .MuiInputLabel-root': {
              visibility: 'visible',
              '&.Mui-focused': {
                visibility: 'hidden',
              },
              paddingLeft: '0.7rem',
              transform: 'translate(0, 60%) scale(1)',
            },
          }}
          label={placeholder ? placeholder : null}
          format="DD/MM/YYYY"
          value={formik.values[props.name] ? dayjs(formik.values[name]) : null}
          onChange={(newValue) => {
            formik.setFieldValue(name, dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss'));
          }}
        />
      </div>

      {useTouched
        ? formik?.touched[name] &&
          formik?.errors[name] && (
            <p className={`absolute top-14 text-xs italic text-red-400`}>{formik?.errors[name]}</p>
          )
        : formik?.errors[name] && (
            <p className={`absolute top-14 text-xs italic text-red-400`}>{formik?.errors[name]}</p>
          )}
    </>
  );
};

export default FormDatePicker;
