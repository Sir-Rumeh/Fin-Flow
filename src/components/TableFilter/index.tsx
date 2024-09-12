import ButtonComponent from 'components/FormElements/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import CustomPopover from 'hoc/PopOverWrapper';
import MuiDatePicker from 'components/FormElements/DatePicker';
import { statusDropdownOptions } from 'utils/constants';
import { FilterIcon } from 'assets/icons';
import SearchIcon from 'assets/icons/SearchIcon';
import { useMediaQuery } from '@mui/material';
import FormSelect from 'components/FormElements/FormSelect';

interface TableFilterProps {
  name: string;
  placeholder: string;
  label: string;
  value: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleOptionsFilter: () => void;
  formik: any;
  fromDateName: string;
  toDateName: string;
  selectName: string;
  showOptionsFilter?: boolean;
  translationX?: number;
  translationY?: number;
}

const TableFilter = ({
  name,
  placeholder,
  label,
  value,
  setSearch,
  handleOptionsFilter,
  formik,
  fromDateName,
  toDateName,
  selectName,
  showOptionsFilter = true,
  translationX,
  translationY,
}: TableFilterProps) => {
  const [closeFilterCard, setCloseFilterCard] = useState(false);
  const [pulse, setPulse] = useState(false);
  const isSmallWidth = useMediaQuery('(max-width:1440px)');
  const isMediumWidth = useMediaQuery('(min-width:1024px) and (max-width:1280px)');

  const clearFilter = () => {
    formik.setFieldValue(fromDateName, null);
    formik.setFieldValue(toDateName, null);
    formik.setFieldValue(selectName, 'All');
  };
  return (
    <>
      <div className="flex w-full items-center gap-2 py-2">
        {showOptionsFilter && (
          <div className="-ml-4 sm:-ml-0">
            <CustomPopover
              popoverId={2}
              buttonIcon={
                <ButtonComponent
                  title="Filter by"
                  children={
                    <div className={`${isSmallWidth ? 'scale-95' : 'scale-100'} ml-1`}>
                      <FilterIcon />
                    </div>
                  }
                  color="grey"
                  borderColor="#a772c4"
                  border={1}
                  customPaddingX="1rem"
                  width={isMediumWidth ? '8rem' : undefined}
                />
              }
              closeOnClick={false}
              translationX={translationX ? translationX : 8}
              translationY={translationY ? translationY : 56}
              borderRadius="1.7rem"
              closeCard={closeFilterCard}
              scale="80%"
            >
              <div className="relative h-auto flex-col overflow-y-hidden px-6 pt-4 lg:pb-10">
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-lg font-bold">Filter By</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setPulse(true);
                      clearFilter();
                      setTimeout(() => {
                        setPulse(false);
                      }, 300);
                    }}
                    className={`text-lg ${pulse ? 'scale-95 animate-pulse opacity-85 duration-75' : 'scale-100'} rounded-lg px-3 py-1 font-semibold text-[#B42318] hover:bg-[#f8efed]`}
                  >
                    Clear Filter
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="font-bold">Date</h3>
                  <div className="relative mt-2 flex w-full flex-col justify-between gap-4 overflow-hidden sm:flex-row sm:items-center">
                    <div className="mt-2">
                      <MuiDatePicker name={fromDateName} formik={formik} label="From Date" />
                    </div>
                    <div className="mt-2">
                      <MuiDatePicker name={toDateName} formik={formik} label="To Date" />
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <FormSelect
                    labelFor={selectName}
                    label="Status"
                    formik={formik}
                    options={statusDropdownOptions}
                    scrollableOptions
                    labelFontWeight="font-bold"
                  />
                </div>

                <div className="mt-8 flex w-full justify-between sm:items-center sm:gap-4">
                  <div className="relative w-[50%] sm:w-[15rem]">
                    <ButtonComponent
                      color="#5C068C"
                      borderColor="#5C068C"
                      border={0.5}
                      height="3rem"
                      onClick={() => setCloseFilterCard(!closeFilterCard)}
                      title="Cancel"
                    />
                  </div>
                  <div className="relative w-[50%] sm:w-[15rem]">
                    <ButtonComponent
                      color="white"
                      height="3rem"
                      variant="contained"
                      onClick={handleOptionsFilter}
                      title="Filter"
                    />
                  </div>
                </div>
              </div>
            </CustomPopover>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="flex h-[2.67rem] cursor-pointer items-center gap-2 rounded-lg border border-[#a772c4] px-3 py-2 sm:w-[309px]">
            <SearchIcon className="scale-110" />
            <input
              type="text"
              className="w-full border-none focus:border-none focus:outline-none"
              name={name}
              placeholder={placeholder}
              width={'20rem'}
              height={'100%'}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default TableFilter;
