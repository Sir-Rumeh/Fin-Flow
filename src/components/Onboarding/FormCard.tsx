import React from "react";
import ArrowRight from "assets/icons/ArrowRight";
import { Link } from "react-router-dom";
import { BASE_ROUTES } from "utils/constants/routes";
import errorInfo from "assets/images/error_info_logo.png";

// interface FormCardProps {
// 	children: React.ReactNode | null;
// }

// const FormCard = ({ children }: FormCardProps) => {
const FormCard = () => {
	return (
		<>
			{/* form contents here */}

			<p className="subTitle py-6 text-center ">Kindly select a login method</p>

			<div className="my-5 flex h-full flex-col rounded-xl px-4 gap-y-10">
				<div className="relative w-full rounded-lg bg-purpleSecondary border-2 border-purplePrimary">
					<div className="p-5">
						<Link to={BASE_ROUTES.ADMINLOGIN} className="flex items-center w-full justify-between">
							<p className="loginActionTitle">Admin Login</p>
							<ArrowRight />
						</Link>
					</div>
				</div>

				<div className="relative w-full rounded-lg bg-purpleSecondary border-2 border-purplePrimary">
					<div className="p-5">
						<Link to={BASE_ROUTES.MERCHANTLOGIN} className="flex items-center w-full justify-between">
							<p className="loginActionTitle">Merchant Login</p>
							<ArrowRight />
						</Link>
					</div>
				</div>
			</div>

			{/* {children} */}
			<section className="flex justify-center py-6">
				<div className="mx-3 flex">
					<img className="h-[20px] w-[20px]" src={errorInfo} alt="info-login" />
					<span className="px-3 text-[12px] text-black_text">
						Select merchant login if you’re not a staff of{" "}
						<abbr title="First City Monument Bank">FCMB</abbr>
					</span>
				</div>
			</section>
		</>
	);
};

export default FormCard;
