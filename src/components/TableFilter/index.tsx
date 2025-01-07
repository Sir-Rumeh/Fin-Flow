import ButtonComponent from 'components/FormElements/Button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CustomPopover from 'hoc/PopOverWrapper';
import MuiDatePicker from 'components/FormElements/DatePicker';
import { requestTypeDropdownOptions, statusDropdownOptions } from 'utils/constants';
import { FilterIcon } from 'assets/icons';
import SearchIcon from 'assets/icons/SearchIcon';
import { useMediaQuery } from '@mui/material';
import FormSelect from 'components/FormElements/FormSelect';
import { notifyError } from 'utils/helpers';

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
  isRequestsFilter?: boolean;
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
  isRequestsFilter = false,
  translationX,
  translationY,
}: TableFilterProps) => {
  const [closeFilterCard, setCloseFilterCard] = useState(false);
  const [pulse, setPulse] = useState(false);
  const isSmallWidth = useMediaQuery('(max-width:1440px)');
  const isMobileWidth = useMediaQuery('(max-width:575px)');
  const isMediumWidth = useMediaQuery('(min-width:1024px) and (max-width:1280px)');

  const clearFilter = () => {
    formik.setFieldValue(selectName, null);
    formik.setFieldValue(fromDateName, null);
    formik.setFieldValue(toDateName, null);
  };

  useEffect(() => {
    if (formik.values[fromDateName] && formik.values[toDateName]) {
      const startDate = new Date(formik.values[fromDateName]);
      const endDate = new Date(formik.values[toDateName]);
      if (startDate > endDate) {
        formik.setFieldValue(fromDateName, null);
        formik.setFieldValue(toDateName, null);
        notifyError('Start date should be less than end date');
      }
    }
  }, [formik.values[fromDateName], formik.values[toDateName]]);

  return (
    <>
      <div className="flex w-full items-center justify-between gap-3 py-2">
        {showOptionsFilter && (
          <div className="">
            <CustomPopover
              popoverId={2}
              buttonIcon={
                <>
                  <div
                    className={`flex w-full items-center justify-between gap-x-1 rounded-[6px] border border-[#a772c4] px-[0.9rem] py-[8px] text-gray-400`}
                  >
                    <p>Filter by</p>
                    <div
                      className={`${isMobileWidth ? 'scale-75' : isSmallWidth ? 'scale-95' : 'scale-100'} `}
                    >
                      <FilterIcon />
                    </div>
                  </div>
                </>
              }
              closeOnClick={false}
              translationX={translationX ? translationX : 0}
              translationY={translationY ? translationY : 56}
              borderRadius="1.7rem"
              closeCard={closeFilterCard}
              scale="80%"
            >
              <div className="relative h-auto flex-col overflow-y-hidden px-6 pb-14 pt-4">
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
                    className={`text-lg ${pulse ? 'scale-95 duration-75' : 'scale-100'} rounded-lg px-3 py-1 font-semibold text-[#B42318] hover:bg-[#f8efed]`}
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
                    label={isRequestsFilter ? 'Request Type' : 'Status'}
                    formik={formik}
                    options={isRequestsFilter ? requestTypeDropdownOptions : statusDropdownOptions}
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
                      onClick={() => setCloseFilterCard(true)}
                      title="Cancel"
                      fontWeight={500}
                    />
                  </div>
                  <div className="relative w-[50%] sm:w-[15rem]">
                    <ButtonComponent
                      color="white"
                      backgroundColor="#5C068C"
                      hoverBackgroundColor="#2F0248"
                      height="3rem"
                      variant="contained"
                      onClick={() => {
                        handleOptionsFilter();
                        setCloseFilterCard(true);
                      }}
                      title="Filter"
                      fontWeight={500}
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
              height={'100%'}
              value={formik.values[name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.setFieldValue(name, e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  formik.handleSubmit();
                }
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default TableFilter;
