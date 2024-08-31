import { SetStateAction, Dispatch } from 'react';
import Modal from 'hoc/ModalWrapper/CustomModal';
import ButtonComponent from 'components/FormElements/Button';

interface PopupProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  info: any;
  feedback?: React.ReactNode;
  icon: JSX.Element;
  type: 'confirmation' | 'completed';
  width?: string;
  proceedAction?: () => void;
  proceedBackgroundColor?: string;
  hoverBackgroundColor?: string;
}

export const ModalWrapper = ({
  isOpen,
  setIsOpen,
  title,
  info,
  feedback,
  icon,
  type,
  width = '650px',
  proceedAction,
  proceedBackgroundColor,
  hoverBackgroundColor,
}: PopupProps) => {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} width={width}>
        <div className="mb-4 w-full p-1 text-center">
          <div className="mb-6 flex flex-col items-center justify-center gap-y-3">
            {icon}
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <div className="mb-8 text-xl tracking-wider">{info}</div>
          <div className="mt-6 w-full">{feedback}</div>
          <div className="mt-[2.5rem]">
            {type === 'confirmation' && (
              <div className="flex items-center justify-center gap-x-5">
                <ButtonComponent
                  color="#5C068C"
                  borderColor="#5C068C"
                  border={0.5}
                  width="15rem"
                  onClick={() => setIsOpen(false)}
                  title="No, Cancel"
                />
                <ButtonComponent
                  color="white"
                  width="15rem"
                  variant="contained"
                  backgroundColor={proceedBackgroundColor ? proceedBackgroundColor : ''}
                  hoverBackgroundColor={hoverBackgroundColor ? hoverBackgroundColor : ''}
                  onClick={proceedAction}
                  title="Yes, Proceed"
                />
              </div>
            )}
            {type === 'completed' && (
              <ButtonComponent
                variant="contained"
                color="white"
                type="button"
                title="Okay"
                onClick={proceedAction}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
