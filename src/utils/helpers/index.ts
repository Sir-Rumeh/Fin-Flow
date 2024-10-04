import { DataTableState, QueryParams } from 'utils/interfaces';
import { AppConfig } from 'config/index';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { DropdownOption } from 'components/FormElements/FormSelect';

export const checkRoute = (pathname: string, pathToCheck: string) => {
  if (pathname.includes(pathToCheck)) {
    return true;
  }
};

export const handleNextPageChange = (
  newPageNumber: number,
  dataTableState: DataTableState,
  setDataTableState: React.Dispatch<React.SetStateAction<DataTableState>>,
  dataArray: any,
) => {
  const totalCurrentData = (newPageNumber - 1) * dataTableState.pageSize;
  if (totalCurrentData < dataArray?.totalNumberOfItems) {
    setDataTableState((prev) => {
      return { ...prev, pageNumber: newPageNumber };
    });
  }
};

export const handlePreviousPageChange = (
  newPageNumber: number,
  setDataTableState: React.Dispatch<React.SetStateAction<DataTableState>>,
) => {
  if (newPageNumber >= 1) {
    setDataTableState((prev) => {
      return { ...prev, pageNumber: newPageNumber };
    });
  }
};

export const generateHeader = () => {
  const dateToUse = new Date();
  const UTCTimestamps = dateToUse.toISOString().replace('Z', '');
  const dateInToken = UTCTimestamps.replace('T', '')
    .replace(':', '')
    .replace(':', '')
    .substring(0, UTCTimestamps.length - 7);
  const shaOneEncrypt = CryptoJS.SHA512(
    dateInToken + AppConfig.CLIENT_ID + AppConfig.XTOKEN_PASSWORD,
  );
  const apiHeader = {
    'x-token': shaOneEncrypt.toString(CryptoJS.enc.Hex),
    Client_ID: AppConfig.CLIENT_ID,
    'Ocp-Apim-Subscription-Key': AppConfig.SUBSCRIPTION_KEY_VALUE,
    UTCTimestamp: UTCTimestamps,
  };
  return apiHeader;
};

export const notifySuccess = (msg: string) => {
  toast.success(msg);
};

export const notifyError = (msg: string) => {
  toast.error(msg);
};

export const notifyInfo = (msg: string) => {
  toast.info(msg);
};

export const notifyWarning = (msg: string) => {
  toast.warn(msg);
};

export const isFileSizeValid = (size: number, limit: number = 50) => {
  return size / 1024 ** 2 <= limit;
};

export const isFileTypeValid = (type: string, fileTypes = ['pdf', 'jpg', 'jpeg', 'png']) => {
  const fileType = type.split('.').pop()?.toLowerCase();
  if (!fileType) return undefined;
  return fileTypes.includes(fileType);
};

export const convertBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export function capitalize(string: string) {
  if (!string) return '';
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const appendParams = (params: URLSearchParams, queryParams: QueryParams | undefined) => {
  if (!queryParams) return;

  const {
    username,
    email,
    mandateCode,
    status,
    pageNo,
    pageSize,
    sortBy,
    sortOrder,
    searchFilter,
    startDate,
    endDate,
  } = queryParams;

  if (username) params.append('UserName', username);
  if (email) params.append('Email', email);
  if (mandateCode) params.append('MandateCode', mandateCode);
  if (status) params.append('Status', status);
  if (pageNo !== undefined) params.append('PageNo', pageNo.toString());
  if (pageSize !== undefined) params.append('PageSize', pageSize.toString());
  if (sortBy) params.append('SortBy', sortBy);
  if (sortOrder) params.append('SortOrder', sortOrder);
  if (searchFilter) params.append('searchFilter', searchFilter);
  if (startDate) params.append('StartDate', startDate);
  if (endDate) params.append('EndDate', endDate);
};

export const formatApiDataForDropdown = (dataArray: any[], dataKey: string) => {
  let formattedArrayOptions: DropdownOption[] = [];
  dataArray?.map((dataOption: any) => {
    const newOption = {
      value: dataOption[dataKey] as string,
      label: dataOption[dataKey] as string,
    };
    formattedArrayOptions.push(newOption);
  });

  return formattedArrayOptions;
};
