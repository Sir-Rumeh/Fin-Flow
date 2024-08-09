/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
// import { notifySuccess } from 'utils/helpers/toastHelper';
// import errorInfo from '../assets/images/error_info_logo.png';
import Button from "../FormElements/Button";

interface Props {
	children: React.ReactNode;
	formik?: any;
	buttonText?: string;
	bottomSectionClass?: string;
	bgDisbled: string;
	redirectToSignIn?: boolean;
	linkBack?: string;
	actionBTNClass?: string;
	resendOTPTag?: boolean;
	classesParentDiv?: string;
	resendOTPContent?: React.ReactNode;
	handleResetOTP?: (e: boolean) => void;
	OTPbtnDisabled?: boolean;
}

const LoginFormCard = ({
	children,
	formik,
	// buttonText = "Continue",
	bottomSectionClass = "",
	// bgDisbled,
	redirectToSignIn = false,
	linkBack = "",
	actionBTNClass = "px-3",
	resendOTPTag = false,
	classesParentDiv = "my-5",
	resendOTPContent,
	handleResetOTP = () => {},
	OTPbtnDisabled = false,
}: Props) => {
	// const navigate = useNavigate();

	// formik.handleSubmit
	/* const handleFormSubmit = (event: any, cb: any) => {
        event.preventDefault();
        cb();
    };
    */

	const handleOTPBTN = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		handleResetOTP(true);
	};

	return (
		<>
			{/* form contents here */}

			<div className={` ${classesParentDiv} flex h-full flex-1 flex-col rounded-xl px-4 md:px-10`}>
				<form className="mb-2  mt-3  flex flex-1 flex-col px-4" onSubmit={formik.handleSubmit}>
					{children}
					<section className={`flex items-end  ${bottomSectionClass}`}>
						<section className="flex w-full flex-col">
							<section className={`flex w-full justify-center ${actionBTNClass}`}>
								<div className="grow">
									<Button
										color="white"
										width="15rem"
										variant="contained"
										onClick={() => formik.handleSubmit()}
									/>
								</div>
							</section>

							{redirectToSignIn && (
								<div className="flex justify-center  py-3 ">
									<Link
										to={linkBack}
										// href={`${linkBack}`}
										// onClick={() => navigate(linkBack)}
										className="cursor-pointer text-[12px] text-primary-700"
									>
										Take me back to sign in
									</Link>
								</div>
							)}

							{resendOTPTag && (
								<div className="flex justify-center py-3">
									{/* <Link
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // notifySuccess('OTP will be resent');
                                            alert('hi')
                                             handleResetOTP(true)
                                        }}
                                        
                                        type='button'
                                        to={linkBack}
                                        className="cursor-pointer text-xs text-primary"
                                    >
                                        Click to Resend?
                                    </Link> */}
									<button
										onClick={(e) => handleOTPBTN(e)}
										type="button"
										disabled={OTPbtnDisabled}
										// to={linkBack}
										className={`cursor-pointer text-xs ${
											OTPbtnDisabled ? "text-gray-400" : "text-primary"
										} `}
									>
										Click to Resend?
									</button>
									<span className="cursor-pointer px-3 text-xs text-black/40">
										Resend available
									</span>
									{/* <span className="cursor-pointer text-xs text-primary-700">
                                        in 02:30s
                                    </span> */}
									{resendOTPContent}
								</div>
							)}
						</section>
					</section>
				</form>
			</div>
		</>
	);
};

export default LoginFormCard;
