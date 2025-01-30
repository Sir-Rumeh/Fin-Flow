import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import { reasonForRejectionSchema } from 'utils/formValidators';
import CustomInput from 'components/FormElements/CustomInput';
import RejectedIcon from 'assets/icons/RejectedIcon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approveStaffUserRequest,
  getStaffUserRequestById,
  rejectStaffUserRequest,
} from 'config/actions/staff-user-actions';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import { RequestStatus } from 'utils/enums';
import ActionAuthorDetails, { AuthorActionType } from 'components/common/ActionAuthorDetails';

const StaffUserEnableRequestDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const staffUserId = searchParams?.get('id') || '';
  const queryClient = useQueryClient();
  const [modals, setModals] = useState({
    confirmApproveRequest: false,
    confirmRejectRequest: false,
    approveSuccessfulModal: false,
    rejectSuccessfulModal: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const formik = useFormik({
    initialValues: {
      remark: '',
    },
    validationSchema: reasonForRejectionSchema,
    onSubmit: () => {
      rejectStaffUserRequestMutation.mutate(staffUserId);
    },
  });

  const { data } = useQuery({
    queryKey: ['staffuserRequests', staffUserId],
    queryFn: ({ queryKey }) => getStaffUserRequestById(queryKey[1]),
  });

  const approveStaffUserRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) => approveStaffUserRequest(requestId),
    onSuccess: () => {
      closeModal('confirmApproveRequest');
      openModal('approveSuccessfulModal');
      queryClient.invalidateQueries({ queryKey: ['staffuserRequests'] });
    },
    onError: (error) => console.log(error.message),
  });

  const rejectStaffUserRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) => rejectStaffUserRequest(requestId, formik.values),
    onSuccess: () => {
      closeModal('confirmRejectRequest');
      openModal('rejectSuccessfulModal');
      queryClient.invalidateQueries({ queryKey: ['staffuserRequests'] });
    },
    onError: (error) => console.log(error.message),
  });

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.staffUserRequests.index}`}
            className="cursor-pointer text-darkgray"
          >
            Staff User Requests
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Enable Staff User Request Details</span>
        </div>
        <div className="slide-down mt-6 flex flex-col items-end justify-between gap-y-3 sm:flex-row md:items-center">
          <h2 className="text-lg font-semibold md:text-2xl">{`Request ID : ${data?.responseData?.id}`}</h2>
          {data?.responseData?.status === RequestStatus.Pending && (
            <div className="flex w-1/2 items-center justify-end gap-4">
              <div className="w-auto">
                <ButtonComponent
                  color="#5C068C"
                  borderColor="#5C068C"
                  variant="outlined"
                  type="button"
                  title="Reject"
                  customPaddingX="3rem"
                  onClick={() => {
                    openModal('confirmRejectRequest');
                  }}
                />
              </div>
              <div className="w-auto">
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="button"
                  title="Approve"
                  customPaddingX="3rem"
                  onClick={() => {
                    openModal('confirmApproveRequest');
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="">
            <ItemDetailsContainer title="Request Details">
              <DetailsCard title="Employee ID" content={data?.responseData?.staffId} />
              <DetailsCard
                title="Full Name"
                content={
                  data?.responseData
                    ? `${data?.responseData?.firstName} ${data?.responseData?.lastName}`
                    : ''
                }
              />
              <DetailsCard title="User Name" content={data?.responseData?.username} />
              <DetailsCard title="Email Address" content={data?.responseData?.email} />
              <DetailsCard title="Phone Number" content={data?.responseData?.phoneNumber} />
              <DetailsCard title="Role" content={data?.responseData?.role} />
              <DetailsCard title="Category" content={data?.responseData?.userLevel} />
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
          <div className="mt-10">
            {data?.responseData?.status === 'Approved' && (
              <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
                <ActionAuthorDetails
                  id={data?.responseData?.approvedBy}
                  actionType={AuthorActionType.ApprovedBy}
                  actionDate={data?.responseData?.dateApproved}
                />
              </ItemDetailsContainer>
            )}
            {data?.responseData?.status === 'Declined' && (
              <ItemDetailsContainer title="Rejector Details" titleExtension={<RejectedIcon />}>
                <ActionAuthorDetails
                  id={data?.responseData?.rejectedBy}
                  actionType={AuthorActionType.RejectedBy}
                  actionDate={data?.responseData?.dateRejected}
                />
                <DetailsCard title="Reason for Rejection" content={data?.responseData?.remark} />
              </ItemDetailsContainer>
            )}
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Requested By">
              <ActionAuthorDetails
                id={data?.responseData?.requestedBy}
                actionType={AuthorActionType.RequestedBy}
                actionDate={data?.responseData?.dateRequested}
              />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
      {modals.confirmApproveRequest && (
        <ModalWrapper
          isOpen={modals.confirmApproveRequest}
          setIsOpen={() => closeModal('confirmApproveRequest')}
          title={'Approve user Request?'}
          info={
            'You are about to approve this enable user request, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            approveStaffUserRequestMutation.mutate(staffUserId);
          }}
        />
      )}

      {modals.approveSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.approveSuccessfulModal}
          setIsOpen={() => closeModal('approveSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully approved this enable user request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('approveSuccessfulModal');
            navigate(`/${appRoutes.adminDashboard.staffUserRequests.index}`);
          }}
        />
      )}

      {modals.confirmRejectRequest && (
        <ModalWrapper
          isOpen={modals.confirmRejectRequest}
          width="700px"
          setIsOpen={() => closeModal('confirmRejectRequest')}
          title={'Reject user Request?'}
          info={
            'You are about to reject this enable user request, would you want to proceed with this?'
          }
          feedback={
            <div className="w-full md:col-span-1">
              <CustomInput
                labelFor="remark"
                label="Reason For Rejection"
                inputType="text"
                placeholder="Type here"
                maxW="w-full"
                formik={formik}
              />
            </div>
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedBackgroundColor="#F34E4E"
          hoverBackgroundColor="#8B0000"
          proceedAction={() => {
            formik.handleSubmit();
          }}
        />
      )}
      {modals.rejectSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.rejectSuccessfulModal}
          setIsOpen={() => closeModal('rejectSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully rejected this enable user request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('rejectSuccessfulModal');
            navigate(`/${appRoutes.adminDashboard.staffUserRequests.index}`);
          }}
        />
      )}
    </>
  );
};

export default StaffUserEnableRequestDetails;
