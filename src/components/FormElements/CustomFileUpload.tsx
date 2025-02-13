import React, { useRef, useState } from 'react';
import { convertBase64, isFileSizeValid, isFileTypeValid, notifyError } from 'utils/helpers';

type CustomInputProps = {
  labelFor: string;
  label: string;
  formik: any;
  useTouched?: boolean;
  fileTypes?: string[];
  height?: string;
};

const CustomFileUpload = ({
  labelFor,
  label,
  height,
  formik,
  useTouched = true,
  fileTypes = ['pdf', 'jpg', 'jpeg', 'png'],
}: CustomInputProps) => {
  const [uploadedfileName, setUploadedfileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const fileSizeLimit = 0.0488;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.currentTarget.files;
      if (file) {
        if (!isFileTypeValid(file[0].name, fileTypes))
          throw `Invalid file type. File should be ${fileTypes?.join(', ')}`;
        if (!isFileSizeValid(file[0].size, fileSizeLimit)) {
          setUploadedfileName('');
          throw `File size should be lesser than or equal to ${Math.round(fileSizeLimit * 1024)}KB`;
        }
        const base64 = await convertBase64(file[0]);
        formik.setFieldValue(labelFor, base64);
        setUploadedfileName(file[0].name);
      }
    } catch (error: any) {
      notifyError(error);
    }
  };
  return (
    <>
      <div className="relative mb-4 mt-6 h-auto w-full">
        <label htmlFor={labelFor} className="absolute bottom-16 w-full font-semibold">
          {label}
          <span className="absolute left-0 top-5 w-full text-[8px] font-light">{`( ${fileTypes.join(', ')} )`}</span>
        </label>

        <div
          className={`relative flex ${height ? height : 'h-[50px]'} items-center justify-between rounded-lg border border-gray-300 px-1 ${
            useTouched && formik?.touched[labelFor] && formik?.errors[labelFor]
              ? 'border-red-400'
              : ''
          } ${!useTouched && formik?.errors[labelFor] ? 'border-red-400' : ''} `}
        >
          <div className="relative flex h-full w-[35%] items-center justify-center border-r">
            <input
              type="file"
              ref={fileRef}
              className="absolute inset-0 z-10 hidden"
              name={labelFor}
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="flex h-full w-full cursor-pointer items-center justify-center bg-gradient-to-r from-[#5C068C] to-[#2F0248] bg-clip-text text-center font-semibold text-transparent"
              onClick={() => {
                if (fileRef.current) {
                  fileRef.current.click();
                }
              }}
            >
              Browse here
            </button>
          </div>
          <span className="flex h-full w-[65%] items-center justify-start truncate px-2 text-gray-400">
            {uploadedfileName ? uploadedfileName : 'No file chosen'}
          </span>
        </div>

        {useTouched
          ? formik?.touched[labelFor] &&
            formik?.errors[labelFor] && (
              <p className={`absolute top-14 text-xs italic text-red-400`}>
                {formik?.errors[labelFor]}
              </p>
            )
          : formik?.errors[labelFor] && (
              <p className={`absolute top-14 text-xs italic text-red-400`}>
                {formik?.errors[labelFor]}
              </p>
            )}
        <span className="absolute left-0 top-[50px] w-full text-[10px] font-light">{`File size limit: ${Math.round(fileSizeLimit * 1024)}KB`}</span>
      </div>
    </>
  );
};

export default CustomFileUpload;
