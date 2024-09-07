import React, { useRef, Dispatch, useLayoutEffect, SetStateAction, RefObject } from 'react';
import { CSVLink } from 'react-csv';

interface ExportToExcelProps {
  data: Array<any>;
  headers: Array<any>;
  fileName: string;
  download: boolean;
  setDownload: Dispatch<SetStateAction<any>>;
}

type CSVLINK = typeof CSVLink;

const ExportToExcel = ({ data, headers, fileName, download, setDownload }: ExportToExcelProps) => {
  const csvLink = useRef<CSVLINK & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  useLayoutEffect(() => {
    if (download) {
      csvLink?.current?.link.click();
      setDownload(false);
    }
  });

  return (
    <CSVLink data={data} filename={fileName} headers={headers} ref={csvLink} target="_blank" />
  );
};

export default ExportToExcel;
