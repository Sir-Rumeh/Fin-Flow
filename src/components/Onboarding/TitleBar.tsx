import logo from "assets/images/fcmb_logo.png";

interface Props {
	classesParentDiv?: string;
	showTitle?: boolean;
}

// { classesParentDiv = 'mt-6 sm:mb-10 mb:6' }: { classesParentDiv?: string }
const TitleBar = ({ classesParentDiv = "sm:py-5", showTitle = false }: Props) => {
	// mt-6 sm:mb-10 mb:6
	// sm:mb-6 mb-2 classesParentDiv
	return (
		<section className={` ${classesParentDiv}    flex w-[100%] justify-center  px-3 `}>
			<div className="flex ">
				<img src={logo} alt="fcmb_logo" />
				{showTitle && (
					<div className="mx-3 my-auto">
						<p className="text-secondary-900">DDI</p>
						<p className="text-secondary-900">Portal</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default TitleBar;
