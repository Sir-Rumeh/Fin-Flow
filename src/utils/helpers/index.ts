import { DataTableState, QueryParams, UpdateRequestDisplay } from 'utils/interfaces';
import { AppConfig } from 'config/index';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { DropdownOption } from 'components/FormElements/FormSelect';
import { canBeUpdated } from 'utils/constants';

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

export function removeFalsyValuesFromObj(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (value !== undefined && value !== null && value) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export const appendParams = (params: URLSearchParams, queryParams: QueryParams | undefined) => {
  if (!queryParams) return;
  const formattedQueryParams: QueryParams = removeFalsyValuesFromObj(queryParams);

  if (formattedQueryParams.username) params.append('UserName', formattedQueryParams.username);
  if (formattedQueryParams.email) params.append('Email', formattedQueryParams.email);
  if (formattedQueryParams.mandateCode)
    params.append('MandateCode', formattedQueryParams.mandateCode);
  if (formattedQueryParams.status) params.append('Status', formattedQueryParams.status);
  if (formattedQueryParams.pageNo !== undefined)
    params.append('PageNo', formattedQueryParams.pageNo.toString());
  if (formattedQueryParams.pageSize !== undefined)
    params.append('PageSize', formattedQueryParams.pageSize.toString());
  if (formattedQueryParams.sortBy) params.append('SortBy', formattedQueryParams.sortBy);
  if (formattedQueryParams.sortOrder) params.append('SortOrder', formattedQueryParams.sortOrder);
  if (formattedQueryParams.searchFilter)
    params.append('searchFilter', formattedQueryParams.searchFilter);
  if (formattedQueryParams.startDate) params.append('StartDate', formattedQueryParams.startDate);
  if (formattedQueryParams.endDate) params.append('EndDate', formattedQueryParams.endDate);
};

export const formatApiDataForDropdown = (dataArray: any[], dataKey: string) => {
  let formattedArrayOptions: DropdownOption[] = [];
  dataArray?.map((dataOption: any) => {
    const newOption = {
      value: dataOption[dataKey] as string,
      label: capitalize(dataOption[dataKey] as string),
    };
    formattedArrayOptions.push(newOption);
  });

  return formattedArrayOptions;
};
export const displayUpdateRequestData = (
  oldData: Object,
  newData: Object,
): UpdateRequestDisplay[] | undefined => {
  if (oldData && newData) {
    let updateList: UpdateRequestDisplay[] = [];
    Object.entries(oldData).forEach(([oldDataKey, oldDataValue]) => {
      Object.entries(newData).forEach(([newDataKey, newDataValue]) => {
        if (oldDataKey === newDataKey) {
          if (canBeUpdated[oldDataKey] && oldDataValue !== newDataValue) {
            const updateData = {
              name: capitalize(oldDataKey),
              oldValue: oldDataValue,
              newValue: newDataValue,
            };
            updateList.push(updateData);
          }
        }
      });
    });
    return updateList;
  }
};

export const formatNumberDisplay = (number: number | string) => {
  if (number || number == 0) {
    let numberString =
      typeof number === 'number' ? number?.toFixed(2) : parseInt(number).toFixed(2);
    let parts = numberString?.split('.');
    parts[0] = parseInt(parts?.[0], 10)?.toLocaleString();
    return parts.join('.');
  }
};
