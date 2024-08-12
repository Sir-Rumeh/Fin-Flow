import { ReactNode } from 'react';
import DataTable, { TableProps } from 'react-data-table-component';
import { Checkbox } from '@mui/material';
import ArrowDownIcon from 'assets/icons/ArrowDownIcon';

const sortIcon = <ArrowDownIcon />;
const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
};

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  const customStyles = {
    rows: {
      style: {
        borderRadius: '0.3rem',
      },
    },
    headCells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '8px',
        paddingTop: '18px',
        paddingBottom: '18px',
        height: '70px',
        fontWeight: 500,
        fontSize: '17px',
        backgroundColor: '#F8F8F9',
      },
    },
    cells: {
      style: {
        paddingLeft: '18px',
        paddingRight: '8px',
        paddingTop: '20px',
        paddingBottom: '20px',
        height: '70px',
        color: '#222823',
        opacity: '90%',
        fontWeight: 600,
      },
    },
  };

  return (
    <DataTable
      selectableRowsComponent={Checkbox as unknown as ReactNode}
      selectableRowsComponentProps={selectProps}
      sortIcon={sortIcon}
      dense
      {...props}
      customStyles={customStyles}
      highlightOnHover
      responsive
    />
  );
}

export default DataTableBase;
