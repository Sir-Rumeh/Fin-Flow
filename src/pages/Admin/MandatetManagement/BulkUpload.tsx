import { CloseIcon } from 'assets/icons';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import UploadIcon from 'assets/icons/UploadIcon';
import ButtonComponent from 'components/FormElements/Button';
import { ModalWrapper } from 'hoc/ModalWrapper';
import { useCallback, useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import { isFileSizeValid, notifyError } from 'utils/helpers';

const BulkUpload = () => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    try {
      acceptedFiles.forEach((file: FileWithPath) => {
        if (file) {
          if (!isFileSizeValid(file.size, 500)) {
            throw 'File should be lesser than or equal to 50MB';
          }
        }
      });
    } catch (error: any) {
      notifyError(error);
    }
  }, []);
  let { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.csv'],
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[] | undefined>();

  const clearFiles = () => {
    setUploadedFiles([]);
    acceptedFiles = [];
  };

  useEffect(() => {
    setUploadedFiles(acceptedFiles);
  }, [acceptedFiles]);

  const navigate = useNavigate();

  const [modals, setModals] = useState({
    confirmCreate: false,
    creationSuccessful: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const files = uploadedFiles?.map((file, index) => (
    <li key={index}>
      {file.name} - {file.size / 1000} kb
    </li>
  ));

  return (
    <>
      <div className="slide-down mt-5 rounded-lg bg-white px-5 py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          noValidate
          className="relative w-full"
        >
          <div className="flex items-center justify-around rounded-[5px] border-[3px] border-dashed border-gray-200 px-6 py-10">
            <div className="flex h-auto max-w-full items-center justify-around rounded-md bg-[#F0F0F0] px-[16px] py-10 sm:w-auto sm:px-40">
              <section className="flex w-full flex-col items-center justify-between">
                <div {...getRootProps({ className: 'dropzone' })}>
                  <div className="w-full">
                    <input {...getInputProps()} />
                    <p className="text-center font-semibold">Drag and drop excel sheet</p>
                    <p className="text-center font-semibold">or</p>
                    <div className="flex w-full items-center justify-around">
                      <button className="mt-2 flex w-full items-center gap-2 rounded-lg border border-lightPurple bg-gradient-to-r from-[#2F0248] via-yellow-800 to-[#5C068C] bg-clip-text px-4 py-2 text-center font-semibold text-transparent">
                        <UploadIcon /> Browse Document
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex w-[70%] flex-col sm:w-[100%]">
                  <div className="bg-gradient-to-r from-[#2F0248] via-[#5C068C] to-yellow-800 bg-clip-text px-4 py-2 text-center text-sm font-semibold text-transparent">
                    {files}
                  </div>
                </div>
                {uploadedFiles && uploadedFiles.length > 0 && (
                  <button
                    onClick={clearFiles}
                    className="mt-3 flex scale-[90%] items-center justify-center rounded-full border border-lightPurple bg-gradient-to-r from-[#2F0248] via-yellow-800 to-[#5C068C] bg-clip-text p-1 text-center font-semibold text-transparent"
                  >
                    <CloseIcon />
                  </button>
                )}
              </section>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex w-full items-center justify-end gap-4">
              <div className="w-auto">
                <ButtonComponent
                  color="#5C068C"
                  borderColor="#5C068C"
                  variant="outlined"
                  type="button"
                  title="Cancel"
                  customPaddingX="1.5rem"
                  width="10rem"
                  onClick={() => {
                    navigate(`/${appRoutes.adminDashboard.mandateManagement.index}`);
                  }}
                />
              </div>
              <div className="w-auto">
                <ButtonComponent
                  variant="contained"
                  color="white"
                  backgroundColor="#5C068C"
                  hoverBackgroundColor="#2F0248"
                  type="button"
                  title="Add Mandate"
                  customPaddingX="1.5rem"
                  width="10rem"
                  onClick={() => {
                    openModal('confirmCreate');
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {modals.confirmCreate && (
        <ModalWrapper
          isOpen={modals.confirmCreate}
          setIsOpen={() => closeModal('confirmCreate')}
          title={'Add Mandate?'}
          info={'You are about to add a new mandate, would you want to proceed with this?'}
          icon={<RedAlertIcon />}
          type={'confirmation'}
          proceedAction={() => {
            closeModal('confirmCreate');
            openModal('creationSuccessful');
          }}
        />
      )}

      {modals.creationSuccessful && (
        <ModalWrapper
          isOpen={modals.creationSuccessful}
          setIsOpen={() => closeModal('creationSuccessful')}
          title={'Success!!'}
          info={'You have successfully added a new mandate'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.mandateManagement.index}`);
          }}
        />
      )}
    </>
  );
};

export default BulkUpload;
