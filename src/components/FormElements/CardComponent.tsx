const CardComponent = (props: { icon: JSX.Element; title: string; subtitle: string; colorStyle: string }) => {
	const { icon, title, subtitle, colorStyle } = props;
	return (
		<div className="border border-[#F0F0F0] xl:min-w-[15rem] min-w-[14.2rem] min-h-[8.06rem] px-[0.75rem] bg-white py-[0.75rem] rounded-lg">
			<div className="min-h-[6.56rem] min-w-[12.8rem] bg-[#FAFAFA] px-4 py-4 font-circular-std font-medium rounded-lg">
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
