export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-50 flex w-full justify-center bg-modalBackground bg-opacity-30">
      <img className="scale-[7%]" src="/spinner.gif" id="spinner" alt="spinner" />
    </div>
  );
}
