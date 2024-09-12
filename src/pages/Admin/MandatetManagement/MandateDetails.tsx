import { Link, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { UpdateRequestIcon } from 'assets/icons';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import ButtonComponent from 'components/FormElements/Button';
import WhiteArrowDown from 'assets/icons/WhiteArrowDown';
import CustomPopover from 'hoc/PopOverWrapper';
import { useState } from 'react';
import CustomModal from 'hoc/ModalWrapper/CustomModal';
import { Typography } from '@mui/material';

import CustomTabs from 'hoc/CustomTabs';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { TabsProps } from 'utils/interfaces';
import CustomTable from 'components/CustomTable';
import { transactionHistory } from 'utils/constants';
import { GridColDef } from '@mui/x-data-grid';
import DownloadIcon from 'assets/icons/DownloadIcon';
import TableFilter from 'components/TableFilter';
import { useFormik } from 'formik';
import CustomInput from 'components/FormElements/CustomInput';
import ChevronRight from 'assets/icons/ChevronRight';
import CloseIcon from 'assets/icons/CloseIcon';

const MandateDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTransactionTab, setActiveTransactionTab] = useState('Successful');
  const [searchTerm, setSearchTerm] = useState('');
  const id = searchParams?.get('id') || '';
  let mandateType = 'Variable';
  let mandateStatus = 'Disabled';

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
      startDate: '',
    },
    onSubmit: (values: any) => {
      setSearchTerm('');
    },
  });

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
            <DownloadIcon />
            Download Receipt
          </button>
        );
      },
    },
  ];
  return (
    <>
      <div className="px-5 py-1">
        <div className="mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.mandateManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Mandate Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Mandate Details</span>
        </div>

        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">Mandate ID : Req123456</h2>
          </div>
          <div className="w-auto">
            <CustomPopover
              popoverId={1}
              buttonIcon={
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  endIcon={<WhiteArrowDown />}
                  type="button"
                  title="Actions"
                  customPaddingX="1.4rem"
                />
              }
              translationX={8}
              translationY={54}
            >
              <div className="flex flex-col rounded-md p-1">
                <button
                  onClick={() => openModal('openTransactionHistory')}
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Transactions
                </button>

                {mandateType === 'Variable' && (
                  <button
                    onClick={() => openModal('editMandate')}
                    type="button"
                    className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                  >
                    Update Amount
                  </button>
                )}

                {mandateStatus === 'Enabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmDisable')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                )}
                {mandateStatus === 'Disabled' && (
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
        </div>

        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="">
            <ItemDetailsContainer
              title="Mandate Details"
              titleExtension={
                <>
                  <div className="flex items-center justify-end gap-2">
                    <p className="text-sm text-darkgray">Mandate Type:</p>
                    <UpdateRequestIcon />
                    <p className="mb-[1px] font-semibold text-lightPurple">{mandateType}</p>
                  </div>
                </>
              }
            >
              <DetailsCard title="Account ID" content="1234545" />
              <DetailsCard title="Merchant ID" content="1234545" />
              <DetailsCard title="Merchant Code" content="1234545" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              <DetailsCard title="Merchant ID" content="1234545" />
              <DetailsCard title="Amount" content="N5,000,000" />
              <DetailsCard title="Effective Date" content="12/12/2024" />
              <DetailsCard title="End Date" content="12/12/2024" />
              <DetailsCard title="Day to Apply" content="13th" />
              <DetailsCard title="Frequency" content="Monthly" />
              <DetailsCard title="Service" content="Life Insurance" />
              <DetailsCard title="Narration" content="Mandate Narration" />
              <DetailsCard title="Account Number" content="0909887674" />
              <DetailsCard title="Account Name" content="Fair Money" />
              <DetailsCard title="Bank Code" content="1234545" />
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Payer Details">
              <DetailsCard title="Payer Name" content="Ugobest Venture" />
              <DetailsCard title="Email Address" content="ugobest@gmal.com" />
              <DetailsCard title="Phone Number" content="09093874628" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Payee Details">
              <DetailsCard title="Payee Name" content="Ugobest Venture" />
              <DetailsCard title="Email Address" content="ugobest@gmal.com" />
              <DetailsCard title="Phone Number" content="09093874628" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Biller Details">
              <DetailsCard title="Biller Account Number" content="9093874628" />
              <DetailsCard title="Bank Name" content="Access" />
              <DetailsCard title="Account Name" content="Ugobest Venture" />
              <DetailsCard title="Biller Code" content="123545" />
              <DetailsCard title="Bank Code" content=";74628" />
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <DetailsCard title="ID" content="9344243" />
              <DetailsCard title="Created By" content="John Doe" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
              <DetailsCard title="ID" content="9344243" />
              <DetailsCard title="Approved By" content="John Doe" />
              <DetailsCard title="Date Approved" content="12/12/2024 : 03:00pm" />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
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
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Transaction History Details</h1>
              <button className="scale-[110%]" onClick={() => closeModal('openTransactionHistory')}>
                <CloseIcon />
              </button>
            </div>
            <div className="mt-3 h-[2px] w-full bg-grayPrimary"></div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="">
              <div className="slide-down flex items-center justify-between">
                <div className="flex w-full flex-row items-center justify-start gap-6 md:gap-10">
                  <CustomTabs
                    tabs={tabsList}
                    activeTab={activeTransactionTab}
                    setActiveTab={setActiveTransactionTab}
                  />
                </div>
                <div className="flexitems-center justify-end">
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
                  rowCount={73}
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
              <h1 className="text-xl font-semibold">Modify Mandate Details</h1>
              <button className="scale-[110%]" onClick={() => closeModal('editMandate')}>
                <CloseIcon />
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
                      openModal('confirmEdit');
                    }}
                  />
                </div>
              </form>
            ) : (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="slide-down flex items-center justify-start gap-1">
                  <h3 className="text-red-300">Error:</h3>
                  <h3 className="">You cannot modify a fixed mandate</h3>
                </span>
              </Typography>
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
            closeModal('editMandate');
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

export default MandateDetails;
