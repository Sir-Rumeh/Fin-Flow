import CreationRequestIcon from './CreationRequestIcon';

export default function ApprovedIcon() {
  return (
    <div className="flex items-center gap-2">
      <CreationRequestIcon />
      <span className={`mb-[1px] ${'font-semibold text-greenPrimary'}`}>Approved</span>
    </div>
  );
}
