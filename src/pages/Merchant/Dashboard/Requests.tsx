import { UpdateRequestIcon } from 'assets/icons';
import { BiChevronRight } from 'react-icons/bi';

type RequestProps = {
  setView: React.Dispatch<React.SetStateAction<number>>;
};

const Requests = ({ setView }: RequestProps) => {
  return (
    <div className="px-5 py-5">
      {
        <div className="flex items-center gap-2">
          <span className="cursor-pointer text-sm text-darkgray" onClick={() => setView(1)}>
            All Requests
          </span>{' '}
          <BiChevronRight className="h-5 w-5 text-darkgray" />{' '}
          <span className="text-sm text-lightPurple">Request Details</span>
        </div>
      }
      <h2 className="mt-3 text-xl font-semibold">Request ID : Req123456</h2>
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
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Account ID</p>
                <p>12345</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Date Created</p>
                <p>12/12/2024 - 03:00pm</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Effective Date</p>
                <p>12/12/2024</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Frequency</p>
                <p>Monthly</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Account Number</p>
                <p>1234567</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Merchant ID</p>
                <p>12345</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Product ID</p>
                <p>12345</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">End Date</p>
                <p>12/12/2024</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Service</p>
                <p>Life Insurance</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Account Name</p>
                <p>Fair Money</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Merchant Code</p>
                <p>12345</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Amount</p>
                <p className="text-lightPurple">N 500,000</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Day to apply</p>
                <p>10/12/2024</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Narration</p>
                <p>Any narration can be here</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Bank Code</p>
                <p>787878</p>
              </div>
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
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Payer Name</p>
                <p>Vekee James Ventures</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Address</p>
                <p>Ozumba Mbadiwe Avenue, Lagos State</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Email Address</p>
                <p>vekee@gmail.com</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Phone Number</p>
                <p>09028272009</p>
              </div>
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
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Payer Name</p>
                <p>Vekee James Ventures</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Address</p>
                <p>Ozumba Mbadiwe Avenue, Lagos State</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Email Address</p>
                <p>vekee@gmail.com</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Phone Number</p>
                <p>09028272009</p>
              </div>
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
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Biller Account Number</p>
                <p>12345678</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Bank Name</p>
                <p>Access Bank</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Account Name</p>
                <p>Vekee James Ventures</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Bank Code</p>
                <p>09028272009</p>
              </div>
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
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">ID</p>
                <p>12345678</p>
              </div>
            </div>
            <div className="flex w-[300px] flex-col gap-8">
              <div className="flex flex-col">
                <p className="text-sm text-darkgray">Created By</p>
                <p>Vekee James Ventures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
