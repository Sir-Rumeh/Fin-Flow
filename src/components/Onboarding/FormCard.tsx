import React from "react";
import { ReactComponent as ArrowRight } from "assets/icons/ArrowRight.svg";
import { Link } from "react-router-dom";

interface FormCardProps {
	children: React.ReactNode | null;
}

const FormCard = ({ children }: FormCardProps) => {
	return (
		<>
			{/* form contents here */}

			<p className="subTitle py-6 text-center ">Kindly select a login method</p>

			<div className="my-5 flex h-full flex-col rounded-xl px-4">
				<div className="relative    w-full py-6">
					<div className="loginActionContent loginActionWrapper  px-3 py-7" />
					<div className="loginActionContent  left-[0]  h-auto p-4">
						<Link to="" className="flex w-full justify-between">
							<p className="loginActionTitle">Admin Login</p>
							<ArrowRight className="my-auto cursor-pointer" />
						</Link>
					</div>
				</div>

				<div className="relative  my-9 w-full py-4">
					<div className="loginActionContent loginActionWrapper  px-3 py-7" />
					<div className="loginActionContent  left-[0] h-auto p-4">
						<Link to="" className="flex w-full justify-between">
							<p className="loginActionTitle">Merchant Login</p>
							<ArrowRight className="my-auto cursor-pointer" />
						</Link>
					</div>
				</div>
			</div>

			{children}
		</>
	);
};

export default FormCard;
