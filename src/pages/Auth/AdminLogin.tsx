import ButtonComponent from "components/FormElements/Button";
import FormInput from "components/FormElements/FormInput";
import FcmbLogo from "assets/icons/FcmbIcon";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { BASE_ROUTES } from "utils/constants/routes";

const AdminLogin = () => {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		// validationSchema: userLoginValidationSchema,
		onSubmit: (values: { email: string; password: string }) => {
			console.log(values);
			navigate(`/${BASE_ROUTES.ADMIN}`);
		},
	});

	return (
		<div className="grid h-screen place-items-center bg-backgroundColor pb-14 font-circular-std">
			<div className="mt-8">
				<div className="md:w-[36.5rem] md:mb-2 justify-center flex items-center">
					<FcmbLogo />
					<h3 className="font-medium text-blackPrimary pl-6">DDI Portal</h3>
				</div>

				<div className="bg-white shadow-sm rounded-lg md:w-[36.5rem] md:h-[30.5625rem] mt-6">
					<div className="py-10 px-[4.375rem]">
						<h2 className="text-2xl font-medium leading-[1.875rem] text-blackPrimary pb-10">
							Sign in
						</h2>

						<form onSubmit={formik.handleSubmit}>
							<div className="mt-[1rem] mb-[2.5rem]">
								<FormInput
									id="email"
									name="email"
									placeholder="Enter your email"
									label="Email"
									width="26.187rem"
									height="3rem"
									value={formik.values.email}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={
										formik.touched.email && formik.errors.email ? formik.errors.email : ""
									}
								/>
							</div>
							<div className="mb-[2.5rem]">
								<FormInput
									id="password"
									name="password"
									placeholder="Your password"
									label="Password"
									type="password"
									width="26.187rem"
									height="3rem"
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.password)}
									helperText={
										formik.touched.password && formik.errors.password
											? formik.errors.email
											: ""
									}
								/>
							</div>
							<ButtonComponent
								variant="contained"
								color="white"
								backgroundColor="#5C068C"
								hoverBackgroundColor="#2F0248"
								type="submit"
								width="26.187rem"
								height="3rem"
							>
								Sign In
							</ButtonComponent>
						</form>

						<div className="flex items-center mb-20"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
