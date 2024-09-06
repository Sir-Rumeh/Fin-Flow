import { useState } from 'react';
import Tab from 'components/Tabs';
import { BiDownload } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useTabContext } from '../../../context/TabContext';
import appRoutes from 'utils/constants/routes';
import { CalendarIcon } from '@mui/x-date-pickers';
import CustomInput from 'components/FormElements/CustomInput';
import ButtonComponent from 'components/FormElements/Button';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import { ArrowRightIcon, DarkArrowDown, SuccessModalIcon } from 'assets/icons';
import { useDropzone } from 'react-dropzone';
import CustomSelect from 'components/FormElements/CustomSelect';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  fontFamily: 'sans-serif',
};

const CreateMandate = () => {
  const { tab, setTab } = useTabContext();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [modals, setModals] = useState({
    addMandate: false,
    confirmAddMandate: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div className="px-5 py-5">
        <div className="flex items-center gap-4">
          <Link
            to={`/${appRoutes.merchantDashboard.mandateManagement.index}`}
            className="cursor-pointer text-sm text-darkgray"
          >
            Mandate Management
          </Link>
          <ArrowRightIcon style="mt-[2px]" />
          <span className="text-sm text-lightPurple">Create Mandate</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Create Mandate</h2>
        </div>
        <div className="mt-5 flex items-center gap-8">
          <Tab
            label="Single Upload"
            isActive={tab === 1}
            onClick={() => setTab(1)}
            inactiveColor="text-[#334335]"
          />
          <Tab
            label="Bulk Upload"
            isActive={tab === 2}
            onClick={() => setTab(2)}
            inactiveColor="text-[#334335]"
          />
        </div>
        {tab === 1 && (
          <div className="mt-5 rounded-lg bg-white px-5 py-10">
            <div className="rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="my-3 text-lg font-semibold">Mandate Details</p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Mandate Type:</p>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-3">
                    <div className="flex items-center gap-1">
                      <input type="radio" className="h-4 w-4" />
                      <p>Variable</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <input type="radio" className="h-4 w-4" />
                      <p>Fixed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 h-[2px] w-full bg-grayPrimary"></div>
              <div className="mt-5 pb-10">
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomInput
                    labelFor="merchantId"
                    label="Merchant ID"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Merchant Code"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Product ID"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomInput
                    labelFor="merchantId"
                    label="Amount"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Start Date"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0 cursor-pointer"
                    inputType="text"
                    placeholder="Select date"
                    icon={<CalendarIcon className="mr-2 mt-1" />}
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="End Date"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0 cursor-pointer"
                    inputType="text"
                    placeholder="Select date"
                    icon={<CalendarIcon className="mr-2 mt-1" />}
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomSelect
                    labelFor="reportType"
                    label="Day to Apply"
                    containerStyles="h-[50px] md:w-[327px]"
                    selectStyles="h-[50px] px-2"
                    options={['Mandate Status Report', 'Transaction Reports']}
                    placeholder="Select here"
                    icon={<DarkArrowDown />}
                    onSelect={() => {}}
                  />
                  <CustomSelect
                    labelFor="reportType"
                    label="Frequency"
                    containerStyles="h-[50px] md:w-[327px]"
                    selectStyles="h-[50px] px-2"
                    options={['Mandate Status Report', 'Transaction Reports']}
                    placeholder="Select here"
                    icon={<DarkArrowDown />}
                    onSelect={() => {}}
                  />
                  <CustomSelect
                    labelFor="reportType"
                    label="Service"
                    containerStyles="h-[50px] md:w-[327px]"
                    selectStyles="h-[50px] px-2"
                    options={['Mandate Status Report', 'Transaction Reports']}
                    placeholder="Select here"
                    icon={<DarkArrowDown />}
                    onSelect={() => {}}
                  />
                </div>
                <div className="mt-[70px] grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomInput
                    labelFor="merchantId"
                    label="Account Name"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Account Number"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Bank Code"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomInput
                    labelFor="merchantId"
                    label="Upload Supporting Document"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="focus:outline-none focus:ring-0"
                    inputType="file"
                  />
                  <div className="md:col-span-2">
                    <CustomInput
                      labelFor="merchantId"
                      label="Narration"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[654]"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="my-3 text-lg font-semibold">Payer Details</p>
              </div>
              <div className="mt-2 h-[2px] w-full bg-grayPrimary"></div>
              <div className="mt-5 pb-10">
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomInput
                    labelFor="merchantId"
                    label="Payer Name"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Payer Email Address"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Payer Phone Number"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <div className="md:col-span-3">
                    <CustomInput
                      labelFor="merchantId"
                      label="Narration"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[654]"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="my-3 text-lg font-semibold">Payee Details</p>
              </div>
              <div className="mt-2 h-[2px] w-full bg-grayPrimary"></div>
              <div className="mt-5 pb-10">
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomInput
                    labelFor="merchantId"
                    label="Payee Name"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Payee Email Address"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Payee Phone Number"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <div className="md:col-span-3">
                    <CustomInput
                      labelFor="merchantId"
                      label="Address"
                      containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[654]"
                      inputStyles="h-[40px] w-full px-2 focus:outline-none focus:ring-0"
                      inputType="text"
                      placeholder="Enter here"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-[5px] border-[3px] border-grayPrimary px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="my-3 text-lg font-semibold">Biller Details</p>
              </div>
              <div className="mt-2 h-[2px] w-full bg-grayPrimary"></div>
              <div className="mt-5 pb-10">
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomInput
                    labelFor="merchantId"
                    label="Biller"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Biller ID"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Biller Account Number"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-3">
                  <CustomInput
                    labelFor="merchantId"
                    label="Account Name"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Bank Code"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                  <CustomInput
                    labelFor="merchantId"
                    label="Bank Name"
                    containerStyles="flex h-[50px] items-center justify-between rounded-lg border border-gray-300 px-1 md:w-[327px]"
                    inputStyles="h-[40px] w-[300px] px-2 focus:outline-none focus:ring-0"
                    inputType="text"
                    placeholder="Enter here"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <div className="flex items-center gap-5">
                <ButtonComponent
                  onClick={() => closeModal('addMandate')}
                  title="Cancel"
                  border={1}
                  borderColor="#5C067C"
                  color="#5C067C"
                  width="150px"
                  height="40px"
                />
                <ButtonComponent
                  onClick={() => openModal('addMandate')}
                  title="Add Mandate"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#5C067C"
                  color="white"
                  width="150px"
                  height="40px"
                />
              </div>
            </div>
          </div>
        )}
        {tab === 2 && (
          <div className="mt-5 rounded-lg bg-white px-5 py-10">
            <div className="flex items-center justify-around rounded-[5px] border-[3px] border-dashed border-gray-200 px-6 py-10">
              <div className="flex h-auto w-auto items-center justify-around rounded-md bg-[#F0F0F0] px-40 py-10">
                <section>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p className="text-center font-semibold">Drag and drop excel sheet</p>
                    <p className="text-center font-semibold">or</p>
                    <div className="flex items-center justify-around">
                      <button className="mt-2 flex items-center gap-2 rounded-lg border border-lightPurple px-4 py-2 text-center text-lightPurple">
                        <BiDownload className="h-5 w-5" /> Browse Document
                      </button>
                    </div>
                  </div>
                  <aside className="mt-4 flex flex-col">
                    <div className="text-sm text-lightPurple">{files}</div>
                  </aside>
                </section>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <div className="flex items-center gap-5">
                <ButtonComponent
                  onClick={() => closeModal('addMandate')}
                  title="Cancel"
                  border={1}
                  borderColor="#5C067C"
                  color="#5C067C"
                  width="150px"
                  height="40px"
                />
                <ButtonComponent
                  onClick={() => openModal('addMandate')}
                  title="Add Mandate"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#5C067C"
                  color="white"
                  width="150px"
                  height="40px"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {modals.addMandate && (
        <ModalWrapper
          isOpen={modals.addMandate}
          setIsOpen={() => closeModal('addMandate')}
          title={'Add Mandate?'}
          info={'You are about to add a new mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            openModal('confirmAddMandate');
            closeModal('addMandate');
          }}
        />
      )}
      {modals.confirmAddMandate && (
        <ModalWrapper
          isOpen={modals.confirmAddMandate}
          setIsOpen={() => closeModal('confirmAddMandate')}
          title={'Success!!'}
          info={'You have successfully added this mandate'}
          icon={<SuccessModalIcon />}
          type={'completed'}
          proceedAction={() => closeModal('addMandate')}
        />
      )}
    </>
  );
};

export default CreateMandate;
