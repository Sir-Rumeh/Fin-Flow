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
  return (
    <>
      <DatePicker
        sx={{
          width: props.width ? props.width : '100%',
          borderRadius: '6px',
        }}
        label={props.label}
        format="DD/MM/YYYY"
        onChange={(newValue) => {
          props.formik.setFieldValue(props.name, dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss'));
        }}
      />
    </>
  );
};

export default MuiDatePicker;
