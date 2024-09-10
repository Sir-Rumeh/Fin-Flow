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
    <div className={`relative ${props.customClass}`}>
      <div className="">
        <CustomPopover
          popoverId={3}
          buttonIcon={
            <ButtonComponent
              onClick={() => {}}
              title="Export"
              children={<ExportButtonArrowDown className="ml-1" />}
              color="#5C068C"
              border={1}
              customPaddingX="1.3rem"
            />
          }
          translationX={8}
          translationY={56}
        >
          <div className="flex w-[8rem] flex-col rounded-md p-1 text-sm">
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
