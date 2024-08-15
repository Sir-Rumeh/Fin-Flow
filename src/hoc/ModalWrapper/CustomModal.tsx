import type { Dispatch, SetStateAction } from 'react';
import CloseIcon from 'assets/icons/CloseIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface Props {
  title?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  width?: string;
}

const CustomModal = ({ title, isOpen, setIsOpen, children, width = 'w-[700px]' }: Props) => {
  const boxStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    bgcolor: 'white',
    borderRadius: '1rem',
    boxShadow: 24,
    px: 5,
    py: 6,
  };
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Modal
        className="z-10"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <Typography id="modal-modal-description" sx={{ fontSize: 20, fontWeight: 600 }}>
                {title}
              </Typography>
              <button type="button" className="mr-3" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="px-5">{children}</div>
          </div>
        </Box>
      </Modal>
      {/*  */}
    </>
  );
};

export default CustomModal;
