import { Link } from 'react-router-dom';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import { UpdateRequestIcon } from 'assets/icons';
import { BiChevronRight } from 'react-icons/bi';

const DashboardMerchantDetails = () => {
  return (
    <div className="px-5 py-5">
      <div className="flex items-center gap-2">
        <Link to="/merchant/dashboard" className="cursor-pointer text-sm text-darkgray">
          All Requests
        </Link>{' '}
        <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
        <span className="text-sm text-lightPurple">Request Details</span>
      </div>
      <h2 className="mt-3 text-xl font-semibold">Request ID : Req123456</h2>
      <div className="mt-5 rounded-lg bg-white px-5 py-10">
        <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
          <div className="flex items-center justify-between bg-red-400">
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
            <p className="my-3 text-lg font-semibold">Biller Details</p>
          </div>
          <div className="h-[2px] w-full bg-grayPrimary"></div>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:gap-0">
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="ID" content="12345678" />
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <DetailsCard title="Created By" content="Vekee James Ventures" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMerchantDetails;
