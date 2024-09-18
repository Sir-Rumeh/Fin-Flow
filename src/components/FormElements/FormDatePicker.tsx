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
  customPicker?: boolean;
  hideBorder?: boolean;
}

const FormDatePicker = (props: Props) => {
  const {
    formik,
    name,
    width,
    label,
    initialDate,
    useTouched = false,
    placeholder,
    showLabel = true,
    customPicker = false,
    hideBorder = false,
  } = props;

  const getPickerBorder = () => {
    if (
      (useTouched && formik?.touched[name] && formik?.errors[name]) ||
      (!useTouched && formik?.errors[name])
    ) {
      return '1px solid red';
    } else return '';
  };
  return (
    <>
      <div className={`${hideBorder ? '' : 'mb-4 mt-6'} relative flex flex-col gap-2`}>
        {showLabel && <label className="absolute bottom-16 font-semibold">{label}</label>}
        <DatePicker
          sx={{
            width: width ? width : '100%',
            '& .MuiOutlinedInput-root': {
              '&.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              border: getPickerBorder(),
              height: '3.1rem',
              borderRadius: '10px',
              '&.Mui-focused fieldset': {
                border: hideBorder ? 'none' : '1px solid black',
              },
              '& fieldset': {
                border: hideBorder ? 'none' : undefined,
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
            '& .MuiInputBase-input': {
              width: hideBorder ? '4.6rem' : undefined,
              paddingLeft: hideBorder ? '8px' : undefined,
            },
            '& .MuiInputAdornment-root': {
              marginLeft: '2px',
            },
            '& .MuiInputLabel-root': {
              visibility: 'visible',
              '&.Mui-focused': {
                visibility: 'hidden',
              },
              fontSize: customPicker ? '12px' : '16px',
              color: '#9CA3AF',
              paddingLeft: '0.7rem',
              transform: customPicker
                ? 'translate(0, 100%) scale(1)'
                : 'translate(0, 60%) scale(1)',
            },
          }}
          label={!formik.values[props.name] && placeholder ? placeholder : null}
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
