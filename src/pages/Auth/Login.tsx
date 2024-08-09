import React from "react";
import FormCard from "components/Onboarding/FormCard";
import FormCardHeader from "components/Onboarding/FormCardHeader";
import TitleBar from "components/Onboarding/TitleBar";
import errorInfo from "assets/images/error_info_logo.png";

const Login = () => {
	return (
		<div className="light-bg min-h-screen">
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
							<FormCard>
								<section className="flex justify-center py-6">
									<div className="mx-3 flex">
										<img className="h-[20px] w-[20px]" src={errorInfo} alt="info-login" />
										<span className="px-3 text-[12px] text-black_text">
											Select other members if you’re not a staff of{" "}
											<abbr title="First City Monument Bank">FCMB</abbr>
										</span>
									</div>
								</section>
							</FormCard>
						</section>
					</section>
				</section>
			</div>
		</div>
	);
};

export default Login;
