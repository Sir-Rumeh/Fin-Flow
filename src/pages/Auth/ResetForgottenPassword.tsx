import ButtonComponent from 'components/FormElements/Button';
import FcmbLogo from 'assets/icons/FcmbIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import appRoutes from 'utils/constants/routes';
import { changeForgottenPasswordValidationSchema } from 'utils/formValidators';
import CustomInput from 'components/FormElements/CustomInput';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resetMerchantPassword } from 'config/actions/authentication-actions';
import { notifySuccess } from 'utils/helpers';
import { encrypt } from 'utils/helpers/security';
import { UserLoginRoles } from 'utils/enums';

interface RequestPayload {
  data: any;
  resetId: string | null;
  otp: string;
  step: string;
}

const ResetForgottenPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [inputTypeState, setInputTypeState] = useState(false);
  const requestEmail = searchParams.get('email');
  const requestReset = searchParams.get('reset');
  const [payloadData, setPayloadData] = useState<RequestPayload | undefined>();

  const onHandleInputType = () => {
    setInputTypeState(!inputTypeState);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validationSchema: changeForgottenPasswordValidationSchema,
    onSubmit: (values) => {
      const credentials = {
        email: requestEmail,
        newPassword: values.newPassword,
      };
      const encryptedData = encrypt(credentials);
      const payload = {
        data: encryptedData,
        resetId: requestReset,
        otp: '',
        step: 'credential-validation',
      };
      setPayloadData(payload);
      resetMerchantPasswordMutation.mutate(payload);
    },
  });

  const resetMerchantPasswordMutation = useMutation({
    mutationFn: (payload: RequestPayload | undefined) => resetMerchantPassword(payload),
    onSuccess: (data) => {
      notifySuccess('Password reset otp sent successfully');
      formik.resetForm();
      navigate(`/${appRoutes.merchantLogin}/${appRoutes.resetPasswordOtp}`, {
        state: { data: payloadData, origin: UserLoginRoles.Merchant },
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
        </div>

        <div className="mt-6 rounded-lg bg-white shadow-sm md:w-[36.5rem]">
          <div className="px-[4.375rem] pb-2 pt-10">
            <h2 className="pb-3 text-2xl font-medium leading-[1.875rem] text-blackPrimary">
              Enter a new password
            </h2>
            <p className="pb-4 text-sm text-zinc-400">
              Create a new password to allow you login to your account
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="mt-[4rem] w-full">
                <CustomInput
                  labelFor="password"
                  label="Enter new password"
                  placeholder="Enter password"
                  maxW="w-full"
                  formik={formik}
                  passwordInput
                  inputType={inputTypeState ? 'text' : 'password'}
                  iconState={inputTypeState}
                  handleInputType={onHandleInputType}
                />
              </div>
              <div className="mt-[5rem] w-full">
                <CustomInput
                  labelFor="newPassword"
                  label="Confirm new password"
                  placeholder="Confirm password"
                  maxW="w-full"
                  formik={formik}
                  passwordInput
                  inputType={inputTypeState ? 'text' : 'password'}
                  iconState={inputTypeState}
                  handleInputType={onHandleInputType}
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

export default ResetForgottenPassword;
