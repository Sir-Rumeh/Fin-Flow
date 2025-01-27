import { useQuery } from '@tanstack/react-query';
import { getProfileById } from 'config/actions/profile-actions';
import { getStaffUserById } from 'config/actions/staff-user-actions';
import React, { useEffect, useState } from 'react';

interface Author {
  userType: string;
  authorId: string;
  authorName: string;
  authorAddress: string;
}

function useActionAuthor(id: string): Author {
  const [data, setData] = useState<Author>();
  let userType = 'Merchant';

  const defaultAuthorData: Author = {
    userType: userType,
    authorId: id,
    authorName: '',
    authorAddress: '',
  };

  const getAdminDetails = async () => {
    const res = await getStaffUserById(id);
    if (res) {
      console.log('admin-details', res);
      return res;
    }
  };
  const getMerchantUserDetails = async () => {
    const res = await getProfileById(id);
    if (res) {
      console.log('merchant-details', res);
      return res;
    }
  };

  useEffect(() => {
    if (id?.startsWith('URS')) {
      userType = 'Admin';
      const fetchData = async () => {
        const adminDetails = await getAdminDetails();
        const authorData: Author = {
          userType: 'Admin',
          authorId: id,
          authorName: `${adminDetails?.responseData?.firstName} ${adminDetails?.responseData?.lastName}`,
          authorAddress: adminDetails?.responseData?.address,
        };
        setData(authorData);
      };
      fetchData();
    } else if (id?.startsWith('PFL')) {
      userType = 'Merchant';
      const fetchData = async () => {
        const merchantUserDetails = await getMerchantUserDetails();
        const authorData: Author = {
          userType: 'Merchant',
          authorId: id,
          authorName: `${merchantUserDetails?.responseData?.firstName} ${merchantUserDetails?.responseData?.lastName}`,
          authorAddress: merchantUserDetails?.responseData?.address,
        };
        setData(authorData);
      };
      fetchData();
    }
  }, [id]);

  return data || defaultAuthorData;
}

export default useActionAuthor;
