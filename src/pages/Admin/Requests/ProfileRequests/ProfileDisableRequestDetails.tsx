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
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import CustomInput from 'components/FormElements/CustomInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import {
  approveProfileRequest,
  getProfileRequestById,
  rejectProfileRequest,
} from 'config/actions/profile-actions';
import { RequestStatus } from 'utils/enums';
import RejectedIcon from 'assets/icons/RejectedIcon';

const ProfileDisableRequestDetails = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const requestId = searchParams?.get('id') || '';
  const navigate = useNavigate();
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
    validationSchema: Yup.object({
      remark: Yup.string()
        .required('Reason for rejection is required')
        .min(5, 'Reason must be at least 5 characters long'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { data } = useQuery({
    queryKey: ['profileRequests', requestId],
    queryFn: ({ queryKey }) => getProfileRequestById(queryKey[1]),
  });

  const approveProfileRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) => approveProfileRequest(requestId),
    onSuccess: () => {
      openModal('approveSuccessfulModal');
      queryClient.invalidateQueries({ queryKey: ['profileRequests'] });
    },
  });

  const rejectProfileRequestMutation = useMutation({
    mutationFn: ({
      requestId,
      payload,
    }: {
      requestId: string | undefined;
      payload: { remark: string };
    }) => rejectProfileRequest(requestId, payload),
    onSuccess: () => {
      openModal('rejectSuccessfulModal');
      queryClient.invalidateQueries({ queryKey: ['profileRequests'] });
    },
  });

  const handleProceed = () => {
    if (formik.isValid && formik.dirty) {
      rejectProfileRequestMutation.mutate({ requestId, payload: formik.values });
      closeModal('confirmRejectRequest');
    } else {
      formik.setTouched({
        remark: true,
      });
    }
  };

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.requests.profileRequests.index}`}
            className="cursor-pointer text-darkgray"
          >
            Profile Requests
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Disable Profile Request Details</span>
        </div>
        <div className="slide-down mt-6 flex flex-col items-end justify-between gap-y-3 sm:flex-row md:items-center">
          <h2 className="text-lg font-semibold md:text-2xl">
            Request ID : {data?.responseData?.id}
          </h2>
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
            <ItemDetailsContainer title="Profile Disable Details">
              <DetailsCard title="Account Name" content="Fair Money" />
              <DetailsCard title="Merchant ID" content={data?.responseData?.amount || ''} />
              <DetailsCard
                title="Full Name"
                content={`${data?.responseData?.firstName || ''} ${data?.responseData?.lastName || ''}`}
              />
              <DetailsCard
                title="Merchant Name"
                content={`${data?.responseData?.firstName || ''} ${data?.responseData?.lastName || ''}`}
              />
              <DetailsCard title="Account Id" content={data?.responseData?.accountID || ''} />
              <DetailsCard title="Email" content={data?.responseData?.email || ''} />
              <DetailsCard title="CIF Number" content="12345" />
              <DetailsCard title="Role" content={data?.responseData?.role || ''} />
              <DetailsCard
                title="Date Requested"
                content={
                  data?.responseData?.createdAt &&
                  new Date(data.responseData.createdAt).toLocaleDateString()
                }
              />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <DetailsCard title="ID" content={data?.responseData?.profileID || ''} />
              <DetailsCard title="Created By" content={data?.responseData?.createdBy || ''} />
              <DetailsCard
                title="Date Created"
                content={
                  data?.responseData?.createdAt &&
                  new Date(data.responseData.createdAt).toLocaleDateString()
                }
              />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            {data?.responseData?.status === RequestStatus.Approved && (
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
            {data?.responseData?.status === RequestStatus.Declined && (
              <ItemDetailsContainer title="Rejector Details" titleExtension={<RejectedIcon />}>
                <DetailsCard title="ID" content={data?.responseData?.rejectorId} />
                <DetailsCard title="Rejected By" content={data?.responseData?.rejectedBy} />
                <DetailsCard
                  title="Date Rejected"
                  content={
                    data?.responseData?.dateRejected &&
                    new Date(data.responseData.dateRejected).toLocaleDateString()
                  }
                />
                <DetailsCard title="Reason for Rejection" content={data?.responseData?.remark} />
              </ItemDetailsContainer>
            )}
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Requested By">
              <DetailsCard title="Requested By" content={data?.responseData?.requestedBy} />
              <DetailsCard
                title="Date Requested"
                content={
                  data?.responseData?.dateRequested &&
                  new Date(data.responseData.dateRequested).toLocaleDateString()
                }
              />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
      {modals.confirmApproveRequest && (
        <ModalWrapper
          isOpen={modals.confirmApproveRequest}
          setIsOpen={() => closeModal('confirmApproveRequest')}
          title={'Approve profile Request?'}
          info={
            'You are about to approve this disable profile request, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmApproveRequest');
            approveProfileRequestMutation.mutate(requestId);
          }}
        />
      )}

      {modals.approveSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.approveSuccessfulModal}
          setIsOpen={() => closeModal('approveSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully approved this disable profile request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('approveSuccessfulModal');
            navigate(`/${appRoutes.adminDashboard.requests.profileRequests.index}`);
          }}
        />
      )}

      {modals.confirmRejectRequest && (
        <ModalWrapper
          isOpen={modals.confirmRejectRequest}
          width="700px"
          setIsOpen={() => closeModal('confirmRejectRequest')}
          title={'Reject profile Request?'}
          info={
            'You are about to reject this disable profile request, would you want to proceed with this?'
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
            handleProceed();
          }}
        />
      )}
      {modals.rejectSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.rejectSuccessfulModal}
          setIsOpen={() => closeModal('rejectSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully rejected this disable profile request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('rejectSuccessfulModal');
            navigate(`/${appRoutes.adminDashboard.requests.profileRequests.index}`);
          }}
        />
      )}
    </>
  );
};

export default ProfileDisableRequestDetails;
