import DarkArrowDown from 'assets/icons/DarkArrowDown';

export default function PopoverTitle({ title }: { title: string }) {
  return (
    <div
      className="flex h-[2.5rem] items-center justify-center gap-x-1 rounded-[8px] border-2 border-[#bc9dc7] px-4 py-2 text-xs font-semibold capitalize text-blackInput"
      onClick={() => {}}
    >
      {title} <DarkArrowDown />
    </div>
  );
}
