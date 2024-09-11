interface TabProps {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
  inactiveColor?: string;
}

const Tab: React.FC<TabProps> = ({ label, count, isActive, onClick, inactiveColor }) => {
  return (
    <div className="flex cursor-pointer flex-col gap-2" onClick={onClick}>
      <div className="flex items-center gap-2">
        <p
          className={`text-sm font-semibold md:text-[16px] ${isActive ? 'text-blue-500' : inactiveColor}`}
        >
          {label}
        </p>
        {count && (
          <span className="rounded-[20px] bg-graySecondary px-3 py-[1px] text-sm text-blue-500">
            {count}
          </span>
        )}
      </div>
      {isActive ? (
        <div className={`h-[2px] w-full bg-blue-500`}></div>
      ) : (
        <div className="h-[2px] w-full"></div>
      )}
    </div>
  );
};

export default Tab;
