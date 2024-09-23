import { Link, useNavigate } from 'react-router-dom';
import appRoutes from 'utils/constants/routes';
import ChevronRight from 'assets/icons/ChevronRight';
import ButtonComponent from 'components/FormElements/Button';
import { useCallback, useState } from 'react';
import RedAlertIcon from 'assets/icons/RedAlertIcon';
import { ModalWrapper } from 'hoc/ModalWrapper';
import ActionSuccessIcon from 'assets/icons/ActionSuccessIcon';
import { useFormik } from 'formik';
import UploadIcon from 'assets/icons/UploadIcon';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { isFileSizeValid, notifyError } from 'utils/helpers';

function AddUser() {
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

  const formik = useFormik({
    initialValues: {},

    onSubmit: (values) => {
      openModal('confirmCreate');
    },
  });

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    try {
      acceptedFiles.forEach((file: FileWithPath) => {
        if (file) {
          if (!isFileSizeValid(file.size, 100)) {
            throw 'File should be lesser than or equal to 100MB';
          }
        }
      });
    } catch (error: any) {
      notifyError(error);
    }
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.csv'],
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));
  return (
    <>
      <div className="px-5 py-1">
        <div className="slide-down mt-2 flex items-center gap-2 text-lg">
          <Link
            to={`/${appRoutes.adminDashboard.staffUserManagement.index}`}
            className="cursor-pointer text-darkgray"
          >
            Staff User Management
          </Link>{' '}
          <ChevronRight />
          <span className="text-lightPurple">Add User</span>
        </div>
        <div className="slide-down mt-3 flex items-center justify-between">
          <h2 className="mt-3 text-xl font-semibold">Add Multiple Staff Users</h2>
        </div>
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
                </section>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex w-full items-center justify-end gap-4">
                <div className="w-auto">
                  <ButtonComponent
                    color="purplePrimary"
                    variant="outlined"
                    type="button"
                    title="Cancel"
                    customPaddingX="1.5rem"
                    width="10rem"
                    onClick={() => {
                      navigate(`/${appRoutes.adminDashboard.staffUserManagement.index}`);
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
                    title="Upload"
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
      </div>
      {modals.confirmCreate && (
        <ModalWrapper
          isOpen={modals.confirmCreate}
          setIsOpen={() => closeModal('confirmCreate')}
          title={'Add users?'}
          info={'You are about to add new users, would you want to proceed with this?'}
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
          info={'You have successfully added new users'}
          icon={<ActionSuccessIcon />}
          type={'completed'}
          proceedAction={() => {
            closeModal('creationSuccessful');
            navigate(`/${appRoutes.adminDashboard.staffUserManagement.index}`);
          }}
        />
      )}
    </>
  );
}

export default AddUser;
