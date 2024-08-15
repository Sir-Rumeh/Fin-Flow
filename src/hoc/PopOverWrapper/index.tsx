import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

interface Props {
  popoverId: number;
  buttonIcon: JSX.Element;
  children: JSX.Element;
  translationX: number;
  translationY: number;
}

const CustomPopover = ({ popoverId, buttonIcon, children, translationX, translationY }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `simple-popover${popoverId.toString()}` : undefined;

  return (
    <div className="">
      <Button aria-describedby={id} onClick={handleClick} className="normal-case">
        {buttonIcon}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: translationY,
          horizontal: translationX,
        }}
      >
        {children}
      </Popover>
    </div>
  );
};

export default CustomPopover;
