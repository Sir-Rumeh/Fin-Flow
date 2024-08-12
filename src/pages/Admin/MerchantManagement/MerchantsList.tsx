import { useState, useMemo } from 'react';
import type { TableColumn } from 'react-data-table-component';
import TableLogo from 'assets/images/table_logo.png';
import DataTableBase from 'components/DataTable';
import dayjs from 'dayjs';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { PaginationChangeRowsPerPage } from 'react-data-table-component/dist/DataTable/types';
import { DataTableState, MerchantDataRow } from 'utils/interfaces';
import { handleNextPageChange, handlePreviousPageChange } from 'utils/helpers';
import TableFilter from 'components/TableFilter';

const MerchantsList = ({ merchantStatus = 'approved' }: { merchantStatus: string }) => {
  const merchantsList: MerchantDataRow[] = [
    {
      id: 1,
      merchantName: 'string',
      cifNumber: 'string',
      status: 'string',
      dateRequested: '2015-03-25T12:00:00-06:30',
    },
    {
      id: 2,
      merchantName: 'string',
      cifNumber: 'string',
      status: 'string',
      dateRequested: '2015-03-25T12:00:00-06:30',
    },
    {
      id: 3,
      merchantName: 'string',
      cifNumber: 'string',
      status: 'string',
      dateRequested: '2015-03-25T12:00:00-06:30',
    },
    {
      id: 4,
      merchantName: 'string',
      cifNumber: 'string',
      status: 'string',
      dateRequested: '2015-03-25T12:00:00-06:30',
    },
  ];

  const [viewMerchant, setViewMerchant] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [merchantDetails, setMerchantDetails] = useState<number>();

  const [dataTableState, setDataTableState] = useState<DataTableState>({
    resetPaginationToggle: false,
    pageSize: 10,
    pageNumber: 1,
  });

  const activePortfolioColumn: TableColumn<MerchantDataRow>[] = [
    {
      name: 'Merchant ID',
      selector: (row) => (row.id ? row.id : 'NA'),
      style: {
        fontWeight: 300,
        fontSize: '16px',
        justifyContent: 'start',
      },
    },
    {
      name: 'Merchant Name',
      selector: (row) => (row.merchantName ? `${row.merchantName}` : 'NA'),
      style: {
        fontWeight: 300,
        fontSize: '16px',
        justifyContent: 'start',
      },
    },
    {
      name: 'CIF Number',
      selector: (row) => (row.cifNumber ? row.cifNumber : 'NA'),
      style: {
        fontWeight: 300,
        fontSize: '16px',
        justifyContent: 'start',
      },
    },
    {
      name: 'Status',
      selector: (row) => (row.status ? row.status : 'NA'),
      style: {
        fontWeight: 300,
        fontSize: '16px',
        justifyContent: 'start',
        overflow: 'visible',
      },
    },
    {
      name: 'Date Requested',
      selector: (row) => (row.dateRequested ? dayjs(row.dateRequested).format('DD/MM/YYYY') : 'NA'),
      style: {
        fontWeight: 300,
        fontSize: '16px',
        justifyContent: 'start',
      },
    },
    {
      name: 'Action',
      style: {
        fontWeight: 300,
        fontSize: '16px',
        justifyContent: 'start',
      },

      cell: (row) => useMemo(() => <div>{row.id}</div>, [row.id]),
    },
  ];
  return (
    <>
      <div>
        {merchantsList?.length > 0 ? (
          <div className="px-1">
            <div className="my-8">
              <TableFilter
                name={'merchantsFilter'}
                placeholder={'Search Merchant'}
                label={'Search Merchant'}
                value={searchTerm}
                handleFilter={() => setSearchTerm('')}
                setSearch={setSearchTerm}
              />
            </div>
            <DataTableBase
              columns={activePortfolioColumn}
              data={merchantsList}
              pointerOnHover
              onRowClicked={(row: MerchantDataRow) => {
                setMerchantDetails(row.id);
                setViewMerchant(true);
              }}
              subHeader={null}
              subHeaderComponent={null}
              selectableRowsHighlight
              paginationServer
              paginationIconFirstPage={null}
              paginationIconLastPage={null}
              // paginationTotalRows={merchantsList?.totalNumberOfItems}
              // pagination={merchantsList?.totalNumberOfItems >= 11}
              paginationResetDefaultPage={dataTableState.resetPaginationToggle}
              onChangeRowsPerPage={(newPerPage: any) => {
                setDataTableState?.((prev) => {
                  return {
                    ...prev,
                    pageNumber: 1,
                    pageSize: newPerPage as number,
                    resetPaginationToggle: !prev.resetPaginationToggle,
                  };
                }) as unknown as PaginationChangeRowsPerPage;
              }}
              paginationIconNext={
                <span
                  role="none"
                  className="flex h-full w-full items-center justify-center hover:scale-[150%]"
                  onClick={() =>
                    handleNextPageChange(
                      dataTableState.pageNumber + 1,
                      dataTableState,
                      setDataTableState,
                      merchantsList,
                    )
                  }
                >
                  <IoIosArrowDropright className="text-primary text-6xl disabled:opacity-25" />
                </span>
              }
              paginationIconPrevious={
                <span
                  role="none"
                  className="flex h-full w-full items-center justify-center hover:scale-[150%]"
                  onClick={() =>
                    handlePreviousPageChange(dataTableState.pageNumber - 1, setDataTableState)
                  }
                >
                  <IoIosArrowDropleft className="text-primary text-6xl disabled:opacity-25" />
                </span>
              }
            />
          </div>
        ) : (
          <div className="mt-8 flex h-[65vh] flex-col items-center justify-center p-4">
            <div>
              <img src={TableLogo} alt="group_logo" />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold">Oops! No Active Portfolio</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MerchantsList;
