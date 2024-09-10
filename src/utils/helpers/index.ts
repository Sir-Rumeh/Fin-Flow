import { DataTableState } from 'utils/interfaces';
import { AppConfig } from 'config/index';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

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
