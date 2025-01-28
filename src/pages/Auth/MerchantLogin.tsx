import ButtonComponent from 'components/FormElements/Button';
import FcmbLogo from 'assets/icons/FcmbIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import appRoutes, { BASE_ROUTES } from 'utils/constants/routes';
import { userLoginValidationSchema } from 'utils/formValidators';
import CustomInput from 'components/FormElements/CustomInput';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginMerchant } from 'config/actions/authentication-actions';
import { notifySuccess } from 'utils/helpers';
import { encrypt } from 'utils/helpers/security';
import { UserLoginRoles } from 'utils/enums';

const MerchantLogin = () => {
  const navigate = useNavigate();
  const [inputTypeState, setInputTypeState] = useState(false);
  const [enccryptedData, setEncryptedData] = useState(false);

  const onHandleInputType = () => {
    setInputTypeState(!inputTypeState);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userLoginValidationSchema,
    onSubmit: (values) => {
      const encryptedData = encrypt(values);
      setEncryptedData(encryptedData);
      const payload = {
        data: encryptedData,
        otp: '',
        step: 'credential-validation',
      };
      loginMerchantMutation.mutate(payload);
    },
  });

  const loginMerchantMutation = useMutation({
    mutationFn: (payload: { data: string } | undefined) => loginMerchant(payload),
    onSuccess: (data) => {
      notifySuccess('OTP Sent Successfully');
      formik.resetForm();
      navigate(`/${appRoutes.merchantLoginOTP}`, {
        state: { data: enccryptedData, origin: UserLoginRoles.Merchant },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="font-circular-std grid h-screen place-items-center bg-backgroundColor">
      <div className="">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center md:mb-2 md:w-[36.5rem]">
            <FcmbLogo />
            <h3 className="pl-6 font-medium text-blackPrimary">DDI Portal</h3>
          </div>
          {/* <div className="flex items-center justify-around rounded-md bg-white p-2">
            <div className="flex items-center gap-4 text-sm">
              <img src={Alat} alt="alat-icon" />
              <p>
                First time user?{' '}
                <Link to={BASE_ROUTES.RESETPASSWORD} className="text-[#5C068C]">
                  Reset your password
                </Link>{' '}
                to login
              </p>
            </div>
          </div> */}
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
                  placeholder="Enter password"
                  maxW="w-full"
                  formik={formik}
                  passwordInput
                  inputType={inputTypeState ? 'text' : 'password'}
                  iconState={inputTypeState}
                  handleInputType={onHandleInputType}
                />
              </div>
              <div className="flex justify-end pt-5">
                <Link to={BASE_ROUTES.RESETPASSWORD} className="text-sm text-[#5C068C]">
                  Forgot your password?
                </Link>{' '}
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
