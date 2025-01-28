import ButtonComponent from 'components/FormElements/Button';
import FcmbLogo from 'assets/icons/FcmbIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import appRoutes, { BASE_ROUTES } from 'utils/constants/routes';
import { resetPasswordValidationSchema } from 'utils/formValidators';
import CustomInput from 'components/FormElements/CustomInput';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginMerchant } from 'config/actions/authentication-actions';
import { notifyError, notifySuccess } from 'utils/helpers';
import { encrypt } from 'utils/helpers/security';
import { UserLoginRoles } from 'utils/enums';
import { Alat } from 'assets/icons';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [inputTypeState, setInputTypeState] = useState(false);
  const [enccryptedData, setEncryptedData] = useState(false);

  const onHandleInputType = () => {
    setInputTypeState(!inputTypeState);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      const payload = {
        data: values,
        otp: '',
        step: 'credential-validation',
      };
      console.log(payload);
      notifySuccess('Password reset email sent successfully');
      formik.resetForm();
      setTimeout(() => {
        navigate(`/${appRoutes.merchantLogin}/${appRoutes.resetForgottenPassword}`);
      }, 3000);
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
        </div>

        <div className="mt-5 rounded-lg bg-white shadow-sm md:w-[36.5rem]">
          <div className="px-[4.375rem] pb-2 pt-10">
            <h2 className="pb-5 text-2xl font-medium leading-[1.875rem] text-blackPrimary">
              Reset your password
            </h2>
            <p className="pb-6 text-sm text-zinc-400">
              Enter the email address associated with your account. A password reset link will be
              sent to the email address
            </p>

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
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="submit"
                  width="99%"
                  height="3rem"
                  title="Continue"
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

export default ResetPassword;
