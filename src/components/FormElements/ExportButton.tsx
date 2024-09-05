import { Button } from '@mui/material';
import { MouseEvent } from 'react';
import ButtonComponent from './Button';
import { BiChevronDown } from 'react-icons/bi';
import CustomPopover from 'hoc/PopOverWrapper';

type Props = {
  customClass?: string;
};

const ExportBUtton = (props: Props) => {
  return (
    <div className={`relative ${props.customClass}`}>
      <div className="">
        <CustomPopover
          popoverId={3}
          buttonIcon={
            <ButtonComponent
              onClick={() => {}}
              title="Export"
              children={<BiChevronDown className="mb-[3px] ml-1 h-8 w-8" />}
              color="#5C068C"
              border={1}
              customPaddingX="1.3rem"
            />
          }
          translationX={8}
          translationY={56}
        >
          <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
            <button
              type="button"
              onClick={() => {}}
              className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
            >
              CSV
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
            >
              Excel
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
            >
              PDF
            </button>
          </div>
        </CustomPopover>
      </div>
    </div>
  );
};

export default ExportBUtton;
