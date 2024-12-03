import { ReactNode } from 'react';

type DetailsCardProps = {
  title: string;
  content: ReactNode;
  contentClassName?: string;
};

const DetailsCard = ({ title, content, contentClassName }: DetailsCardProps) => {
  return (
    <div className="flex flex-col gap-1 py-3">
      <p className="text-sm text-darkgray">{title}</p>
      <p
        className={contentClassName}
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {content}
      </p>
    </div>
  );
};

export default DetailsCard;
