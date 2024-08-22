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
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import SubTitleIconGreen from 'assets/icons/SubTitleIconGreen';
import SubTitleIconYellow from 'assets/icons/SubTitleIconYellow';

const MerchantDeletionRequestDetails = () => {
  const [confirmApproveRequest, setConfirmApproveRequest] = useState(false);
  const [approveSuccessfulModal, setApproveSuccessfulModal] = useState(false);
  const [confirmRejectRequest, setConfirmRejectRequest] = useState(false);
  const [rejectSuccessfulModal, setRejectSuccessfulModal] = useState(false);

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
            to={`/${appRoutes.adminDashboard.requests.merchantRequests.index}`}
            className="cursor-pointer text-darkgray"
          >
            Merchant Requests
          </Link>{' '}
          <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
          <span className="text-lightPurple">Merchant Deletion Request Details</span>
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
                  setConfirmRejectRequest(true);
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
                  setConfirmApproveRequest(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="slide-down mt-5 rounded-lg bg-white px-5 py-8">
          <div className="bg-lilacPurple rounded-lg px-6 py-4">
            <h3 className="text-md font-semibold md:text-xl">Merchant Accounts</h3>
            <div className="mt-4 flex flex-col items-center justify-between gap-6 gap-x-4 md:flex-row">
              <DashboardCard
                title="Total Accounts"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconGreen />}
                route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
                // navigate to MerchantAccounts which will import table from Account Management
              />
              <DashboardCard
                title="Total Profiles"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
                // navigate to MerchantProfiles which will import table from Profile Management
              />
              <DashboardCard
                title="Total Mandates"
                numberOfRequest={1200}
                backgroundColor="bg-white"
                textColor="text-purplePrimary"
                icon={<SubTitleIconYellow />}
                route={`/${appRoutes.adminDashboard.merchantManagement.index}`}
                // navigate to MerchantMandates  which will import table from Mandate  Management
              />
            </div>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Merchant Details">
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Merchant ID" content="12345" />
                <DetailsCard title="CIF Number" content="12345" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Merchant Name" content="Fair Money" />
                <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              </div>
              <div className="flex w-[300px] flex-col gap-10">
                <DetailsCard title="Merchant Code" content="12345" />
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
      {confirmApproveRequest && (
        <ModalWrapper
          isOpen={confirmApproveRequest}
          setIsOpen={setConfirmApproveRequest}
          title={'Approve Merchant Request?'}
          info={
            'You are about to approve this merchant deletion request, would you want to proceed with this?'
          }
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            setConfirmApproveRequest(false);
            setApproveSuccessfulModal(true);
          }}
        />
      )}

      {approveSuccessfulModal && (
        <ModalWrapper
          isOpen={approveSuccessfulModal}
          setIsOpen={setApproveSuccessfulModal}
          title={'Success!!'}
          info={'You have successfully approved this merchant deletion request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            setApproveSuccessfulModal(false);
          }}
        />
      )}

      {confirmRejectRequest && (
        <ModalWrapper
          isOpen={confirmRejectRequest}
          width="700px"
          setIsOpen={setConfirmRejectRequest}
          title={'Reject Merchant Request?'}
          info={
            'You are about to reject this merchant deletion request, would you want to proceed with this?'
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
            setConfirmRejectRequest(false);
            setRejectSuccessfulModal(true);
          }}
        />
      )}
      {rejectSuccessfulModal && (
        <ModalWrapper
          isOpen={rejectSuccessfulModal}
          setIsOpen={setRejectSuccessfulModal}
          title={'Success!!'}
          info={'You have successfully rejected this merchant deletion request'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            setRejectSuccessfulModal(false);
          }}
        />
      )}
    </>
  );
};

export default MerchantDeletionRequestDetails;
