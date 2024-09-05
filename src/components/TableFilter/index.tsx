import FormInput from 'components/FormElements/FormInput';
import ButtonComponent from 'components/FormElements/Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import { BiSearch } from 'react-icons/bi';
import CustomPopover from 'hoc/PopOverWrapper';
import MuiDatePicker from 'components/FormElements/DatePicker';
import SelectComponent from 'components/FormElements/SelectComponent';
import { statusDropdownOptions } from 'utils/constants';

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
}: TableFilterProps) => {
  const [closeFilterCard, setCloseFilterCard] = useState(false);

  const clearFilter = () => {
    formik.setFieldValue(fromDateName, null);
    formik.setFieldValue(toDateName, null);
    formik.setFieldValue(selectName, 'All');
  };
  return (
    <>
      <div className="flex w-full flex-col items-start gap-x-4 gap-y-3 py-2 md:flex-row md:items-center">
        {showOptionsFilter && (
          <div className="">
            <CustomPopover
              popoverId={2}
              buttonIcon={
                <ButtonComponent
                  title="Filter by"
                  children={<IoFilter className="mb-[1px] ml-3 h-5 w-5" />}
                  color="#5C068C"
                  border={1}
                  customPaddingX="1.3rem"
                />
              }
              closeOnClick={false}
              translationX={8}
              translationY={56}
              borderRadius="1.7rem"
              closeCard={closeFilterCard}
            >
              <div className="flex-col p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Filter By</h3>
                  <button
                    type="button"
                    onClick={() => clearFilter()}
                    className="font-semibold text-[#B42318]"
                  >
                    Clear Filter
                  </button>
                </div>

                <div className="mt-6">
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

                <div className="mt-6">
                  <h3 className="font-bold">Status</h3>
                  <div className="relative mt-2 flex w-full flex-col justify-between gap-4 overflow-hidden sm:flex-row sm:items-center">
                    <div className="mt-2 w-full">
                      <SelectComponent
                        name={selectName}
                        formik={formik}
                        options={statusDropdownOptions}
                        label={formik.values[selectName] ? 'Status' : 'All'}
                        maxWidth={700}
                        initialItem=""
                      />
                    </div>
                  </div>
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
          <FormInput
            name={name}
            placeholder={placeholder}
            label={label}
            width={'20rem'}
            height={'2.8rem'}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            startIcon={<BiSearch />}
          />
        </form>
      </div>
    </>
  );
};

export default TableFilter;
