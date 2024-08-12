const CardComponent = (props: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  colorStyle: string;
}) => {
  const { icon, title, subtitle, colorStyle } = props;
  return (
    <div className="min-h-[8.06rem] min-w-[14.2rem] rounded-lg border border-[#F0F0F0] bg-white px-[0.75rem] py-[0.75rem] xl:min-w-[15rem]">
      <div className="font-circular-std min-h-[6.56rem] min-w-[12.8rem] rounded-lg bg-[#FAFAFA] px-4 py-4 font-medium">
        <div className="flex justify-between text-sm">
          <p className={`${colorStyle}`}>{title}</p>
          {icon}
        </div>
        <div className="pt-6 text-2xl font-bold">{subtitle}</div>
      </div>
    </div>
  );
};

export default CardComponent;
