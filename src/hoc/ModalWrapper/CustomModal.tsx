import type { Dispatch, SetStateAction } from 'react';
import CloseIcon from 'assets/icons/CloseIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';

interface Props {
  title?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  width?: string;
}

const CustomModal = ({ title, isOpen, setIsOpen, children, width = '700px' }: Props) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px)');
  const boxStyle = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) ${
      isMobile ? 'scale(0.6)' : isTablet ? 'scale(0.8)' : 'scale(1)'
    }`,
    transition: 'transform 0.3s ease-in-out',
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
            <div className="px-5">{children}</div>
          </div>
        </Box>
      </Modal>
      {/*  */}
    </>
  );
};

export default CustomModal;
