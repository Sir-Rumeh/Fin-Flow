import { Button } from '@mui/material';
import { MouseEvent } from 'react';
import ButtonComponent from './Button';
import { BiChevronDown } from 'react-icons/bi';

type Props = {
  customClass?: string;
};

const ExportBUtton = (props: Props) => {
  return (
    <div className={` ${props.customClass}`}>
      <ButtonComponent
        onClick={() => {}}
        title="Export"
        children={<BiChevronDown className="mb-[1px] ml-2 h-8 w-8" />}
        color="#5C068C"
        border={1}
        height="3rem"
        customPaddingX="1.3rem"
      />
    </div>
  );
};

export default ExportBUtton;
