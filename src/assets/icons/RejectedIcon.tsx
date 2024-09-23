import DeleteRequestIcon from './DeleteRequestIcon';

export default function RejectedIcon() {
  return (
    <div className="flex items-center gap-2">
      <DeleteRequestIcon />
      <span className={`mb-[1px] ${'font-semibold text-redSecondary'}`}>Rejected</span>
    </div>
  );
}
