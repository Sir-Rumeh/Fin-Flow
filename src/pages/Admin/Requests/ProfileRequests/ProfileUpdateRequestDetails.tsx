import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ButtonComponent from 'components/FormElements/Button';
import { useEffect, useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import CustomInput from 'components/FormElements/CustomInput';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approveProfileRequest,
  getProfileRequestById,
  rejectProfileRequest,
} from 'config/actions/profile-actions';
import { UpdateRequestDisplay } from 'utils/interfaces';
import { displayUpdateRequestData } from 'utils/helpers';
import { RequestStatus } from 'utils/enums';
import RejectedIcon from 'assets/icons/RejectedIcon';
import ActionAuthorDetails, { AuthorActionType } from 'components/common/ActionAuthorDetails';

const ProfileUpdateRequestDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const requestId = searchParams?.get('id') || '';
  const [updateDataList, setUpdateDataList] = useState<UpdateRequestDisplay[]>();
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
    onSubmit: (values) => {},
  });

  const { data } = useQuery({
    queryKey: ['profileRequests', requestId],
    queryFn: ({ queryKey }) => getProfileRequestById(queryKey[1]),
  });

  useEffect(() => {
    const updatedDataList = displayUpdateRequestData(
      data?.responseData?.oldData,
      data?.responseData,
    );
    if (updatedDataList) {
      setUpdateDataList(updatedDataList);
    }
  }, [data]);

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
          <span className="text-lightPurple">Profile Update Request Details</span>
        </div>
        <div className="slide-down mt-6 flex flex-col items-end justify-between gap-y-3 sm:flex-row md:items-center">
          <h2 className="text-lg font-semibold md:text-2xl">
            Merchant ID : {data?.responseData?.merchantID}
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
            <ItemDetailsContainer title="Old Information">
              {updateDataList?.map((updatedData, index) => {
                return (
                  <DetailsCard
                    key={index}
                    title={`Old ${updatedData.name}`}
                    content={updatedData.oldValue}
                  />
                );
              })}
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="New Information">
              {updateDataList?.map((updatedData, index) => {
                return (
                  <DetailsCard
                    key={index}
                    title={`New ${updatedData.name}`}
                    content={updatedData.newValue}
                  />
                );
              })}
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Profile Update Details">
              <DetailsCard title="Account Name" content="Fair Money" />
              <DetailsCard title="Merchant ID" content={data?.responseData?.merchantID || ''} />
              <DetailsCard
                title="Full Name"
                content={`${data?.responseData?.firstName || ''} ${data?.responseData?.lastName || ''}`}
              />
              <DetailsCard title="Merchant Name" content={data?.responseData?.merchantName || ''} />
              <DetailsCard title="Account Id" content={data?.responseData?.accountID || ''} />
              <DetailsCard title="Email" content={data?.responseData?.email || ''} />
              <DetailsCard title="Role Name" content={data?.responseData?.roleName} />
              <DetailsCard title="Role ID" content={data?.responseData?.role} />
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
              <ActionAuthorDetails
                id={data?.responseData?.createdBy}
                actionType={AuthorActionType.CreatedBy}
                actionDate={data?.responseData?.createdAt}
              />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            {data?.responseData?.status === RequestStatus.Approved && (
              <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
                <ActionAuthorDetails
                  id={data?.responseData?.approvedBy}
                  actionType={AuthorActionType.ApprovedBy}
                  actionDate={data?.responseData?.dateApproved}
                />
              </ItemDetailsContainer>
            )}
            {data?.responseData?.status === RequestStatus.Declined && (
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
          {/* <div className="mt-10">
            <ItemDetailsContainer title="Requested By">
              <ActionAuthorDetails
                id={data?.responseData?.requestedBy}
                actionType={AuthorActionType.RequestedBy}
                actionDate={data?.responseData?.dateRequested}
              />
            </ItemDetailsContainer>
          </div> */}
        </div>
      </div>
      {modals.confirmApproveRequest && (
        <ModalWrapper
          isOpen={modals.confirmApproveRequest}
          setIsOpen={() => closeModal('confirmApproveRequest')}
          title={'Approve profile Request?'}
          info={
            'You are about to approve this profile update request, would you want to proceed with this?'
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
          info={'You have successfully approved this profile update request'}
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
          setIsOpen={() => closeModal('confirmRejectRequest')}
          width="700px"
          title={'Reject profile Request?'}
          info={
            'You are about to reject this profile update request, would you want to proceed with this?'
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
          info={'You have successfully rejected this profile update request'}
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

export default ProfileUpdateRequestDetails;
