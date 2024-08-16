type DetailsCardProps = {
  title: string;
  content: string | number;
  contentClassName?: string;
};

const DetailsCard = ({ title, content, contentClassName }: DetailsCardProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-darkgray">{title}</p>
      <p className={contentClassName}>{content}</p>
    </div>
  );
};

export default DetailsCard;
