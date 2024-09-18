import { MutableRefObject, useState } from 'react';
import ButtonComponent from './Button';
import CustomPopover from 'hoc/PopOverWrapper';
import ExportButtonArrowDown from 'assets/icons/ExportButtonArrowDown';
import ExportToExcel from 'components/common/ExportToExcel';
import { useReactToPrint } from 'react-to-print';

type Props = {
  customClass?: string;
  fileName?: string;
  data?: any[];
  headers?: { label: string; key: string }[];
  printPdfRef?: MutableRefObject<null>;
};

const ExportBUtton = (props: Props) => {
  const [download, setDownload] = useState(false);

  const handlePrintPdf = useReactToPrint({
    content: () => props.printPdfRef?.current || null,
  });

  return (
    <div className={`relative ${props.customClass} -ml-4 sm:-ml-0`}>
      <div className="">
        <CustomPopover
          popoverId={3}
          buttonIcon={
            <>
              <div
                className={`flex items-center justify-between gap-x-1 rounded-[6px] border border-[#5C068C] px-[1.2rem] py-[8px] font-[600] text-[#5C068C]`}
              >
                <p>Export</p>
                <div className="scale-[80%]">
                  <ExportButtonArrowDown />
                </div>
              </div>
            </>
          }
          translationX={8}
          translationY={56}
        >
          <div className="flex w-[7.1rem] flex-col rounded-md p-1 text-sm">
            <button
              type="button"
              className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
              onClick={() => setDownload(true)}
            >
              Excel
            </button>
            <button
              type="button"
              className="w-full px-3 py-2 text-start font-semibold opacity-75 hover:bg-purpleSecondary"
              onClick={handlePrintPdf}
            >
              PDF
            </button>
          </div>
        </CustomPopover>
        <div className="hidden">
          {props.data && props.data.length > 0 ? (
            <ExportToExcel
              data={props.data ?? []}
              headers={props.headers ?? []}
              fileName={props.fileName ?? ''}
              download={download}
              setDownload={setDownload}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ExportBUtton;
