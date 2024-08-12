import { Button } from '@mui/material';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  children?: JSX.Element | string;
  width?: string;
  height?: string;
  border?: string;
  variant?: 'contained' | 'outlined' | 'text';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
};

const ButtonComponent = (props: Props) => {
  return (
    <div>
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
          textTransform: 'capitalize',
          fontSize: 16,
        }}
        fullWidth={props.fullWidth}
        startIcon={props.startIcon}
        color="primary"
      >
        {props.children}
      </Button>
    </div>
  );
};

export default ButtonComponent;
