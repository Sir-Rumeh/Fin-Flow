import ButtonComponent from 'components/FormElements/Button';
import FormInput from 'components/FormElements/FormInput';
import FcmbLogo from 'assets/icons/FcmbIcon';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import appRoutes, { BASE_ROUTES } from 'utils/constants/routes';
import { userLoginValidationSchema } from 'utils/formValidators';

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
    <div className="font-circular-std grid h-screen place-items-center bg-backgroundColor pb-14">
      <div className="mt-8">
        <div className="flex items-center justify-center md:mb-2 md:w-[36.5rem]">
          <FcmbLogo />
          <h3 className="pl-6 font-medium text-blackPrimary">DDI Portal</h3>
        </div>

        <div className="mt-6 rounded-lg bg-white shadow-sm md:h-[30.5625rem] md:w-[36.5rem]">
          <div className="px-[4.375rem] py-10">
            <h2 className="pb-10 text-2xl font-medium leading-[1.875rem] text-blackPrimary">
              Sign in
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-[2.5rem] mt-[1rem]">
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
                    formik.touched.email && formik.errors.email ? formik.errors.email : ''
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
                    formik.touched.password && formik.errors.password ? formik.errors.email : ''
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
                title="Sign In"
              />
            </form>

            <div className="mb-20 flex items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantLogin;
