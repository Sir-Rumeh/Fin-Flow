import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

type Props = {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  id?: string;
  readonly?: boolean;
  required?: boolean;
  divstyles?: string;
  width?: string;
  height?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  color?: string;
  error?: boolean;
  helperText?: string;
  startIcon?: any;
};

const FormInput = (props: Props) => {
  const Icon = () => {
    return props.startIcon;
  };
  return (
    <TextField
      label={props.label}
      required={props.required}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      value={props.value}
      color="secondary"
      placeholder={props.placeholder}
      size="small"
      sx={{
        width: props.width ? props.width : '100%',
        maxHeight: props.height ? props.height : '3rem',
        height: props.height ? props.height : '3rem',
        '& .MuiInputBase-root': {
          height: '100%',
          padding: '0',
        },
      }}
      tabIndex={0}
      InputProps={{
        readOnly: props.readonly,
        style: { borderRadius: '6px' },
        startAdornment: (
          <InputAdornment
            position="start"
            className={`${props.startIcon ? 'ml-4' : 'ml-[6px]'} flex scale-[140%] items-center justify-center`}
          >
            {props.startIcon && <Icon />}
          </InputAdornment>
        ),
      }}
      onChange={props.onChange}
      error={props.error}
      fullWidth={props.fullWidth}
      helperText={props.helperText}
      type={props.type}
    />
  );
};

export default FormInput;
