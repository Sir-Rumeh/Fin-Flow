import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabsProps } from 'utils/interfaces';
import CustomTabs from 'hoc/CustomTabs';
import RoleList from './RoleList';
import RolePermission from './RolePermission';
import AssignRoleToAdmin from './AssignRoleToAdmin';

const RolesPermission = () => {
  const navigate = useNavigate();

  const roleSettingsType = {
    roles: 'Roles',
    permission: 'Role Permissions',
    assignRole: 'Assign Role To Admin',
  };

  const [activeTab, setActiveTab] = useState(roleSettingsType.roles);

  const tabsList: TabsProps[] = [
    {
      tabIndex: 1,
      tabName: roleSettingsType.roles,
    },
    {
      tabIndex: 2,
      tabName: roleSettingsType.permission,
    },
    // {
    //   tabIndex: 3,
    //   tabName: roleSettingsType.assignRole,
    // },
  ];

  const pageDisplay = () => {
    switch (activeTab) {
      case roleSettingsType.roles:
        return <RoleList />;
      case roleSettingsType.permission:
        return <RolePermission />;
      case roleSettingsType.assignRole:
        return (
          <AssignRoleToAdmin actionnCompleteCallBack={() => setActiveTab(roleSettingsType.roles)} />
        );
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
