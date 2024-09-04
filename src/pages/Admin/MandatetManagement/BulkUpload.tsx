import { useDropzone } from 'react-dropzone';
import { BiDownload } from 'react-icons/bi';

const BulkUpload = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
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
            <div className="px-30 flex h-auto max-w-full items-center justify-around rounded-md bg-[#F0F0F0] py-10 sm:w-auto sm:px-40">
              <section className="flex w-full flex-col items-center justify-between">
                <div {...getRootProps({ className: 'dropzone' })}>
                  <div className="w-full">
                    <input {...getInputProps()} />
                    <p className="text-center font-semibold">Drag and drop excel sheet</p>
                    <p className="text-center font-semibold">or</p>
                    <div className="flex items-center justify-around">
                      <button className="mt-2 flex items-center gap-2 rounded-lg border border-lightPurple px-4 py-2 text-center text-lightPurple">
                        <BiDownload className="h-5 w-5" /> Browse Document
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex w-[70%] flex-col sm:w-[100%]">
                  <div className="text-sm text-lightPurple">{files}</div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BulkUpload;
