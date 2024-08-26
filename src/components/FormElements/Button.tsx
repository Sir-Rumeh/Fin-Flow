import { Button } from '@mui/material';
import { MouseEvent } from 'react';

type Props = {
  onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | (() => void);
  disabled?: boolean;
  children?: JSX.Element | string;
  width?: string;
  height?: string;
  border?: number;
  borderColor?: string;
  variant?: 'contained' | 'outlined' | 'text';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  title: string;
};

const ButtonComponent = (props: Props) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Button
        disabled={props.disabled}
        onClick={props.onClick}
        variant={props.variant}
        type={props.type}
        sx={{
          width: props.width ? props.width : '26.187rem',
          height: props.height ? props.height : '3rem',
          borderRadius: '6px',
          color: props.color,
          ':hover': {
            color: props.hoverColor,
            background: props.hoverBackgroundColor,
          },
          background: props.backgroundColor,
          border: props.border,
          borderColor: props.borderColor,
          textTransform: 'capitalize',
          fontSize: 16,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'flex',
          rowGap: '2px',
          padding: '5px',
        }}
        fullWidth={props.fullWidth}
        startIcon={props.startIcon}
        color="primary"
      >
        {props.title} {props.children}
      </Button>
    </div>
  );
};

export default ButtonComponent;
