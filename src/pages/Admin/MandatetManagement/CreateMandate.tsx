import { Link, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import { useState } from 'react';
import { TabsProps } from 'utils/interfaces';
import CustomTabs from 'hoc/CustomTabs';
import SingleUpload from './SingleUpload';
import BulkUpload from './BulkUpload';
import ChevronRight from 'assets/icons/ChevronRight';

const CreateMandate = () => {
  const navigate = useNavigate();
  const uploadType = {
    single: 'Single Upload',
    bulk: 'Bulk Upload',
  };
  const [activeTab, setActiveTab] = useState(uploadType.single);
  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: uploadType.single,
    },
    {
      tabIndex: 2,
      tabName: uploadType.bulk,
    },
  ];

  const pageDisplay = () => {
    switch (activeTab) {
      case uploadType.single:
        return <SingleUpload />;
      case uploadType.bulk:
        return <BulkUpload />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.mandateManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Mandate Management
          </Link>{' '}
          <ChevronRight /> <span className="text-lightPurple">Create Mandate</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Create Mandate</h2>
        </div>

        <div className="slide-down mt-3 flex w-full flex-row items-center justify-start gap-6 md:gap-10">
          <CustomTabs
            width="w-auto"
            tabs={tabsList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showTabTotal={false}
          />
        </div>
        <div className="mt-1">{pageDisplay()}</div>
      </div>
    </>
  );
};

export default CreateMandate;
