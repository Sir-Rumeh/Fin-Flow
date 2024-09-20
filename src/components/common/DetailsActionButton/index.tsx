import { useMediaQuery } from '@mui/material';

import WhiteArrowDown from 'assets/icons/WhiteArrowDown';

export default function DetailsActionButton() {
  const isMobileWidth = useMediaQuery('(max-width:575px)');
  const isSmallWidth = useMediaQuery('(max-width:1440px)');
  return (
    <>
      <div
        className={`flex items-center justify-between gap-x-2 rounded-[6px] bg-[#5C068C] px-[1.2rem] py-[0.6rem] text-white hover:bg-[#2F0248]`}
      >
        <p>Actions</p>
        <div className={`${isMobileWidth ? 'scale-75' : isSmallWidth ? 'scale-95' : 'scale-100'} `}>
          <WhiteArrowDown />
        </div>
      </div>
    </>
  );
}
