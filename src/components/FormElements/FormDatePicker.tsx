/* eslint-disable @typescript-eslint/no-explicit-any */
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  name: string;
  formik: any;
  width?: string;
  label?: string;
  initialDate?: string;
}

const FormDatePicker = (props: Props) => {
  return (
    <>
      <div className="relative mb-4 mt-6 flex flex-col gap-2">
        <label className="absolute bottom-16 font-semibold">{props.label}</label>
        <DatePicker
          sx={{
            width: props.width ? props.width : '100%',
            '& .MuiOutlinedInput-root': {
              height: '3.1rem',
              borderRadius: '10px',
              '&.Mui-focused fieldset': {
                border: '1px solid black',
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
          label={props.label ? props.label : null}
          format="DD/MM/YYYY"
          value={props.formik.values[props.name] ? dayjs(props.formik.values[props.name]) : null}
          onChange={(newValue) => {
            props.formik.setFieldValue(props.name, dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss'));
          }}
        />
      </div>
    </>
  );
};

export default FormDatePicker;
