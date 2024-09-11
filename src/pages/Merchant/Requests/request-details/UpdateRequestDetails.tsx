import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useTabContext } from '../../../../context/TabContext';

const UpdateRequestDetails = () => {
  const { tab } = useTabContext();

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

  const RejectInfo = (
    <>
      <p>You are about to reject this request, would you want to proceed with this?</p>
      <div className="mt-2 flex flex-col gap-2">
        <label htmlFor="reason" className="text-left text-lg font-semibold">
          Reason for Rejection
        </label>
        <input
          className="w-full rounded-md border border-[#334335] px-2 py-3 text-lg"
          type="text"
          placeholder="Type here"
        />
      </div>
    </>
  );

  return (
    <div className="px-5 py-5">
      <div className="flex items-center gap-4">
        <Link
          to={`/${appRoutes.merchantDashboard.requests.index}`}
          className="cursor-pointer text-sm text-darkgray"
        >
          Mandate Update Requests
        </Link>
        <ArrowRightIcon style="mt-[2px]" />
        <span className="text-sm font-medium text-lightPurple">Request Details</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h2 className="mt-3 text-xl font-semibold">Request ID : Req123456</h2>
        {tab === 1 && (
          <div className="flex items-center gap-4">
            <ButtonComponent
              onClick={() => openModal('confirmReject')}
              title="Reject"
              color="#5C068C"
              border={2}
              width="150px"
              height="50px"
            />
            <ButtonComponent
              onClick={() => openModal('confirmApprove')}
              title="Approve"
              backgroundColor="#5C068C"
              color="white"
              width="150px"
              height="50px"
            />
          </div>
        )}
        {tab === 2 && (
          <ButtonComponent
            onClick={() => {}}
            title="View Request Details"
            backgroundColor="#5C068C"
            color="white"
            width="200px"
            height="50px"
          />
        )}
      </div>
      <div className="mt-5 rounded-lg bg-white px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="w-1/2 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Old Details</p>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 flex flex-col justify-between gap-5 py-4 md:flex-row md:gap-0">
              <div className="flex w-[300px] flex-col gap-8">
                <DetailsCard title="Old Amount" content="50,000" />
              </div>
            </div>
          </div>
          <div className="w-1/2 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">New Details</p>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 flex flex-col justify-between gap-5 py-4 md:flex-row md:gap-0">
              <div className="flex w-[300px] flex-col gap-8">
                <DetailsCard title="New Amount" content="100,000" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
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
            <DetailsCard title="Account ID" content="12345" />
            <DetailsCard title="Merchant ID" content="12345" />
            <DetailsCard title="Merchant Code" content="12345" />
            <DetailsCard title="Date Created" content="12/12/2024 - 03:00pm" />
            <DetailsCard title="Product ID" content="12345" />
            <DetailsCard title="Amount" content="N 500,000" contentClassName="text-lightPurple" />
            <DetailsCard title="Effective Date" content="12/12/2024" />
            <DetailsCard title="End Date" content="12/12/2024" />
            <DetailsCard title="Day to apply" content="10/12/2024" />
            <DetailsCard title="Frequency" content="Monthly" />
            <DetailsCard title="Service" content="Life Insurance" />
            <DetailsCard title="Narration" content="Any narration can be here" />
            <DetailsCard title="Account Number" content="1234567" />
            <DetailsCard title="Account Name" content="Fair Money" />
            <DetailsCard title="Bank Code" content="787878" />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="">
            <p className="my-3 text-lg font-semibold">Payer Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="Payer Name" content="Vekee James Ventures" />
            <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            <DetailsCard title="Email Address" content="vekee@gmail.com" />
            <DetailsCard title="Phone Number" content="09028272009" />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="">
            <p className="my-3 text-lg font-semibold">Payee Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="Payer Name" content="Vekee James Ventures" />
            <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            <DetailsCard title="Email Address" content="vekee@gmail.com" />
            <DetailsCard title="Phone Number" content="09028272009" />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Biller Details</p>
            <div className="flex items-center gap-2">
              <p>Biller Code :</p>
              <p>12344</p>
            </div>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="Biller Account Number" content="12345678" />
            <DetailsCard title="Bank Name" content="Access Bank" />
            <DetailsCard title="Account Name" content="Vekee James Ventures" />
            <DetailsCard title="Bank Code" content="09028272009" />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Creator Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="ID" content="12345678" />
            <DetailsCard title="Created By" content="Vekee James Ventures" />
          </div>
        </div>
        {tab === 2 && (
          <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="my-3 text-lg font-semibold">Account Approval Details</p>
              <div className="flex items-center gap-2">
                <CreationRequestIcon />
                <p className="text-greenPrimary">Variable</p>
              </div>
            </div>
            <div className="h-[2px] w-full bg-grayPrimary"></div>
            <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
              <DetailsCard title="ID" content="12345678" />
              <DetailsCard title="Approved By" content="Vekee James Ventures" />
              <DetailsCard title="Date Approved" content="15/11/2023 - 12:12:12" />
            </div>
          </div>
        )}
        {tab === 3 && (
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
              <DetailsCard
                title="Reason for Rejection"
                content="Any reason for rejection can be here"
              />
              <DetailsCard title="Rejected By" content="Vekee James Ventures" />
              <DetailsCard title="Date Rejected" content="15/11/2023 - 12:12:12" />
            </div>
          </div>
        )}
      </div>
      {modals.confirmReject && (
        <ModalWrapper
          isOpen={modals.confirmReject}
          setIsOpen={() => closeModal('confirmReject')}
          title={'Reject Request?'}
          info={RejectInfo}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmReject');
            openModal('rejectSuccess');
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
            closeModal('confirmApprove');
            openModal('approveSuccess');
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

export default UpdateRequestDetails;
