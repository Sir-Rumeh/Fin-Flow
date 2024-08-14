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
import { merchantsList } from 'utils/constants';
import DarkArrowDown from 'assets/icons/DarkArrowDown';

const MerchantsList = ({ merchantStatus = 'approved' }: { merchantStatus: string }) => {
  const [viewMerchant, setViewMerchant] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [merchantDetails, setMerchantDetails] = useState<number>();

  const [dataTableState, setDataTableState] = useState<DataTableState>({
    resetPaginationToggle: false,
    pageSize: 10,
    pageNumber: 1,
  });

  const merchantTableColumn: TableColumn<MerchantDataRow>[] = [
    {
      name: 'Merchant ID',
      id: 'merchantId',
      cell: (row) =>
        useMemo(
          () => (
            <p className="flex w-[100px] items-center justify-center">{row.id ? row.id : 'NA'}</p>
          ),
          [row.id],
        ),
      style: {
        fontSize: '16px',
        justifyContent: 'start',
      },
    },
    {
      name: 'Merchant Name',
      id: 'merchantName',
      cell: (row) =>
        useMemo(
          () => (
            <p className="flex w-[100px] items-center justify-center">
              {row.merchantName ? `${row.merchantName}` : 'NA'}
            </p>
          ),
          [row.id],
        ),
      style: {
        fontSize: '16px',
        justifyContent: 'start',
      },
    },
    {
      name: 'CIF Number',
      id: 'cifNumber',
      selector: (row) => (row.cifNumber ? row.cifNumber : 'NA'),
      style: {
        fontSize: '16px',
        justifyContent: 'start',
      },
    },
    {
      name: 'Status',
      id: 'status',
      selector: (row) => (row.status ? row.status : 'NA'),
      style: {
        fontSize: '16px',
        justifyContent: 'start',
        overflow: 'visible',
      },
    },
    {
      name: 'Date Requested',
      id: 'dateRequested',
      cell: (row) =>
        useMemo(
          () => (
            <p className="flex -translate-x-5 items-center justify-center">{`${row.dateRequested ? `${dayjs(row.dateRequested).format('DD/MM/YYYY')} | ${dayjs(row.dateRequested).format('hh:mm:ss A')}` : 'NA'} `}</p>
          ),
          [row.id],
        ),
      style: {
        fontSize: '16px',
        justifyContent: 'start',
      },
    },
    {
      name: 'Action',
      id: 'action',
      style: {
        fontSize: '16px',
        justifyContent: 'start',
      },
      cell: (row) =>
        useMemo(
          () => (
            <div className="flex w-[100px] flex-col items-center justify-between">
              <button
                className="flex items-center justify-center gap-x-1 rounded-md bg-backgroundColor p-2"
                onClick={() => {}}
              >
                Actions <DarkArrowDown />
              </button>
              <></>
            </div>
          ),
          [row.id],
        ),
    },
  ];
  return (
    <>
      <div className="">
        {merchantsList?.length > 0 ? (
          <div className="relative bg-white">
            <div className="slide-down mb-6 mt-2 flex items-center justify-between px-2 lg:max-w-[50%]">
              <TableFilter
                name={'merchantsFilter'}
                placeholder={'Search Merchant'}
                label={'Search Merchant'}
                value={searchTerm}
                handleFilter={() => setSearchTerm('')}
                setSearch={setSearchTerm}
              />
            </div>
            <div className="fade-in-down">
              <DataTableBase
                columns={merchantTableColumn}
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
          </div>
        ) : (
          <div className="mt-8 flex h-[65vh] flex-col items-center justify-center p-4">
            <div>
              <img src={TableLogo} alt="group_logo" />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold">Oops! No Active Merchants</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MerchantsList;
