import DarkArrowDown from 'assets/icons/DarkArrowDown';

export default function PopoverTitle({ title }: { title: string }) {
  return (
    <div
      className="flex items-center justify-center gap-x-1 rounded-[8px] border-2 border-[#bc9dc7] px-2 py-2 text-xs font-semibold capitalize text-blackInput 2xl:px-4"
      onClick={() => {}}
    >
      {title} <DarkArrowDown />
    </div>
  );
}
