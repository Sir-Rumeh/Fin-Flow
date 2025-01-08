import {
  AdminAuthData,
  DataTableState,
  MerchantAuthData,
  QueryParams,
  UpdateRequestDisplay,
} from 'utils/interfaces';
import { AppConfig } from 'config/index';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { DropdownOption } from 'components/FormElements/FormSelect';
import { canBeUpdated } from 'utils/constants';
import { SearchTypes } from 'utils/enums';
import dayjs from 'dayjs';

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
    dateInToken + AppConfig.CLIENT_ID + AppConfig.CLIENT_PASSWORD,
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
  if (formattedQueryParams.status) params.append('Status', formattedQueryParams.status);
  if (formattedQueryParams.pageNo !== undefined)
    params.append('PageNo', formattedQueryParams.pageNo.toString());
  if (formattedQueryParams.pageSize !== undefined)
    params.append('PageSize', formattedQueryParams.pageSize.toString());
  if (formattedQueryParams.sortBy) params.append('SortBy', formattedQueryParams.sortBy);
  if (formattedQueryParams.sortOrder) params.append('SortOrder', formattedQueryParams.sortOrder);
  if (formattedQueryParams.searchFilter) {
    if (formattedQueryParams.searchType === SearchTypes.SearchRoles) {
      params.append('Name', formattedQueryParams.searchFilter);
    }
    if (formattedQueryParams.searchType === SearchTypes.SearchAccounts) {
      params.append('AccountNumber', formattedQueryParams.searchFilter);
    }
    if (formattedQueryParams.searchType === SearchTypes.SearchAudits) {
      params.append('Actor', formattedQueryParams.searchFilter);
    }
    if (formattedQueryParams.searchType === SearchTypes.SearchMandates) {
      params.append('MandateCode', formattedQueryParams.searchFilter);
    }
    if (formattedQueryParams.searchType === SearchTypes.SearchMerchants) {
      params.append('AccountNumber', formattedQueryParams.searchFilter);
    }
    if (
      formattedQueryParams.searchType === SearchTypes.SearchProfiles ||
      formattedQueryParams.searchType === SearchTypes.SearchStaffUser
    ) {
      params.append('Email', formattedQueryParams.searchFilter);
    }
  }
  if (formattedQueryParams.startDate) params.append('StartDate', formattedQueryParams.startDate);
  if (formattedQueryParams.endDate) params.append('EndDate', formattedQueryParams.endDate);
  if (formattedQueryParams.requestType)
    params.append('RequestType', formattedQueryParams.requestType);
};

export const formatApiDataForDropdown = (dataArray: any[], dataKey: string, dataValue: string) => {
  let formattedArrayOptions: DropdownOption[] = [];
  dataArray?.forEach((dataOption: any) => {
    const newOption = {
      label: capitalize(dataOption[dataKey] as string),
      value: dataOption[dataValue] as string,
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

export const getDateRange = (dataArray: any[]) => {
  if (dataArray.length === 0) return 'No data available';

  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
  );

  const firstDate = new Date(sortedData[0].dateCreated);
  const lastDate = new Date(sortedData[sortedData.length - 1].dateCreated);

  const firstMonth = firstDate.toLocaleString('default', { month: 'long' });
  const firstYear = firstDate.getFullYear();
  const lastMonth = lastDate.toLocaleString('default', { month: 'long' });
  const lastYear = lastDate.getFullYear();

  if (firstYear === lastYear && firstMonth === lastMonth) {
    return `${firstMonth}, ${firstYear}`;
  } else if (firstYear === lastYear) {
    return `${firstMonth} to ${lastMonth}, ${firstYear}`;
  } else {
    return `${firstMonth}, ${firstYear} to ${lastMonth}, ${lastYear}`;
  }
};

export const getUserFromLocalStorage = (): AdminAuthData | MerchantAuthData | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export function isAdminAuthData(
  user: AdminAuthData | MerchantAuthData | null,
): user is AdminAuthData {
  return (user as AdminAuthData).userData !== undefined;
}

export function isMerchantAuthData(
  user: AdminAuthData | MerchantAuthData | null,
): user is MerchantAuthData {
  return (user as MerchantAuthData).profileData !== undefined;
}

export const convertTCamelCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase(),
    )
    .replace(/\s+/g, '');

export const convertExcelArrayToObjects = (
  data: any[][],
  extraFields?: string[],
  extraValues?: string[],
) => {
  if (data.length < 2) return [];
  const headers = data[0].map(convertTCamelCase);
  const rows = data.slice(1);
  return rows.map((row) => {
    const rowObject = headers.reduce(
      (obj, header, index) => {
        const value = row[index];
        if (header.toLocaleLowerCase().includes('date')) {
          const formattedDateIsoDate = new Date(value).toISOString().split('T')[0] + 'T00:00:00';
          obj[header] = formattedDateIsoDate;
        } else {
          obj[header] = String(value) || '';
        }
        return obj;
      },
      {} as Record<string, any>,
    );
    if (extraFields && extraFields.length > 0) {
      extraFields?.forEach((newField, index) => {
        const valueFields = extraValues?.[index];
        if (valueFields) {
          const fieldsToConcatenate = valueFields.split(',').map((field) => field.trim());
          rowObject[newField] = fieldsToConcatenate
            .map((field) => rowObject[field])
            .filter(Boolean)
            .join(' ');
        }
      });
    }
    return rowObject;
  });
};

export function matchesInterface<T extends object>(obj: any, reference: T): obj is T {
  return Object.keys(reference).every((key) => key in obj);
}

export const filterSelectedOption = (filter: any, filterId: any, options: any) => {
  return options.filter((opt: any) => opt[filterId] === filter);
};
