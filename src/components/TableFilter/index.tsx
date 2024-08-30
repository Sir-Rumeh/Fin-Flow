import FormInput from 'components/FormElements/FormInput';
import ButtonComponent from 'components/FormElements/Button';
import { Dispatch, SetStateAction } from 'react';
import { IoFilter } from 'react-icons/io5';

interface TableFilterProps {
  name: string;
  placeholder: string;
  label: string;
  value: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleFilter?: () => void;
}

const TableFilter = ({
  name,
  placeholder,
  label,
  value,
  handleFilter,
  setSearch,
}: TableFilterProps) => {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-x-4 gap-y-3 py-2 md:flex-row md:items-center">
        <ButtonComponent
          onClick={() => {}}
          title="Filter by"
          children={<IoFilter className="mb-[1px] ml-3 h-5 w-5" />}
          color="#5C068C"
          border={1}
          height="3rem"
          customPaddingX="1.3rem"
        />

        <FormInput
          name={name}
          placeholder={placeholder}
          label={label}
          width={'20rem'}
          height={'3rem'}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default TableFilter;
