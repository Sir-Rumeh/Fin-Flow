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
import DetailsActionButton from 'components/common/DetailsActionButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteProfile,
  disableProfile,
  enableProfile,
  getProfileById,
} from 'config/actions/profile-actions';
import ActionAuthorDetails, { AuthorActionType } from 'components/common/ActionAuthorDetails';

const ProfileDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profileId = searchParams?.get('id') || '';

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

  const { data } = useQuery({
    queryKey: ['profiles', profileId],
    queryFn: ({ queryKey }) => getProfileById(queryKey[1]),
  });

  const enableProfileMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableProfile(requestId),
    onSuccess: () => {
      openModal('enableSuccessful');
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error) => {
      closeModal('enableSuccessful');
    },
  });

  const disableProfileMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableProfile(requestId),
    onSuccess: () => {
      openModal('enableSuccessful');
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error) => {
      closeModal('enableSuccessful');
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteProfile(requestId),
    onSuccess: () => {
      openModal('deleteSuccessful');
      queryClient.invalidateQueries({ queryKey: ['mandates'] });
    },
    onError: (error) => {
      closeModal('deleteSuccessful');
    },
  });

  return (
    <>
      <div className="px-5 py-1">
        <div className="mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.profileManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Profile Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Profile Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">
              Profile ID : {data?.responseData?.id}
            </h2>
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
                      pathname: `/${appRoutes.adminDashboard.profileManagement.editProfile}`,
                      search: `?${createSearchParams({ id: profileId })}`,
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
                    onClick={() => openModal('confirmDisable')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                ) : (
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
            <ItemDetailsContainer title="Profile Details">
              <DetailsCard title="Account Name" content={data?.responseData?.accountName} />
              <DetailsCard title="Merchant ID" content={data?.responseData?.merchantID} />
              <DetailsCard
                title="Full Name"
                content={`${data?.responseData?.firstName} ${data?.responseData?.lastName}` || ''}
              />
              <DetailsCard title="Merchant Name" content={data?.responseData?.merchantName} />
              <DetailsCard title="Account Id" content={data?.responseData?.accountID} />
              <DetailsCard title="Email" content={data?.responseData?.email} />
              <DetailsCard title="Role Name" content={data?.responseData?.roleName} />
              <DetailsCard title="Role ID" content={data?.responseData?.role} />
              <DetailsCard
                title="Date Requested"
                content={
                  data?.responseData?.createdAt &&
                  new Date(data?.responseData?.createdAt).toLocaleDateString()
                }
              />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <ActionAuthorDetails
                id={data?.responseData?.createdBy}
                actionType={AuthorActionType.CreatedBy}
                actionDate={data?.responseData?.createdAt}
              />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
      {modals.confirmDisable && (
        <ModalWrapper
          isOpen={modals.confirmDisable}
          setIsOpen={() => closeModal('confirmDisable')}
          title={'Disable Profile?'}
          info={'You are about to disable this profile, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={disableProfileMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDisable');
            disableProfileMutation.mutate(profileId);
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this profile and your request is pending approval'}
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
          title={'Enable Profile?'}
          info={'You are about to enable this profile, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={enableProfileMutation.isPending}
          proceedAction={() => {
            closeModal('confirmEnable');
            enableProfileMutation.mutate(profileId);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this profile and your request is pending approval'}
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
          title={'Delete Profile?'}
          info={'You are about to delete this profile, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          loading={deleteProfileMutation.isPending}
          proceedAction={() => {
            closeModal('confirmDelete');
            deleteProfileMutation.mutate(profileId);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this profile and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('deleteSuccessful');
          }}
        />
      )}
    </>
  );
};

export default ProfileDetails;
