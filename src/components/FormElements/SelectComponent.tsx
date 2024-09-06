/* eslint-disable @typescript-eslint/no-explicit-any */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  formik: any;
  options: { value: number | string; label: string }[];
  label: string;
  name: string;
  maxWidth?: number;
  initialItem?: string;
  searchable?: boolean;
}

const SelectComponent = ({ formik, options, label, name, maxWidth, searchable = false }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    formik.setFieldValue(name, event.target.value);
  };

  return (
    <FormControl
      color="secondary"
      sx={{
        width: '100%',
        maxWidth: maxWidth,
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
        },
      }}
      tabIndex={0}
    >
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        sx={{}}
        value={formik.values[name]}
        label={label}
        onChange={handleChange}
        defaultValue={''}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
