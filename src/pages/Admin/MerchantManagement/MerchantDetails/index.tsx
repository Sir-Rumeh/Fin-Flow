import {
  Link,
  useLocation,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { CreationRequestIcon, DeleteRequestIcon, UpdateRequestIcon } from 'assets/icons';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import { checkRoute } from 'utils/helpers';
import SubTitleIconGreen from 'assets/icons/SubTitleIconGreen';
import SubTitleIconYellow from 'assets/icons/SubTitleIconYellow';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import CustomPopover from 'hoc/PopOverWrapper';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import DetailsActionButton from 'components/common/DetailsActionButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteMerchant,
  disableMerchant,
  enableMerchant,
  getMerchantById,
  getMerchantDetailsStatistics,
} from 'config/actions/merchant-actions';

const MerchantDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const merchantId = searchParams?.get('id') || '';
  const isDashboardRoute = checkRoute(pathname, 'dashboard');

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
    queryKey: ['merchants', merchantId],
    queryFn: ({ queryKey }) => getMerchantById(queryKey[1]),
  });

  const { data: merchantDetailsStatistics } = useQuery({
    queryKey: ['merchant-details', merchantId],
    queryFn: ({ queryKey }) => getMerchantDetailsStatistics(queryKey[1]),
  });

  const enableMerchantMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableMerchant(requestId),
    onSuccess: () => {
      closeModal('confirmEnable');
      openModal('enableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmEnable');
    },
  });

  const disableMerchantMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableMerchant(requestId),
    onSuccess: () => {
      closeModal('confirmDisable');
      openModal('disableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDisable');
    },
  });

  const deleteMerchantMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteMerchant(requestId),
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
            to={
              isDashboardRoute
                ? `/${appRoutes.adminDashboard.dashboard.index}`
                : `/${appRoutes.adminDashboard.merchantManagement.index}`
            }
            className="cursor-pointer text-darkgray"
          >
            {isDashboardRoute ? 'Dashboard' : 'Merchant Management'}
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Merchant Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">{`Merchant ID : ${data?.responseData?.id ? data?.responseData?.id : ''}`}</h2>
          </div>
          <div className="w-auto">
            <CustomPopover
              popoverId={1}
              buttonIcon={<DetailsActionButton />}
              translationX={0}
              translationY={54}
            >
              <div className="flex w-[7.4rem] flex-col rounded-md p-1">
                <button
                  onClick={() =>
                    navigate({
                      pathname: isDashboardRoute
                        ? `/${appRoutes.adminDashboard.dashboard.editMerchant}`
                        : `/${appRoutes.adminDashboard.merchantManagement.editMerchant}`,
                      search: `?${createSearchParams({ id: merchantId })}`,
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
                  onClick={() => {
                    openModal('confirmDelete');
                  }}
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
                title="Total Accounts"
                numberOfRequest={merchantDetailsStatistics?.responseData?.totalAccounts ?? 0}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconGreen />}
                route={{
                  pathname: `/${appRoutes.adminDashboard.merchantManagement.merchantAccounts}`,
                  search: `?${createSearchParams({ id: merchantId })}`,
                }}
              />
              <DashboardCard
                title="Total Profiles"
                numberOfRequest={merchantDetailsStatistics?.responseData?.totalProfiles ?? 0}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={{
                  pathname: `/${appRoutes.adminDashboard.merchantManagement.merchantProfiles}`,
                  search: `?${createSearchParams({ id: merchantId })}`,
                }}
              />
              <DashboardCard
                title="Total Mandates"
                numberOfRequest={merchantDetailsStatistics?.responseData?.totalMandates ?? 0}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={{
                  pathname: `/${appRoutes.adminDashboard.merchantManagement.merchantMandates}`,
                  search: `?${createSearchParams({ id: merchantId })}`,
                }}
              />
            </div>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer
              title="Merchant Details"
              titleExtension={
                <>
                  {data?.responseData?.isActive ? (
                    <div className="flex items-center justify-end gap-2">
                      <CreationRequestIcon />
                      <p className="mb-[1px] font-semibold text-greenPrimary">Enabled</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <DeleteRequestIcon />
                      <p className="mb-[1px] font-semibold text-redSecondary">Disabled</p>
                    </div>
                  )}
                </>
              }
            >
              <DetailsCard title="Merchant ID" content={data?.responseData?.merchantId} />
              <DetailsCard title="Merchant Name" content={data?.responseData?.name} />
              <DetailsCard title="Merchant Code" content={data?.responseData?.merchantCode} />
              <DetailsCard title="CIF Number" content={data?.responseData?.cif} />
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
          title={'Disable Merchant?'}
          info={'You are about to disable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            disableMerchantMutation.mutate(merchantId);
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this merchant'}
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
          title={'Enable Merchant?'}
          info={'You are about to enable this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            enableMerchantMutation.mutate(merchantId);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this merchant'}
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
          title={'Delete Merchant?'}
          info={'You are about to delete this merchant, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            deleteMerchantMutation.mutate(merchantId);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this merchant'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('deleteSuccessful');
            navigate(
              `${isDashboardRoute ? `/${appRoutes.adminDashboard.dashboard.index}` : `/${appRoutes.adminDashboard.merchantManagement.index}`} `,
            );
          }}
        />
      )}
    </>
  );
};

export default MerchantDetails;
