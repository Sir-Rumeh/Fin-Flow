import ButtonComponent from 'components/FormElements/Button';
import FcmbLogo from 'assets/icons/FcmbIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import appRoutes from 'utils/constants/routes';
import { OTPValidationSchema } from 'utils/formValidators';
import CustomInput from 'components/FormElements/CustomInput';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  changeMerchantPassword,
  loginMerchant,
  loginStaff,
} from 'config/actions/authentication-actions';
import { notifySuccess } from 'utils/helpers';
import { UserLoginRoles } from 'utils/enums';

interface RequestPayload {
  data: any;
  resetId: string | null;
  otp: string;
  step: string;
}

const ChangePasswordOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [inputTypeState, setInputTypeState] = useState(false);
  const [OTPbtnDisabledState, setOTPbtnDisabledState] = useState(true);
  const [time, setTime] = useState({ seconds: 0, minutes: 5 });
  const timerRef = useRef<any>(null);

  const onHandleInputType = () => {
    setInputTypeState(!inputTypeState);
  };

  useEffect(() => {
    if (!(state?.data && state?.origin)) navigate(`/${appRoutes.login}`);
  }, [state]);

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: OTPValidationSchema,
    onSubmit: (values) => {
      const payload = {
        data: state?.data?.data,
        resetId: state?.data?.resetId,
        otp: values.otp,
        step: 'otp-validation',
      };
      changeMerchantPasswordMutation.mutate(payload);
    },
  });

  const changeMerchantPasswordMutation = useMutation({
    mutationFn: (payload: RequestPayload | undefined) => changeMerchantPassword(payload),
    onSuccess: (data) => {
      notifySuccess('Password change successful. Kindly login again to continue');
      setTimeout(() => {
        formik.resetForm();
        navigate(`/${appRoutes.merchantLogin}`);
      }, 1000);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onHandleResetOTP = async (data: boolean) => {
    if (data) {
      const res =
        state?.origin === UserLoginRoles.Admin
          ? await loginStaff({
              data: state?.data,
              otp: '',
              step: 'credential-validation',
            })
          : await loginMerchant({
              data: state?.data,
              otp: '',
              step: 'credential-validation',
            });
      if (res) {
        notifySuccess('OTP Sent Successfully');
        reset();
      }
    }
  };

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    let timer: any;
    // eslint-disable-next-line prefer-const
    timer = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setTime((time: any) => ({ ...time, seconds: time.seconds - 1 }));
      if (time.seconds === 0) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setTime((time: any) => ({
          ...time,
          minutes: time.minutes - 1,
          seconds: 59,
        }));
      }
      if (time.minutes === 0 && time.seconds === 0) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setTime((time) => ({ ...time, minutes: 0, seconds: 0 }));
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (time.minutes <= 0 && time.seconds <= 0) {
      setOTPbtnDisabledState(false);
    }

    return () => {};
  }, [time.minutes <= 0 && time.seconds <= 0]);

  const reset = () => {
    setTime((timeReset: any) => ({ ...timeReset, minutes: 5, seconds: 0 }));
    setOTPbtnDisabledState(true);
  };

  const resendOTPContent = useMemo(
    () => (
      <span className="text-primary-700 cursor-pointer text-xs">
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </span>
    ),
    [time],
  );

  const handleOTPBTN = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onHandleResetOTP(true);
  };

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
              Enter OTP
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="mt-[4rem] w-full">
                <CustomInput
                  labelFor="otp"
                  label="OTP"
                  placeholder="Enter OTP"
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
                  title="Sign In"
                />
              </div>
              <div className="mt-2 flex justify-center py-3">
                <button
                  onClick={(e) => handleOTPBTN(e)}
                  type="button"
                  className={`cursor-pointer text-xs ${
                    OTPbtnDisabledState ? 'text-gray-400' : 'text-primary'
                  } `}
                >
                  Click to Resend?
                </button>
                <span className="cursor-pointer px-3 text-xs text-black/40">Resend available</span>
                {resendOTPContent}
              </div>
            </form>
            <div className="mb-20 flex items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordOtp;
