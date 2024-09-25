import { SetStateAction, Dispatch } from 'react';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
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
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} width={width}>
        <div className="mb-4 w-full p-1 px-6 text-center">
          <div className="mb-6 flex flex-col items-center justify-center gap-y-3">
            {icon}
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <div className="text-xl tracking-wider">{info}</div>
          {feedback && <div className="mt-20 w-full">{feedback}</div>}
          <div className="mt-10 w-full">
            {type === 'confirmation' && (
              <div className="flex items-center justify-between gap-x-5">
                <ButtonComponent
                  color="#5C068C"
                  borderColor="#5C068C"
                  border={0.5}
                  width="15rem"
                  height="3rem"
                  onClick={() => setIsOpen(false)}
                  title="No, Cancel"
                  fontWeight={900}
                />
                <ButtonComponent
                  color="white"
                  width="15rem"
                  height="3rem"
                  variant="contained"
                  backgroundColor={proceedBackgroundColor ? proceedBackgroundColor : '#5C068C'}
                  hoverBackgroundColor={hoverBackgroundColor ? hoverBackgroundColor : '#2F0248'}
                  onClick={proceedAction}
                  title="Yes, Proceed"
                  fontWeight={900}
                />
              </div>
            )}
            {type === 'completed' && (
              <ButtonComponent
                variant="contained"
                color="white"
                type="button"
                title="Okay"
                fontWeight={900}
                onClick={proceedAction}
              />
            )}
          </div>
        </div>
      </CustomModal>
    </>
  );
};
