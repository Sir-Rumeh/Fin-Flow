import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteRequestIcon, SuccessModalIcon, UpdateRequestIcon } from 'assets/icons';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import ButtonComponent from 'components/FormElements/Button';
import { BiChevronRight } from 'react-icons/bi';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import appRoutes from 'utils/constants/routes';
import { useTabContext } from '../../../../context/TabContext';

const DisableRequestDetails = () => {
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
      <div className="flex items-center gap-2">
        <Link
          to={`/${appRoutes.merchantDashboard.requests.index}`}
          className="cursor-pointer text-sm text-darkgray"
        >
          Mandate Requests
        </Link>{' '}
        <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
        <span className="text-sm text-lightPurple">Request Details</span>
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
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:gap-0">
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Account ID" content="12345" />
              <DetailsCard title="Date Created" content="12/12/2024 - 03:00pm" />
              <DetailsCard title="Effective Date" content="12/12/2024" />
              <DetailsCard title="Frequency" content="Monthly" />
              <DetailsCard title="Account Number" content="1234567" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Merchant ID" content="12345" />
              <DetailsCard title="Product ID" content="12345" />
              <DetailsCard title="End Date" content="12/12/2024" />
              <DetailsCard title="Service" content="Life Insurance" />
              <DetailsCard title="Account Name" content="Fair Money" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Merchant Code" content="12345" />
              <DetailsCard title="Amount" content="N 500,000" contentClassName="text-lightPurple" />
              <DetailsCard title="Day to apply" content="10/12/2024" />
              <DetailsCard title="Narration" content="Any narration can be here" />
              <DetailsCard title="Bank Code" content="787878" />
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="">
            <p className="my-3 text-lg font-semibold">Payer Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:gap-0">
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Payer Name" content="Vekee James Ventures" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Email Address" content="vekee@gmail.com" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Phone Number" content="09028272009" />
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="">
            <p className="my-3 text-lg font-semibold">Payee Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:gap-0">
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Payer Name" content="Vekee James Ventures" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Email Address" content="vekee@gmail.com" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Phone Number" content="09028272009" />
            </div>
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
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:gap-0">
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Biller Account Number" content="12345678" />
              <DetailsCard title="Bank Name" content="Access Bank" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Account Name" content="Vekee James Ventures" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Bank Code" content="09028272009" />
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Requested By</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:gap-0">
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="ID" content="12345678" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Requested By" content="Vekee James Ventures" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Date Requested" content="15/11/2023 - 12:12:12" />
            </div>
          </div>
        </div>
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
            <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:gap-0">
              <div className="flex w-[300px] flex-col gap-8">
                <DetailsCard title="ID" content="12345678" />
                <DetailsCard
                  title="Reason for Rejection"
                  content="Any reason for rejection can be here"
                />
              </div>
              <div className="flex w-[300px] flex-col gap-8">
                <DetailsCard title="Rejected By" content="Vekee James Ventures" />
              </div>
              <div className="flex w-[300px] flex-col gap-8">
                <DetailsCard title="Date Rejected" content="15/11/2023 - 12:12:12" />
              </div>
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
          type={'reject'}
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

export default DisableRequestDetails;
