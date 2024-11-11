import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRightIcon,
  CreationRequestIcon,
  DeleteRequestIcon,
  SuccessModalIcon,
  UpdateRequestIcon,
} from 'assets/icons';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ButtonComponent from 'components/FormElements/Button';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import appRoutes from 'utils/constants/routes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  approveMandateRequest,
  getMandateRequestById,
  rejectMandateRequest,
} from 'config/actions/dashboard-actions';
import { formatNumberDisplay } from 'utils/helpers';
import CustomInput from 'components/FormElements/CustomInput';
import { MandateRequestStatus } from 'utils/enums';

const DeletionRequestDetails = () => {
  const { id } = useParams();

  const [modals, setModals] = useState({
    confirmApprove: false,
    confirmReject: false,
    approveSuccess: false,
    rejectSuccess: false,
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

  const { data, refetch } = useQuery({
    queryKey: ['mandateRequests', id],
    queryFn: ({ queryKey }) => getMandateRequestById(queryKey[1]),
  });

  const approveMandateRequestMutation = useMutation({
    mutationFn: (requestId: string | undefined) => approveMandateRequest(requestId),
    onSuccess: () => {
      refetch();
      closeModal('confirmApprove');
      openModal('approveSuccess');
    },
    onError: (error) => {},
  });

  const rejectMandateRequestMutation = useMutation({
    mutationFn: ({
      requestId,
      payload,
    }: {
      requestId: string | undefined;
      payload: { remark: string };
    }) => rejectMandateRequest(requestId, payload),
    onSuccess: () => {
      refetch();
      closeModal('confirmReject');
      openModal('rejectSuccess');
    },
    onError: (error) => {},
  });

  const handleProceed = () => {
    if (formik.isValid && formik.dirty) {
      rejectMandateRequestMutation.mutate({ requestId: id, payload: formik.values });
      closeModal('confirmReject');
    } else {
      formik.setTouched({
        remark: true,
      });
    }
  };

  return (
    <div className="px-5 py-5">
      <div className="flex items-center gap-4">
        <Link
          to={`/${appRoutes.merchantDashboard.requests.index}`}
          className="cursor-pointer text-sm text-darkgray"
        >
          Mandate Requests
        </Link>
        <ArrowRightIcon style="" />
        <span className="text-sm font-medium text-lightPurple">Request Details</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h2 className="mt-3 text-xl font-semibold">Request ID : {data?.responseData?.id}</h2>
        {data?.responseData?.status === MandateRequestStatus.Pending && (
          <div className="flex items-center gap-4">
            <ButtonComponent
              onClick={() => openModal('confirmReject')}
              title="Reject"
              color="#5C068C"
              border={2}
              width="150px"
              height="50px"
              fontWeight={600}
              fontSize="16px"
            />
            <ButtonComponent
              onClick={() => openModal('confirmApprove')}
              title="Approve"
              backgroundColor="#5C068C"
              hoverBackgroundColor="#2F0248"
              color="white"
              width="150px"
              height="50px"
              fontSize="16px"
            />
          </div>
        )}
      </div>
      <div className="mt-5 rounded-lg bg-white px-5 py-10">
        <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Request Details</p>
            <div className="flex items-center gap-2">
              <p>Mandate Type</p>
              <div className="flex items-center gap-2">
                <UpdateRequestIcon />
                <p className="text-lightPurple">Variable</p>
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="Account ID" content={data?.responseData?.accountId} />
            <DetailsCard title="Merchant ID" content={data?.responseData?.merchantId} />
            <DetailsCard title="Merchant Code" content={data?.responseData?.mandateCode} />
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
              content={formatNumberDisplay(data?.responseData?.amount)}
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
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="">
            <p className="my-3 text-lg font-semibold">Payer Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="Payer Name" content={data?.responseData?.payerName} />
            <DetailsCard title="Address" content={data?.responseData?.payerAddress} />
            <DetailsCard title="Email Address" content={data?.responseData?.payerEmailAddress} />
            <DetailsCard title="Phone Number" content={data?.responseData?.payerPhoneNumber} />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="">
            <p className="my-3 text-lg font-semibold">Payee Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>]{' '}
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="Payee Name" content={data?.responseData?.payeeName} />
            <DetailsCard title="Address" content={data?.responseData?.payeeAddress} />
            <DetailsCard title="Email Address" content={data?.responseData?.payeeEmailAddress} />
            <DetailsCard title="Phone Number" content={data?.responseData?.payeePhoneNumber} />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Biller Details</p>
            <div className="flex items-center gap-2">
              <p>Biller Code :</p>
              <p>{data?.responseData?.billerCode}</p>
            </div>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard
              title="Biller Account Number"
              content={data?.responseData?.billerAccountNumber}
            />
            <DetailsCard title="Bank Name" content="Access Bank" />
            <DetailsCard title="Account Name" content="Vekee James Ventures" />
            <DetailsCard title="Bank Code" content={data?.responseData?.bankCode} />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Requested By</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="ID" content="12345678" />
            <DetailsCard title="Requested By" content="Vekee James Ventures" />
            <DetailsCard title="Date Requested" content="15/11/2023 - 12:12:12" />
          </div>
        </div>
        {data?.responseData?.status === MandateRequestStatus.Approved && (
          <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Account Approval Details</p>
              <div className="flex items-center gap-2">
                <CreationRequestIcon />
                <p className="text-greenPrimary">Approved</p>
              </div>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="ID" content="12345678" />
              <DetailsCard title="Approved By" content={data?.responseData?.approvedBy} />
              <DetailsCard title="Date Approved" content={data?.responseData?.dateApproved} />
            </div>
          </div>
        )}
        {data?.responseData?.status === MandateRequestStatus.Declined && (
          <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Rejected By</p>
              <div className="flex items-center gap-2">
                <DeleteRequestIcon />
                <p className="text-greenPrimary">Rejected</p>
              </div>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="ID" content="12345678" />
              <DetailsCard title="Rejected By" content={data?.responseData?.rejectedBy} />
              <DetailsCard
                title="Date Rejected"
                content={
                  data?.responseData?.dateRejected &&
                  new Date(data.responseData.dateRejected).toLocaleDateString()
                }
              />
              <DetailsCard title="Reason for Rejection" content={data?.responseData?.remark} />
            </div>
          </div>
        )}
      </div>
      {modals.confirmReject && (
        <ModalWrapper
          isOpen={modals.confirmReject}
          setIsOpen={() => closeModal('confirmReject')}
          title={'Reject Request?'}
          info={
            <>
              <p>You are about to reject this request, would you want to proceed with this?</p>
              <div className="mt-10 flex flex-col gap-2">
                <CustomInput
                  labelFor="remark"
                  label="Reason for Rejection"
                  containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 w-full"
                  inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                  inputType="text"
                  placeholder="Type here"
                  formik={formik}
                />
              </div>
            </>
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            handleProceed();
          }}
        />
      )}
      {modals.confirmApprove && (
        <ModalWrapper
          isOpen={modals.confirmApprove}
          setIsOpen={() => closeModal('confirmApprove')}
          title={'Approve Request?'}
          info={'You are about to approve this request, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            approveMandateRequestMutation.mutate(id);
            closeModal('confirmApprove');
          }}
        />
      )}
      {modals.approveSuccess && (
        <ModalWrapper
          isOpen={modals.approveSuccess}
          setIsOpen={() => closeModal('approveSuccess')}
          title={'Success!!'}
          info={'You have successfully approved this new request'}
          icon={<SuccessModalIcon />}
          type={'completed'}
          proceedAction={() => closeModal('approveSuccess')}
        />
      )}
      {modals.rejectSuccess && (
        <ModalWrapper
          isOpen={modals.rejectSuccess}
          setIsOpen={() => closeModal('rejectSuccess')}
          title={'Success!!'}
          info={'You have successfully rejected this new request'}
          icon={<SuccessModalIcon />}
          type={'completed'}
          proceedAction={() => closeModal('rejectSuccess')}
        />
      )}
    </div>
  );
};

export default DeletionRequestDetails;
