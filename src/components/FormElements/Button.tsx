import { Button } from '@mui/material';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  children?: JSX.Element | string;
  width?: string;
  height?: string;
  border?: number;
  textSize?: number;
  borderColor?: string;
  variant?: 'contained' | 'outlined' | 'text';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  title?: string;
  customClass?: string;
  customPaddingX?: string;
  alignContent?: string;
};

const ButtonComponent = (props: Props) => {
  return (
    <div className={`flex h-full flex-col items-center justify-center ${props.customClass}`}>
      <Button
        disabled={props.disabled}
        onClick={props.onClick}
        variant={props.variant}
        type={props.type}
        sx={{
          width: props.width ? props.width : '100%',
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
          fontSize: props.textSize ? props.textSize : 16,
          display: 'flex',
          alignContent: props.alignContent ? props.alignContent : 'center',
          justifyContent: 'flex',
          rowGap: '2px',
          padding: '5px',
          // font: 'inherit',
          paddingX: props.customPaddingX ? props.customPaddingX : '5px',
        }}
        fullWidth={props.fullWidth}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        color="primary"
      >
        {props.title} {props.children}
      </Button>
    </div>
  );
};

export default ButtonComponent;
