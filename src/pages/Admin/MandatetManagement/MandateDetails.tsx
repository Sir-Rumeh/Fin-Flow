import {
  Link,
  useLocation,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { CreationRequestIcon, DeleteRequestIcon, UpdateRequestIcon } from 'assets/icons';
import { BiChevronRight } from 'react-icons/bi';
import ItemDetailsContainer from 'components/common/ItemDetailsContainer';
import appRoutes from 'utils/constants/routes';
import DashboardCard from 'components/common/DashboardCards/DashboardCard';
import { checkRoute } from 'utils/helpers';
import SubTitleIconGreen from 'assets/icons/SubTitleIconGreen';
import SubTitleIconYellow from 'assets/icons/SubTitleIconYellow';
import ApprovedIcon from 'assets/icons/ApprovedIcon';
import ButtonComponent from 'components/FormElements/Button';
import WhiteArrowDown from 'assets/icons/WhiteArrowDown';
import CustomPopover from 'hoc/PopOverWrapper';
import { useState } from 'react';
import { ModalWrapper } from 'hoc/ModalWrapper';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';

const MandateDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams?.get('id') || '';
  let mandateType = 'Variable';
  let mandateStatus = 'Disabled';

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
  return (
    <>
      <div className="px-5 py-1">
        <div className="mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.mandateManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Mandate Management
          </Link>{' '}
          <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
          <span className="text-lightPurple">Mandate Details</span>
        </div>

        <div className="slide-down mt-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold md:text-2xl">Mandate ID : Req123456</h2>
          </div>
          <div className="w-auto">
            <CustomPopover
              popoverId={1}
              buttonIcon={
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  endIcon={<WhiteArrowDown />}
                  type="button"
                  title="Actions"
                  customPaddingX="1.4rem"
                />
              }
              translationX={8}
              translationY={54}
            >
              <div className="flex flex-col rounded-md p-1 text-sm">
                <button
                  onClick={() =>
                    navigate({
                      pathname: `/${appRoutes.adminDashboard.mandateManagement.mandateTransactions}`,
                      search: `?${createSearchParams({ id })}`,
                    })
                  }
                  type="button"
                  className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                >
                  View Transactions
                </button>

                {mandateType === 'Variable' && (
                  <button
                    onClick={() =>
                      navigate({
                        pathname: `/${appRoutes.adminDashboard.mandateManagement.editMandate}`,
                        search: `?${createSearchParams({ id })}`,
                      })
                    }
                    type="button"
                    className="w-full px-3 py-2 text-start font-[600] hover:bg-purpleSecondary"
                  >
                    Update Amount
                  </button>
                )}

                {mandateStatus === 'Enabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmDisable')}
                    className="w-full px-3 py-2 text-start font-[600] text-red-400 hover:bg-purpleSecondary"
                  >
                    Disable
                  </button>
                )}
                {mandateStatus === 'Disabled' && (
                  <button
                    type="button"
                    onClick={() => openModal('confirmEnable')}
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
              title="Mandate Details"
              titleExtension={
                <>
                  <div className="flex items-center justify-end gap-2">
                    <p className="text-sm text-darkgray">Mandate Type:</p>
                    <UpdateRequestIcon />
                    <p className="mb-[1px] font-semibold text-lightPurple">{mandateType}</p>
                  </div>
                </>
              }
            >
              <DetailsCard title="Account ID" content="1234545" />
              <DetailsCard title="Merchant ID" content="1234545" />
              <DetailsCard title="Merchant Code" content="1234545" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              <DetailsCard title="Merchant ID" content="1234545" />
              <DetailsCard title="Amount" content="N5,000,000" />
              <DetailsCard title="Effective Date" content="12/12/2024" />
              <DetailsCard title="End Date" content="12/12/2024" />
              <DetailsCard title="Day to Apply" content="13th" />
              <DetailsCard title="Frequency" content="Monthly" />
              <DetailsCard title="Service" content="Life Insurance" />
              <DetailsCard title="Narration" content="Mandate Narration" />
              <DetailsCard title="Account Number" content="0909887674" />
              <DetailsCard title="Account Name" content="Fair Money" />
              <DetailsCard title="Bank Code" content="1234545" />
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Payer Details">
              <DetailsCard title="Payer Name" content="Ugobest Venture" />
              <DetailsCard title="Email Address" content="ugobest@gmal.com" />
              <DetailsCard title="Phone Number" content="09093874628" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Payee Details">
              <DetailsCard title="Payee Name" content="Ugobest Venture" />
              <DetailsCard title="Email Address" content="ugobest@gmal.com" />
              <DetailsCard title="Phone Number" content="09093874628" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </ItemDetailsContainer>
          </div>
          <div className="mt-10">
            <ItemDetailsContainer title="Biller Details">
              <DetailsCard title="Biller Account Number" content="9093874628" />
              <DetailsCard title="Bank Name" content="Access" />
              <DetailsCard title="Account Name" content="Ugobest Venture" />
              <DetailsCard title="Biller Code" content="123545" />
              <DetailsCard title="Bank Code" content=";74628" />
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Creator Details">
              <DetailsCard title="ID" content="9344243" />
              <DetailsCard title="Created By" content="John Doe" />
              <DetailsCard title="Date Created" content="12/12/2024 : 03:00pm" />
              <DetailsCard title="Address" content="Ozumba Mbadiwe Avenue, Lagos State" />
            </ItemDetailsContainer>
          </div>

          <div className="mt-10">
            <ItemDetailsContainer title="Approver Details" titleExtension={<ApprovedIcon />}>
              <DetailsCard title="ID" content="9344243" />
              <DetailsCard title="Approved By" content="John Doe" />
              <DetailsCard title="Date Approved" content="12/12/2024 : 03:00pm" />
            </ItemDetailsContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default MandateDetails;
