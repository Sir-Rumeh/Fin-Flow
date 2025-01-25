import React, { forwardRef } from 'react';
import DetailsCard from 'components/common/DashboardCards/DetailsCard';
import FcmbLogo from 'assets/images/fcmb_logo.png';
import dayjs from 'dayjs';

interface TransactionReceiptProps {
  data: {
    mandateCode: string;
    amount: string;
    effectiveDate: string;
    billingStatus: string;
  };
}

const TransactionReceipt = forwardRef<HTMLDivElement, TransactionReceiptProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="p-3">
      <div className="flex items-center gap-x-1">
        <img src={FcmbLogo} alt="fcmb_logo" />
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-2">
        <h2 className="bg-primary-400 p-2">{`Transaction Receipt for Mandate ${data?.mandateCode} `}</h2>
        <div className="flex items-center gap-2">
          <p>Date:</p>
          <span className="font-bold underline">{dayjs().format('DD MM, YYYY')}</span>
        </div>
      </div>
      <div
        className="mt-6 grid grid-cols-1 gap-[20px] sm:grid-cols-2"
        style={{ padding: '20px', border: '1px solid black' }}
      >
        <div>
          <DetailsCard title="Mandate Code" content={data?.mandateCode} />
        </div>
        <div>
          <DetailsCard title="Amount" content={data?.amount} />
        </div>
        <div>
          <DetailsCard title="Effective Date" content={data?.effectiveDate} />
        </div>
        <div>
          <DetailsCard title="Billing Status" content={data?.billingStatus} />
        </div>
      </div>
    </div>
  );
});

export default TransactionReceipt;
