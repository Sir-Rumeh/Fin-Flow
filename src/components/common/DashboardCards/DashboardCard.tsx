import { Link } from 'react-router-dom';
import { DashboardCardArrowIcon } from 'assets/icons';

type DashboardCardProps = {
  title: string;
  numberOfRequest: string | number;
  route: string;
  backgroundColor?: string;
};

const DashboardCard = ({
  title,
  numberOfRequest,
  route,
  backgroundColor = 'bg-graySecondary',
}: DashboardCardProps) => {
  return (
    <div className={`${backgroundColor} h-[160px] w-[340px] rounded-[8px] px-4 py-3`}>
      <p className="my-1 text-lg font-semibold">{title}</p>
      <p className="text-[35px] font-bold">{numberOfRequest}</p>
      <div className="mt-4 h-[2px] w-full bg-gray-200"></div>
      <Link to={route} className="mt-2 flex items-center gap-3">
        <span className="text-lightPurple">View all</span>
        <DashboardCardArrowIcon />
      </Link>
    </div>
  );
};

export default DashboardCard;
