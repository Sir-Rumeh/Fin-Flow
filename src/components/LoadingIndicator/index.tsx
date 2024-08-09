export default function LoadingIndicator() {
	return (
		<div className="fixed w-full inset-0 bg-modalBackground bg-opacity-30  flex justify-center z-50">
			<img className="scale-[7%]" src="/spinner.gif" id="spinner" alt="spinner" />
		</div>
	);
}
