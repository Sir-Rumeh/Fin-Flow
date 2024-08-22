interface TabProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  activeColor: string;
  inactiveColor: string;
}

const Tab: React.FC<TabProps> = ({
  label,
  count,
  isActive,
  onClick,
  activeColor,
  inactiveColor,
}) => {
  return (
    <div className="flex cursor-pointer flex-col gap-2" onClick={onClick}>
      <div className="flex items-center gap-2">
        <p
          className={`font-semibold ${isActive ? `text-${activeColor}` : `text-${inactiveColor}`}`}
        >
          {label}
        </p>
        <span className="rounded-[20px] bg-graySecondary px-3 py-[1px] text-sm text-blue-500">
          {count}
        </span>
      </div>
      <div className={isActive ? `h-[2px] w-full bg-${activeColor}` : ''}></div>
    </div>
  );
};

export default Tab;
