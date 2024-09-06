import { Link } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import appRoutes from 'utils/constants/routes';
import { ArrowRightIcon, CreationRequestIcon } from 'assets/icons';

const UserDetails = () => {
  return (
    <div className="px-5 py-5">
      <div className="flex items-center gap-4 font-semibold">
        <Link
          to={`/${appRoutes.merchantDashboard.userManagement.index}`}
          className="cursor-pointer text-sm text-darkgray"
        >
          Mandate Requests
        </Link>
        <ArrowRightIcon style="mt-[2px]" />
        <span className="text-sm text-lightPurple">Request Details</span>
      </div>
      <div className="mt-5 rounded-lg bg-white px-5 py-10">
        <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Profile Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="Merchant ID" content="12345" />
            <DetailsCard title="Merchant Name" content="Fair Money" />
            <DetailsCard title="CIF Number" content="9028272009" />
            <DetailsCard title="Account ID" content="628098" />
            <DetailsCard title="User Name" content="John Doe" />
            <DetailsCard title="John Doe" content="johndoe@gmail.com" />
            <DetailsCard title="Date Requested" content="12/12/2024 - 03:00pm" />
            <DetailsCard
              title="Status"
              content={
                <div className="flex items-center gap-2 text-greenPrimary">
                  <CreationRequestIcon /> Enabled
                </div>
              }
            />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="">
            <p className="my-3 text-lg font-semibold">Creator Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="ID" content="123908" />
            <DetailsCard title="Created By" content="John doe" />
          </div>
        </div>
        <div className="mt-8 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Approval Details</p>
            <div className="flex items-center gap-2">
              <CreationRequestIcon />
              <p className="text-greenPrimary">Approved</p>
            </div>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="ID" content="12345678" />
            <DetailsCard title="Approved By" content="Vekee James Ventures" />
            <DetailsCard title="Date Approved" content="15/11/2023 - 12:12:12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
