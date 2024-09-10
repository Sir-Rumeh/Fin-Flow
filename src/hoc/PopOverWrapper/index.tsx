import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

interface Props {
  popoverId: number;
  buttonIcon: JSX.Element;
  children?: JSX.Element;
  translationX: number;
  translationY: number;
  borderRadius?: string;
  closeOnClick?: boolean;
  closeCard?: boolean;
  cardWidth?: string;
  customPaddingX?: number | string;
}

const CustomPopover = ({
  popoverId,
  buttonIcon,
  children,
  translationX,
  translationY,
  borderRadius,
  closeOnClick = true,
  closeCard,
  cardWidth,
  customPaddingX,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover${popoverId.toString()}` : undefined;

  useEffect(() => {
    handleClose();
  }, [closeCard]);

  return (
    <div className="relative w-full">
      <Button
        sx={{
          width: '100%',
          paddingX: customPaddingX ? customPaddingX : null,
        }}
        aria-describedby={id}
        onClick={handleClick}
        className="w-full normal-case"
      >
        {buttonIcon}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={
          closeOnClick
            ? handleClose
            : () => {
                return;
              }
        }
        anchorOrigin={{
          vertical: translationY,
          horizontal: translationX,
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: `${borderRadius ? borderRadius : ''}`,
              display: `${!children ? 'none' : 'block'}`,
              width: `${cardWidth ? cardWidth : 'auto'}`,
            },
          },
        }}
      >
        <div className="w-full rounded-full">{children}</div>
      </Popover>
    </div>
  );
};

export default CustomPopover;
