import { Link, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import CustomPopover from 'hoc/PopOverWrapper';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { CreationRequestIcon, DeleteRequestIcon, UpdateRequestIcon } from 'assets/icons';
import DetailsActionButton from 'components/common/DetailsActionButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteStaffUser,
  disableStaffUser,
  enableStaffUser,
  getStaffUserById,
} from 'config/actions/staff-user-actions';
import { notifyError } from 'utils/helpers';

const UserDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const staffUserId = searchParams?.get('id') || '';

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
    queryKey: ['user-details', staffUserId],
    queryFn: ({ queryKey }) => getStaffUserById(queryKey[1]),
  });

  const enableStaffUserMutation = useMutation({
    mutationFn: (requestId: string | undefined) => enableStaffUser(requestId),
    onSuccess: () => {
      closeModal('confirmEnable');
      openModal('enableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmEnable');
    },
  });

  const disableStaffUserMutation = useMutation({
    mutationFn: (requestId: string | undefined) => disableStaffUser(requestId),
    onSuccess: () => {
      closeModal('confirmDisable');
      openModal('disableSuccessful');
    },
    onError: (error) => {
      closeModal('confirmDisable');
    },
  });

  const deleteStaffUserMutation = useMutation({
    mutationFn: (requestId: string | undefined) => deleteStaffUser(requestId),
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
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.staffUserManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Staff User Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">User Details</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">{`User ID : ${data?.responseData?.id ? data?.responseData?.id : ''}`}</h2>
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
                      pathname: `/${appRoutes.adminDashboard.staffUserManagement.editStaffUser}`,
                      search: `?${createSearchParams({ id: staffUserId })}`,
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
          <div className="">
            <ItemDetailsContainer
              title="User Details"
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
              <DetailsCard title="Employee ID" content={data?.responseData?.staffId} />
              <DetailsCard
                title="User Name"
                content={`${data ? `${data?.responseData?.firstName} ${data?.responseData?.lastName}` : ''}`}
              />
              <DetailsCard title="First Name" content={data?.responseData?.firstName} />
              <DetailsCard title="Last Name" content={data?.responseData?.lastName} />
              <DetailsCard title="Email Address" content={data?.responseData?.email} />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData?.createdAt &&
                  new Date(data.responseData.createdAt).toLocaleDateString()
                }
              />
              <DetailsCard title="Role" content={data?.responseData?.role} />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
      {modals.confirmDisable && (
        <ModalWrapper
          isOpen={modals.confirmDisable}
          setIsOpen={() => closeModal('confirmDisable')}
          title={'Disable User?'}
          info={'You are about to disable this user, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDisable');
            disableStaffUserMutation.mutate(staffUserId);
          }}
        />
      )}
      {modals.disableSuccessful && (
        <ModalWrapper
          isOpen={modals.disableSuccessful}
          setIsOpen={() => closeModal('disableSuccessful')}
          title={'Success!!'}
          info={'You have successfully disabled this user and your request is pending approval'}
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
          title={'Enable User?'}
          info={'You are about to enable this user, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmEnable');
            enableStaffUserMutation.mutate(staffUserId);
          }}
        />
      )}
      {modals.enableSuccessful && (
        <ModalWrapper
          isOpen={modals.enableSuccessful}
          setIsOpen={() => closeModal('enableSuccessful')}
          title={'Success!!'}
          info={'You have successfully enabled this user and your request is pending approval'}
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
          title={'Delete User?'}
          info={'You are about to delete this user, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmDelete');
            deleteStaffUserMutation.mutate(staffUserId);
          }}
        />
      )}
      {modals.deleteSuccessful && (
        <ModalWrapper
          isOpen={modals.deleteSuccessful}
          setIsOpen={() => closeModal('deleteSuccessful')}
          title={'Success!!'}
          info={'You have successfully deleted this user and your request is pending approval'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            refetch();
            closeModal('deleteSuccessful');
          }}
        />
      )}
    </>
  );
};

export default UserDetails;
