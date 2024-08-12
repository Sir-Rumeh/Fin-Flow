/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  formik: any;
  options: { value: number; label: string }[];
  label: string;
  name: string;
  maxWidth?: number;
  initialItem?: string;
}

const SelectComponent = ({ formik, options, label, name, maxWidth, initialItem }: Props) => {
  const [item, setItem] = useState(initialItem ? initialItem : '');

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value);
    formik.setFieldValue(name, event.target.value);
  };

  return (
    <FormControl color="secondary" sx={{ width: '100%', maxWidth: maxWidth }} tabIndex={0}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={item}
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
