import { Link } from 'react-router-dom';
import { DashboardCardArrowIcon } from 'assets/icons';

type RouteType = {
  pathname: string;
  search?: string;
};

type DashboardCardProps = {
  title: string;
  numberOfRequest: string | number;
  route: RouteType | string;
  backgroundColor?: string;
  textColor?: string;
  maxW?: string;
  icon?: React.ReactNode;
};

const DashboardCard = ({
  title,
  numberOfRequest,
  route,
  backgroundColor = 'bg-graySecondary',
  textColor,
  icon,
  maxW,
}: DashboardCardProps) => {
  return (
    <div className={`${backgroundColor} ${maxW} h-[160px] w-full rounded-[8px] px-4 py-3`}>
      <div className="my-1 flex items-center justify-start gap-x-4 text-lg font-semibold">
        {icon ? <p>{icon}</p> : null}
        <p>{title}</p>
      </div>
      <p className={`text-[35px] font-bold ${textColor}`}>{numberOfRequest}</p>
      <div className="mt-4 h-[2px] w-full bg-gray-200"></div>
      <Link to={route} className="mt-2 flex items-center gap-3">
        <span className="font-semibold text-lightPurple">View all</span>
        <DashboardCardArrowIcon />
      </Link>
    </div>
  );
};

export default DashboardCard;
