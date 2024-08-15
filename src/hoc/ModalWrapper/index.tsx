import { SetStateAction, Dispatch } from 'react';
import Modal from 'hoc/ModalWrapper/CustomModal';
import ButtonComponent from 'components/FormElements/Button';

interface PopupProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  info: string;
  icon: JSX.Element;
  type: string;
  proceedAction?: () => void;
}

export const ModalWrapper = ({
  isOpen,
  setIsOpen,
  title,
  info,
  icon,
  type,
  proceedAction,
}: PopupProps) => {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} width="w-[595px]">
        <div className="mb-4 text-center">
          <div className="mb-6 flex flex-col items-center justify-center gap-y-3">
            {icon}
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <h2 className="mb-8 text-xl tracking-wider">{info}</h2>

          {type === 'confirmation' && (
            <div className="mb-6 mt-8 flex items-center justify-center gap-x-5">
              <ButtonComponent
                color="red"
                width="15rem"
                onClick={() => setIsOpen(false)}
                title="No, Cancel"
              />

              <ButtonComponent
                color="white"
                width="15rem"
                variant="contained"
                onClick={() => proceedAction?.()}
                title="Yes Proceed"
              />
            </div>
          )}
          {type === 'completed' && (
            <ButtonComponent
              variant="contained"
              color="white"
              type="button"
              title="Okay"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
