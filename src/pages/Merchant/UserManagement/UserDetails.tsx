import { Link, useParams } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import appRoutes from 'utils/constants/routes';
import { ArrowRightIcon, CreationRequestIcon, DeleteRequestIcon } from 'assets/icons';
import { useQuery } from '@tanstack/react-query';
import { notifyError } from 'utils/helpers';
import { getProfileById } from 'config/actions/profile-actions';

const UserDetails = () => {
  const { id: requestId } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ['profiles', requestId],
    queryFn: ({ queryKey }) => getProfileById(queryKey[1]),
  });

  isError && notifyError(error.message);

  return (
    <div className="px-5 py-5">
      <div className="flex items-center gap-4 font-semibold">
        <Link
          to={`/${appRoutes.merchantDashboard.userManagement.index}`}
          className="cursor-pointer text-sm text-darkgray"
        >
          Profiles
        </Link>
        <ArrowRightIcon style="mt-[2px]" />
        <span className="text-sm text-lightPurple">Profile Details</span>
      </div>

      <div className="mt-5 rounded-lg bg-white px-5 py-10">
        <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="my-3 text-lg font-semibold">Profile Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[50px]">
            <DetailsCard title="Merchant ID" content={data?.responseData?.merchantId} />
            <DetailsCard
              title="Merchant Name"
              content={`${data?.responseData?.firstName} ${data?.responseData?.lastName}`}
            />
            <DetailsCard title="CIF Number" content="9028272009" />
            <DetailsCard title="Account ID" content={data?.responseData?.accountID} />
            <DetailsCard title="User Name" content={data?.responseData?.userName} />
            <DetailsCard title="Email" content={data?.responseData?.email} />
            <DetailsCard
              title="Date Requested"
              content={
                data?.responseData?.createdAt &&
                new Date(data.responseData.createdAt).toLocaleDateString()
              }
            />
            <DetailsCard
              title="Status"
              content={
                data?.responseData?.isActive ? (
                  <div className="flex items-center gap-2 text-greenPrimary">
                    <CreationRequestIcon /> Enabled
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-greenPrimary">
                    <DeleteRequestIcon /> Disabled
                  </div>
                )
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
            <DetailsCard title="Created By" content={data?.responseData?.createdBy} />
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
            <DetailsCard title="Approved By" content={data?.responseData?.approvedBy} />
            <DetailsCard
              title="Date Approved"
              content={
                data?.responseData?.createdAt &&
                new Date(data.responseData.createdAt).toLocaleDateString()
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
