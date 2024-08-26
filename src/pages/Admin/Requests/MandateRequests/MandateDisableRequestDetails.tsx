import { Link, useLocation } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { BiChevronRight } from 'react-icons/bi';
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
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import { UpdateRequestIcon } from 'assets/icons';

const MandateDisableRequestDetails = () => {
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
      reasonForRejection: '',
    },
    validationSchema: reasonForRejectionSchema,
    onSubmit: () => {},
  });

  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.requests.mandateRequests.index}`}
            className="cursor-pointer text-darkgray"
          >
            Mandate Requests
          </Link>{' '}
          <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
          <span className="text-lightPurple">Disable Mandate Request Details</span>
        </div>
        <div className="slide-down mt-6 flex flex-col items-end justify-between gap-y-3 sm:flex-row md:items-center">
          <h2 className="text-lg font-semibold md:text-2xl">Request ID : Req123456</h2>
          <div className="flex w-1/2 items-center justify-end gap-4">
            <div className="w-auto">
              <ButtonComponent
                color="purplePrimary"
                variant="outlined"
                height="3rem"
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
                height="3rem"
                title="Approve"
                customPaddingX="3rem"
                onClick={() => {
                  openModal('confirmApproveRequest');
                }}
              />
            </div>
          </div>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="">
            <ItemDetailsContainer
              title="Request Details"
              titleExtension={
                <>
                  <div className="flex items-center justify-end gap-2">
                    <p className="text-sm text-darkgray">Mandate Type</p>
                    <UpdateRequestIcon />
                    <p className="mb-[1px] font-semibold text-lightPurple">Variable</p>
                  </div>
                </>
              }
            >
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Account ID" content="1234545" />
                <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
                <DetailsCard title="Effective Date" content="12/12/2024" />
                <DetailsCard title="Frequency" content="Monthly" />
                <DetailsCard title="Account Number" content="0909887674" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Merchant ID" content="1234545" />
                <DetailsCard title="Merchant ID" content="1234545" />
                <DetailsCard title="End Date" content="12/12/2024" />
                <DetailsCard title="Service" content="Life Insurance" />
                <DetailsCard title="Account Name" content="Fair Money" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Merchant Code" content="1234545" />
                <DetailsCard title="Amount" content="N5,000,000" />
                <DetailsCard title="Day to Apply" content="13th" />
                <DetailsCard title="Narration" content="Mandate Narration" />
                <DetailsCard title="Bank Code" content="1234545" />
              </div>
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Payer Details">
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Payer Name" content="Ugobest Venture" />
                <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Email Address" content="ugobest@gmal.com" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Phone Number" content="09093874628" />
              </div>
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Payee Details">
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Payer Name" content="Ugobest Venture" />
                <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Email Address" content="ugobest@gmal.com" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Phone Number" content="09093874628" />
              </div>
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Biller Details">
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Biller Account Number" content="9093874628" />
                <DetailsCard title="Biller Code" content="123545" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Bank Name" content="Access" />
                <DetailsCard title="Bank Code" content=";74628" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Account Name" content="Ugobest Venture" />
              </div>
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="ID" content="9344243" />
                <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Created By" content="John Doe" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              </div>
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="ID" content="9344243" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Approved By" content="John Doe" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Date Approved" content="12/12/2024 : 03:00pm" />
              </div>
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Requested By">
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="ID" content="9344243" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Requested By" content="John Doe" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Date Requested" content="12/12/2024 : 03:00pm" />
              </div>
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
      {modals.confirmApproveRequest && (
        <ModalWrapper
          isOpen={modals.confirmApproveRequest}
          setIsOpen={() => closeModal('confirmApproveRequest')}
          title={'Approve mandate Request?'}
          info={
            'You are about to approve this disable mandate request, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmApproveRequest');
            openModal('approveSuccessfulModal');
          }}
        />
      )}

      {modals.approveSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.approveSuccessfulModal}
          setIsOpen={() => closeModal('approveSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully approved this disable mandate request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('approveSuccessfulModal');
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
            'You are about to reject this disable mandate request, would you want to proceed with this?'
          }
          feedback={
            <div className="w-full px-9">
              <FormInput
                id="reasonForRejection"
                name={'reasonForRejection'}
                placeholder={'Reason For Rejection'}
                label={'Reason For Rejection'}
                height={'3rem'}
                value={formik.values.reasonForRejection}
                onChange={formik.handleChange}
                error={
                  formik.touched.reasonForRejection && Boolean(formik.errors.reasonForRejection)
                }
                helperText={
                  formik.touched.reasonForRejection && formik.errors.reasonForRejection
                    ? formik.errors.reasonForRejection
                    : ''
                }
              />
            </div>
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedBackgroundColor="#F34E4E"
          hoverBackgroundColor="#8B0000"
          proceedAction={() => {
            closeModal('confirmRejectRequest');
            openModal('rejectSuccessfulModal');
          }}
        />
      )}
      {modals.rejectSuccessfulModal && (
        <ModalWrapper
          isOpen={modals.rejectSuccessfulModal}
          setIsOpen={() => closeModal('rejectSuccessfulModal')}
          title={'Success!!'}
          info={'You have successfully rejected this disable mandate request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('rejectSuccessfulModal');
          }}
        />
      )}
    </>
  );
};

export default MandateDisableRequestDetails;
