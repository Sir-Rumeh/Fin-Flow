import FormInput from 'components/FormElements/FormInput';
import ButtonComponent from 'components/FormElements/Button';
import { Dispatch, SetStateAction } from 'react';

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
      <div className="flex w-full items-end justify-end gap-x-4 py-2">
        <ButtonComponent
          color="purplePrimary"
          width="8rem"
          variant="outlined"
          height="3.4rem"
          onClick={handleFilter}
        >
          Filter By
        </ButtonComponent>
        <FormInput
          name={name}
          placeholder={placeholder}
          label={label}
          width={'22rem'}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default TableFilter;
