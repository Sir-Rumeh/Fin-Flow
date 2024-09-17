import ButtonComponent from 'components/FormElements/Button';
import FormInput from 'components/FormElements/FormInput';
import FcmbLogo from 'assets/icons/FcmbIcon';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import appRoutes, { BASE_ROUTES } from 'utils/constants/routes';
import { userLoginValidationSchema } from 'utils/formValidators';
import CustomInput from 'components/FormElements/CustomInput';

const MerchantLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userLoginValidationSchema,
    onSubmit: () => {
      navigate(`/${appRoutes.merchantDashboard.dashboard.index}`);
    },
  });

  return (
    <div className="font-circular-std grid h-screen place-items-center bg-backgroundColor">
      <div className="">
        <div className="flex items-center justify-center md:mb-2 md:w-[36.5rem]">
          <FcmbLogo />
          <h3 className="pl-6 font-medium text-blackPrimary">DDI Portal</h3>
        </div>

        <div className="mt-6 rounded-lg bg-white shadow-sm md:w-[36.5rem]">
          <div className="px-[4.375rem] pb-2 pt-10">
            <h2 className="pb-10 text-2xl font-medium leading-[1.875rem] text-blackPrimary">
              Sign in
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mt-[2.5rem] w-full">
                <CustomInput
                  labelFor="email"
                  label="Email Address"
                  inputType="text"
                  placeholder="Enter a valid email"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="mt-[4rem] w-full">
                <CustomInput
                  labelFor="password"
                  label="Password"
                  inputType="text"
                  placeholder="Enter password"
                  maxW="w-full"
                  formik={formik}
                />
              </div>
              <div className="mt-[2.5rem] w-full">
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="submit"
                  width="99%"
                  height="3rem"
                  title="Sign In"
                />
              </div>
            </form>

            <div className="mb-20 flex items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantLogin;
