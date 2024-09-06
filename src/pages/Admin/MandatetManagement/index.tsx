import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import TableFilter from 'components/TableFilter';
import CustomTable from 'components/CustomTable';
import appRoutes from 'utils/constants/routes';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';
import {
  mandateRequestsList,
  muiDashboardMerchantsList,
  transactionHistory,
} from 'utils/constants';
import CustomPopover from 'hoc/PopOverWrapper';
import PopoverTitle from 'components/common/PopoverTitle';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import ExportBUtton from 'components/FormElements/ExportButton';
import { useFormik } from 'formik';
import { Box, Modal, Typography } from '@mui/material';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import { LiaTimesSolid } from 'react-icons/lia';
import { TabsProps } from 'utils/interfaces';
import CustomTabs from 'hoc/CustomTabs';
import { FiDownload } from 'react-icons/fi';
import CustomInput from 'components/FormElements/CustomInput';

const MandatetManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTransactionTab, setActiveTransactionTab] = useState('Successful');
  let mandateType = 'Fixed';
  const [modals, setModals] = useState({
    confirmDisable: false,
    disableSuccessful: false,
    confirmEnable: false,
    enableSuccessful: false,
    confirmDelete: false,
    deleteSuccessful: false,
    openTransactionHistory: false,
    editMandate: false,
    confirmEdit: false,
    editSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      searchMerchantName: '',
      fromDateFilter: '',
      toDateFilter: '',
      statusFilter: '',
    },
    onSubmit: (values) => {
      setSearchTerm('');
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'accountId',
      headerName: 'Account ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'merchantId',
      headerName: 'Merchant ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'mandateCode',
      headerName: 'Mandate Code',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'mandateType',
      headerName: 'Mandate Type',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      renderCell: (params: GridRenderCellParams) => {
        const renderIcon = (IconComponent: React.ComponentType, colorClass: string) => (
          <div className="flex w-full items-center gap-2 font-semibold">
            <IconComponent />
            <span className={`mb-[1px] ${colorClass}`}>{params?.row.status}</span>
          </div>
        );
        switch (params?.row.status) {
          case 'Enabled':
            return renderIcon(CreationRequestIcon, 'text-greenPrimary');
          case 'Disabled':
            return renderIcon(DeleteRequestIcon, 'text-redSecondary');
          default:
            return <span>{params?.row.status}</span>;
        }
      },
    },
    {
      field: 'dateRequested',
      headerName: 'Date Requested',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      valueGetter: (params: any) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead ',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="-ml-1 h-full border-none">
            <CustomPopover
              popoverId={params?.row.id}
              buttonIcon={<PopoverTitle title="Actions" />}
              translationX={-55}
              translationY={50}
            >
              <div className="flex flex-col rounded-md p-1 text-sm">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.mandateManagement.mandateDetails}`,
                      search: `?${createSearchParams({ id: params?.row.id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Details
                </button>
                <button
                  onClick={() => openModal('openTransactionHistory')}
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Transactions
                </button>

                {params?.row.mandateType === 'Variable' && (
                  <button
                    onClick={() => openModal('editMandate')}
                    type="button"
                    className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                  >
                    Update Amount
                  </button>
                )}

                {params?.row.status === 'Enabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmDisable')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                )}
                {params?.row.status === 'Disabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmEnable')}
                    className="w-full px-3 py-2 text-start font-[600] text-green-400 hover:bg-purpleSecondary"
                  >
                    Enable
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => openModal('confirmDelete')}
                  className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                >
                  Delete
                </button>
              </div>
            </CustomPopover>
          </div>
        );
      },
    },
  ];

  const transactionsTableColumn: GridColDef[] = [
    {
      field: 'accountId',
      headerName: 'Account ID',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: screen.width < 1000 ? 200 : undefined,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
    },
    {
      field: 'date',
      headerName: 'Date',
      width: screen.width < 1000 ? 50 : 50,
      flex: screen.width >= 1000 ? 1 : undefined,
      headerClassName: 'ag-thead',
      valueGetter: (params: any) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Action',
      headerClassName: 'ag-thead ',
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <button className="flex cursor-pointer items-center gap-3 font-medium text-lightPurple">
            <FiDownload />
            Download Receipt
          </button>
        );
      },
    },
  ];

  const total = 20;

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: 'Successful',
      tabTotal: total,
    },
    {
      tabIndex: 2,
      tabName: 'Failed',
      tabTotal: total,
    },
  ];

  return (
    <>
      <section className="p-2 md:p-4">
        <div className="fade-in-down my-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Mandate Management</h1>
          </div>
          <div className="w-auto">
            <ButtonComponent
              variant="contained"
              color="white"
              backgroundColor="#5C068C"
              hoverBackgroundColor="#2F0248"
              type="button"
              title="Create Mandate"
              customPaddingX="1.4rem"
              onClick={() => {
                navigate({
                  pathname: `/${appRoutes.adminDashboard.mandateManagement.createMandate}`,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="slide-down relative mt-5 flex flex-col items-center justify-center rounded-md bg-white p-2 md:p-4">
            <div className="flex w-full flex-col items-center justify-between gap-y-4 border-b pb-3 lg:flex-row">
              <div className="slide-down flex w-full items-center lg:w-[50%] lg:justify-start">
                <div className="">
                  <TableFilter
                    name={'searchMandate'}
                    placeholder={'Search Mandate'}
                    label={'Search Mandate'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={() => {}}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                  />
                </div>
              </div>
              <div className="flex w-full items-center justify-end gap-8 lg:w-[50%]">
                <ExportBUtton />
              </div>
            </div>

            <div className="mt-6 w-full">
              <CustomTable tableData={mandateRequestsList} columns={columns} rowCount={20} />
            </div>
          </div>
        </div>
      </section>
      {modals.confirmDisable && (
        <ModalWrapper
          isOpen={modals.confirmDisable}
          setIsOpen={() => closeModal('confirmDisable')}
          title={'Disable Mandate?'}
          info={'You are about to disable this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDisable');
            openModal('disableSuccessful');
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('disableSuccessful');
          }}
        />
      )}
      {modals.confirmEnable && (
        <ModalWrapper
          isOpen={modals.confirmEnable}
          setIsOpen={() => closeModal('confirmEnable')}
          title={'Enable Mandate?'}
          info={'You are about to enable this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEnable');
            openModal('enableSuccessful');
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('enableSuccessful');
          }}
        />
      )}
      {modals.confirmDelete && (
        <ModalWrapper
          isOpen={modals.confirmDelete}
          setIsOpen={() => closeModal('confirmDelete')}
          title={'Delete Mandate?'}
          info={'You are about to delete this mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDelete');
            openModal('deleteSuccessful');
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('deleteSuccessful');
          }}
        />
      )}

      {modals.openTransactionHistory && (
        <CustomModal
          isOpen={modals.openTransactionHistory}
          setIsOpen={() => closeModal('openTransactionHistory')}
          width={'900px'}
          paddingX={0}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl">Transaction History Details</h1>
              <button className="scale-[130%]" onClick={() => closeModal('openTransactionHistory')}>
                <LiaTimesSolid />
              </button>
            </div>
            <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="">
              <div className="flex items-center justify-between">
                <div className="flex w-full flex-row items-center justify-start gap-6 md:gap-10">
                  <CustomTabs
                    tabs={tabsList}
                    activeTab={activeTransactionTab}
                    setActiveTab={setActiveTransactionTab}
                  />
                </div>
                <div className="slide-down flexitems-center justify-end">
                  <TableFilter
                    name={'searchTransactionHistory'}
                    placeholder={'Search Transactions'}
                    label={'Search Transactions'}
                    value={searchTerm}
                    setSearch={setSearchTerm}
                    handleOptionsFilter={() => {}}
                    formik={formik}
                    fromDateName={'fromDateFilter'}
                    toDateName={'toDateFilter'}
                    selectName={'statusFilter'}
                    showOptionsFilter={false}
                  />
                </div>
              </div>
              <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
              <div className="slide-down mt-6">
                <CustomTable
                  tableData={transactionHistory}
                  columns={transactionsTableColumn}
                  rowCount={20}
                />
              </div>
            </div>
          </Typography>
        </CustomModal>
      )}
      {modals.editMandate && (
        <CustomModal
          isOpen={modals.editMandate}
          setIsOpen={() => closeModal('editMandate')}
          width={'800px'}
          paddingX={0}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="slide-down flex items-center justify-between">
              <h1 className="text-xl">Modify Mandate Details</h1>
              <button className="scale-[130%]" onClick={() => closeModal('editMandate')}>
                <LiaTimesSolid />
              </button>
            </div>
            <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {mandateType === 'Variable' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                noValidate
                className="slide-down mt-8 w-full"
              >
                <div className="mt-14 flex flex-col items-end gap-x-8 gap-y-4 md:flex-row md:items-center md:justify-between">
                  <div className="w-full">
                    <CustomInput
                      labelFor="modifiedAmount"
                      label="Modify Amount"
                      inputType="text"
                      placeholder="Enter here"
                      maxW="w-full"
                      verticalMargin={false}
                    />
                  </div>
                  <ButtonComponent
                    variant="contained"
                    color="white"
                    backgroundColor="#5C068C"
                    hoverBackgroundColor="#2F0248"
                    type="submit"
                    title="Save"
                    height="3rem"
                    width="9rem"
                    customPaddingX="1.4rem"
                    onClick={() => {
                      closeModal('editMandate');
                      openModal('confirmEdit');
                    }}
                  />
                </div>
              </form>
            ) : (
              <span className="slide-down flex items-center justify-start gap-1">
                <h3 className="text-red-300">Error:</h3>
                <h3 className="">You cannot modify a fixed mandate</h3>
              </span>
            )}
          </Typography>
        </CustomModal>
      )}
      {modals.confirmEdit && (
        <ModalWrapper
          isOpen={modals.confirmEdit}
          setIsOpen={() => closeModal('confirmEdit')}
          title={'Save Changes?'}
          info={
            'You are about to save changes made to this mandate, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEdit');
            openModal('editSuccessful');
          }}
        />
      )}
      {modals.editSuccessful && (
        <ModalWrapper
          isOpen={modals.editSuccessful}
          setIsOpen={() => closeModal('editSuccessful')}
          title={'Success!!'}
          info={'You have successfully saved new changes'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('editSuccessful');
          }}
        />
      )}
    </>
  );
};

export default MandatetManagement;
