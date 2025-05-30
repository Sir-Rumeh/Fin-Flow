import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ChevronRight from 'assets/icons/ChevronRight';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import ButtonComponent from 'components/FormElements/Button';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import FormInput from 'components/FormElements/FormInput';
import { useFormik } from 'formik';
import { reasonForRejectionSchema } from 'utils/formValidators';
import { capitalize, checkRoute, formatNumberDisplay } from 'utils/helpers';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import { UpdateRequestIcon } from 'assets/icons';
import CustomInput from 'components/FormElements/CustomInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approveMandateRequest,
  getMandateRequestById,
  rejectMandateRequest,
} from 'config/actions/dashboard-actions';
import RejectedIcon from 'assets/icons/RejectedIcon';
import { RequestStatus } from 'utils/enums';
import { getStaffUserById } from 'config/actions/staff-user-actions';
import ActionAuthorDetails, { AuthorActionType } from 'components/common/ActionAuthorDetails';

const MandateCreationRequestDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mandateId = searchParams?.get('id') || '';
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
      rejectMandateRequestMutation.mutate(mandateId);
    },
  });

  const { data } = useQuery({
    queryKey: ['mandateRequests', mandateId],
    queryFn: ({ queryKey }) => getMandateRequestById(queryKey[1]),
  });

  const approveMandateRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) => approveMandateRequest(requestId),
    onSuccess: () => {
      closeModal('confirmApproveRequest');
      openModal('approveSuccessfulModal');
      queryClient.invalidateQueries({ queryKey: ['mandateRequests'] });
    },
    onError: (error) => console.log(error.message),
  });

  const rejectMandateRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) => rejectMandateRequest(requestId, formik.values),
    onSuccess: () => {
      closeModal('confirmRejectRequest');
      openModal('rejectSuccessfulModal');
      queryClient.invalidateQueries({ queryKey: ['mandateRequests'] });
    },
    onError: (error) => console.log(error.message),
  });

  const { data: ApproverDetails } = useQuery({
    queryKey: ['users', data?.responseData?.approvedBy],
    queryFn: ({ queryKey }) => getStaffUserById(queryKey[1]),
  });

  const { data: CreatedByDetails } = useQuery({
    queryKey: ['users', data?.responseData?.createdBy],
    queryFn: ({ queryKey }) => getStaffUserById(queryKey[1]),
  });

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.requests.mandateRequests.index}`}
            className="cursor-pointer text-darkgray"
          >
            Mandate Requests
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Mandate Creation Request Details</span>
        </div>

        <>
          <div className="slide-down mt-6 flex flex-col items-end justify-between gap-y-3 sm:flex-row md:items-center">
            <h2 className="text-lg font-semibold md:text-2xl">{`Mandate ID : ${data?.responseData?.id}`}</h2>
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
              <ItemDetailsContainer
                title="Mandate Creation Details"
                titleExtension={
                  <>
                    <div className="flex items-center justify-end gap-2">
                      <p className="text-sm text-darkgray">Mandate Type:</p>
                      <UpdateRequestIcon />
                      <p className="mb-[1px] font-semibold text-lightPurple">
                        {capitalize(data?.responseData?.mandateType)}
                      </p>
                    </div>
                  </>
                }
              >
                <DetailsCard title="Account ID" content={data?.responseData?.accountId} />
                <DetailsCard title="Merchant ID" content={data?.responseData?.merchantId} />
                <DetailsCard title="Mandate Code" content={data?.responseData?.mandateCode} />
                <DetailsCard
                  title="Date Created"
                  content={
                    data?.responseData?.dateCreated &&
                    new Date(data.responseData.dateCreated).toLocaleDateString()
                  }
                />
                <DetailsCard title="Product ID" content={data?.responseData?.productId} />
                <DetailsCard
                  title="Amount"
                  content={`\u20A6${data?.responseData?.amount ? formatNumberDisplay(data?.responseData?.amount) : ''}`}
                  contentClassName="text-lightPurple"
                />
                <DetailsCard
                  title="Effective Date"
                  content={
                    data?.responseData?.startDate &&
                    new Date(data.responseData.startDate).toLocaleDateString()
                  }
                />
                <DetailsCard
                  title="End Date"
                  content={
                    data?.responseData?.endDate &&
                    new Date(data.responseData.endDate).toLocaleDateString()
                  }
                />
                <DetailsCard title="Day to apply" content={data?.responseData?.dayToApply} />
                <DetailsCard title="Frequency" content={data?.responseData?.frequency} />
                <DetailsCard title="Service" content={data?.responseData?.service} />
                <DetailsCard title="Narration" content={data?.responseData?.narration} />
                <DetailsCard title="Account Number" content={data?.responseData?.accountNumber} />
                <DetailsCard title="Account Name" content={data?.responseData?.accountName} />
                <DetailsCard title="Bank Code" content={data?.responseData?.bankCode} />
              </ItemDetailsContainer>
            </div>

            <div className="mt-10">
              <ItemDetailsContainer title="Payer Details">
                <DetailsCard title="Payer Name" content={data?.responseData?.payerName} />
                <DetailsCard title="Address" content={data?.responseData?.payerAddress} />
                <DetailsCard
                  title="Email Address"
                  content={data?.responseData?.payerEmailAddress}
                />
                <DetailsCard title="Phone Number" content={data?.responseData?.payerPhoneNumber} />
              </ItemDetailsContainer>
            </div>
            <div className="mt-10">
              <ItemDetailsContainer title="Payee Details">
                <DetailsCard title="Payee Name" content={data?.responseData?.payeeName} />
                <DetailsCard title="Address" content={data?.responseData?.payeeAddress} />
                <DetailsCard
                  title="Email Address"
                  content={data?.responseData?.payeeEmailAddress}
                />
                <DetailsCard title="Phone Number" content={data?.responseData?.payeePhoneNumber} />
              </ItemDetailsContainer>
            </div>
            <div className="mt-10 hidden">
              <ItemDetailsContainer
                title="Biller Details"
                titleExtension={
                  <>
                    <div className="flex items-center justify-end gap-2">
                      <p className="text-sm text-darkgray">Biller Code:</p>
                      <p className="mb-[1px] font-semibold text-lightPurple">
                        {data?.responseData?.billerCode}
                      </p>
                    </div>
                  </>
                }
              >
                <DetailsCard
                  title="Biller Account Number"
                  content={data?.responseData?.billerAccountNumber}
                />
                <DetailsCard title="Bank Name" content={data?.responseData?.bankName} />
                <DetailsCard title="Account Name" content={data?.responseData?.accountName} />
                <DetailsCard title="Bank Code" content={data?.responseData?.bankCode} />
              </ItemDetailsContainer>
            </div>

            <div className="mt-10">
              <ItemDetailsContainer title="Creator Details">
                <ActionAuthorDetails
                  id={data?.responseData?.createdBy}
                  actionType={AuthorActionType.CreatedBy}
                  actionDate={data?.responseData?.dateCreated}
                  requestType={data?.responseData?.requestType}
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
          </div>
        </>
      </div>
      {modals.confirmApproveRequest && (
        <ModalWrapper
          isOpen={modals.confirmApproveRequest}
          setIsOpen={() => closeModal('confirmApproveRequest')}
          title={'Approve mandate Request?'}
          info={
            'You are about to approve this new mandate creation request, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            approveMandateRequestMutation.mutate(mandateId);
          }}
        />
      )}

      {modals.approveSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.approveSuccessfulModal}
          setIsOpen={() => closeModal('approveSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully approved this new mandate request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('approveSuccessfulModal');
            navigate(`/${appRoutes.adminDashboard.requests.mandateRequests.index}`);
          }}
        />
      )}

      {modals.confirmRejectRequest && (
        <ModalWrapper
          isOpen={modals.confirmRejectRequest}
          width="700px"
          setIsOpen={() => closeModal('confirmRejectRequest')}
          title={'Reject mandate Request?'}
          info={
            'You are about to reject this mandate creation request, would you want to proceed with this?'
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
          info={'You have successfully rejected this mandate creation request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('rejectSuccessfulModal');
            navigate(`/${appRoutes.adminDashboard.requests.mandateRequests.index}`);
          }}
        />
      )}
    </>
  );
};

export default MandateCreationRequestDetails;
