// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import LoginFormCard from "components/onboarding/LoginFormCard";
// import FormCardHeader from "components/onboarding/FormCardHeader";
// import TitleBar from "components/onboarding/TitleBar";
// import { StaffLoginValidation } from 'utils/helpers/formValidators';
// import { AdminActionType } from 'store/actions/admin/auth/adminAuthAction';
// import { login } from 'store/actions/admin/auth/adminAuth';
// import { saveDataLocally, getLocalData, notifySuccess } from 'utils/helpers';
// // import store from 'store';
// import { encrypt, decrypt } from '../../../utils/helpers/security';
// import FormInput from '../../../components/formElements/FormInput';
// import Checkbox from '../../../components/formElements/Checkbox';

import FormCardHeader from "components/Onboarding/FormCardHeader";
import LoginFormCard from "components/Onboarding/LoginFormCard";
import TitleBar from "components/Onboarding/TitleBar";

// interface Props {
// 	linkTo: string;
// }

const AdminLogin = () => {
	// const { dispatch } = stor
	let formik;

	return (
		<div className="light-bg min-h-screen">
			<div className="flex h-screen flex-col items-center justify-center">
				<TitleBar showTitle />

				<section className="flex w-[100%] justify-center px-3  py-4 sm:mt-4 md:min-w-[584px] md:py-0">
					<section className="relative  w-[100%] max-w-[584px]   rounded-xl bg-white shadow-2xl">
						<div className="flex min-h-[500px] max-w-[584px] flex-col">
							<FormCardHeader>
								<div>
									<section className="w-full overflow-auto px-6 pt-8 md:px-16">
										<h2 className="headerTitle">Sign in</h2>
									</section>
								</div>
							</FormCardHeader>
							<LoginFormCard
								bottomSectionClass="flex-1  mt-10 mb-4"
								bgDisbled="bg-gradient-to-r from-[#63098C] to-[#A11D8F] hover:from-[#A11D8F] hover:to-[#63098C]"
								formik={formik}
								actionBTNClass="px-3"
							>
								Login
							</LoginFormCard>
							{/*  */}
						</div>
					</section>
				</section>
			</div>
		</div>
	);
};

export default AdminLogin;
