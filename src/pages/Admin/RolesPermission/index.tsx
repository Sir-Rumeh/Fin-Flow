import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabsProps } from 'utils/interfaces';
import CustomTabs from 'hoc/CustomTabs';
import RoleList from './RoleList';
import RolePermission from './RolePermission';

const RolesPermission = () => {
  const navigate = useNavigate();

  const roleType = {
    roles: 'Roles',
    permission: 'Role Permissions',
  };

  const [activeTab, setActiveTab] = useState(roleType.roles);

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: roleType.roles,
    },
    {
      tabIndex: 2,
      tabName: roleType.permission,
    },
  ];

  const pageDisplay = () => {
    switch (activeTab) {
      case roleType.roles:
        return <RoleList />;
      case roleType.permission:
        return <RolePermission />;
      default:
        return null;
    }
  };

  return (
    <div className="px-5 py-1">
      <div className="slide-down mt-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Roles and Permissions</h1>
      </div>
      <div className="slide-down mt-5 flex w-full flex-row items-center justify-start gap-6 md:gap-10">
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
  );
};

export default RolesPermission;
