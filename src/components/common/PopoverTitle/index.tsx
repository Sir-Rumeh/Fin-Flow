import DarkArrowDown from 'assets/icons/DarkArrowDown';

export default function PopoverTitle({ title }: { title: string }) {
  return (
    <div
      className="flex items-center justify-center gap-x-1 rounded-md bg-backgroundColor p-2 text-xs text-blackInput"
      onClick={() => {}}
    >
      {title} <DarkArrowDown />
    </div>
  );
}
