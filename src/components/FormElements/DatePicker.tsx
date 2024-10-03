/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface Props {
  name: string;
  formik: any;
  width?: string;
  label?: string;
  initialDate?: string;
}

const MuiDatePicker = (props: Props) => {
  const maxDate = () => {
    return new Date();
  };
  return (
    <>
      <DatePicker
        sx={{
          width: props.width ? props.width : '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '&.Mui-focused fieldset': {
              border: '1px solid #5C068C',
            },
            '&.Mui-focused': {
              color: 'black',
            },
            '&:focus-within': {
              color: 'black',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'black',
            '&.Mui-focused': {
              color: 'black',
            },
          },
        }}
        label={!props.formik.values[props.name] && props.label ? props.label : null}
        maxDate={dayjs(maxDate())}
        format="DD/MM/YYYY"
        value={props.formik.values[props.name] ? dayjs(props.formik.values[props.name]) : null}
        onChange={(newValue) => {
          props.formik.setFieldValue(props.name, dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss'));
        }}
      />
    </>
  );
};

export default MuiDatePicker;
