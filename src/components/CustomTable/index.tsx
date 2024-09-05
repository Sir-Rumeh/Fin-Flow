import { DataGrid, gridClasses } from '@mui/x-data-grid';
import TableLogo from 'assets/images/table_logo.png';
import { useState } from 'react';

interface CustomTableProps {
  tableData: any;
  columns: any;
  rowCount: number;
}

function CustomTable({ tableData, columns, rowCount }: CustomTableProps): JSX.Element {
  const [paginationData, setPaginationData] = useState({
    pageNumber: 0,
    pageSize: 10,
  });
  const handlePageSizeChange = (newPageSize: { page: number; pageSize: number }) => {
    if (newPageSize.pageSize !== paginationData.pageSize) {
      setPaginationData((prev) => {
        return {
          ...prev,
          pageSize: newPageSize.pageSize,
          pageNumber: 0,
        };
      });
    } else {
      setPaginationData((prev) => {
        return {
          ...prev,
          pageSize: newPageSize.pageSize,
          pageNumber: newPageSize.page,
        };
      });
    }
  };
  return (
    <div className="slide-down w-full">
      {tableData?.length > 0 ? (
        <DataGrid
          rows={tableData}
          columns={columns}
          sx={{
            border: 0,
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
              outline: 'none',
            },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
              outline: 'none',
            },
          }}
          rowHeight={70}
          columnHeaderHeight={70}
          disableRowSelectionOnClick
          disableColumnMenu
          pagination
          onPaginationModelChange={handlePageSizeChange}
          pageSizeOptions={[10, 20, 30]}
          paginationModel={{ page: paginationData.pageNumber, pageSize: paginationData.pageSize }}
          paginationMode="server"
          rowCount={rowCount}
        />
      ) : (
        <div className="slide-down mt-8 flex h-[30vh] flex-col items-center justify-center p-4 pb-8">
          <div>
            <img src={TableLogo} alt="group_logo" />
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold">Oops! No Active Data</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomTable;
