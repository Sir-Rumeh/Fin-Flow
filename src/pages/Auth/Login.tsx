// import React from "react";
import FormCard from "components/Onboarding/FormCard";
import FormCardHeader from "components/Onboarding/FormCardHeader";
import TitleBar from "components/Onboarding/TitleBar";

const Login = () => {
	return (
		<div className="bg-backgroundColor min-h-screen">
			<div className="flex h-screen flex-col items-center justify-center">
				<TitleBar showTitle />
				{/* min-h-[60vh] */}
				<section className=" flex justify-center px-3 py-4 sm:mt-4 md:min-w-[584px] md:py-0">
					{/* w-[100%] */}
					<section className="relative w-[100%] scroll-smooth rounded-xl bg-white shadow-2xl md:max-w-[584px]">
						<FormCardHeader>
							<div>
								<section className="w-full px-6 pt-4 md:px-10">
									<h2 className="headerTitle  text-center ">Select login method</h2>
								</section>

								<hr className="my-3 bg-[#334335]" />
							</div>
						</FormCardHeader>

						<section className="mb-2">
							<FormCard />
						</section>
					</section>
				</section>
			</div>
		</div>
	);
};

export default Login;
