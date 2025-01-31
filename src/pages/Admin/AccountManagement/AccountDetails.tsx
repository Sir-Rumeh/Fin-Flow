import { Link, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import CustomPopover from 'hoc/PopOverWrapper';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import SubTitleIconYellow from 'assets/icons/SubTitleIconYellow';
import DetailsActionButton from 'components/common/DetailsActionButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteAccount,
  disableAccount,
  enableAccount,
  getAccountById,
} from 'config/actions/account-actions';

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountId = searchParams?.get('id') || '';

  const [modals, setModals] = useState({
    confirmDisable: false,
    disableSuccessful: false,
    confirmEnable: false,
    enableSuccessful: false,
    confirmDelete: false,
    deleteSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const { data, refetch } = useQuery({
    queryKey: ['accounts', accountId],
    queryFn: ({ queryKey }) => getAccountById(queryKey[1]),
  });

  const enableAccountMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableAccount(requestId),
    onSuccess: () => {
      closeModal('confirmEnable');
      openModal('enableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmEnable');
    },
  });

  const disableAccountMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableAccount(requestId),
    onSuccess: () => {
      closeModal('confirmDisable');
      openModal('disableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDisable');
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteAccount(requestId),
    onSuccess: () => {
      closeModal('confirmDelete');
      openModal('deleteSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDelete');
    },
  });

  return (
    <>
      <div className="px-5 py-1">
        <div className="mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.accountManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Account Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Account Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">{`Account ID : ${data?.responseData?.id ? data?.responseData?.id : ''}`}</h2>
          </div>
          <div className="w-auto">
            <CustomPopover
              popoverId={1}
              buttonIcon={<DetailsActionButton />}
              translationX={0}
              translationY={54}
            >
              <div className="flex w-[7.2rem] flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.accountManagement.editAccount}`,
                      search: `?${createSearchParams({ id: accountId })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  Edit Details
                </button>
                {data?.responseData?.isActive ? (
                  <button
                    type="button"
                    onClick={() => {
                      openModal('confirmDisable');
                    }}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      openModal('confirmEnable');
                    }}
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
          <div className="rounded-lg bg-lilacPurple px-6 py-4 pb-6">
            <h3 className="text-md font-semibold md:text-xl">Merchant Accounts</h3>
            <div className="mt-4 flex flex-col items-center justify-between gap-6 gap-x-4 md:flex-row">
              <DashboardCard
                title="Total Profiles"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={`/${appRoutes.adminDashboard.accountManagement.index}`}
                // navigate to MerchantProfiles which will import table from Profile Management
              />
              <DashboardCard
                title="Total Mandates"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={`/${appRoutes.adminDashboard.accountManagement.index}`}
                // navigate to MerchantMandates  which will import table from Mandate  Management
              />
            </div>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Account Details">
              <DetailsCard title="Merchant ID" content={data?.responseData?.merchantId} />
              <DetailsCard title="Merchant Name" content={data?.responseData?.name} />
              <DetailsCard title="Account Name" content={data?.responseData?.accountName} />
              <DetailsCard title="Account Number" content={data?.responseData?.accountNumber} />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData?.dateCreated &&
                  new Date(data.responseData.dateCreated).toLocaleDateString()
                }
              />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <DetailsCard title="ID" content={data?.responseData?.creatorId} />
              <DetailsCard title="Created By" content={data?.responseData?.createdBy} />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData?.dateCreated &&
                  new Date(data.responseData.dateCreated).toLocaleDateString()
                }
              />
              <DetailsCard title="Address" content={data?.responseData?.address} />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            {data?.responseData?.status === 'Approved' && (
              <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
                <DetailsCard title="ID" content={data?.responseData?.approverId} />
                <DetailsCard title="Approved By" content={data?.responseData?.approvedBy} />
                <DetailsCard
                  title="Date Approved"
                  content={
                    data?.responseData?.dateApproved &&
                    new Date(data.responseData.dateApproved).toLocaleDateString()
                  }
                />
              </ItemDetailsContainer>
            )}
          </div>
        </div>
      </div>
      {modals.confirmDisable && (
        <ModalWrapper
          isOpen={modals.confirmDisable}
          setIsOpen={() => closeModal('confirmDisable')}
          title={'Disable Account?'}
          info={'You are about to disable this account, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={disableAccountMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDisable');
            disableAccountMutation.mutate(accountId);
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this account and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('disableSuccessful');
          }}
        />
      )}
      {modals.confirmEnable && (
        <ModalWrapper
          isOpen={modals.confirmEnable}
          setIsOpen={() => closeModal('confirmEnable')}
          title={'Enable Account?'}
          info={'You are about to enable this account, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={enableAccountMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEnable');
            enableAccountMutation.mutate(accountId);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this account and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('enableSuccessful');
          }}
        />
      )}
      {modals.confirmDelete && (
        <ModalWrapper
          isOpen={modals.confirmDelete}
          setIsOpen={() => closeModal('confirmDelete')}
          title={'Delete Account?'}
          info={'You are about to delete this account, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={deleteAccountMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDelete');
            deleteAccountMutation.mutate(accountId);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this account and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('deleteSuccessful');
            navigate(`/${appRoutes.adminDashboard.accountManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default ProfileDetails;
